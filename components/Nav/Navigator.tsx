'use client'

import { sections } from 'config/sections'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { sectionIndex } from './sectionOf'
import { keysAreBusy, STEP_EVENT, type StepDetail } from './steps'

/** The one-screen layout; phones and tablets scroll normally */
const DESKTOP = '(min-width: 1180px) and (min-height: 560px)'
/** Wheel distance that counts as one step */
const STEP_DISTANCE = 40
/** A gesture ends when the wheel has been still this long (trackpads coast) */
const GESTURE_END_MS = 180

/** Does the wheel belong to something that scrolls, like a post? */
function insideScroller(target: EventTarget | null) {
	for (
		let el = target instanceof Element ? target : null;
		el && el !== document.body;
		el = el.parentElement
	) {
		const { overflowY } = getComputedStyle(el)
		if (
			(overflowY === 'auto' || overflowY === 'scroll') &&
			el.scrollHeight > el.clientHeight
		) {
			return true
		}
	}
	return false
}

/**
 * Keyboard and wheel navigation between sections. Keys: 1–5 open a section,
 * [ and ] go to the previous and next one, PageUp and PageDown step like the
 * wheel. On a desktop the page never scrolls, so one wheel gesture is one step.
 */
export default function Navigator() {
	const router = useRouter()

	useEffect(() => {
		const desktop = matchMedia(DESKTOP)

		const go = (index: number) => {
			const section = sections[index]
			if (section) {
				router.push(section.href)
			}
		}

		const step = (dir: 1 | -1) => {
			const claimed = !window.dispatchEvent(
				new CustomEvent<StepDetail>(STEP_EVENT, {
					detail: { dir },
					cancelable: true,
				})
			)
			if (!claimed) {
				go(sectionIndex(location.pathname) + dir)
			}
		}

		const onKey = (e: KeyboardEvent) => {
			if (keysAreBusy(e)) {
				return
			}
			const current = sectionIndex(location.pathname)
			if (/^[1-9]$/.test(e.key) && Number(e.key) <= sections.length) {
				go(Number(e.key) - 1)
			} else if (e.key === '[' || e.key === ']') {
				go(current + (e.key === ']' ? 1 : -1))
			} else if (
				(e.key === 'PageDown' || e.key === 'PageUp') &&
				desktop.matches &&
				!insideScroller(document.activeElement)
			) {
				step(e.key === 'PageDown' ? 1 : -1)
			} else {
				return
			}
			e.preventDefault()
		}

		let distance = 0
		let stepped = false
		let idle: ReturnType<typeof setTimeout> | undefined

		const onWheel = (e: WheelEvent) => {
			if (!desktop.matches || e.ctrlKey || insideScroller(e.target)) {
				return
			}
			clearTimeout(idle)
			idle = setTimeout(() => {
				distance = 0
				stepped = false
			}, GESTURE_END_MS)
			if (stepped) {
				return
			}
			distance += e.deltaY
			if (Math.abs(distance) >= STEP_DISTANCE) {
				stepped = true
				step(distance > 0 ? 1 : -1)
			}
		}

		document.addEventListener('keydown', onKey)
		window.addEventListener('wheel', onWheel, { passive: true })
		return () => {
			clearTimeout(idle)
			document.removeEventListener('keydown', onKey)
			window.removeEventListener('wheel', onWheel)
		}
	}, [router])

	return null
}
