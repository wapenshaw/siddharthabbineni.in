import { shareCard } from 'lib/shareCard'

export const dynamic = 'force-static'

/**
 * The blog's share card. A route handler rather than opengraph-image so the
 * static export writes a real .png that Azure serves as an image.
 */
export function GET() {
	return shareCard({
		pos: 'Where I try things out',
		title: 'Side projects, fixes, and what I learn building cloud platforms',
	})
}
