import LapBar, { LapList } from 'components/LapBar'
import {
	formatDate,
	formatLongDate,
	postHref,
	runType,
	sessionHref,
} from 'lib/format'
import {
	getPostContent,
	getPosts,
	isOldBlog,
	neighboursOf,
	type Post,
} from 'lib/posts'
import { AUTHOR, PORTFOLIO_URL, SITE_URL } from 'lib/site'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

// every post is a file in out/; anything else is the 404 page
export const dynamicParams = false

export async function generateStaticParams() {
	return (await getPosts()).map((p) => ({ slug: p.slug }))
}

async function find(slug: string) {
	const posts = await getPosts()
	const post = posts.find((p) => p.slug === slug)
	return post && { post, posts }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const found = await find((await params).slug)
	if (!found) {
		return {}
	}
	const { post } = found
	const url = `${SITE_URL}${postHref(post.slug)}`
	// the post's share card, drawn at build by ./og.png/route.ts
	const image = {
		url: `${postHref(post.slug)}og.png`,
		width: 1200,
		height: 630,
		alt: post.title,
	}
	return {
		title: post.title,
		description: post.description,
		alternates: { canonical: url },
		openGraph: {
			title: post.title,
			description: post.description,
			url,
			type: 'article',
			publishedTime: post.date,
			authors: [AUTHOR],
			tags: post.tags,
			images: [image],
		},
		twitter: {
			title: post.title,
			description: post.description,
			images: [image],
		},
	}
}

/** P1 for the newest run; the year for a post from the old blog */
const positionOf = (post: Post, list: Post[]) =>
	isOldBlog(post) ? post.date.slice(0, 4) : `P${list.indexOf(post) + 1}`

export default async function PostPage({ params }: Props) {
	const found = await find((await params).slug)
	if (!found) {
		notFound()
	}
	const { post, posts } = found
	const { newer, older, list } = neighboursOf(posts, post)
	const old = isOldBlog(post)
	const year = post.date.slice(0, 4)
	const pos = positionOf(post, list)
	const Content = await getPostContent(post)

	return (
		<>
			<LapBar laps={post.laps} />
			<main id="content" className="wrap">
				<header className="post-head cols">
					<div className="rail cond">
						<span
							className={old ? 'pos year' : pos === 'P1' ? 'pos newest' : 'pos'}
						>
							{pos}
						</span>
						<span className="run">{runType(post)}</span>
						<span>{post.readingMinutes} min read</span>
						<time dateTime={post.date}>{formatLongDate(post.date)}</time>
					</div>
					<div className="main">
						<h1 className="cond">{post.title}</h1>
						<p className="dek">{post.description}</p>
						{post.archive && (
							<p className="origin">
								First on {post.archive.site}.{' '}
								<a href={post.archive.url}>The original</a>
							</p>
						)}
					</div>
				</header>

				<div className="post-body cols">
					<aside aria-label="Laps" className="rail">
						{post.laps.length > 1 && <LapList laps={post.laps} />}
					</aside>
					{/* the column lines up with the title; the text inside stays narrow */}
					<article className="main">
						<div className="prose">
							<Content />
						</div>
						{/* at the end, so they don't make the header taller */}
						{post.tags && post.tags.length > 0 && (
							<ul className="tags" aria-label="Tags">
								{post.tags.map((tag) => (
									<li key={tag}>
										<a href={`/search/?q=${encodeURIComponent(tag)}`}>#{tag}</a>
									</li>
								))}
							</ul>
						)}
						<div id="post-end" />
					</article>
				</div>

				<nav aria-label="Newer and older posts" className="post-nav">
					{newer ? (
						<Neighbour post={newer} label="Newer post" list={list} />
					) : (
						<div className="slot empty">
							<p className="label cond">Newer post</p>
							<p>
								{old
									? `None. This is the last post from ${year}.`
									: 'None yet. This is the newest post.'}
							</p>
							<p>
								<a href={old ? '/#earlier' : '/#runs'}>
									{old
										? 'Back to the earlier sessions'
										: 'Back to the latest runs'}
								</a>
							</p>
						</div>
					)}
					{older ? (
						<Neighbour post={older} label="Older post" list={list} />
					) : (
						<div className="slot empty">
							<p className="label cond">Older post</p>
							<p>
								{old
									? `None. This is the first post from ${year}.`
									: 'None. This is the first run.'}
							</p>
							<p>
								<a href={old ? sessionHref(year) : '/#earlier'}>
									{old ? `All of ${year}` : 'The earlier sessions'}
								</a>
							</p>
						</div>
					)}
				</nav>
			</main>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD serialised from the post's front matter
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.title,
						description: post.description,
						datePublished: post.date,
						url: `${SITE_URL}${postHref(post.slug)}`,
						author: { '@type': 'Person', name: AUTHOR, url: PORTFOLIO_URL },
					}),
				}}
			/>
		</>
	)
}

function Neighbour({
	post,
	label,
	list,
}: {
	post: Post
	label: string
	list: Post[]
}) {
	return (
		<a href={postHref(post.slug)} className="slot">
			<span className="label cond">
				{label}
				{isOldBlog(post) ? null : `, ${positionOf(post, list)}`}
			</span>
			<span className="title cond">{post.title}</span>
			<span className="meta">
				{formatDate(post.date)}, {post.readingMinutes} min read
			</span>
		</a>
	)
}
