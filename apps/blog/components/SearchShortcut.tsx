'use client'

import { useEffect } from 'react'

/** "/" jumps to search from any page, as on GitHub */
export default function SearchShortcut() {
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			const target = e.target as HTMLElement
			if (
				e.key !== '/' ||
				e.ctrlKey ||
				e.metaKey ||
				e.altKey ||
				target.isContentEditable ||
				['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
			) {
				return
			}
			e.preventDefault()
			const box = document.querySelector<HTMLInputElement>('.search-box input')
			if (box) {
				box.focus()
			} else {
				location.assign('/search/')
			}
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [])

	return null
}
