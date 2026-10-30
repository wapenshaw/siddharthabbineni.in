import DriverProfile from 'components/DriverProfile'
import { profile } from 'config/profile'
import { pageMetadata } from 'lib/pageMetadata'

export const metadata = pageMetadata({
	title: `Driver profile | ${profile.name}`,
	description: `About ${profile.name}, an automation engineer and cloud architect in Hyderabad: how I work, what I build with, and my Stack Overflow record.`,
	path: '/profile',
})

export default function ProfilePage() {
	return <DriverProfile />
}
