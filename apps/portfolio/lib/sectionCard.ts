import { profile } from 'config/profile'
import { sections } from 'config/sections'
import { shareCard } from 'lib/shareCard'

/** A section's share card: its tab and colour, its plain line as the title */
export function sectionCard(href: string) {
	const section = sections.find((s) => s.href === href) ?? sections[0]
	return shareCard({
		tab: section?.name ?? 'Driver profile',
		colour: section?.colour ?? 'purple',
		title: section?.line ?? profile.tagline,
		meta: profile.tagline,
	})
}
