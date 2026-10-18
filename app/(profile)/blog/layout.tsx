import PatchNotes from 'components/Devlog/PatchNotes'
import PostList from 'components/Devlog/PostList'
import { getUpstreamPullRequests } from 'lib/github'
import { getPosts } from 'lib/posts'
import { ViewTransition } from 'react'
import layout from '../layout.module.css'
import styles from './blog.module.css'

/** The list and patch notes stay put while the reader (the page) swaps posts */
export default async function DevlogLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [posts, prs] = await Promise.all([
		getPosts(),
		getUpstreamPullRequests(),
	])

	return (
		// The devlog sits to the right of the profile
		<ViewTransition enter="from-right" exit="to-right" default="none">
			<main className={layout.view}>
				<PostList
					posts={posts.map((p) => ({
						slug: p.slug,
						title: p.title,
						date: p.date,
						readingMinutes: p.readingMinutes,
						site: p.archive?.site,
					}))}
					className={styles.list}
				/>
				{children}
				<PatchNotes prs={prs} className={styles.notes} />
			</main>
		</ViewTransition>
	)
}
