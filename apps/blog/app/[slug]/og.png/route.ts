import { formatDate, runType } from 'lib/format'
import { getPosts, isOldBlog, neighboursOf } from 'lib/posts'
import { shareCard } from 'lib/shareCard'

export const dynamic = 'force-static'
export const dynamicParams = false

/** One card per post, drawn at build into /<slug>/og.png */
export async function generateStaticParams() {
	return (await getPosts()).map((p) => ({ slug: p.slug }))
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params
	const posts = await getPosts()
	const post = posts.find((p) => p.slug === slug)
	if (!post) {
		return new Response('Not found', { status: 404 })
	}
	const { list } = neighboursOf(posts, post)
	const i = list.indexOf(post)
	const old = isOldBlog(post)
	return shareCard({
		pos: old
			? `${post.date.slice(0, 4)}, from the old blog`
			: `P${i + 1}, ${runType(post)}`,
		newest: !old && i === 0,
		title: post.title,
		meta: `${formatDate(post.date)}, ${post.readingMinutes} min read`,
	})
}
