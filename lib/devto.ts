import { cacheLife } from 'next/cache'
import type { Article, DevlogEntry } from 'types/article'

const DEVTO_USERNAME = process.env.DEVTO_USERNAME ?? 'wapenshaw'
const API = 'https://dev.to/api'

/** How many posts the devlog loads in full */
const DEVLOG_POSTS = 10

export async function getArticles(): Promise<Article[]> {
	'use cache'
	cacheLife('hours')

	try {
		const res = await fetch(`${API}/articles?username=${DEVTO_USERNAME}`)
		if (!res.ok) {
			return []
		}
		return (await res.json()) as Article[]
	} catch {
		return []
	}
}

async function getBodyHtml(id: string): Promise<string> {
	try {
		const res = await fetch(`${API}/articles/${id}`)
		if (!res.ok) {
			return ''
		}
		const article = (await res.json()) as { body_html?: string }
		// dev.to's old Cloudinary image proxy now 404s; the original uploads still load
		return (article.body_html ?? '').replace(
			/https:\/\/res\.cloudinary\.com\/practicaldev\/image\/fetch\/[^"\s]*?\/(https?:\/\/[^"\s]+)/g,
			'$1'
		)
	} catch {
		return ''
	}
}

/** The latest posts with their full body, so the devlog can show them in place */
export async function getDevlog(): Promise<DevlogEntry[]> {
	'use cache'
	cacheLife('hours')

	const articles = (await getArticles()).slice(0, DEVLOG_POSTS)
	return Promise.all(
		articles.map(async (a) => ({ ...a, body_html: await getBodyHtml(a.id) }))
	)
}
