import type { SearchEntry } from 'types/post'

/** A post's search fields, lowercased once when the index arrives */
export type Searchable = {
	tags: string
	description: string
	text: string
	/** The original text, for snippets */
	raw: string
}

export type Hit = { slug: string; snippet?: string }

const SNIPPET_RADIUS = 60

let request: Promise<SearchEntry[]> | undefined

/** Fetches /blog/search.json once per page load; a failed fetch can be retried */
export function loadIndex() {
	request ??= fetch('/blog/search.json')
		.then((r) => {
			if (!r.ok) {
				throw new Error(`search.json: ${r.status}`)
			}
			return r.json() as Promise<SearchEntry[]>
		})
		.catch((error: unknown) => {
			request = undefined
			throw error
		})
	return request
}

export const toSearchable = (entries: SearchEntry[]) =>
	new Map(
		entries.map((e): [string, Searchable] => [
			e.slug,
			{
				tags: e.tags.join(' ').toLowerCase(),
				description: e.description.toLowerCase(),
				text: e.text.toLowerCase(),
				raw: e.text,
			},
		])
	)

export const queryTerms = (query: string) =>
	query.toLowerCase().split(/\s+/).filter(Boolean)

/**
 * Posts with every term somewhere in them, best first: a title match counts
 * most, then tags, the description and the body. Ties keep the list's order
 * (newest first). Until the index loads, only titles are searched.
 */
export function search(
	posts: { slug: string; title: string }[],
	index: Map<string, Searchable> | undefined,
	terms: string[]
): Hit[] {
	const scored: (Hit & { score: number })[] = []
	for (const post of posts) {
		const title = post.title.toLowerCase()
		const fields = index?.get(post.slug)
		let score = 0
		let bodyTerm: string | undefined
		for (const term of terms) {
			if (title.includes(term)) {
				score += 10
			} else if (fields?.tags.includes(term)) {
				score += 6
			} else if (fields?.description.includes(term)) {
				score += 3
			} else if (fields?.text.includes(term)) {
				score += 1
				bodyTerm ??= term
			} else {
				score = 0
				break
			}
		}
		if (score === 0) {
			continue
		}
		scored.push({
			slug: post.slug,
			score,
			snippet: fields && bodyTerm ? snippet(fields, bodyTerm) : undefined,
		})
	}
	return scored.sort((a, b) => b.score - a.score)
}

/** A few words either side of the first place the term appears in the body */
function snippet(fields: Searchable, term: string) {
	const at = fields.text.indexOf(term)
	const start = Math.max(0, at - SNIPPET_RADIUS)
	const end = Math.min(fields.raw.length, at + term.length + SNIPPET_RADIUS)
	let words = fields.raw.slice(start, end)
	// drop the half words at the cut ends
	if (start > 0) {
		words = words.replace(/^\S*\s/, '')
	}
	if (end < fields.raw.length) {
		words = words.replace(/\s\S*$/, '')
	}
	return `${start > 0 ? '…' : ''}${words.trim()}${end < fields.raw.length ? '…' : ''}`
}
