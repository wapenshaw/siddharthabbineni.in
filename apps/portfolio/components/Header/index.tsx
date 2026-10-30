import { PenNib } from '@phosphor-icons/react/ssr'
import { profile } from 'config/profile'
import { BLOG_URL } from 'config/site'
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
					<img src={profile.avatar} alt="" width={400} height={409} />
				</span>
				<span className={styles.names}>
					<span className={styles.first}>{first}</span>
					<span className={styles.last}>{rest.join(' ')}</span>
				</span>
			</Link>
			<span className={`sl ${styles.slashRed}`} aria-hidden="true" />
			<span className={`sl ${styles.slashYellow}`} aria-hidden="true" />
			<p className={styles.tagline}>{profile.tagline}</p>
			{/* phones only; the desktop header has a Blog button */}
			<a
				className={`sl ${styles.mode} ${styles.blog}`}
				href={BLOG_URL}
				aria-label="Blog"
				title="Blog"
			>
				<PenNib weight="bold" aria-hidden="true" />
			</a>
			<ThemeToggle className={`sl ${styles.mode}`} />
			<div className={styles.end}>
				<Socials />
				<StackOverflowChip />
				<ResumeButton href={profile.resumeUrl} />
				{/* the resume has the email address, so there is no Email button */}
				<a className="btn btn-white sl" href={BLOG_URL}>
					Blog
				</a>
			</div>
		</header>
	)
}
