import { StackOverflowIcon } from 'components/BrandIcons'
import { profile } from 'config/profile'
import { getStackOverflowProfile } from 'lib/stackoverflow'
import styles from './Header.module.css'

const compact = new Intl.NumberFormat('en', {
	notation: 'compact',
	maximumFractionDigits: 1,
})

/** Reputation in papaya beside the socials; the full stats are on Driver profile */
export default async function StackOverflowChip() {
	const user = await getStackOverflowProfile()

	return (
		<a
			className={`sl ${styles.so}`}
			href={
				user
					? `https://stackoverflow.com/users/${user.user_id}/`
					: profile.links.stackoverflow
			}
			aria-label={
				user
					? `Stack Overflow: ${user.reputation} reputation`
					: 'Stack Overflow'
			}
			title={user ? `${user.reputation} reputation` : 'Stack Overflow'}
			target="_blank"
			rel="noopener noreferrer"
		>
			<StackOverflowIcon />
			{user && <span>{compact.format(user.reputation)}</span>}
		</a>
	)
}
