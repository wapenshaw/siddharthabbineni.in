/** The live site; canonical links and the sitemap always point here */
export const SITE_URL = 'https://www.siddharthabbineni.in'

/** The Person in the JSON-LD; the blog's posts point their author here */
export const PERSON_ID = `${SITE_URL}/#person`

/** Where this build is served. Share images resolve against it */
export const DEPLOY_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL

/** The blog, a separate site (apps/blog); development points at its dev server */
export const BLOG_URL =
	process.env.NEXT_PUBLIC_BLOG_URL ?? 'https://blog.siddharthabbineni.in'
