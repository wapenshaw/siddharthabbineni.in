import Seasons from 'components/Seasons'
import { getSeasons } from 'lib/timeline'

export default async function SeasonsPage() {
	return <Seasons stints={await getSeasons()} />
}
