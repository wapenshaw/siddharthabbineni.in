import type { Route } from 'next'

/** Section colours from the F1 palette; each has its own text colour for contrast */
export type SectionColour = 'red' | 'purple' | 'yellow' | 'green' | 'blue'

export type Section = {
	name: string
	/** Plain words under the F1 name */
	line: string
	href: Route
	colour: SectionColour
}

/** The left nav, top to bottom (tabs on phones) */
export const sections: Section[] = [
	{ name: 'Seasons', line: 'Where I’ve worked', href: '/', colour: 'red' },
	{
		name: 'Driver profile',
		line: 'About me and my skills',
		href: '/profile',
		colour: 'purple',
	},
	{
		name: 'Podiums',
		line: 'Certifications and games',
		href: '/podiums',
		colour: 'yellow',
	},
	{
		name: 'Garage',
		line: 'Things I build for fun',
		href: '/garage',
		colour: 'green',
	},
	{ name: 'Press', line: 'Writing, since 2005', href: '/blog', colour: 'blue' },
]
