'use client'

import { MoonIcon, SunIcon } from 'components/Icons'
import {
	DEFAULT_MODE,
	DEFAULT_SKIN,
	type Mode,
	SKIN_PICKER,
	type Skin,
	STORAGE_KEYS,
	skins,
} from 'config/skins'
import { useSyncExternalStore } from 'react'
import styles from './ThemeControls.module.css'

function subscribe(onChange: () => void) {
	const observer = new MutationObserver(onChange)
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['data-skin', 'data-mode'],
	})
	return () => observer.disconnect()
}

const getSnapshot = () => {
	const { skin, mode } = document.documentElement.dataset
	return `${skin ?? DEFAULT_SKIN}:${mode ?? DEFAULT_MODE}`
}

const getServerSnapshot = () => `${DEFAULT_SKIN}:${DEFAULT_MODE}`

function apply(name: 'skin' | 'mode', value: string) {
	const update = () => {
		document.documentElement.setAttribute(`data-${name}`, value)
	}
	try {
		localStorage.setItem(STORAGE_KEYS[name], value)
	} catch {
		// Private windows can block storage; the switch still applies
	}
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
	if (document.startViewTransition && !reduced) {
		document.startViewTransition(update)
	} else {
		update()
	}
}

export default function ThemeControls() {
	const [skin, mode] = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot
	).split(':') as [Skin, Mode]
	const next = mode === 'dark' ? 'light' : 'dark'

	return (
		<fieldset className={styles.controls}>
			<legend className="sr-only">Theme</legend>
			{/* Skin switching is off for now (config/skins.ts); the mode toggle stays */}
			{SKIN_PICKER &&
				skins.map((s) => (
					<button
						key={s.id}
						type="button"
						data-skin={s.id}
						className={styles.swatch}
						aria-pressed={s.id === skin}
						aria-label={`${s.name} skin`}
						title={s.name}
						onClick={() => apply('skin', s.id)}
					>
						<span className={styles.dot} />
					</button>
				))}
			<button
				type="button"
				className="icon-btn"
				aria-label={`Switch to ${next} mode`}
				title={`Switch to ${next} mode`}
				onClick={() => apply('mode', next)}
			>
				{mode === 'dark' ? <SunIcon /> : <MoonIcon />}
			</button>
		</fieldset>
	)
}
