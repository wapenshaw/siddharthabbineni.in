import type { Route } from 'next'
import type { Post } from './posts'

/** A long run takes this many minutes or more to read */
export const LONG_RUN_MINUTES = 6

const shortDate = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC',
})

const longDate = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC',
})

const at = (date: string) => new Date(`${date}T00:00:00Z`)

/** '2020-07-10' → '10 Jul 2020' */
export const formatDate = (date: string) => shortDate.format(at(date))

/** '2020-07-10' → '10 July 2020' */
export const formatLongDate = (date: string) => longDate.format(at(date))

export const runType = (post: Pick<Post, 'readingMinutes'>) =>
	post.readingMinutes >= LONG_RUN_MINUTES ? 'Long run' : 'Short run'

export const postHref = (slug: string) => `/${slug}/` as Route

export const sessionHref = (year: string) => `/sessions/${year}/` as Route

const YOUTUBE_ID =
	/^https?:\/\/(?:www\.|m\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([\w-]{11})/

/** The video id of a YouTube watch, share, shorts or embed link */
export const youTubeId = (href: string | undefined) =>
	href?.match(YOUTUBE_ID)?.[1]
