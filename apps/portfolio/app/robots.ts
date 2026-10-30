import { isStaging, SITE_URL } from 'config/site'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	// Staging lets crawlers in so they see its noindex header (next.config.ts and
	// the deploy workflow); a Disallow here would hide that and URLs found through
	// links could still be listed
	if (isStaging) {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
			},
		}
	}

	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
	}
}
