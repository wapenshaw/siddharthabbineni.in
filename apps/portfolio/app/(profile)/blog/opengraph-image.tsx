import { profile } from 'config/profile'
import { sectionCard } from 'lib/sectionCard'
import { CARD_SIZE } from 'lib/shareCard'

export const alt = `Press, ${profile.name}`
export const size = CARD_SIZE
export const contentType = 'image/png'

export default function Image() {
	return sectionCard('/blog')
}
