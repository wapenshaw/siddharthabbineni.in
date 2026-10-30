import Search from 'components/Search'
import SiteNav from 'components/SiteNav'
import { getPosts } from 'lib/posts'
import { SITE_URL } from 'lib/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Search',
	description: 'Search every post on the blog, from 2005 to now.',
	alternates: { canonical: `${SITE_URL}/search/` },
}

export default async function SearchPage() {
	const posts = await getPosts()

	return (
		<div className="wrap">
			<SiteNav />
			<main id="content">
				<header className="post-head search-head cols">
					<div className="rail cond">
						<span className="pos">{posts.length}</span>
						<span className="run">Posts to search</span>
					</div>
					<div className="main">
						<h1 className="cond">Search</h1>
						<Search total={posts.length} />
					</div>
				</header>
			</main>
		</div>
	)
}
