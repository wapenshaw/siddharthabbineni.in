'use client'

import { type ReactNode, useEffect, useRef } from 'react'

/**
 * The reader's scrolling area. Marks the article once the post's own header
 * has scrolled away (the tab row then shows the title) and keeps --read at
 * how far through the post you are, for the progress bar.
 */
export default function ReaderScroll({
	className,
	children,
}: {
	className?: string
	children: ReactNode
}) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = ref.current
		const article = el?.closest('article')
		if (!el || !article) {
			return
		}
		const head = el.querySelector('header')
		const onScroll = () => {
			const max = el.scrollHeight - el.clientHeight
			article.style.setProperty(
				'--read',
				String(max > 0 ? el.scrollTop / max : 0)
			)
			const top = el.getBoundingClientRect().top
			article.toggleAttribute(
				'data-scrolled',
				head ? head.getBoundingClientRect().bottom < top : el.scrollTop > 0
			)
		}
		onScroll()
		el.addEventListener('scroll', onScroll, { passive: true })
		return () => el.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	)
}
