import type { Metadata } from 'next'
import { Article } from 'types/article'
import BlogList from './BlogList'

const DEVTO_USERNAME = process.env.DEVTO_USERNAME ?? 'wapenshaw'

export const revalidate = 3600
export const dynamic = 'force-static'

async function getArticles(): Promise<Article[]> {
	const res = await fetch(
		`https://dev.to/api/articles?username=${DEVTO_USERNAME}`,
		{ next: { revalidate } }
	)
	return res.json()
}

export const metadata: Metadata = {
	title: 'Blog — Siddharth Abbineni',
	description: 'Articles and guides by Siddharth Abbineni',
}

export default async function BlogPage() {
	const articles = await getArticles()
	return <BlogList articles={articles} />
}
