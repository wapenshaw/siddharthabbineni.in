import type { SimpleIcon } from 'simple-icons'
import {
	siGithub,
	siInstagram,
	siStackoverflow,
	siYoutubegaming,
} from 'simple-icons'
import styles from './BrandIcons.module.css'

function BrandIcon({ icon, size = 16 }: { icon: SimpleIcon; size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d={icon.path} />
		</svg>
	)
}

export const GitHubIcon = () => <BrandIcon icon={siGithub} />
export const InstagramIcon = () => <BrandIcon icon={siInstagram} />
export const YouTubeGamingIcon = () => <BrandIcon icon={siYoutubegaming} />
export const StackOverflowIcon = () => (
	<BrandIcon icon={siStackoverflow} size={22} />
)

// Simple Icons removed these brands. Keep its v11.15.0 assets locally.
export const TwitterIcon = () => (
	<span className={`${styles.legacy} ${styles.twitter}`} aria-hidden="true" />
)
export const LinkedInIcon = () => (
	<span className={`${styles.legacy} ${styles.linkedin}`} aria-hidden="true" />
)
