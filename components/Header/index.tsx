import { profile } from 'config/profile'
import Link from 'next/link'
import styles from './Header.module.css'
import ResumeButton from './ResumeButton'
import Socials from './Socials'
import StackOverflowChip from './StackOverflow'
import ThemeToggle from './ThemeToggle'

const [first, ...rest] = profile.name.split(' ')

/** The nameplate with its red and yellow slashes, like a driver's TV graphic */
export default function Header({ className }: { className?: string }) {
	return (
		<header className={`${styles.header} ${className ?? ''}`}>
			<Link href="/" className={`slr ${styles.plate}`}>
				<span className={styles.shot}>
					<img src={profile.avatar} alt="" width={400} height={400} />
				</span>
				<span className={styles.names}>
					<span className={styles.first}>{first}</span>
					<span className={styles.last}>{rest.join(' ')}</span>
				</span>
			</Link>
			<span className={`sl ${styles.slashRed}`} aria-hidden="true" />
			<span className={`sl ${styles.slashYellow}`} aria-hidden="true" />
			<p className={styles.tagline}>{profile.tagline}</p>
			<ThemeToggle className={`sl ${styles.mode}`} />
			<div className={styles.end}>
				<Socials />
				<StackOverflowChip />
				<ResumeButton href={profile.resumeUrl} />
				<a
					className="btn btn-white sl"
					href={`mailto:${profile.email}`}
					title={profile.email}
				>
					Email
				</a>
			</div>
		</header>
	)
}
