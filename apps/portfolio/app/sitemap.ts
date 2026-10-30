import { SITE_URL } from 'config/site'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = SITE_URL

	return [
		{
			url: baseUrl,
			changeFrequency: 'weekly',
			priority: 1,
		},
		...['/profile', '/podiums', '/garage'].map((path) => ({
			url: `${baseUrl}${path}`,
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		})),
		{
			url: `${baseUrl}/blog`,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
	]
}
