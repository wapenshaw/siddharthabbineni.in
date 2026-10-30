import { profile } from 'config/profile'
import { BLOG_URL, SITE_URL } from 'config/site'
import type { Metadata } from 'next'

/**
 * A page's title, description, canonical and share tags. Next.js replaces a
 * parent's openGraph and twitter objects outright rather than merging them,
 * so every page sends the whole set; the picture comes from opengraph-image.
 */
export function pageMetadata({
	title,
	description,
	path,
}: {
	title: string
	description: string
	/** '' for the home page, otherwise '/garage' and so on */
	path: string
}): Metadata {
	const url = `${SITE_URL}${path}`

	return {
		title,
		description,
		alternates: {
			canonical: url,
			types: {
				'application/rss+xml': [
					{
						url: `${BLOG_URL}/feed.xml`,
						title: `Free practice | ${profile.name}`,
					},
				],
			},
		},
		openGraph: {
			title,
			description,
			url,
			siteName: profile.name,
			type: 'profile',
			locale: 'en_US',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			creator: `@${profile.handle}`,
		},
	}
}
