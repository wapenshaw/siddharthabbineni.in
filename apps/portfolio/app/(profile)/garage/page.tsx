import Garage from 'components/Garage'
import { profile } from 'config/profile'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Garage | ${profile.name}`,
	description: `Things ${profile.name} builds for fun, and pull requests merged into other people's projects.`,
	alternates: { canonical: '/garage' },
}

export default function GaragePage() {
	return <Garage />
}
