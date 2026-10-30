import { BLOG_URL } from 'config/site'
import { formatPostDate, getBlogFeed } from 'lib/blog'
import styles from './Press.module.css'

const SHOWN = 3

/**
 * The newest posts as a short feed. Each one opens on the blog, which is its
 * own site with its own look.
 */
export default async function Press() {
	const { runs, earlierCount } = await getBlogFeed()
	const latest = runs.slice(0, SHOWN)
	// written for the blog, as opposed to brought over from dev.to
	const own = runs.filter((p) => !p.firstOn)

	return (
		<main className={`panel ${styles.press}`} aria-labelledby="press-title">
			<div className={styles.head}>
				<h1 id="press-title" className="tab slr" data-colour="blue">
					Press
				</h1>
				<span className={styles.line}>Writing, since 2005</span>
				<a className={`btn btn-carbon sl ${styles.open}`} href={`${BLOG_URL}/`}>
					Open the blog
				</a>
			</div>

			{latest.length === 0 ? (
				<p className={styles.empty}>
					The blog isn’t answering right now. It’s at{' '}
					<a href={`${BLOG_URL}/`}>{BLOG_URL.replace(/^https?:\/\//, '')}</a>.
				</p>
			) : (
				<ol className={styles.posts}>
					{latest.map((post) => (
						<li key={post.slug}>
							<a className={styles.post} href={post.url}>
								{/* the newest has the highest number, like a debrief count */}
								<b className={styles.n}>
									{post.firstOn
										? null
										: String(own.length - own.indexOf(post)).padStart(2, '0')}
								</b>
								<span className={styles.text}>
									<b className={styles.title}>{post.title}</b>
									<span className={styles.desc}>{post.description}</span>
								</span>
								<span className={styles.meta}>
									<span>{formatPostDate(post.date)}</span>
									<span>{post.readingMinutes} min read</span>
								</span>
							</a>
						</li>
					))}
				</ol>
			)}

			<p className={styles.foot}>
				Every post opens on {BLOG_URL.replace(/^https?:\/\//, '')}
				{earlierCount > 0 &&
					`, along with ${earlierCount} posts from my old blog (2005 to 2013)`}
				.
			</p>
		</main>
	)
}
