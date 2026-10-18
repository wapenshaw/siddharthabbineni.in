import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://www.siddharthabbineni.in'

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
	]
}
