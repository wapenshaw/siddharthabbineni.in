'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './GameIcon.module.css'

/**
 * Old-school .exe icon from public/games/. Until the file exists the tile
 * shows the game's abbreviation; this also catches loads that failed before
 * hydration, which onError alone would miss.
 */
export default function GameIcon({
	icon,
	abbr,
}: {
	icon: string
	abbr: string
}) {
	const [failed, setFailed] = useState(false)
	const img = useRef<HTMLImageElement>(null)

	useEffect(() => {
		const el = img.current
		if (el?.complete && el.naturalWidth === 0) {
			setFailed(true)
		}
	}, [])

	return (
		<span className={`${styles.tile} ${failed ? 'ph' : ''}`} aria-hidden="true">
			{failed ? (
				<span className={`disp ${styles.abbr}`}>{abbr}</span>
			) : (
				<img
					ref={img}
					src={icon}
					alt=""
					width={28}
					height={28}
					onError={() => setFailed(true)}
				/>
			)}
		</span>
	)
}
