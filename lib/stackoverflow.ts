import { cacheLife } from 'next/cache'
import type { StackOverflowUser } from 'types/stackoverflow'

const SO_USER_ID = process.env.SO_USER_ID ?? '66384'

/** The old site's reputation and badges, refreshed every six hours. */
export async function getStackOverflowProfile(): Promise<StackOverflowUser | null> {
	'use cache'
	cacheLife({ stale: 3600, revalidate: 21_600, expire: 86_400 })

	try {
		const res = await fetch(
			`https://api.stackexchange.com/2.3/users/${encodeURIComponent(SO_USER_ID)}?site=stackoverflow`,
			{ signal: AbortSignal.timeout(5000) }
		)
		if (!res.ok) {
			return null
		}
		const data = (await res.json()) as { items?: StackOverflowUser[] }
		return data.items?.[0] ?? null
	} catch {
		return null
	}
}
