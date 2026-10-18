import { SITE_URL } from 'config/site'
import { getPosts } from 'lib/posts'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = SITE_URL

	return [
		{
			url: baseUrl,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		...(await getPosts()).map((p) => ({
			url: `${baseUrl}/blog/${p.slug}`,
			lastModified: p.date,
			priority: 0.6,
		})),
	]
}
