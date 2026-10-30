/** One post in /search.json, built by getSearchIndex in lib/posts.ts */
export interface SearchEntry {
	slug: string
	title: string
	date: string
	readingMinutes: number
	/** From the old blog (2005 to 2013) */
	old: boolean
	tags: string[]
	description: string
	/** The body as plain text */
	text: string
}

/** A post's fields, lowercased once when the index arrives */
type Searchable = SearchEntry & {
	lower: { title: string; tags: string; description: string; text: string }
}

export type Hit = { post: SearchEntry; snippet?: string }

const SNIPPET_RADIUS = 70

let request: Promise<Searchable[]> | undefined

/** Fetches /search.json once per page load; a failed fetch can be retried */
export function loadIndex() {
	request ??= fetch('/search.json')
		.then((r) => {
			if (!r.ok) {
				throw new Error(`search.json: ${r.status}`)
			}
			return r.json() as Promise<SearchEntry[]>
		})
		.then((entries) =>
			entries.map((e) => ({
				...e,
				lower: {
					title: e.title.toLowerCase(),
					tags: e.tags.join(' ').toLowerCase(),
					description: e.description.toLowerCase(),
					text: e.text.toLowerCase(),
				},
			}))
		)
		.catch((error: unknown) => {
			request = undefined
			throw error
		})
	return request
}

export const queryTerms = (query: string) =>
	query.toLowerCase().split(/\s+/).filter(Boolean)

/**
 * Posts with every term somewhere in them, best first: a title match counts
 * most, then tags, the description and the body. Ties keep the index's order
 * (newest first).
 */
export function search(index: Searchable[], terms: string[]): Hit[] {
	const scored: (Hit & { score: number })[] = []
	for (const post of index) {
		let score = 0
		let bodyTerm: string | undefined
		for (const term of terms) {
			if (post.lower.title.includes(term)) {
				score += 10
			} else if (post.lower.tags.includes(term)) {
				score += 6
			} else if (post.lower.description.includes(term)) {
				score += 3
			} else if (post.lower.text.includes(term)) {
				score += 1
				bodyTerm ??= term
			} else {
				score = 0
				break
			}
		}
		if (score > 0) {
			scored.push({
				post,
				score,
				snippet: bodyTerm && snippet(post, bodyTerm),
			})
		}
	}
	return scored.sort((a, b) => b.score - a.score)
}

/** A few words either side of the first place the term appears in the body */
function snippet(post: Searchable, term: string) {
	const at = post.lower.text.indexOf(term)
	const start = Math.max(0, at - SNIPPET_RADIUS)
	const end = Math.min(post.text.length, at + term.length + SNIPPET_RADIUS)
	let words = post.text.slice(start, end)
	// drop the half words at the cut ends
	if (start > 0) {
		words = words.replace(/^\S*\s/, '')
	}
	if (end < post.text.length) {
		words = words.replace(/\s\S*$/, '')
	}
	return `${start > 0 ? '…' : ''}${words.trim()}${end < post.text.length ? '…' : ''}`
}
