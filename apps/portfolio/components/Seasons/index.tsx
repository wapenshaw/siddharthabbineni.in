'use client'

import { keysAreBusy, onStep } from 'components/Nav/steps'
import Stack from 'components/Stack'
import {
	ROAD_END,
	RUN_UP,
	STOPS,
	TRACK_PATH,
	TRACK_ROTATE,
	TRACK_VIEWBOX,
	topOf,
} from 'config/track'
import type { Stint } from 'lib/timeline'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { type CSSProperties, type MouseEvent, useEffect, useState } from 'react'
import styles from './Seasons.module.css'

const STAT_COLOURS = ['var(--purple)', 'var(--green-ink)', 'var(--blue)']
const EASE = [0.2, 0.8, 0.2, 1] as const
/** The one-screen layout; below it the stints are an accordion */
const DESKTOP = '(min-width: 1180px) and (min-height: 560px)'
/** Room left above a stint's row when the accordion scrolls to it */
const ROW_GAP = 8
/** How long a stint takes to fold (Seasons.module.css, .fold) */
const FOLD_MS = 550

/** A stretch of the path from one percentage to another, as dash settings */
const dash = (from: number, to: number) => ({
	strokeDasharray: `${to - from} ${100 - (to - from)}`,
	strokeDashoffset: -from,
})

/**
 * The career as an open stretch of the Nürburgring: grey for life before
 * work, the track colour for work, red from the current job onwards (the
 * road keeps going). The selected stint is teal, with the track up to the
 * next stop. ↑ and ↓, or the wheel, move between stints.
 */
export default function Seasons({ stints }: { stints: Stint[] }) {
	const last = stints.length - 1
	const [selected, setSelected] = useState(last)
	const reduced = useReducedMotion()

	/**
	 * On phones the open stint folds up as the tapped one unfolds, and the page
	 * scrolls so the tapped row sits just under the tabs. The scroll aims at
	 * where the row will be once the fold above it has closed.
	 */
	const pick = (i: number, e: MouseEvent<HTMLButtonElement>) => {
		const row = e.currentTarget.parentElement
		const list = row?.parentElement
		if (row && list && !matchMedia(DESKTOP).matches) {
			const open = list.querySelector<HTMLElement>(`.${styles.fold}[data-open]`)
			const shrink = open && !row.contains(open) ? open.offsetHeight : 0
			let top = row.getBoundingClientRect().top + scrollY
			if (
				open &&
				open.compareDocumentPosition(row) & Node.DOCUMENT_POSITION_FOLLOWING
			) {
				top -= shrink
			}
			// Hold the list at its final height, so the page is already tall enough
			// to scroll that far. And stop the browser's scroll anchoring for the
			// fold: it shifts the page to keep the content under the list still.
			const grow = row.querySelector(`.${styles.foldInner}`)?.scrollHeight ?? 0
			const page = document.documentElement.style
			list.style.minHeight = `${list.offsetHeight - shrink + (shrink ? grow : 0)}px`
			page.overflowAnchor = 'none'
			setTimeout(() => {
				list.style.removeProperty('min-height')
				page.removeProperty('overflow-anchor')
			}, FOLD_MS + 50)
			const tabs = document.querySelector<HTMLElement>(
				'nav[aria-label="Sections"]'
			)
			scrollTo({
				top: top - (tabs?.offsetHeight ?? 0) - ROW_GAP,
				behavior: reduced ? 'auto' : 'smooth',
			})
		}
		setSelected(i)
	}

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (keysAreBusy(e) || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) {
				return
			}
			e.preventDefault()
			setSelected((s) =>
				Math.min(last, Math.max(0, s + (e.key === 'ArrowUp' ? 1 : -1)))
			)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [last])

	// Wheel down goes back in time, then on to the next section from the first job
	useEffect(
		() =>
			onStep((dir) => {
				const next = selected - dir
				if (next < 0 || next > last) {
					return false
				}
				setSelected(next)
				return true
			}),
		[selected, last]
	)

	const stint = stints[selected]
	const newestFirst = stints.map((s, i) => ({ s, i })).reverse()

	return (
		<main className={styles.seasons} aria-labelledby="seasons-title">
			<section className={`panel ${styles.route}`} aria-label="Career route">
				<div className={styles.routeHead}>
					<h1 id="seasons-title" className="tab slr" data-colour="red">
						Seasons
					</h1>
				</div>
				<div className={styles.mapArea}>
					<div className={styles.map}>
						<Route selected={selected} last={last} onPick={setSelected} />
						<p
							className={styles.roadLabel}
							style={{ '--top': `${topOf(ROAD_END)}%` } as CSSProperties}
						>
							The road keeps going
						</p>
						<ol className={styles.stops}>
							{newestFirst.map(({ s, i }) => (
								<li
									key={s.company}
									className={styles.stop}
									data-state={
										i === last
											? 'current'
											: i === selected
												? 'selected'
												: undefined
									}
									data-below={
										i === 0
											? 'life'
											: i - 1 === selected && i - 1 !== last
												? 'selected'
												: undefined
									}
									style={
										{
											'--top': `${STOPS[i] ? topOf(STOPS[i]) : 0}%`,
										} as CSSProperties
									}
								>
									<button
										type="button"
										className={`sl ${styles.pick}`}
										aria-pressed={i === selected}
										aria-controls="stint"
										onClick={(e) => pick(i, e)}
									>
										{i === selected && i !== last && (
											<motion.span
												layoutId="stint-pick"
												className={styles.pickFill}
												transition={{ duration: 0.35, ease: EASE }}
											/>
										)}
										<span className={styles.dot} aria-hidden="true" />
										<b>{s.short}</b>
										<small>{s.years}</small>
									</button>
									{/*
									 * Phones open the stint under its row while the open one folds
									 * up. A CSS transition, not Motion: measuring height: auto makes
									 * Motion restore the scroll position, which stops pick's scroll.
									 */}
									<div
										className={styles.fold}
										data-open={i === selected || undefined}
									>
										<div className={styles.foldInner}>
											<div className={styles.inline}>
												<StintBody stint={s} />
											</div>
										</div>
									</div>
								</li>
							))}
						</ol>
						<span
							className={styles.lifeLabel}
							style={{ '--top': `${topOf(RUN_UP)}%` } as CSSProperties}
						>
							Life before work
						</span>
					</div>
				</div>
			</section>

			{stint && (
				<article
					id="stint"
					className={`panel ${styles.stint}`}
					aria-labelledby="stint-title"
				>
					<div className={styles.stintHead}>
						<span
							className={`tab slr ${stint.live ? '' : styles.selTab}`}
							data-colour={stint.live ? 'red' : undefined}
						>
							Stint {selected + 1} of {stints.length}
						</span>
						<span>
							{stint.when}, {stint.location.split(',')[0]}
						</span>
					</div>
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={stint.company}
							className={styles.stintBody}
							initial={{ opacity: 0, x: 24 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -24 }}
							transition={{ duration: 0.22, ease: EASE }}
						>
							<StintBody stint={stint} titleId="stint-title" />
						</motion.div>
					</AnimatePresence>
					{/* Fixed slots, Previous always on the right: a button never moves under the pointer */}
					<div className={styles.pager}>
						<button
							type="button"
							className={`btn btn-carbon sl ${styles.turn}`}
							onClick={() => setSelected(selected + 1)}
							aria-keyshortcuts="ArrowUp"
							hidden={!stints[selected + 1]}
						>
							<span className={styles.turnText}>
								<small className={styles.turnLabel}>Next stint</small>
								{stints[selected + 1]?.short}
							</span>
							<span className={styles.turnKey} aria-hidden="true">
								↑
							</span>
						</button>
						<button
							type="button"
							className={`btn sl ${styles.turn}`}
							onClick={() => setSelected(selected - 1)}
							aria-keyshortcuts="ArrowDown"
							hidden={!stints[selected - 1]}
						>
							<span className={styles.turnText}>
								<small className={styles.turnLabel}>Previous stint</small>
								{stints[selected - 1]?.short}
							</span>
							<span className={styles.turnKey} aria-hidden="true">
								↓
							</span>
						</button>
					</div>
				</article>
			)}
		</main>
	)
}

/** The circuit stretch with its coloured segments and a marker per stop */
function Route({
	selected,
	last,
	onPick,
}: {
	selected: number
	last: number
	onPick: (i: number) => void
}) {
	const first = STOPS[0]?.at ?? 0
	const now = STOPS[last]?.at ?? 0
	const from = STOPS[selected]?.at ?? 0
	const to = STOPS[selected + 1]?.at ?? from
	const { x, y, width, height } = TRACK_VIEWBOX
	const segment = { d: TRACK_PATH, pathLength: 100, fill: 'none' }

	return (
		<svg
			className={styles.svg}
			viewBox={`${x} ${y} ${width} ${height}`}
			aria-hidden="true"
		>
			<g transform={TRACK_ROTATE}>
				<path
					{...segment}
					className={styles.underlay}
					style={dash(RUN_UP.at - 0.5, now + 8.5)}
				/>
				<path
					{...segment}
					className={styles.lifeLine}
					style={dash(RUN_UP.at, first)}
				/>
				<path {...segment} className={styles.work} style={dash(first, now)} />
				<motion.path
					{...segment}
					className={styles.selLine}
					initial={false}
					animate={dash(from, selected === last ? from : to)}
					transition={{ duration: 0.45, ease: EASE }}
				/>
				<path
					{...segment}
					className={styles.now}
					style={dash(now, now + 2.2)}
				/>
				{[0.6, 0.35, 0.15].map((opacity, n) => (
					<path
						key={opacity}
						{...segment}
						className={styles.now}
						style={{
							...dash(now + 2.9 + n * 2.1, now + 4.1 + n * 2.1),
							opacity,
						}}
					/>
				))}
				<circle
					cx={RUN_UP.x}
					cy={RUN_UP.y}
					r={3.5}
					className={styles.lifeDot}
				/>
				{STOPS.slice(0, last + 1).map((p, i) => (
					// biome-ignore lint/a11y/noStaticElementInteractions: a mouse shortcut; each stop's label is the button
					<g key={p.at} className={styles.marker} onClick={() => onPick(i)}>
						{i === last ? (
							<circle cx={p.x} cy={p.y} r={6.5} className={styles.nowDot} />
						) : i === selected ? (
							<>
								<circle cx={p.x} cy={p.y} r={10} className={styles.selRing} />
								<circle cx={p.x} cy={p.y} r={5.5} className={styles.selDot} />
							</>
						) : (
							<circle cx={p.x} cy={p.y} r={5} className={styles.stopDot} />
						)}
					</g>
				))}
			</g>
		</svg>
	)
}

/** What the stint panel says: on desktops beside the route, on phones under the row */
function StintBody({ stint, titleId }: { stint: Stint; titleId?: string }) {
	const Heading = titleId ? 'h2' : 'h3'
	return (
		<>
			<div className={styles.who}>
				<Heading id={titleId} className={styles.company}>
					<a href={stint.url} target="_blank" rel="noopener noreferrer">
						{stint.company}
					</a>
				</Heading>
				<span>{stint.role}</span>
			</div>
			<p className={styles.summary}>{stint.summary}</p>
			{stint.stats && (
				<ul className={styles.stats}>
					{stint.stats.map((s, i) => (
						<li key={s.label} className={`sl ${styles.stat}`}>
							<b style={{ color: STAT_COLOURS[i] }}>{s.value}</b>
							<span>{s.label}</span>
						</li>
					))}
				</ul>
			)}
			<ul className={styles.bullets} data-roomy={stint.stats ? undefined : ''}>
				{stint.bullets.map((b) => (
					<li key={b}>{b}</li>
				))}
			</ul>
			<Stack items={stint.stack} className={styles.setup} />
		</>
	)
}
