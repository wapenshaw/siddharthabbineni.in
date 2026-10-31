import Seasons from 'components/Seasons'
import { profile } from 'config/profile'
import { pageMetadata } from 'lib/pageMetadata'
import { getSeasons } from 'lib/timeline'

export const metadata = pageMetadata({
	title: `Seasons | ${profile.name}`,
	description: `Where ${profile.name} has worked since ${profile.startYear}: each job, what I did there and what I built with.`,
	path: '/seasons',
})

export default async function SeasonsPage() {
	return <Seasons stints={await getSeasons()} />
}
