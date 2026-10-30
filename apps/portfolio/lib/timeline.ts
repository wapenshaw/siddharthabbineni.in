import { type Job, jobs } from 'config/experience'
import { cacheLife } from 'next/cache'

const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

type YearMonth = { year: number; month: number }

function parse(value: string): YearMonth {
	const [year = 0, month = 1] = value.split('-').map(Number)
	return { year, month }
}

function format({ year, month }: YearMonth) {
	return `${MONTHS[month - 1]} ${year}`
}

/** A job as the Seasons route renders it; computed on the server */
export type Stint = Omit<Job, 'start' | 'end' | 'logo'> & {
	live: boolean
	/** '2016 to 2020' under the stop; the current job says 'Current stint' instead */
	years: string
	/** 'Dec 2020 to Aug 2025' or 'Since Aug 2025' */
	when: string
}

function toStint({ start, end, logo: _logo, ...job }: Job): Stint {
	const from = parse(start)
	const to = end ? parse(end) : undefined
	return {
		...job,
		live: !to,
		years: to ? `${from.year} to ${to.year}` : 'Current stint',
		when: to ? `${format(from)} to ${format(to)}` : `Since ${format(from)}`,
	}
}

/** Oldest first, like config/experience.ts */
export async function getSeasons(): Promise<Stint[]> {
	'use cache'
	cacheLife('max')

	return jobs.map(toStint)
}
