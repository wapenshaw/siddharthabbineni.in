import { postHref, sessionHref } from 'lib/format'
import { getPosts, isThin, sessionYears } from 'lib/posts'
import { SITE_URL } from 'lib/site'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getPosts()
	return [
		{ url: `${SITE_URL}/`, lastModified: posts[0]?.date },
		...sessionYears(posts).map(({ year }) => ({
			url: `${SITE_URL}${sessionHref(year)}`,
		})),
		...posts
			.filter((p) => !isThin(p))
			.map((p) => ({
				url: `${SITE_URL}${postHref(p.slug)}`,
				lastModified: p.date,
			})),
	]
}
