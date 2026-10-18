import Devlog from 'components/Devlog'
import PatchNotes from 'components/Devlog/PatchNotes'
import { profile } from 'config/profile'
import { getDevlog } from 'lib/devto'
import { getUpstreamPullRequests } from 'lib/github'
import type { Metadata } from 'next'
import { ViewTransition } from 'react'
import layout from '../layout.module.css'
import styles from './blog.module.css'

export const metadata: Metadata = {
	title: `Devlog | ${profile.name}`,
	description: `Articles and guides by ${profile.name}`,
	alternates: {
		canonical: '/blog',
	},
}

export default async function DevlogPage() {
	const [entries, prs] = await Promise.all([
		getDevlog(),
		getUpstreamPullRequests(),
	])

	return (
		// The devlog sits to the right of the profile
		<ViewTransition enter="from-right" exit="to-right" default="none">
			<main className={layout.view}>
				<Devlog
					entries={entries}
					listClassName={styles.list}
					readerClassName={styles.reader}
				/>
				<PatchNotes prs={prs} className={styles.notes} />
			</main>
		</ViewTransition>
	)
}
