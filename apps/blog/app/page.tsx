import RunSlot from 'components/RunSlot'
import SiteNav from 'components/SiteNav'
import { sessionHref } from 'lib/format'
import { getPosts, isOldBlog, runsOf, sessionYears } from 'lib/posts'
import { DESCRIPTION } from 'lib/site'

export default async function Home() {
	const posts = await getPosts()
	const runs = runsOf(posts)
	const years = sessionYears(posts)
	const oldCount = posts.filter(isOldBlog).length
	const most = Math.max(...years.map((y) => y.count))

	return (
		<div className="wrap">
			<SiteNav />

			<header className="masthead">
				<h1 className="cond">Free practice</h1>
				<div className="about">
					<p className="pit-light cond">Pit lane open</p>
					<p>{DESCRIPTION}</p>
					{/* a plain form, so it works before any script loads */}
					<search>
						<form action="/search/" className="search-box">
							<input
								type="search"
								name="q"
								placeholder={`Search all ${posts.length} posts`}
								aria-label="Search posts"
							/>
							<button type="submit" className="cond">
								Search
							</button>
						</form>
					</search>
				</div>
			</header>

			<main id="content">
				<section aria-labelledby="runs" className="section">
					<h2 id="runs" className="section-title cond">
						Latest runs <small>newest in P1</small>
					</h2>
					<ol className="runs">
						{runs.map((post, i) => (
							<RunSlot key={post.slug} post={post} pos={i + 1} />
						))}
					</ol>
					<p className="runs-note">
						A long run takes six minutes or more to read; a short run is a quick
						one.
					</p>
				</section>

				<section aria-labelledby="earlier" className="section earlier">
					<h2 id="earlier" className="section-title cond">
						Earlier sessions
					</h2>
					<p className="section-intro">
						{oldCount} posts from my old blog on Blogger and thesid.net, kept as
						I wrote them.
					</p>
					<ul className="years">
						{years.map(({ year, count }) => (
							<li key={year}>
								<a href={sessionHref(year)}>
									<span className="year cond">{year}</span>
									<span
										className={count === most ? 'bar most' : 'bar'}
										style={{ width: `${(count / most) * 100}%` }}
										aria-hidden="true"
									/>
									<span className="count">
										{count} {count === 1 ? 'post' : 'posts'}
									</span>
								</a>
							</li>
						))}
					</ul>
				</section>
			</main>
		</div>
	)
}
