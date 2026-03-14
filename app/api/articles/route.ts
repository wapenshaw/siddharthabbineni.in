import { NextResponse } from 'next/server'
import type { Article } from 'types/article'

const DEVTO_USERNAME = process.env.DEVTO_USERNAME ?? 'wapenshaw'

export async function GET() {
	const res = await fetch(
		`https://dev.to/api/articles?username=${DEVTO_USERNAME}`,
		{ next: { revalidate: 3600 } }
	)

	if (!res.ok) {
		return NextResponse.json(
			{ error: 'Failed to fetch articles' },
			{ status: res.status }
		)
	}

	const articles: Article[] = await res.json()
	return NextResponse.json(articles)
}
