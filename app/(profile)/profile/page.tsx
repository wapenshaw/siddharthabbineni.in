import DriverProfile from 'components/DriverProfile'
import { profile } from 'config/profile'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Driver profile | ${profile.name}`,
	description: `About ${profile.name}: what I do and how I work.`,
	alternates: { canonical: '/profile' },
}

export default function ProfilePage() {
	return <DriverProfile />
}
