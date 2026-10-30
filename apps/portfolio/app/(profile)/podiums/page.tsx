import Podiums from 'components/Podiums'
import { profile } from 'config/profile'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Podiums | ${profile.name}`,
	description: `${profile.name}'s Microsoft Azure certifications and latest game achievements.`,
	alternates: { canonical: '/podiums' },
}

export default function PodiumsPage() {
	return <Podiums />
}
