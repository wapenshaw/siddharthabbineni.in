import Podiums from 'components/Podiums'
import { profile } from 'config/profile'
import { pageMetadata } from 'lib/pageMetadata'

export const metadata = pageMetadata({
	title: `Podiums | ${profile.name}`,
	description: `${profile.name}'s Microsoft Azure certifications, from fundamentals to expert, plus the latest achievements from Xbox and Steam.`,
	path: '/podiums',
})

export default function PodiumsPage() {
	return <Podiums />
}
