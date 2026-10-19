import { getUpstreamPullRequests } from 'lib/github'
import { formatPostDate, postHref } from 'lib/postFormat'
import { getPosts, isArchived } from 'lib/posts'
import Ticker, { type RadioItem } from './Ticker'

const prDate = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC',
})

/** The footer bar: the two newest posts and the two newest merged PRs, taking turns */
export default async function TeamRadio({ className }: { className?: string }) {
	const [posts, prs] = await Promise.all([
		getPosts(),
		getUpstreamPullRequests(),
	])

	const newPosts: RadioItem[] = posts
		.filter((p) => !isArchived(p))
		.slice(0, 2)
		.map((p) => ({
			kind: 'New post',
			title: p.title,
			href: postHref(p.slug),
			date: formatPostDate(p.date),
		}))
	const merged: RadioItem[] = prs
		.filter((p) => p.state === 'merged')
		.slice(0, 2)
		.map((p) => ({
			kind: 'PR merged',
			title: p.title,
			detail: p.repo,
			href: p.url,
			external: true,
			date: prDate.format(new Date(p.date)),
		}))

	// post, PR, post, PR, so neither kind waits long for a turn
	const items = [newPosts[0], merged[0], newPosts[1], merged[1]].filter(
		(item): item is RadioItem => Boolean(item)
	)

	return <Ticker items={items} className={className} />
}
