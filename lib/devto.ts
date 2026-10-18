import { cacheLife } from 'next/cache'
import type { Article } from 'types/article'

const DEVTO_USERNAME = process.env.DEVTO_USERNAME ?? 'wapenshaw'

export async function getArticles(): Promise<Article[]> {
	'use cache'
	cacheLife('hours')

	try {
		const res = await fetch(
			`https://dev.to/api/articles?username=${DEVTO_USERNAME}`
		)
		if (!res.ok) {
			return []
		}
		return (await res.json()) as Article[]
	} catch {
		return []
	}
}
