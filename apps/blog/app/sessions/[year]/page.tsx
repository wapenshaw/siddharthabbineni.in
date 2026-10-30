import SiteNav from 'components/SiteNav'
import { formatDate, postHref, sessionHref } from 'lib/format'
import { pageMetadata } from 'lib/metadata'
import { getPosts, sessionOf, sessionYears } from 'lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ year: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
	return sessionYears(await getPosts()).map(({ year }) => ({ year }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { year } = await params
	return pageMetadata({
		title: `Posts from ${year}`,
		description: `My blog posts from ${year}, kept as I wrote them.`,
		path: sessionHref(year),
	})
}

/** One year of the old blog as a timing sheet, newest first */
export default async function Session({ params }: Props) {
	const { year } = await params
	const posts = await getPosts()
	const session = sessionOf(posts, year)
	if (session.length === 0) {
		notFound()
	}
	const years = sessionYears(posts).map((y) => y.year)
	const i = years.indexOf(year)
	const later = years[i - 1]
	const earlier = years[i + 1]

	return (
		<div className="wrap">
			<SiteNav />
			<main id="content">
				<header className="post-head cols">
					<div className="rail cond">
						<span className="pos year">{year}</span>
						<span className="run">Earlier session</span>
						<span>
							{session.length} {session.length === 1 ? 'post' : 'posts'}
						</span>
					</div>
					<div className="main">
						<h1 className="cond">Posts from {year}</h1>
						<p className="dek">
							From my old blog on Blogger and thesid.net, kept as I wrote them.
							Some links and pictures didn't survive.
						</p>
					</div>
				</header>

				<section className="section" aria-label={`Posts from ${year}`}>
					<ol className="sheet">
						{session.map((post) => (
							<li key={post.slug}>
								<a href={postHref(post.slug)}>
									<time className="date" dateTime={post.date}>
										{formatDate(post.date)}
									</time>
									<span className="title">{post.title}</span>
									<span className="mins">{post.readingMinutes} min read</span>
								</a>
							</li>
						))}
					</ol>
				</section>

				<nav aria-label="Other years" className="post-nav">
					{later ? (
						<a href={sessionHref(later)} className="slot">
							<span className="label cond">Later session</span>
							<span className="title cond">{later}</span>
						</a>
					) : (
						<div className="slot empty">
							<p className="label cond">Later session</p>
							<p>None. {year} is the last year of the old blog.</p>
						</div>
					)}
					{earlier ? (
						<a href={sessionHref(earlier)} className="slot">
							<span className="label cond">Earlier session</span>
							<span className="title cond">{earlier}</span>
						</a>
					) : (
						<div className="slot empty">
							<p className="label cond">Earlier session</p>
							<p>None. The old blog starts in {year}.</p>
						</div>
					)}
				</nav>
			</main>
		</div>
	)
}
