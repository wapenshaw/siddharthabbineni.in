/**
 * Copies the blog's own posts to dev.to, one way: a new post is published
 * there, a changed post is updated, and nothing on dev.to is ever read back
 * into the blog. Each copy names the blog as its canonical URL, which is also
 * how a post finds its copy on the next run, so no ids are kept in the repo.
 *
 *   DEV_TO_PUBLISH_KEY=... npm run devto        sync
 *   npm run devto -- --dry-run                  show what would change
 *
 * The deploy workflow runs it after the blog is live, so the images and the
 * cover it links to are already there.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { getPosts, type Post } from '../lib/posts.ts'

const BLOG = 'https://blog.siddharthabbineni.in'
const API = 'https://dev.to/api'
const KEY = process.env.DEV_TO_PUBLISH_KEY
const DRY_RUN = process.argv.includes('--dry-run') || !KEY
const FRONT_MATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/

interface Article {
	title: string
	body_markdown: string
	description: string
	tags: string[]
	canonical_url: string
	main_image: string
}

interface DevArticle {
	id: number
	title: string
	body_markdown: string
	description: string
	tag_list: string[]
	canonical_url: string | null
	url: string
}

/** dev.to takes four tags, letters and numbers only */
const tagsFor = (post: Post) =>
	[
		...new Set(
			(post.tags ?? []).map((t) => t.toLowerCase().replace(/[^a-z0-9]/g, ''))
		),
	]
		.filter(Boolean)
		.slice(0, 4)
		.sort()

/** The post as dev.to wants it: absolute links, videos as embeds, a link home */
async function articleFor(post: Post): Promise<Article> {
	const source = await readFile(path.join('posts', post.file), 'utf8')
	const url = `${BLOG}/${post.slug}/`
	let inCode = false
	const body = source
		.replace(FRONT_MATTER, '')
		.split(/\r?\n/)
		.map((line) => {
			if (/^\s*(```|~~~)/.test(line)) {
				inCode = !inCode
			}
			if (inCode) {
				return line
			}
			return (
				line
					// [▶ Title](youtube link) is an embedded video on the blog
					.replace(/^\s*\[▶[^\]]*\]\((https?:[^)\s]+)\)\s*$/, '{% embed $1 %}')
					.replace(/\]\((\/[^)\s]*)/g, `](${BLOG}$1`)
			)
		})
		.join('\n')
		.trim()

	return {
		title: post.title,
		body_markdown: `${body}\n\n---\n\n*First posted on my blog, [Free practice](${url}).*`,
		description: post.description,
		tags: tagsFor(post),
		canonical_url: url,
		main_image: `${url}og.png`,
	}
}

const wait = (seconds: number) =>
	new Promise((resolve) => setTimeout(resolve, seconds * 1000))

async function api<T>(
	route: string,
	init?: RequestInit,
	retries = 3
): Promise<T> {
	const res = await fetch(`${API}${route}`, {
		...init,
		headers: {
			'api-key': KEY ?? '',
			accept: 'application/vnd.forem.api-v1+json',
			'content-type': 'application/json',
			'user-agent': 'blog.siddharthabbineni.in sync',
		},
	})
	// dev.to's write limit is tight; it says how long to wait, so wait and go again
	if (res.status === 429 && retries > 0) {
		const seconds = Number(res.headers.get('retry-after')) || 30
		console.log(`           rate limited, trying again in ${seconds + 1} s`)
		await wait(seconds + 1)
		return api<T>(route, init, retries - 1)
	}
	if (!res.ok) {
		throw new Error(
			`${init?.method ?? 'GET'} ${route}: ${res.status} ${await res.text()}`
		)
	}
	return res.json() as Promise<T>
}

const normalise = (text: string) =>
	text.replace(FRONT_MATTER, '').replace(/\r\n/g, '\n').trim()

/** The fields this script owns; cover images are rehosted by dev.to, so they're left out */
const isSame = (mine: Article, theirs: DevArticle) =>
	mine.title === theirs.title &&
	mine.description === theirs.description &&
	mine.tags.join() === [...theirs.tag_list].sort().join() &&
	normalise(mine.body_markdown) === normalise(theirs.body_markdown)

// written for this blog: not the old blog's posts, and not the ones that started on dev.to
const posts = (await getPosts()).filter((p) => !p.archive)
const existing = KEY
	? await api<DevArticle[]>('/articles/me/all?per_page=1000')
	: []
const byCanonical = new Map(existing.map((a) => [a.canonical_url, a]))

let changed = 0
for (const post of posts) {
	const article = await articleFor(post)
	const copy = byCanonical.get(article.canonical_url)

	if (copy && isSame(article, copy)) {
		console.log(`unchanged  ${post.slug}`)
		continue
	}
	console.log(
		`${copy ? 'update' : 'publish'}${DRY_RUN ? ' (dry run)' : ''}  ${post.slug}`
	)
	if (DRY_RUN) {
		continue
	}
	// an update leaves published alone, so a post unpublished on dev.to stays that way
	const saved = copy
		? await api<DevArticle>(`/articles/${copy.id}`, {
				method: 'PUT',
				body: JSON.stringify({ article }),
			})
		: await api<DevArticle>('/articles', {
				method: 'POST',
				body: JSON.stringify({ article: { ...article, published: true } }),
			})
	console.log(`           ${saved.url}`)
	changed++
	// dev.to allows about one new post every 30 seconds
	await wait(30)
}

console.log(
	DRY_RUN
		? `Dry run${KEY ? '' : ' without DEV_TO_PUBLISH_KEY, so every post shows as new'}; nothing was sent.`
		: `${changed} of ${posts.length} posts sent to dev.to.`
)
