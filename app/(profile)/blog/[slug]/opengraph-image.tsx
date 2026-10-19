import { profile } from 'config/profile'
import { formatPostDate, logNumber } from 'lib/postFormat'
import { getPosts, isArchived } from 'lib/posts'
import { CARD_SIZE, shareCard } from 'lib/shareCard'

export const alt = `A post by ${profile.name}`
export const size = CARD_SIZE
export const contentType = 'image/png'

/** One card per post, drawn at build */
export async function generateStaticParams() {
	return (await getPosts()).map((p) => ({ slug: p.slug }))
}

export default async function Image({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const posts = await getPosts()
	const post = posts.find((p) => p.slug === slug)
	if (!post) {
		return shareCard({
			tab: 'Press',
			colour: 'blue',
			title: 'Writing, since 2005',
		})
	}
	// the same label the reader's tab shows
	const list = posts.filter((p) => isArchived(p) === isArchived(post))
	return shareCard({
		tab: post.archive
			? `Archive, ${post.archive.site}`
			: logNumber(list.length - list.indexOf(post)),
		colour: 'blue',
		title: post.title,
		meta: `${formatPostDate(post.date)}, ${post.readingMinutes} min read`,
	})
}
