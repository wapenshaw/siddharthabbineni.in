import Press from 'components/Press'
import { profile } from 'config/profile'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Press | ${profile.name}`,
	description: `The latest posts from ${profile.name}'s blog`,
	alternates: {
		canonical: '/blog',
	},
}

export default function PressPage() {
	return <Press />
}
