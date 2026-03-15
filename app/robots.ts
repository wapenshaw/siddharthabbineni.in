import type { MetadataRoute } from 'next'

const isStaging = process.env.AZURE_STATIC_WEB_APPS_ENVIRONMENT === 'staging'
	|| process.env.NEXT_PUBLIC_SITE_URL?.includes('staging')
	|| process.env.NEXT_PUBLIC_SITE_URL?.includes('yellow-wave')

export default function robots(): MetadataRoute.Robots {
	if (isStaging) {
		return {
			rules: {
				userAgent: '*',
				disallow: '/',
			},
		}
	}

	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: 'https://www.siddharthabbineni.in/sitemap.xml',
	}
}
