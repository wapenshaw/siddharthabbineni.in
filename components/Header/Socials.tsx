import {
	GitHubIcon,
	InstagramIcon,
	LinkedInIcon,
	TwitterIcon,
	YouTubeGamingIcon,
} from 'components/BrandIcons'
import { profile } from 'config/profile'
import styles from './Header.module.css'

const socials = [
	{ href: profile.links.github, label: 'GitHub', icon: <GitHubIcon /> },
	{ href: profile.links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
	{ href: profile.links.x, label: 'Twitter', icon: <TwitterIcon /> },
	{
		href: profile.links.exophase,
		label: 'Exophase gaming profile',
		icon: <YouTubeGamingIcon />,
	},
	{
		href: profile.links.instagram,
		label: 'Instagram',
		icon: <InstagramIcon />,
	},
]

/** Slanted icon links; the header shows them on desktops, the page foot on phones */
export default function Socials({ className }: { className?: string }) {
	return (
		<ul className={`${styles.socials} ${className ?? ''}`}>
			{socials.map((s) => (
				<li key={s.label}>
					<a
						className={`sl ${styles.soc}`}
						href={s.href}
						aria-label={s.label}
						title={s.label}
						target="_blank"
						rel="noopener noreferrer"
					>
						{s.icon}
					</a>
				</li>
			))}
		</ul>
	)
}
