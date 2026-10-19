'use client'

import { sections } from 'config/sections'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'
import { sectionIndex } from './sectionOf'

/**
 * Slanted tiles, each in its section's colour. The open section's fill slides
 * between tiles. Number keys 1–5 jump straight to a section (see Navigator).
 */
export default function Nav({ className }: { className?: string }) {
	const current = sectionIndex(usePathname())

	return (
		<nav aria-label="Sections" className={`${styles.nav} ${className ?? ''}`}>
			{sections.map((s, i) => {
				const open = i === current
				return (
					<Link
						key={s.href}
						href={s.href}
						data-colour={s.colour}
						aria-current={open ? 'page' : undefined}
						aria-keyshortcuts={String(i + 1)}
						className={`sl ${styles.tile}`}
					>
						{open && (
							<motion.span
								layoutId="nav-fill"
								className={styles.fill}
								transition={{ type: 'spring', stiffness: 520, damping: 44 }}
							/>
						)}
						<i className={styles.mark} />
						<span className={styles.words}>
							<b>{s.name}</b>
							<span>{s.line}</span>
						</span>
						<span className={styles.key} aria-hidden="true">
							{i + 1}
						</span>
					</Link>
				)
			})}
		</nav>
	)
}
