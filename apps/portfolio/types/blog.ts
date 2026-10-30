/** One of the blog's latest runs, as its /posts.json lists it */
export interface BlogPost {
	slug: string
	title: string
	description: string
	/** YYYY-MM-DD */
	date: string
	readingMinutes: number
	url: string
	/** Set on posts that first appeared somewhere else, like dev.to */
	firstOn?: string
}

export interface BlogFeed {
	/** Newest first */
	runs: BlogPost[]
	/** Posts from the old blog (2005 to 2013) */
	earlierCount: number
}
