import { profile } from 'config/profile'
import type { PullRequest } from 'types/github'
import styles from './Devlog.module.css'

const formatDate = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	timeZone: 'Asia/Kolkata',
})

/** Upstream pull requests as patch notes (right column of the devlog) */
export default function PatchNotes({
	prs,
	className,
}: {
	prs: PullRequest[]
	className?: string
}) {
	return (
		<section
			className={`panel ${styles.notes} ${className ?? ''}`}
			aria-labelledby="patch-title"
		>
			<div className="phead">
				<h2 id="patch-title" className="label label-hi">
					Patch notes
				</h2>
				<span className="label">Upstream PRs</span>
			</div>
			{prs.length === 0 ? (
				<p className={styles.empty}>No pull requests could be loaded.</p>
			) : (
				<ul className={styles.prs}>
					{prs.map((p) => (
						<li key={p.url}>
							<a
								className={styles.pr}
								href={p.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span className={styles.prTop}>
									<span
										className={`${styles.state} ${p.state === 'merged' ? styles.merged : styles.open}`}
									>
										{p.state}
									</span>
									<time className={styles.prDate} dateTime={p.date}>
										{formatDate.format(new Date(p.date))}
									</time>
								</span>
								<span className={styles.prTitle}>{p.title}</span>
								<span className={styles.prRepo}>
									{p.repo} #{p.number}
								</span>
							</a>
						</li>
					))}
				</ul>
			)}
			<div className={styles.footer}>
				<a
					href={profile.links.github}
					className="disp"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub →
				</a>
			</div>
		</section>
	)
}
