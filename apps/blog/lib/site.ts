/** The live blog; canonical links and the sitemap always point here */
export const SITE_URL = 'https://blog.siddharthabbineni.in'

/** Where this build is served (the deploy workflow sets it per branch) */
export const DEPLOY_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL

/** The F1 dashboard; staging builds link to staging */
export const PORTFOLIO_URL =
	process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? 'https://www.siddharthabbineni.in'

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
