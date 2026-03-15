import { NextResponse } from 'next/server'
import type { Article } from 'types/article'

const DEVTO_USERNAME = process.env.DEVTO_USERNAME ?? 'wapenshaw'

/** Cache this route's response for 6 hours */
export const revalidate = 21600

export async function GET() {
	const res = await fetch(
		`https://dev.to/api/articles?username=${DEVTO_USERNAME}`,
		{ next: { revalidate: 21_600 } }
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
