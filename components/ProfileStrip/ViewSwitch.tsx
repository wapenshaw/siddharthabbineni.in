'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** Swaps the view under the strip: profile ⇄ devlog */
export default function ViewSwitch() {
	const onDevlog = usePathname() === '/blog'

	return onDevlog ? (
		<Link className="btn btn-fill" href="/">
			← Profile
		</Link>
	) : (
		<Link className="btn btn-fill" href="/blog">
			Devlog
		</Link>
	)
}
