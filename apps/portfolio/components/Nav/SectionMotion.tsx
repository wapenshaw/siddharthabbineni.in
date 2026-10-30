'use client'

import { useAnimate, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useRef } from 'react'
import { sectionIndex } from './sectionOf'

/** The one-screen layout, where the nav is a column; elsewhere it is a row of tabs */
const DESKTOP = '(min-width: 1180px) and (min-height: 560px)'

/**
 * The open section slides in from the direction of travel: down the nav
 * rises from below, up the nav drops from above. On phones the tabs run
 * sideways, so the section slides in from the side, as a swipe moves it.
 */
export default function SectionMotion({
	className,
	children,
}: {
	className?: string
	children: ReactNode
}) {
	const [scope, animate] = useAnimate<HTMLDivElement>()
	const reduced = useReducedMotion()
	const section = sectionIndex(usePathname())
	const previous = useRef(section)

	useEffect(() => {
		const dir = Math.sign(section - previous.current)
		previous.current = section
		if (dir === 0 || reduced || !scope.current) {
			return
		}
		const axis = matchMedia(DESKTOP).matches ? 'y' : 'x'
		animate(
			scope.current,
			{ opacity: [0, 1], [axis]: [`${dir * 1.2}rem`, '0rem'] },
			{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }
		)
	}, [section, reduced, animate, scope])

	return (
		<div ref={scope} className={className}>
			{children}
		</div>
	)
}
