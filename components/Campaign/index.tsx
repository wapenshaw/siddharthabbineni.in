'use client'

import type { Chapter } from 'lib/timeline'
import { type CSSProperties, type KeyboardEvent, useRef, useState } from 'react'
import styles from './Campaign.module.css'
import CompanyLogo from './CompanyLogo'

type Props = {
	chapters: Chapter[]
	axis: number[]
	since: number
	className?: string
}

export default function Campaign({ chapters, axis, since, className }: Props) {
	// The current job opens first
	const [selected, setSelected] = useState(chapters.length - 1)
	const tabs = useRef<(HTMLButtonElement | null)[]>([])
	const job = chapters[selected]

	const select = (i: number) => {
		const next = (i + chapters.length) % chapters.length
		setSelected(next)
		tabs.current[next]?.focus()
	}

	// Arrow keys move along the timeline in either orientation (it goes vertical when stacked)
	const onKeyDown = (e: KeyboardEvent) => {
		const moves: Record<string, number> = {
			ArrowRight: selected + 1,
			ArrowDown: selected + 1,
			ArrowLeft: selected - 1,
			ArrowUp: selected - 1,
			Home: 0,
			End: chapters.length - 1,
		}
		const target = moves[e.key]
		if (target !== undefined) {
			e.preventDefault()
			select(target)
		}
	}

	if (!job) {
		return null
	}

	return (
		<section
			className={`panel ${className ?? ''}`}
			aria-labelledby="campaign-title"
		>
			<div className={styles.head}>
				<div className={styles.titles}>
					<h2 id="campaign-title" className="label label-hi">
						Campaign · career to scale
					</h2>
					<span className="label">
						{chapters.length} chapters since {since}
					</span>
				</div>

				<div
					className={styles.timeline}
					role="tablist"
					aria-label="Companies"
					onKeyDown={onKeyDown}
				>
					{chapters.map((c, i) => (
						<button
							key={c.short}
							ref={(el) => {
								tabs.current[i] = el
							}}
							type="button"
							role="tab"
							id={`chapter-tab-${i}`}
							aria-selected={i === selected}
							aria-controls="chapter-panel"
							tabIndex={i === selected ? 0 : -1}
							className={[
								styles.seg,
								c.live && styles.segLive,
								i === selected && styles.segOn,
							]
								.filter(Boolean)
								.join(' ')}
							style={{ '--months': c.months } as CSSProperties}
							title={`${c.short} · ${c.years}`}
							onClick={() => setSelected(i)}
						>
							<CompanyLogo logo={c.logo} size="sm" />
							<span className={styles.segText}>
								<span className={`disp ${styles.segN}`}>Ch {c.n}</span>
								<span className={styles.segName}>{c.short}</span>
								<span className={styles.segYears}>{c.years}</span>
							</span>
						</button>
					))}
				</div>

				<div className={`disp ${styles.axis}`} aria-hidden="true">
					{axis.map((y) => (
						<span key={y}>{y}</span>
					))}
				</div>
			</div>

			<div
				id="chapter-panel"
				role="tabpanel"
				aria-labelledby={`chapter-tab-${selected}`}
				className={styles.detail}
			>
				<div className={styles.top}>
					<div className={styles.ident}>
						<CompanyLogo
							logo={job.logo}
							size="lg"
							alt={`${job.short} logo`}
							className={styles.bigLogo}
						/>
						<div className={styles.roleWrap}>
							<h3 className={`disp ${styles.role}`}>{job.role}</h3>
							<span className={styles.where}>
								<a href={job.url} target="_blank" rel="noopener noreferrer">
									#{job.short}
								</a>{' '}
								<span className={styles.muted}>· {job.location}</span>
							</span>
						</div>
					</div>
					<div className={styles.when}>
						<span className={styles.dates}>{job.when}</span>
						<span className={job.live ? 'pill pill-acc' : 'pill'}>
							{job.live ? 'In progress' : 'Chapter complete'}
						</span>
					</div>
				</div>

				<ul className={styles.bullets}>
					{job.bullets.map((b) => (
						<li key={b} className={styles.bullet}>
							<span className={styles.marker} aria-hidden="true">
								▸
							</span>
							<span>{b}</span>
						</li>
					))}
				</ul>

				<div className={styles.loadout}>
					<span className={`label ${styles.loadoutLabel}`}>Loadout</span>
					<ul className={styles.chips} aria-label="Stack">
						{job.stack.map((s) => (
							<li key={s} className="chip">
								{s}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
