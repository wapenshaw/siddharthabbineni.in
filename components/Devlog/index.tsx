'use client'

import { profile } from 'config/profile'
import { startTransition, useRef, useState, ViewTransition } from 'react'
import type { DevlogEntry } from 'types/article'
import styles from './Devlog.module.css'

type Props = {
	entries: DevlogEntry[]
	listClassName?: string
	readerClassName?: string
}

const logNumber = (n: number) => `Log ${String(n).padStart(2, '0')}`

/** The post list (left column) and the reader (middle column) share the selection */
export default function Devlog({
	entries,
	listClassName,
	readerClassName,
}: Props) {
	const [selected, setSelected] = useState(entries[0]?.id)
	const scroller = useRef<HTMLDivElement>(null)
	const index = Math.max(
		0,
		entries.findIndex((e) => e.id === selected)
	)
	const post = entries[index]

	const select = (id: string) => {
		startTransition(() => setSelected(id))
		scroller.current?.scrollTo({ top: 0 })
	}

	return (
		<>
			<section
				className={`panel ${styles.list} ${listClassName ?? ''}`}
				aria-labelledby="devlog-title"
			>
				<div className="phead">
					<h2 id="devlog-title" className="label label-hi">
						Devlog
					</h2>
					<span className="label">{entries.length} posts</span>
				</div>
				<ol className={styles.entries}>
					{entries.map((e, i) => (
						<li key={e.id}>
							<button
								type="button"
								className={styles.entry}
								aria-current={i === index ? 'true' : undefined}
								onClick={() => select(e.id)}
							>
								<span className={`disp ${styles.entryN}`}>
									{logNumber(entries.length - i)}
								</span>
								<span className={styles.entryTitle}>{e.title}</span>
								<span className={styles.entryMeta}>
									{e.readable_publish_date} · {e.reading_time_minutes} min
								</span>
							</button>
						</li>
					))}
				</ol>
				<div className={styles.footer}>
					<a
						href={profile.links.devto}
						className="disp"
						target="_blank"
						rel="noopener noreferrer"
					>
						dev.to →
					</a>
				</div>
			</section>

			<article
				className={`panel ${styles.reader} ${readerClassName ?? ''}`}
				aria-labelledby="post-title"
			>
				<div className="phead">
					<span className="label label-hi">
						{post
							? `Reading · ${logNumber(entries.length - index)}`
							: 'Reading'}
					</span>
					{post && (
						<span className="label">
							{post.public_reactions_count} reactions · {post.comments_count}{' '}
							comments
						</span>
					)}
				</div>
				<div ref={scroller} className={styles.scroll}>
					{post ? (
						<ViewTransition key={post.id}>
							<div className={styles.post}>
								<header className={styles.postHead}>
									<p className={styles.meta}>
										{post.readable_publish_date} · {post.reading_time_minutes}{' '}
										min read
									</p>
									<h2 id="post-title" className={`disp ${styles.title}`}>
										{post.title}
									</h2>
									{post.tag_list.length > 0 && (
										<ul className={styles.tags}>
											{post.tag_list.map((t) => (
												<li key={t} className="chip">
													#{t}
												</li>
											))}
										</ul>
									)}
								</header>
								{post.cover_image && (
									<img
										className={styles.cover}
										src={post.cover_image}
										alt=""
										loading="lazy"
									/>
								)}
								{post.body_html ? (
									<div
										className={styles.prose}
										// biome-ignore lint/security/noDangerouslySetInnerHtml: the author's own post, rendered and sanitised by dev.to
										dangerouslySetInnerHTML={{ __html: post.body_html }}
									/>
								) : (
									<p className={styles.prose}>{post.description}</p>
								)}
							</div>
						</ViewTransition>
					) : (
						<p className={styles.empty}>
							No posts could be loaded right now. They are all on{' '}
							<a
								href={profile.links.devto}
								target="_blank"
								rel="noopener noreferrer"
							>
								dev.to
							</a>
							.
						</p>
					)}
				</div>
				{post && (
					<div className={styles.footer}>
						<a
							href={post.url}
							className="disp"
							target="_blank"
							rel="noopener noreferrer"
						>
							Discuss on dev.to →
						</a>
					</div>
				)}
			</article>
		</>
	)
}
