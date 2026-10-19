import { sections } from 'config/sections'

/** The section a path belongs to: /blog/<slug> is still Press */
export function sectionIndex(pathname: string) {
	const i = sections.findIndex((s) =>
		s.href === '/' ? pathname === '/' : pathname.startsWith(s.href)
	)
	return Math.max(0, i)
}
