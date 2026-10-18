import { certifications } from 'config/certifications'
import { profile } from 'config/profile'
import { Suspense } from 'react'
import styles from './TrophyCabinet.module.css'
import Unlocks, { UnlocksSkeleton } from './Unlocks'

const featured = certifications.filter((c) => c.featured)

export default function TrophyCabinet({ className }: { className?: string }) {
	return (
		<section
			className={`panel ${className ?? ''}`}
			aria-labelledby="trophy-title"
		>
			<div className="phead">
				<h2 id="trophy-title" className="label label-hi">
					Trophy cabinet
				</h2>
				<span className="label">{featured.length} Certifications</span>
			</div>

			<ul className={styles.certs}>
				{featured.map((c) => {
					const tier = c.level.toLowerCase()
					return (
						<li key={c.name}>
							<a
								className={styles.cert}
								href={c.verifyUrl}
								target="_blank"
								rel="noopener noreferrer"
								title={`Verify: ${c.fullName}`}
							>
								{/* the official Microsoft badge for the level; the name is in the text beside it */}
								<img
									className={styles.badge}
									src={c.badge}
									alt=""
									width={40}
									height={40}
								/>
								<span className={styles.certText}>
									<span
										className={`${styles.tier} ${styles[`tier-${tier}`] ?? ''}`}
									>
										{c.level}
									</span>
									<span className={styles.certName}>{c.name}</span>
								</span>
							</a>
						</li>
					)
				})}
			</ul>

			<Suspense fallback={<UnlocksSkeleton />}>
				<Unlocks />
			</Suspense>

			<div className={styles.footer}>
				<a
					href={profile.links.exophase}
					className="disp"
					target="_blank"
					rel="noopener noreferrer"
				>
					Achievements log →
				</a>
			</div>
		</section>
	)
}
