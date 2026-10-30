import type { Metadata } from 'next'
import {
	AUTHOR,
	BLOG_NAME,
	PERSON_ID,
	PORTFOLIO_URL,
	SITE_URL,
	SOCIAL,
} from './site'

/** The blog's share card (app/og.png) */
const SHARE_IMAGE = {
	url: '/og.png',
	width: 1200,
	height: 630,
	alt: `${BLOG_NAME}, the blog of ${AUTHOR}`,
}

/** Me in JSON-LD, pointing at the Person the portfolio describes in full */
export const AUTHOR_LD = {
	'@type': 'Person',
	'@id': PERSON_ID,
	name: AUTHOR,
	url: PORTFOLIO_URL,
}

/**
 * A page's description, canonical and share tags. Next.js replaces the
 * layout's openGraph and twitter objects outright rather than merging them,
 * so every page sends the whole set.
 */
export function pageMetadata({
	title,
	description,
	path,
	image = SHARE_IMAGE,
	article,
}: {
	title: string
	description: string
	/** From the site root, with its trailing slash: '/', '/search/' */
	path: string
	image?: typeof SHARE_IMAGE
	article?: { publishedTime: string; tags?: string[] }
}): Metadata {
	const url = `${SITE_URL}${path}`

	return {
		title,
		description,
		alternates: {
			canonical: url,
			types: {
				'application/rss+xml': [
					{ url: '/feed.xml', title: `${BLOG_NAME} | ${AUTHOR}` },
				],
			},
		},
		openGraph: {
			title,
			description,
			url,
			siteName: BLOG_NAME,
			locale: 'en_US',
			images: [image],
			...(article
				? { type: 'article', authors: [AUTHOR], ...article }
				: { type: 'website' }),
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			creator: `@${SOCIAL.x}`,
			images: [image],
		},
	}
}
