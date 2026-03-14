import { IconType } from 'react-icons'
import {
	FaInstagram,
	FaLinkedin,
	FaTwitter,
	FaGithub,
	FaDev,
} from 'react-icons/fa'
import { IoGameControllerOutline } from 'react-icons/io5'

type SocialMedia = {
	label: string
	href: string
	icon: IconType
}

export const SocialMedias: SocialMedia[] = [
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/siddharthabbineni/',
		icon: FaLinkedin,
	},
	{
		label: 'Github',
		href: 'https://github.com/wapenshaw',
		icon: FaGithub,
	},
	{
		label: 'Dev.to',
		href: 'https://dev.to/wapenshaw',
		icon: FaDev,
	},
	{
		label: 'Twitter',
		href: 'https://www.twitter.com/tHeSiD',
		icon: FaTwitter,
	},
	{
		label: 'Games',
		href: 'https://www.exophase.com/user/tHeSiD/',
		icon: IoGameControllerOutline,
	},
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/tHeSiD/',
		icon: FaInstagram,
	},
]
