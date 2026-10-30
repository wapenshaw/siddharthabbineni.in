import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import GithubSlugger from 'github-slugger'
import { parse } from 'yaml'
import type { SearchEntry } from './search'

/** The YAML front matter at the top of each posts/*.md(x) */
export interface PostMeta {
	title: string
	/** One or two sentences: the grid, link previews and the RSS feed use it */
	description: string
	/** Publish date, YYYY-MM-DD */
	date: string
	tags?: string[]
	/** Shown in development only, so a post can be written in the repo before it goes live */
	draft?: boolean
	/** Set on posts brought over from somewhere else */
	archive?: {
		/** Where it first appeared: 'dev.to', or the old blog ('thesid.net', Blogger) */
		site: string
		/** The original, or its Wayback Machine copy */
		url: string
	}
}

/** A section of a post: each h2 is a lap */
export interface Lap {
	id: string
	title: string
}

export interface Post extends PostMeta {
	/** The file name without its extension; the post lives at /<slug>/ */
	slug: string
	/** The file name in posts/ */
	file: string
	readingMinutes: number
	laps: Lap[]
}

const POSTS_DIR = path.join(process.cwd(), 'posts')
const SHOW_DRAFTS = process.env.NODE_ENV === 'development'
const WORDS_PER_MINUTE = 220
const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

const readingMinutes = (body: string) =>
	Math.max(
		1,
		Math.round(body.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE)
	)

/** The h2s outside code blocks, with the ids rehype-slug gives them */
function lapsOf(body: string): Lap[] {
	const slugger = new GithubSlugger()
	const laps: Lap[] = []
	let inCode = false
	for (const line of body.split(/\r?\n/)) {
		if (/^\s*(```|~~~)/.test(line)) {
			inCode = !inCode
		}
		if (inCode) {
			continue
		}
		// every heading takes a slug, so later ids match the page's
		const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/)
		if (!heading?.[2]) {
			continue
		}
		const title = heading[2]
			.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
			.replace(/[`*_]/g, '')
		const id = slugger.slug(title)
		if (heading[1] === '##') {
			laps.push({ id, title })
		}
	}
	return laps
}

let cache: Promise<Post[]> | undefined

/** Every published post, newest first */
export function getPosts(): Promise<Post[]> {
	cache ??= loadPosts()
	return cache
}

async function loadPosts(): Promise<Post[]> {
	const files = (await readdir(POSTS_DIR)).filter((f) => /\.mdx?$/.test(f))
	const posts = await Promise.all(
		files.map(async (file): Promise<Post> => {
			const source = await readFile(path.join(POSTS_DIR, file), 'utf8')
			const match = source.match(FRONT_MATTER)
			if (!match?.[1]) {
				throw new Error(`posts/${file} has no front matter`)
			}
			const meta = parse(match[1]) as PostMeta
			const body = source.slice(match[0].length)
			return {
				...meta,
				date: String(meta.date),
				slug: file.replace(/\.mdx?$/, ''),
				file,
				readingMinutes: readingMinutes(body),
				laps: lapsOf(body),
			}
		})
	)

	return posts
		.filter((p) => SHOW_DRAFTS || !p.draft)
		.sort(
			(a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)
		)
}

/** From the old blog (2005 to 2013), as opposed to written for this one or dev.to */
export const isOldBlog = (post: PostMeta) =>
	Boolean(post.archive) && post.archive?.site !== 'dev.to'

/** The latest runs: posts written for this blog and the dev.to guides, newest first */
export const runsOf = (posts: Post[]) => posts.filter((p) => !isOldBlog(p))

/** One year of the old blog, newest first */
export const sessionOf = (posts: Post[], year: string) =>
	posts.filter((p) => isOldBlog(p) && p.date.startsWith(year))

/** The old blog's years with how many posts each, newest first */
export function sessionYears(posts: Post[]) {
	const counts = new Map<string, number>()
	for (const p of posts.filter(isOldBlog)) {
		const year = p.date.slice(0, 4)
		counts.set(year, (counts.get(year) ?? 0) + 1)
	}
	return [...counts].map(([year, count]) => ({ year, count }))
}

/** The posts a post sits between: its own list (runs, or its year), newest first */
export function neighboursOf(posts: Post[], post: Post) {
	const list = isOldBlog(post)
		? sessionOf(posts, post.date.slice(0, 4))
		: runsOf(posts)
	const i = list.indexOf(post)
	return { newer: list[i - 1], older: list[i + 1], list }
}

/** Markdown to searchable text: keeps link and image text, drops the syntax and the old blog's lost-image notes */
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

/** Every post with its text, newest first: the search page's index, served as /search.json */
export async function getSearchIndex(): Promise<SearchEntry[]> {
	return Promise.all(
		(await getPosts()).map(async (p) => {
			const source = await readFile(path.join(POSTS_DIR, p.file), 'utf8')
			return {
				slug: p.slug,
				title: p.title,
				date: p.date,
				readingMinutes: p.readingMinutes,
				old: isOldBlog(p),
				tags: p.tags ?? [],
				description: p.description,
				text: toPlainText(source.replace(FRONT_MATTER, '')),
			}
		})
	)
}

/** The post's rendered body; only call it with a post from getPosts() */
export async function getPostContent(post: Post) {
	const mod = (await import(`../posts/${post.file}`)) as {
		default: React.ComponentType
	}
	return mod.default
}
