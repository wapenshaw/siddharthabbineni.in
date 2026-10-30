import { PORTFOLIO_URL } from 'lib/site'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

/** The top of the home page and the session pages */
export default function SiteNav() {
	return (
		<nav aria-label="Site" className="site-nav">
			<Link href="/" className="brand cond">
				Free practice
			</Link>
			{/* hidden on phones, where the sections are a short scroll away */}
			<Link href="/#runs" className="nav-section">
				Latest runs
			</Link>
			<Link href="/#earlier" className="nav-section">
				Earlier sessions
			</Link>
			<a href="/search/">Search</a>
			<a href={PORTFOLIO_URL}>The portfolio</a>
			<ThemeToggle />
		</nav>
	)
}
