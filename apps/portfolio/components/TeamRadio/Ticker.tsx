'use client'

import { AnimatePresence, motion } from 'motion/react'
import type { Route } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './TeamRadio.module.css'

export type RadioItem = {
	kind: 'New post' | 'PR merged'
	title: string
	/** The repo, for PRs */
	detail?: string
	href: string
	external?: boolean
	date: string
}

const TURN_MS = 5000

/**
 * One message at a time, flipping up to the next every five seconds. It
 * holds still while the pointer or focus is on it, and the pause button stops
 * it for good.
 */
export default function Ticker({
	items,
	className,
}: {
	items: RadioItem[]
	className?: string
}) {
	const [index, setIndex] = useState(0)
	const [held, setHeld] = useState(false)
	const [paused, setPaused] = useState(false)
	const still = held || paused || items.length < 2

	useEffect(() => {
		if (still) {
			return
		}
		const timer = setInterval(
			() => setIndex((i) => (i + 1) % items.length),
			TURN_MS
		)
		return () => clearInterval(timer)
	}, [still, items.length])

	const item = items[index]

	return (
		<section
			aria-label="Team radio"
			className={`sl ${styles.bar} ${className ?? ''}`}
			onPointerEnter={() => setHeld(true)}
			onPointerLeave={() => setHeld(false)}
			onFocus={() => setHeld(true)}
			onBlur={() => setHeld(false)}
		>
			<i className={styles.mark} />
			<b className={styles.name}>Team radio</b>
			<div className={styles.window}>
				<AnimatePresence initial={false} mode="popLayout">
					{item && (
						<motion.div
							key={item.href}
							className={styles.message}
							initial={{ y: '110%', opacity: 0 }}
							animate={{ y: '0%', opacity: 1 }}
							exit={{ y: '-110%', opacity: 0 }}
							transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
						>
							<Message item={item} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			{items.length > 1 && (
				<button
					type="button"
					className={styles.pause}
					aria-pressed={paused}
					aria-label={paused ? 'Play team radio' : 'Pause team radio'}
					title={paused ? 'Play' : 'Pause'}
					onClick={() => setPaused((p) => !p)}
				>
					{paused ? '▶' : '❚❚'}
				</button>
			)}
		</section>
	)
}

function Message({ item }: { item: RadioItem }) {
	const body = (
		<>
			<span className={styles.kind}>{item.kind}:</span>
			<span className={styles.title}>{item.title}</span>
			{item.detail && <span className={styles.detail}>{item.detail}</span>}
			<span className={styles.date}>{item.date}</span>
		</>
	)
	return item.external ? (
		<a
			className={styles.link}
			href={item.href}
			target="_blank"
			rel="noopener noreferrer"
		>
			{body}
		</a>
	) : (
		<Link className={styles.link} href={item.href as Route}>
			{body}
		</Link>
	)
}
