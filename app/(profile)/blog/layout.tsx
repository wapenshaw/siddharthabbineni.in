import PostList from 'components/Press/PostList'
import { getPosts } from 'lib/posts'
import styles from './blog.module.css'

/** The list stays put while the reader (the page) swaps posts */
export default async function PressLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const posts = await getPosts()

	return (
		<main className={styles.press}>
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
		</main>
	)
}
