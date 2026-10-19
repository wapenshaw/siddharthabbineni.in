'use client'

import { useAnimate, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useRef } from 'react'
import { sectionIndex } from './sectionOf'

/**
 * The open section slides in from the direction of travel: down the nav
 * rises from below, up the nav drops from above. Opening another post inside
 * Press is not a section change, so it doesn't animate here.
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
		animate(
			scope.current,
			{ opacity: [0, 1], y: [`${dir * 1.2}rem`, '0rem'] },
			{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }
		)
	}, [section, reduced, animate, scope])

	return (
		<div ref={scope} className={className}>
			{children}
		</div>
	)
}
