import { BLOG_URL } from 'config/site'
import { cacheLife } from 'next/cache'
import type { BlogFeed } from 'types/blog'

const NO_FEED: BlogFeed = { runs: [], earlierCount: 0 }

/**
 * The blog's latest runs, from its /posts.json. A failure is cached for
 * minutes, not hours, so a blog deploy that's still going doesn't stick.
 */
export async function getBlogFeed(): Promise<BlogFeed> {
	'use cache'

	try {
		const res = await fetch(`${BLOG_URL}/posts.json`)
		if (!res.ok) {
			console.error(`[Blog] posts.json returned ${res.status}`)
			cacheLife('minutes')
			return NO_FEED
		}
		cacheLife('hours')
		return (await res.json()) as BlogFeed
	} catch (e) {
		console.error('[Blog] posts.json error:', e)
		cacheLife('minutes')
		return NO_FEED
	}
}

/** A post's page on the blog (slugs are file names, so never contain a slash) */
export const blogPostUrl = (slug: string) => `${BLOG_URL}/${slug}/`

const dateFormat = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC',
})

/** '2020-07-10' → '10 Jul 2020' */
export const formatPostDate = (date: string) =>
	dateFormat.format(new Date(`${date}T00:00:00Z`))
