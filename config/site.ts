/** The live site; canonical links and the sitemap always point here */
export const SITE_URL = 'https://www.siddharthabbineni.in'

/**
 * Where this build is served. Share images resolve against it, so staging
 * links preview with staging's own cards.
 */
export const DEPLOY_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL

/**
 * True for staging builds (the deploy workflow sets NEXT_PUBLIC_SITE_URL per
 * branch). Staging must never be indexed and doesn't load analytics.
 */
export const isStaging =
	process.env.AZURE_STATIC_WEB_APPS_ENVIRONMENT === 'staging' ||
	Boolean(process.env.NEXT_PUBLIC_SITE_URL?.includes('staging')) ||
	Boolean(process.env.NEXT_PUBLIC_SITE_URL?.includes('yellow-wave'))
