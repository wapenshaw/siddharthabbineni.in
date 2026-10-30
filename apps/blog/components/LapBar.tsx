'use client'

import type { Lap } from 'lib/posts'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

/** How far through each lap the reader is: 1 done, 0 not started */
function progressOf(laps: Lap[]) {
	const line = window.innerHeight * 0.3
	const end =
		document.getElementById('post-end')?.getBoundingClientRect().top ?? 0
	const starts = laps.map(
		(lap) => document.getElementById(lap.id)?.getBoundingClientRect().top ?? 0
	)
	return starts.map((start, i) => {
		const next = starts[i + 1] ?? end
		if (line >= next) {
			return 1
		}
		if (line <= start) {
			return 0
		}
		return (line - start) / (next - start)
	})
}

/** Each h2 is a lap: lit green once read and amber while reading */
function useLaps(laps: Lap[]) {
	const [fills, setFills] = useState<number[]>(() => laps.map(() => 0))

	useEffect(() => {
		let frame = 0
		const update = () => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(() => setFills(progressOf(laps)))
		}
		update()
		window.addEventListener('scroll', update, { passive: true })
		window.addEventListener('resize', update)
		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener('scroll', update)
			window.removeEventListener('resize', update)
		}
	}, [laps])

	return fills
}

/** The sticky bar along the top of a post */
export default function LapBar({ laps }: { laps: Lap[] }) {
	const fills = useLaps(laps)
	const started = fills.filter((f) => f > 0).length
	const current = Math.max(1, started)

	return (
		<div className="lapbar">
			<div className="wrap">
				<Link href="/" className="brand cond">
					Free practice
				</Link>
				{laps.length > 1 && (
					<>
						<span className="count cond" aria-live="off">
							Lap {current} <span>of {laps.length}</span>
						</span>
						<div className="segments" aria-hidden="true">
							{fills.map((fill, i) => (
								<span
									// laps keep their order, so the index is a stable key
									// biome-ignore lint/suspicious/noArrayIndexKey: see above
									key={i}
									data-done={fill >= 1 ? '' : undefined}
									style={{ '--fill': fill } as React.CSSProperties}
								/>
							))}
						</div>
					</>
				)}
				<a href="/search/" className="lapbar-search">
					Search
				</a>
				<ThemeToggle />
			</div>
		</div>
	)
}

/** The laps beside the text, lit the same way as the bar */
export function LapList({ laps }: { laps: Lap[] }) {
	const fills = useLaps(laps)
	const current = fills.findLastIndex((f) => f > 0)

	return (
		<ol className="laps">
			{laps.map((lap, i) => (
				<li
					key={lap.id}
					data-done={i < current ? '' : undefined}
					data-current={i === current ? '' : undefined}
				>
					<a href={`#${lap.id}`}>
						<span className="n cond">L{i + 1}</span>
						<span>{lap.title}</span>
					</a>
				</li>
			))}
		</ol>
	)
}
