'use client'

import { MoonIcon, SunIcon } from 'components/Icons'
import { DEFAULT_MODE, MODE_STORAGE_KEY, type Mode } from 'config/theme'
import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
	const observer = new MutationObserver(onChange)
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['data-mode'],
	})
	return () => observer.disconnect()
}

const getSnapshot = () =>
	(document.documentElement.dataset.mode as Mode | undefined) ?? DEFAULT_MODE

const getServerSnapshot = () => DEFAULT_MODE

function apply(mode: Mode) {
	const update = () => {
		document.documentElement.setAttribute('data-mode', mode)
	}
	try {
		localStorage.setItem(MODE_STORAGE_KEY, mode)
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

/** Dark/light, remembered in localStorage */
export default function ThemeToggle({ className }: { className?: string }) {
	const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
	const next = mode === 'dark' ? 'light' : 'dark'

	return (
		<button
			type="button"
			className={className}
			aria-label={`Switch to ${next} mode`}
			title={`Switch to ${next} mode`}
			onClick={() => apply(next)}
		>
			{mode === 'dark' ? <SunIcon /> : <MoonIcon />}
		</button>
	)
}
