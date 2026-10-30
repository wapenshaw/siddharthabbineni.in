import { postHref } from 'lib/format'
import { getPosts, isOldBlog, runsOf } from 'lib/posts'
import { DEPLOY_URL } from 'lib/site'

export const dynamic = 'force-static'

/** What the portfolio's Press panel shows: the latest runs, and how many old posts there are */
export async function GET() {
	const posts = await getPosts()
	return Response.json({
		runs: runsOf(posts).map((p) => ({
			slug: p.slug,
			title: p.title,
			description: p.description,
			date: p.date,
			readingMinutes: p.readingMinutes,
			url: `${DEPLOY_URL}${postHref(p.slug)}`,
			...(p.archive && { firstOn: p.archive.site }),
		})),
		earlierCount: posts.filter(isOldBlog).length,
	})
}
