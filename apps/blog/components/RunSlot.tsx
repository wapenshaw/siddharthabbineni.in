import { formatDate, postHref, runType } from 'lib/format'
import type { Post } from 'lib/posts'

/** One post in the grid: a painted box with its position, P1 the newest */
export default function RunSlot({ post, pos }: { post: Post; pos: number }) {
	return (
		<li className="slot">
			<p className="slot-pos cond">
				<span className={pos === 1 ? 'newest' : undefined}>P{pos}</span>
				<span>{runType(post)}</span>
			</p>
			<h3 className="cond">
				<a href={postHref(post.slug)}>{post.title}</a>
			</h3>
			<p className="desc">{post.description}</p>
			<p className="meta">
				{formatDate(post.date)}, {post.readingMinutes} min read
				{post.archive ? `, first on ${post.archive.site}` : null}
			</p>
		</li>
	)
}
