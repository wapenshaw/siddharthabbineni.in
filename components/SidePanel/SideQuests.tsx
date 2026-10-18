import { sideQuests } from 'config/quests'
import styles from './SideQuests.module.css'

/** `row` lays the quests side by side for the tall layout's own panel */
export default function SideQuests({
	layout = 'list',
}: {
	layout?: 'list' | 'row'
}) {
	return (
		<ul className={`${styles.list} ${layout === 'row' ? styles.row : ''}`}>
			{sideQuests.map((q) => (
				<li key={q.name}>
					<a
						className={styles.quest}
						href={q.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className={styles.top}>
							<span className={`disp ${styles.name}`}>{q.name}</span>
							<span
								className={`pill ${q.shipped ? 'pill-acc' : ''} ${styles.status}`}
							>
								{q.status}
							</span>
						</span>
						<span className={styles.line}>{q.line}</span>
						<span className={styles.stack}>{q.stack}</span>
					</a>
				</li>
			))}
		</ul>
	)
}
