/** The live blog; canonical links and the sitemap always point here */
export const SITE_URL = 'https://blog.siddharthabbineni.in'

/** The Blog in the JSON-LD; each post says it is part of it */
export const BLOG_ID = `${SITE_URL}/#blog`

/** Where this build is served (the deploy workflow sets it per branch) */
export const DEPLOY_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL

/** The F1 dashboard; staging builds link to staging */
export const PORTFOLIO_URL =
	process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? 'https://www.siddharthabbineni.in'

/** The Person in the portfolio's JSON-LD; posts name it as their author */
export const PERSON_ID = 'https://www.siddharthabbineni.in/#person'

/** Staging must never be indexed */
export const isStaging = DEPLOY_URL.includes('staging')

export const BLOG_NAME = 'Free practice'
export const AUTHOR = 'Siddharth Abbineni'
export const DESCRIPTION =
	"Siddharth Abbineni's blog. Where I try things out: side projects, fixes, and what I learn building cloud platforms."

export const SOCIAL = {
	github: 'https://github.com/wapenshaw',
	x: 'tHeSiD',
}
