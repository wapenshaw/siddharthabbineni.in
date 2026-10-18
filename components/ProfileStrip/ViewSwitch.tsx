'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './ViewSwitch.module.css'

/**
 * Swaps the view under the strip: profile ⇄ devlog. Both labels sit in the
 * same cell (the inactive one invisible), so the button is always as wide as
 * the longer label and switching views only changes the text.
 */
export default function ViewSwitch() {
	const onDevlog = usePathname() === '/blog'

	return (
		<Link className="btn btn-fill" href={onDevlog ? '/' : '/blog'}>
			<span className={styles.labels}>
				<span className={onDevlog ? styles.hidden : undefined}>Devlog →</span>
				<span className={onDevlog ? undefined : styles.hidden}>← Profile</span>
			</span>
		</Link>
	)
}
