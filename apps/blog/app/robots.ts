import { isStaging, SITE_URL } from 'lib/site'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
	// Staging lets crawlers in so they see its noindex header (the deploy
	// workflow); a Disallow here would hide that
	return {
		rules: { userAgent: '*', allow: '/' },
		...(!isStaging && { sitemap: `${SITE_URL}/sitemap.xml` }),
	}
}
