import { cacheLife } from 'next/cache'
import type { PullRequest } from 'types/github'

export const GITHUB_USER = process.env.GITHUB_USER ?? 'wapenshaw'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

interface SearchItem {
	number: number
	title: string
	html_url: string
	repository_url: string
	state: 'open' | 'closed'
	created_at: string
	pull_request?: { merged_at: string | null }
}

/**
 * Recent PRs to other people's repos. Closed-unmerged ones are left out.
 * Unauthenticated search allows 10 calls a minute, far above one an hour,
 * so GITHUB_TOKEN is optional. A failure is cached for minutes, not hours.
 */
export async function getUpstreamPullRequests(): Promise<PullRequest[]> {
	'use cache'

	const q = encodeURIComponent(
		`is:pr author:${GITHUB_USER} -user:${GITHUB_USER}`
	)
	try {
		const res = await fetch(
			`https://api.github.com/search/issues?q=${q}&sort=created&order=desc&per_page=20`,
			{
				headers: {
					Accept: 'application/vnd.github+json',
					'X-GitHub-Api-Version': '2022-11-28',
					...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
				},
			}
		)
		if (!res.ok) {
			console.error(`[GitHub] search returned ${res.status}`)
			cacheLife('minutes')
			return []
		}
		const data = (await res.json()) as { items?: SearchItem[] }
		cacheLife('hours')
		return (data.items ?? [])
			.filter((item) => item.state === 'open' || item.pull_request?.merged_at)
			.slice(0, 10)
			.map((item) => ({
				repo: item.repository_url.replace('https://api.github.com/repos/', ''),
				number: item.number,
				title: item.title,
				url: item.html_url,
				state: item.state === 'open' ? 'open' : 'merged',
				date: item.pull_request?.merged_at ?? item.created_at,
			}))
	} catch (e) {
		console.error('[GitHub] search error:', e)
		cacheLife('minutes')
		return []
	}
}
