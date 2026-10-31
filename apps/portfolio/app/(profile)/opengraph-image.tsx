import { profile } from 'config/profile'
import { CARD_SIZE, shareCard } from 'lib/shareCard'

export const alt = `${profile.name}: ${profile.tagline}`
export const size = CARD_SIZE
export const contentType = 'image/png'

/** The home page (Driver profile) card: the tagline, as the header says it */
export default function Image() {
	return shareCard({
		tab: 'F1-style portfolio',
		colour: 'red',
		title: profile.tagline,
		meta: 'Driver profile, Seasons, Podiums, Garage and Press',
	})
}
