import tower from 'components/Tower.module.css'
import { type Certification, certifications } from 'config/certifications'
import { profile } from 'config/profile'
import { Suspense } from 'react'
import styles from './Podiums.module.css'
import Unlocks, { UnlocksSkeleton } from './Unlocks'

const featured = certifications.filter((c) => c.featured)
const others = certifications.filter((c) => !c.featured)

/** The levels as podium places: experts on the top step */
const PLACE: Record<Certification['level'], string> = {
	Expert: 'P1',
	Associate: 'P2',
	Specialty: 'P2',
	Fundamentals: 'P3',
}

/** Microsoft certifications on the left, live game achievements as a timing tower */
export default function Podiums() {
	return (
		<main className={styles.podiums} aria-labelledby="podiums-title">
			<section className={`panel ${styles.certs}`}>
				<div className={styles.head}>
					<h1 id="podiums-title" className="tab slr" data-colour="yellow">
						Podiums
					</h1>
					<span>Microsoft certifications, each links to its proof</span>
				</div>
				<ul className={styles.featured}>
					{featured.map((c) => (
						<li key={c.verifyUrl}>
							<a
								className={`sl ${styles.cert}`}
								data-level={c.level.toLowerCase()}
								href={c.verifyUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span className={styles.place}>{PLACE[c.level]}</span>
								<img src={c.badge} alt="" width={64} height={64} />
								<span className={styles.certText}>
									<small>Azure {c.level}</small>
									<b>{c.name}</b>
									<span>
										Earned {c.earned}
										{c.expires && `, valid to ${c.expires}`}
									</span>
								</span>
							</a>
						</li>
					))}
				</ul>
				<ul className={styles.others}>
					{others.map((c) => (
						<li key={c.verifyUrl}>
							<a
								className={`chip sl ${styles.other}`}
								data-expired={c.expired || undefined}
								href={c.verifyUrl}
								target="_blank"
								rel="noopener noreferrer"
								title={c.fullName}
							>
								{c.name}
								{c.expired && ' (expired)'}
							</a>
						</li>
					))}
				</ul>
			</section>

			<aside className={tower.tower} aria-labelledby="unlocks-title">
				<Suspense fallback={<UnlocksSkeleton />}>
					<Unlocks />
				</Suspense>
				<a
					className={tower.foot}
					href={profile.links.exophase}
					target="_blank"
					rel="noopener noreferrer"
				>
					Full history on Exophase
				</a>
			</aside>
		</main>
	)
}
