'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { isPostPath, STANDALONE } from './standalone'

/** Leaving the post for any other page brings the whole dashboard back */
export function StandaloneWatch() {
	const pathname = usePathname()
	useEffect(() => {
		if (!isPostPath(pathname)) {
			document.documentElement.removeAttribute(STANDALONE)
		}
	}, [pathname])
	return null
}

/** Opens the dashboard around the post you're reading */
export function ExploreButton({ className }: { className?: string }) {
	return (
		<button
			type="button"
			className={`btn btn-red sl ${className ?? ''}`}
			onClick={() => document.documentElement.removeAttribute(STANDALONE)}
		>
			See the whole site
		</button>
	)
}
