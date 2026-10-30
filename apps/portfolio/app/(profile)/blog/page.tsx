import Press from 'components/Press'
import { profile } from 'config/profile'
import { pageMetadata } from 'lib/pageMetadata'

export const metadata = pageMetadata({
	title: `Press | ${profile.name}`,
	description: `The latest posts from Free practice, ${profile.name}'s blog about cloud, automation, .NET, AI coding tools and the things I build at home.`,
	path: '/blog',
})

export default function PressPage() {
	return <Press />
}
