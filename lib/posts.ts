import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { cacheLife } from 'next/cache'
import type { Post, PostMeta, SearchEntry } from 'types/post'
import { parse } from 'yaml'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')
const SHOW_DRAFTS = process.env.NODE_ENV === 'development'
const WORDS_PER_MINUTE = 220
const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

const readingMinutes = (body: string) =>
	Math.max(
		1,
		Math.round(body.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE)
	)

/** Every published post, newest first; split it with isArchived */
export async function getPosts(): Promise<Post[]> {
	'use cache'
	cacheLife('max')

	const files = (await readdir(POSTS_DIR)).filter((f) => /\.mdx?$/.test(f))
	const posts = await Promise.all(
		files.map(async (file): Promise<Post> => {
			const source = await readFile(path.join(POSTS_DIR, file), 'utf8')
			const match = source.match(FRONT_MATTER)
			if (!match?.[1]) {
				throw new Error(`content/posts/${file} has no front matter`)
			}
			const meta = parse(match[1]) as PostMeta
			return {
				...meta,
				date: String(meta.date),
				slug: file.replace(/\.mdx?$/, ''),
				file,
				readingMinutes: readingMinutes(source.slice(match[0].length)),
			}
		})
	)

	return posts
		.filter((p) => SHOW_DRAFTS || !p.draft)
		.sort(
			(a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)
		)
}

export const isArchived = (post: Post) => Boolean(post.archive)

/** Markdown to searchable text: keeps link and image text, drops the syntax and the archive's lost-image notes */
const toPlainText = (markdown: string) =>
	markdown
		.replace(/<[^>]+>/g, ' ')
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/^\s*(#+|>|-|\d+\.)\s+/gm, '')
		.replace(/\\([\\[\]()*_#`>-])/g, '$1')
		.replace(/\[image lost[^\]]*\]/g, ' ')
		.replace(/[*`|~]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()

/** Every published post's text for the list's search box, served as /blog/search.json */
export async function getSearchIndex(): Promise<SearchEntry[]> {
	'use cache'
	cacheLife('max')

	return Promise.all(
		(await getPosts()).map(async (p) => {
			const source = await readFile(path.join(POSTS_DIR, p.file), 'utf8')
			return {
				slug: p.slug,
				tags: p.tags ?? [],
				description: p.description,
				text: toPlainText(source.replace(FRONT_MATTER, '')),
			}
		})
	)
}

/** The post's rendered body; only call it with a post from getPosts() */
export async function getPostContent(post: Post) {
	const mod = (await import(`../content/posts/${post.file}`)) as {
		default: React.ComponentType
	}
	return mod.default
}
