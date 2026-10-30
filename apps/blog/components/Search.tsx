'use client'

import { formatDate, postHref } from 'lib/format'
import { type Hit, loadIndex, queryTerms, search } from 'lib/search'
import { useDeferredValue, useEffect, useRef, useState } from 'react'

type Index = Awaited<ReturnType<typeof loadIndex>>

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** The text with each search term marked */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
	if (terms.length === 0) {
		return text
	}
	const parts = text.split(
		new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'gi')
	)
	// split puts the matches at the odd indexes; each part's offset is its key
	let offset = 0
	return parts.map((part, i) => {
		const at = offset
		offset += part.length
		return i % 2 ? <mark key={at}>{part}</mark> : part
	})
}

/**
 * Searches every post's title, tags, description and text in the browser.
 * The query is kept in the address (?q=) so a search can be shared.
 */
export default function Search({ total }: { total: number }) {
	const [query, setQuery] = useState('')
	const [index, setIndex] = useState<Index>()
	const [failed, setFailed] = useState(false)
	const terms = queryTerms(useDeferredValue(query))
	const input = useRef<HTMLInputElement>(null)

	const load = () => {
		setFailed(false)
		loadIndex()
			.then(setIndex)
			.catch(() => setFailed(true))
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: runs once, on arrival
	useEffect(() => {
		setQuery(new URLSearchParams(location.search).get('q') ?? '')
		input.current?.focus()
		load()
	}, [])

	const change = (value: string) => {
		setQuery(value)
		const url = new URL(location.href)
		if (value.trim()) {
			url.searchParams.set('q', value)
		} else {
			url.searchParams.delete('q')
		}
		history.replaceState(null, '', url)
	}

	const hits: Hit[] = index && terms.length > 0 ? search(index, terms) : []

	return (
		<div className="search">
			<search>
				<form
					className="search-box"
					action="/search/"
					onSubmit={(e) => e.preventDefault()}
				>
					<input
						ref={input}
						type="search"
						name="q"
						value={query}
						onChange={(e) => change(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Escape') {
								change('')
							}
						}}
						placeholder={`Search ${total} posts`}
						aria-label="Search posts"
						aria-controls="search-results"
						aria-keyshortcuts="/"
						autoComplete="off"
					/>
				</form>
			</search>

			<div id="search-results">
				{failed ? (
					<p className="search-note">
						The search index didn't load.{' '}
						<button type="button" className="link-button" onClick={load}>
							Try again
						</button>
					</p>
				) : terms.length === 0 ? (
					<p className="search-note">
						Titles, tags and the full text of every post, from 2005 to now.
						Press <kbd>/</kbd> on any page to jump here.
					</p>
				) : !index ? (
					<p className="search-note">Loading the posts…</p>
				) : (
					<>
						<p className="search-note" aria-live="polite">
							{hits.length === 1 ? '1 result' : `${hits.length} results`}
						</p>
						{hits.length > 0 ? (
							<ol className="results">
								{hits.map(({ post, snippet }) => (
									<li key={post.slug}>
										<a href={postHref(post.slug)} className="result">
											<span className="result-meta">
												{formatDate(post.date)}, {post.readingMinutes} min read
												{post.old ? ', from the old blog' : null}
											</span>
											<span className="result-title cond">
												<Highlight text={post.title} terms={terms} />
											</span>
											<span className="result-text">
												<Highlight
													text={snippet ?? post.description}
													terms={terms}
												/>
											</span>
										</a>
									</li>
								))}
							</ol>
						) : (
							<p className="search-empty">
								Nothing matches “{query.trim()}”. Try fewer words, or one word
								from the title.
							</p>
						)}
					</>
				)}
			</div>
		</div>
	)
}
