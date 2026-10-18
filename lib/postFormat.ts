/** Formatting shared by the post list (client) and the reader (server) */
import type { Route } from 'next'

const dateFormat = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC',
})

/** '2020-07-10' → '10 Jul 2020' (safe to use in client components) */
export const formatPostDate = (date: string) =>
	dateFormat.format(new Date(`${date}T00:00:00Z`))

/** 'Log 07': posts are numbered oldest first */
export const logNumber = (n: number) => `Log ${String(n).padStart(2, '0')}`

/** A post's URL (slugs are file names, so they never contain a slash) */
export const postHref = (slug: string) => `/blog/${slug}` as Route

const YOUTUBE_ID =
	/^https?:\/\/(?:www\.|m\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([\w-]{11})/

/** The video id of a YouTube watch, share, shorts or embed link */
export const youTubeId = (href: string | undefined) =>
	href?.match(YOUTUBE_ID)?.[1]
