import Garage from 'components/Garage'
import { profile } from 'config/profile'
import { pageMetadata } from 'lib/pageMetadata'

export const metadata = pageMetadata({
	title: `Garage | ${profile.name}`,
	description: `Side projects ${profile.name} builds for fun, like NuPrint, LoftLog and CardWise, and the pull requests merged into other people's open source projects.`,
	path: '/garage',
})

export default function GaragePage() {
	return <Garage />
}
