/** The YAML front matter at the top of each content/posts/*.md(x) */
export interface PostMeta {
	title: string
	/** One or two sentences: the list, link previews and the RSS feed use it */
	description: string
	/** Publish date, YYYY-MM-DD */
	date: string
	tags?: string[]
	/** Shown in development only, so a post can be written in the repo before it goes live */
	draft?: boolean
	/** Set on posts brought over from an old blog; they're listed under Archive */
	archive?: {
		/** Where it first appeared, e.g. 'thesid.net' */
		site: string
		/** The original, or its Wayback Machine copy */
		url: string
	}
}

export interface Post extends PostMeta {
	/** The file name without its extension; the post lives at /blog/<slug> */
	slug: string
	/** The file name in content/posts */
	file: string
	readingMinutes: number
}

/** One post in /blog/search.json; the list already has the title and date */
export interface SearchEntry {
	slug: string
	tags: string[]
	description: string
	/** The body as plain text */
	text: string
}
