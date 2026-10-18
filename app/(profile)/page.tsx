import Campaign from 'components/Campaign'
import SidePanel from 'components/SidePanel'
import CharacterBuild from 'components/SidePanel/CharacterBuild'
import PrTicker from 'components/SidePanel/PrTicker'
import SideQuests from 'components/SidePanel/SideQuests'
import TrophyCabinet from 'components/TrophyCabinet'
import { profile } from 'config/profile'
import { getUpstreamPullRequests } from 'lib/github'
import { getCampaign } from 'lib/timeline'
import { ViewTransition } from 'react'
import layout from './layout.module.css'
import styles from './page.module.css'

export default async function Home() {
	const [{ chapters, axis }, prs] = await Promise.all([
		getCampaign(),
		getUpstreamPullRequests(),
	])

	return (
		// The devlog sits to the right of the profile, so the profile leaves and returns on the left
		<ViewTransition enter="from-left" exit="to-left" default="none">
			<main className={`${layout.view} ${styles.view}`}>
				<Campaign
					className={styles.campaign}
					chapters={chapters}
					axis={axis}
					since={profile.startYear}
				/>
				<SidePanel
					className={styles.side}
					build={<CharacterBuild />}
					quests={<SideQuests />}
					footer={<PrTicker prs={prs} />}
				/>
				<TrophyCabinet className={styles.trophies} />
				{/* Tall screens only; shorter ones show side quests as a tab instead */}
				<section
					className={`panel ${styles.quests}`}
					aria-labelledby="quests-title"
				>
					<div className="phead">
						<h2 id="quests-title" className="label label-hi">
							Side quests
						</h2>
						<span className="label">Personal projects</span>
					</div>
					<SideQuests layout="row" />
					<PrTicker prs={prs} />
				</section>
			</main>
		</ViewTransition>
	)
}
