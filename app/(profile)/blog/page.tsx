import devlog from 'components/Press/Press.module.css'
import Reader from 'components/Press/Reader'
import { profile } from 'config/profile'
import { getPosts, isArchived } from 'lib/posts'
import type { Metadata } from 'next'
import styles from './blog.module.css'

export const metadata: Metadata = {
	title: `Press | ${profile.name}`,
	description: `Articles and guides by ${profile.name}`,
	alternates: {
		canonical: '/blog',
	},
}

/** Opens on the newest post, or the newest archived one while there are no new ones */
export default async function PressPage() {
	const posts = await getPosts()
	const latest = posts.find((p) => !isArchived(p)) ?? posts[0]

	if (!latest) {
		return (
			<section className={`panel ${styles.reader}`}>
				<p className={devlog.empty}>No posts yet.</p>
			</section>
		)
	}
	return <Reader posts={posts} slug={latest.slug} className={styles.reader} />
}
