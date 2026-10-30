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
/** A swipe must cross this many pixels sideways, mostly sideways, and quickly */
const SWIPE_DISTANCE = 60
const SWIPE_MS = 700

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

/** Does a sideways swipe belong to something that scrolls sideways, like the tabs? */
function insideSideScroller(target: EventTarget | null) {
	for (
		let el = target instanceof Element ? target : null;
		el && el !== document.body;
		el = el.parentElement
	) {
		const { overflowX } = getComputedStyle(el)
		if (
			(overflowX === 'auto' || overflowX === 'scroll') &&
			el.scrollWidth > el.clientWidth
		) {
			return true
		}
	}
	return false
}

/**
 * Keyboard, wheel and swipe navigation between sections. Keys: 1–5 open a
 * section, [ and ] go to the previous and next one, PageUp and PageDown step
 * like the wheel. On a desktop the page never scrolls, so one wheel gesture is
 * one step. On phones and tablets a sideways swipe anywhere moves to the next
 * or previous section, as the tabs are ordered.
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

		let swipe: { x: number; y: number; at: number } | undefined

		const onTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0]
			swipe =
				!desktop.matches &&
				e.touches.length === 1 &&
				touch &&
				!insideSideScroller(e.target)
					? { x: touch.clientX, y: touch.clientY, at: e.timeStamp }
					: undefined
		}

		const onTouchEnd = (e: TouchEvent) => {
			const touch = e.changedTouches[0]
			if (!swipe || !touch || document.querySelector('dialog[open]')) {
				swipe = undefined
				return
			}
			const dx = touch.clientX - swipe.x
			const dy = touch.clientY - swipe.y
			const quick = e.timeStamp - swipe.at < SWIPE_MS
			swipe = undefined
			if (
				quick &&
				Math.abs(dx) >= SWIPE_DISTANCE &&
				Math.abs(dx) > Math.abs(dy) * 2
			) {
				// swiping left brings in the next tab, as on a carousel
				go(sectionIndex(location.pathname) + (dx < 0 ? 1 : -1))
			}
		}

		document.addEventListener('keydown', onKey)
		window.addEventListener('wheel', onWheel, { passive: true })
		window.addEventListener('touchstart', onTouchStart, { passive: true })
		window.addEventListener('touchend', onTouchEnd, { passive: true })
		return () => {
			clearTimeout(idle)
			document.removeEventListener('keydown', onKey)
			window.removeEventListener('wheel', onWheel)
			window.removeEventListener('touchstart', onTouchStart)
			window.removeEventListener('touchend', onTouchEnd)
		}
	}, [router])

	return null
}
