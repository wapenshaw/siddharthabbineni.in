import { characterBuild } from 'config/build'
import { profile } from 'config/profile'
import type { SectionColour } from 'config/sections'
import { getStackOverflowProfile } from 'lib/stackoverflow'
import styles from './DriverProfile.module.css'
import PixelIcon from './PixelIcon'

/** Each card gets its own team colour down its edge */
const CARD_COLOURS: SectionColour[] = [
	'purple',
	'green',
	'blue',
	'yellow',
	'red',
	'purple',
]

const tiers = ['gold', 'silver', 'bronze'] as const
const number = new Intl.NumberFormat('en-US')

/** Who I am on the left, the build (what I do) as cards on the right */
export default async function DriverProfile() {
	const so = await getStackOverflowProfile()

	return (
		<main className={styles.profile} aria-labelledby="profile-title">
			<section className={`panel ${styles.about}`}>
				<h2 id="profile-title" className="tab slr" data-colour="purple">
					Driver profile
				</h2>
				<div className={styles.aboutBody}>
					<p className={styles.bio}>{profile.bio}</p>
					<dl className={styles.facts}>
						<div>
							<dt>Based in</dt>
							<dd>{profile.location}</dd>
						</div>
						<div>
							<dt>Working since</dt>
							<dd>{profile.startYear}</dd>
						</div>
						<div>
							<dt>Working on</dt>
							<dd>{profile.nowPlaying}</dd>
						</div>
					</dl>
					<ul className={styles.classes} aria-label="Classes">
						{profile.classes.map((c) => (
							<li key={c} className={`sl ${styles.class}`}>
								{c}
							</li>
						))}
						{profile.subclasses.map((c) => (
							<li key={c} className="chip sl">
								{c}
							</li>
						))}
					</ul>
					<a
						className={`sl ${styles.so}`}
						href={
							so
								? `https://stackoverflow.com/users/${so.user_id}/`
								: profile.links.stackoverflow
						}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className={styles.soHead}>Stack Overflow</span>
						{so ? (
							<span className={styles.soStats}>
								<span>
									<b>{number.format(so.reputation)}</b> reputation
								</span>
								<span>
									<b>
										{so.reputation_change_month >= 0 ? '+' : ''}
										{so.reputation_change_month}
									</b>{' '}
									this month
								</span>
								<span className={styles.badges}>
									{tiers.map((t) => (
										<span key={t} title={`${so.badge_counts[t]} ${t} badges`}>
											<span
												className={`${styles.badge} ${styles[t]}`}
												aria-hidden="true"
											/>
											{so.badge_counts[t]}
											<span className="sr-only"> {t} badges</span>
										</span>
									))}
								</span>
							</span>
						) : (
							<span className={styles.soStats}>See my answers</span>
						)}
					</a>
				</div>
			</section>

			<section className={styles.build} aria-labelledby="build-title">
				<h3 id="build-title" className="sr-only">
					My build
				</h3>
				<ul className={styles.cards}>
					{characterBuild.map((c, i) => (
						<li
							key={c.name}
							className={`sl ${styles.card}`}
							data-colour={CARD_COLOURS[i % CARD_COLOURS.length]}
						>
							<PixelIcon name={c.icon} className={styles.icon} />
							<h4 className={styles.name}>{c.name}</h4>
							<p className={styles.line}>{c.line}</p>
							{c.loadout && (
								<ul className={styles.loadout} aria-label="Loadout">
									{c.loadout.map((l) => (
										<li key={l} className="chip sl">
											{l}
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			</section>
		</main>
	)
}
