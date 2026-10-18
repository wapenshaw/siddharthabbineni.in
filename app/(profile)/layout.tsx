import ProfileStrip from 'components/ProfileStrip'
import styles from './layout.module.css'

/**
 * The profile strip stays put; the pages below it (profile, devlog) swap in
 * as one view on the same three columns.
 */
export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className={styles.screen}>
			<ProfileStrip className={styles.strip} />
			{children}
		</div>
	)
}
