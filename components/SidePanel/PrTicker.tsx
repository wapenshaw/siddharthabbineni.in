import type { PullRequest } from 'types/github'
import styles from './PrTicker.module.css'

/** Live upstream PRs as a marquee; pauses on hover/focus, static under reduced motion */
export default function PrTicker({ prs }: { prs: PullRequest[] }) {
	if (prs.length === 0) {
		return null
	}

	const items = (copy: boolean) =>
		prs.map((p) => (
			<li key={`${copy}-${p.url}`}>
				<a
					className={styles.item}
					href={p.url}
					target="_blank"
					rel="noopener noreferrer"
					tabIndex={copy ? -1 : undefined}
				>
					<span
						className={`${styles.dot} ${p.state === 'merged' ? styles.merged : styles.open}`}
						title={p.state === 'merged' ? 'Merged' : 'Open'}
					/>
					<span className="sr-only">
						{p.state === 'merged' ? 'Merged:' : 'Open:'}
					</span>
					<span className={styles.repo}>
						{p.repo} #{p.number}
					</span>
					<span>{p.title}</span>
				</a>
			</li>
		))

	return (
		<div className={styles.ticker}>
			<span className={`label ${styles.label}`}>Co-op · PRs</span>
			<div className={styles.view}>
				{/* The second copy makes the loop seamless; it is hidden from assistive tech */}
				<div className={styles.run}>
					<ul
						className={styles.list}
						aria-label="Recent pull requests to other projects"
					>
						{items(false)}
					</ul>
					<ul className={styles.list} aria-hidden="true">
						{items(true)}
					</ul>
				</div>
			</div>
		</div>
	)
}
