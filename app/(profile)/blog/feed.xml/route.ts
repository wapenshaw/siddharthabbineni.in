import { profile } from 'config/profile'
import { SITE_URL } from 'config/site'
import { getPosts, isArchived } from 'lib/posts'

const escapeXml = (s: string) =>
	s
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')

/** RSS 2.0 feed of the devlog's new posts (not the archive): titles and descriptions, linking to each */
export async function GET() {
	const posts = (await getPosts()).filter((p) => !isArchived(p))
	const items = posts
		.map((p) => {
			const url = `${SITE_URL}/blog/${p.slug}`
			const categories = (p.tags ?? [])
				.map((t) => `<category>${escapeXml(t)}</category>`)
				.join('')
			return `<item><title>${escapeXml(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(p.description)}</description>${categories}</item>`
		})
		.join('')

	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(`Devlog | ${profile.name}`)}</title><link>${SITE_URL}/blog</link><atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/><description>${escapeXml(`Articles and guides by ${profile.name}`)}</description><language>en</language>${items}</channel></rss>`

	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
	})
}
