import { formatPostDate, logNumber, postHref } from 'lib/postFormat'
import { getPostContent, isArchived } from 'lib/posts'
import Link from 'next/link'
import { ViewTransition } from 'react'
import type { Post } from 'types/post'
import styles from './Press.module.css'
import ReaderScroll from './ReaderScroll'

/**
 * The open post (middle column). Older/Newer stay within its own list, so the
 * archive and the devlog page through separately.
 */
export default async function Reader({
	posts,
	slug,
	className,
}: {
	posts: Post[]
	slug: string
	className?: string
}) {
	const post = posts.find((p) => p.slug === slug)
	if (!post) {
		return null
	}
	const list = posts.filter((p) => isArchived(p) === isArchived(post))
	const index = list.indexOf(post)
	const Content = await getPostContent(post)
	const newer = list[index - 1]
	const older = list[index + 1]

	return (
		<article
			className={`panel ${styles.reader} ${className ?? ''}`}
			aria-labelledby="post-title"
		>
			<div className={styles.readerHead}>
				<span className="tab slr" data-colour="blue">
					{post.archive
						? `Archive, ${post.archive.site}`
						: logNumber(list.length - index)}
				</span>
				<span className={styles.readTime}>{post.readingMinutes} min read</span>
				{/* once the post's own title has scrolled away */}
				<span className={styles.miniTitle} aria-hidden="true">
					{post.title}
				</span>
				<span className={styles.progress} aria-hidden="true" />
			</div>
			<ReaderScroll key={post.slug} className={styles.scroll}>
				<ViewTransition key={post.slug}>
					<div className={styles.post}>
						<header className={styles.postHead}>
							<p className={styles.meta}>
								<time dateTime={post.date}>{formatPostDate(post.date)}</time>
								{post.draft && ', draft'}
							</p>
							<h1 id="post-title" className={styles.title}>
								{post.title}
							</h1>
							{post.tags && post.tags.length > 0 && (
								<ul className={styles.tags}>
									{post.tags.map((t) => (
										<li key={t} className="chip sl">
											#{t}
										</li>
									))}
								</ul>
							)}
						</header>
						<div className={styles.prose}>
							<Content />
						</div>
						{post.archive && (
							<p className={styles.origin}>
								First published on{' '}
								<a
									href={post.archive.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{post.archive.site}
								</a>
								.
							</p>
						)}
					</div>
				</ViewTransition>
			</ReaderScroll>
			{(older || newer) && (
				<nav className={`${styles.footer} ${styles.pager}`} aria-label="Posts">
					{older && (
						<Link
							href={postHref(older.slug)}
							prefetch
							className="btn sl"
							rel="prev"
						>
							Older
						</Link>
					)}
					{newer && (
						<Link
							href={postHref(newer.slug)}
							prefetch
							className={`btn btn-carbon sl ${styles.newer}`}
							rel="next"
						>
							Newer
						</Link>
					)}
				</nav>
			)}
		</article>
	)
}

/** The reader's frame while a post loads */
export function ReaderSkeleton({ className }: { className?: string }) {
	return (
		<article className={`panel ${styles.reader} ${className ?? ''}`}>
			<div className={styles.readerHead}>
				<span className="tab slr" data-colour="blue">
					Loading
				</span>
			</div>
		</article>
	)
}
