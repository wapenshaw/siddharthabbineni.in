'use client'

import { useState } from 'react'
import styles from './YouTube.module.css'

/**
 * A YouTube video in a post: the thumbnail and a play button until clicked, so
 * the player only loads for people who watch. Without JavaScript it's a link.
 */
export default function YouTube({ id, title }: { id: string; title: string }) {
	const [playing, setPlaying] = useState(false)

	if (playing) {
		return (
			<span className={styles.video}>
				<iframe
					src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
					title={title}
					allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
					allowFullScreen
				/>
			</span>
		)
	}

	return (
		<a
			href={`https://www.youtube.com/watch?v=${id}`}
			className={styles.video}
			onClick={(e) => {
				e.preventDefault()
				setPlaying(true)
			}}
			aria-label={`Play video: ${title}`}
		>
			<img
				src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
				alt=""
				loading="lazy"
			/>
			<span className={styles.play} aria-hidden="true" />
		</a>
	)
}
