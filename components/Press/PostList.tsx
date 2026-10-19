'use client'

import { formatPostDate, logNumber, postHref } from 'lib/postFormat'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import {
	type KeyboardEvent,
	type ReactNode,
	useDeferredValue,
	useEffect,
	useRef,
	useState,
} from 'react'
import styles from './Press.module.css'
import {
	loadIndex,
	queryTerms,
	type Searchable,
	search,
	toSearchable,
} from './search'

/** What the list needs of a post (the layout trims the rest before it reaches the client) */
export type ListedPost = {
	slug: string
	title: string
	date: string
	readingMinutes: number
	/** The old blog it came from, for archived posts */
	site?: string
}

type View = 'latest' | 'archive'

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
 * The post list (left column): new posts under Latest, posts brought over from
 * old blogs under Archive, grouped by year. It shows the open post's tab.
 * Typing in the search box lists matches from both tabs instead.
 */
export default function PostList({
	posts,
	className,
}: {
	posts: ListedPost[]
	className?: string
}) {
	const latest = posts.filter((p) => !p.site)
	const archive = posts.filter((p) => p.site)
	// /blog itself shows the newest post (an archived one while there are no new ones)
	const segment = useSelectedLayoutSegment()
	const current =
		posts.find((p) => p.slug === segment) ?? latest[0] ?? archive[0]
	const currentView: View = current?.site ? 'archive' : 'latest'

	// follow the open post to its tab whenever it changes
	const [view, setView] = useState<View>(currentView)
	const [shown, setShown] = useState(current?.slug)
	if (current?.slug !== shown) {
		setShown(current?.slug)
		setView(currentView)
	}

	const [query, setQuery] = useState('')
	const [index, setIndex] = useState<Map<string, Searchable>>()
	const [indexFailed, setIndexFailed] = useState(false)
	const terms = queryTerms(useDeferredValue(query))
	const searchRef = useRef<HTMLInputElement>(null)

	// the full text arrives on first focus; titles are searchable before that
	const fetchIndex = () => {
		if (index) {
			return
		}
		loadIndex()
			.then((entries) => {
				setIndex(toSearchable(entries))
				setIndexFailed(false)
			})
			.catch(() => setIndexFailed(true))
	}

	// "/" jumps to the search box, as on GitHub
	useEffect(() => {
		const onKey = (e: globalThis.KeyboardEvent) => {
			const target = e.target as HTMLElement
			if (
				e.key !== '/' ||
				target.isContentEditable ||
				['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
			) {
				return
			}
			e.preventDefault()
			searchRef.current?.focus()
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [])

	const tabs: { id: View; label: string; count: number }[] = [
		{ id: 'latest', label: 'Latest', count: latest.length },
		{ id: 'archive', label: 'Archive', count: archive.length },
	]

	const showTab = (next: View) => {
		setView(next)
		setQuery('')
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
			e.preventDefault()
			const next = view === 'latest' ? 'archive' : 'latest'
			showTab(next)
			document.getElementById(`devlog-tab-${next}`)?.focus()
		}
	}

	const labelOf = (p: ListedPost) =>
		p.site ?? logNumber(latest.length - latest.indexOf(p))

	const entry = (p: ListedPost, snippet?: ReactNode) => (
		<li key={p.slug}>
			<Link
				href={postHref(p.slug)}
				// posts are static, so fetch the whole page ahead, not just the shell
				prefetch
				className={styles.entry}
				aria-current={p.slug === current?.slug ? 'page' : undefined}
			>
				<span className={styles.entryN}>{labelOf(p)}</span>
				<span className={styles.entryTitle}>
					<Highlight text={p.title} terms={terms} />
				</span>
				{snippet && <span className={styles.snippet}>{snippet}</span>}
				<span className={styles.entryMeta}>
					{formatPostDate(p.date)}, {p.readingMinutes} min
				</span>
			</Link>
		</li>
	)

	const searching = terms.length > 0
	const bySlug = new Map(posts.map((p) => [p.slug, p]))
	const hits = searching ? search(posts, index, terms) : []

	return (
		<section
			className={`panel ${styles.list} ${className ?? ''}`}
			aria-labelledby="press-title"
		>
			<div className={styles.tabbar}>
				<h2 id="press-title" className="tab slr" data-colour="blue">
					Press
				</h2>
				<div
					className={styles.tabs}
					role="tablist"
					aria-label="Posts"
					onKeyDown={onKeyDown}
				>
					{tabs.map((t) => (
						<button
							key={t.id}
							type="button"
							role="tab"
							id={`devlog-tab-${t.id}`}
							aria-selected={!searching && view === t.id}
							aria-controls="devlog-entries"
							tabIndex={view === t.id ? 0 : -1}
							className={styles.tab}
							onClick={() => showTab(t.id)}
						>
							{t.label} <span className={styles.tabCount}>{t.count}</span>
						</button>
					))}
				</div>
			</div>

			<search className={styles.search}>
				<input
					ref={searchRef}
					type="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={fetchIndex}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							setQuery('')
						}
					}}
					placeholder={`Search ${posts.length} posts`}
					aria-label="Search posts"
					aria-controls="devlog-entries"
					aria-keyshortcuts="/"
					className={styles.searchInput}
				/>
			</search>

			{searching ? (
				<section
					id="devlog-entries"
					aria-label="Search results"
					className={styles.entries}
				>
					<p className={styles.year} aria-live="polite">
						{hits.length === 1 ? '1 result' : `${hits.length} results`}
						{indexFailed && ', titles only'}
					</p>
					{hits.length > 0 ? (
						<ol className={styles.group}>
							{hits.map((hit) => {
								const p = bySlug.get(hit.slug)
								return (
									p &&
									entry(
										p,
										hit.snippet && (
											<Highlight text={hit.snippet} terms={terms} />
										)
									)
								)
							})}
						</ol>
					) : (
						<p className={styles.empty}>Nothing matches “{query.trim()}”.</p>
					)}
				</section>
			) : (
				<div
					id="devlog-entries"
					role="tabpanel"
					aria-labelledby={`devlog-tab-${view}`}
					className={styles.entries}
				>
					{view === 'latest' &&
						(latest.length > 0 ? (
							<ol className={styles.group}>{latest.map((p) => entry(p))}</ol>
						) : (
							<p className={styles.empty}>
								Nothing new yet. The archive has {archive.length} older posts.
							</p>
						))}
					{view === 'archive' &&
						[...Map.groupBy(archive, (p) => p.date.slice(0, 4))].map(
							([year, group]) => (
								<section key={year} aria-label={year}>
									<h3 className={styles.year}>{year}</h3>
									<ol className={styles.group}>{group.map((p) => entry(p))}</ol>
								</section>
							)
						)}
				</div>
			)}

			<div className={styles.footer}>
				<a href="/blog/feed.xml">RSS feed</a>
			</div>
		</section>
	)
}
