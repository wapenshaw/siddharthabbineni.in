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

function current(): YearMonth {
	const now = new Date()
	return { year: now.getFullYear(), month: now.getMonth() + 1 }
}

function format({ year, month }: YearMonth) {
	return `${MONTHS[month - 1]} ${year}`
}

/** A job as the campaign timeline renders it; computed on the server */
export type Chapter = Omit<Job, 'start' | 'end'> & {
	n: string
	months: number
	live: boolean
	years: string
	when: string
}

function toChapters(jobs: Job[]): Chapter[] {
	return jobs.map(({ start, end, ...job }, i) => {
		const from = parse(start)
		const to = end ? parse(end) : current()
		const months = Math.max(
			1,
			(to.year - from.year) * 12 + (to.month - from.month)
		)
		const years = !end
			? `${from.year} – now`
			: months < 24
				? `${from.year}–${String(to.year).slice(2)}`
				: `${from.year} – ${to.year}`
		return {
			...job,
			n: String(i + 1).padStart(2, '0'),
			months,
			live: !end,
			years,
			when: `${format(from)} – ${end ? format(to) : 'Present'}`,
		}
	})
}

/** Even years from the first job to now, for the axis under the timeline */
function axisYears(jobs: Job[]): number[] {
	const first = parse(jobs[0]?.start ?? '2010-01').year
	const last = current().year
	const years: number[] = []
	for (let y = first - (first % 2); y <= last + (last % 2); y += 2) {
		years.push(y)
	}
	return years
}

/** "Now" moves the current job and the axis, so this refreshes daily */
export async function getCampaign() {
	'use cache'
	cacheLife('days')

	return { chapters: toChapters(jobs), axis: axisYears(jobs) }
}
