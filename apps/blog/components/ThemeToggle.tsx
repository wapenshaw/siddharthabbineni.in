'use client'

import { THEME_STORAGE_KEY, type Theme } from 'lib/theme'

/** Flips data-theme on <html> and remembers it; the icon follows by CSS */
export default function ThemeToggle() {
	const toggle = () => {
		const root = document.documentElement
		const next: Theme =
			root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
		root.setAttribute('data-theme', next)
		try {
			localStorage.setItem(THEME_STORAGE_KEY, next)
		} catch {}
	}

	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={toggle}
			aria-label="Switch between dark and light"
		>
			<svg
				className="sun"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				aria-hidden="true"
			>
				<circle cx="12" cy="12" r="4" />
				<path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
			</svg>
			<svg
				className="moon"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				aria-hidden="true"
			>
				<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
			</svg>
		</button>
	)
}
