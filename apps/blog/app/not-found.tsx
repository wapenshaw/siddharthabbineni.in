import SiteNav from 'components/SiteNav'

export default function NotFound() {
	return (
		<div className="wrap">
			<SiteNav />
			<main id="content">
				<header className="post-head cols">
					<div className="rail cond">
						<span className="pos">404</span>
						<span className="run">Off the track</span>
					</div>
					<div className="main">
						<h1 className="cond">There's no page here</h1>
						<p className="dek">
							The link may be wrong, or the post may have moved.{' '}
							<a href="/">The latest runs</a> and the earlier sessions are on
							the home page.
						</p>
					</div>
				</header>
			</main>
		</div>
	)
}
