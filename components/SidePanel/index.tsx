'use client'

import { type KeyboardEvent, type ReactNode, useState } from 'react'
import styles from './SidePanel.module.css'

type Tab = 'build' | 'quests'

type Props = {
	build: ReactNode
	quests: ReactNode
	footer?: ReactNode
	className?: string
}

const tabs: { id: Tab; label: string }[] = [
	{ id: 'build', label: 'Character build' },
	{ id: 'quests', label: 'Side quests' },
]

/**
 * Both panes are always rendered and CSS picks the layout: tabs on shorter
 * desktops, both panes stacked when scrolling, and build only on tall screens
 * (side quests then get their own row; see app/page.module.css).
 */
export default function SidePanel({ build, quests, footer, className }: Props) {
	const [tab, setTab] = useState<Tab>('build')

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
			e.preventDefault()
			const next = tab === 'build' ? 'quests' : 'build'
			setTab(next)
			document.getElementById(`side-tab-${next}`)?.focus()
		}
	}

	return (
		<section
			className={`panel ${styles.side} ${className ?? ''}`}
			data-tab={tab}
			aria-label="Character"
		>
			<div className={`phead ${styles.tabbar}`}>
				<div
					className={styles.tabs}
					role="tablist"
					aria-label="Side panel"
					onKeyDown={onKeyDown}
				>
					{tabs.map((t) => (
						<button
							key={t.id}
							type="button"
							role="tab"
							id={`side-tab-${t.id}`}
							aria-selected={tab === t.id}
							aria-controls={`side-pane-${t.id}`}
							tabIndex={tab === t.id ? 0 : -1}
							className={styles.tab}
							onClick={() => setTab(t.id)}
						>
							{t.label}
						</button>
					))}
				</div>
			</div>
			<div className={styles.panes}>
				<div
					id="side-pane-build"
					className={`${styles.pane} ${styles.paneBuild}`}
				>
					<h2 className={`label label-hi ${styles.paneHead}`}>
						Character build
					</h2>
					{build}
				</div>
				<div
					id="side-pane-quests"
					className={`${styles.pane} ${styles.paneQuests}`}
				>
					<h2 className={`label label-hi ${styles.paneHead}`}>Side quests</h2>
					{quests}
				</div>
			</div>
			{footer && <div className={styles.footer}>{footer}</div>}
		</section>
	)
}
