import { postHref } from 'lib/format'
import { getPosts, isOldBlog } from 'lib/posts'
import { AUTHOR, BLOG_NAME, DESCRIPTION, SITE_URL } from 'lib/site'

export const dynamic = 'force-static'

const escapeXml = (s: string) =>
	s
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')

/** RSS 2.0 feed of the latest runs (not the old blog): titles and descriptions, linking to each */
export async function GET() {
	const posts = (await getPosts()).filter((p) => !isOldBlog(p))
	const items = posts
		.map((p) => {
			const url = `${SITE_URL}${postHref(p.slug)}`
			const categories = (p.tags ?? [])
				.map((t) => `<category>${escapeXml(t)}</category>`)
				.join('')
			return `<item><title>${escapeXml(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(p.description)}</description>${categories}</item>`
		})
		.join('')

	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(`${BLOG_NAME} | ${AUTHOR}`)}</title><link>${SITE_URL}/</link><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/><description>${escapeXml(DESCRIPTION)}</description><language>en</language>${items}</channel></rss>`

	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
	})
}
