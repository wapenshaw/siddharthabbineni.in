/** The live site; canonical links and the sitemap always point here */
export const SITE_URL = 'https://www.siddharthabbineni.in'

/** The Person in the JSON-LD; the blog's posts point their author here */
export const PERSON_ID = `${SITE_URL}/#person`

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
	Boolean(process.env.NEXT_PUBLIC_SITE_URL?.includes('staging'))

/**
 * The blog, a separate site (apps/blog). Staging builds point at the
 * staging blog, and development at the blog's dev server.
 */
export const BLOG_URL =
	process.env.NEXT_PUBLIC_BLOG_URL ?? 'https://blog.siddharthabbineni.in'
