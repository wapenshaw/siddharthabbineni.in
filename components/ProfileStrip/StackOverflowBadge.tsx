import { StackOverflowIcon } from 'components/BrandIcons'
import { profile } from 'config/profile'
import { getStackOverflowProfile } from 'lib/stackoverflow'
import styles from './StackOverflowBadge.module.css'

const tiers = ['gold', 'silver', 'bronze'] as const
const compact = new Intl.NumberFormat('en', {
	notation: 'compact',
	maximumFractionDigits: 1,
})

export default async function StackOverflowBadge() {
	const user = await getStackOverflowProfile()
	const change = user?.reputation_change_month ?? 0

	return (
		<a
			className={styles.badge}
			aria-label={
				user
					? `Stack Overflow: ${user.reputation} reputation, ${change} reputation change this month, ${tiers.map((tier) => `${user.badge_counts[tier]} ${tier} badges`).join(', ')}`
					: 'Stack Overflow'
			}
			href={
				user
					? `https://stackoverflow.com/users/${user.user_id}/`
					: profile.links.stackoverflow
			}
			target="_blank"
			rel="noopener noreferrer"
		>
			<StackOverflowIcon />
			<span className={user ? 'sr-only' : undefined}>Stack Overflow</span>
			{user && (
				<>
					<strong title={`${user.reputation} reputation`}>
						{compact.format(user.reputation)}
					</strong>
					<span className={styles.change} title="Reputation change this month">
						{change >= 0 ? '+' : ''}
						{change} this month
					</span>
					<span className={styles.badges}>
						{tiers.map((tier) => (
							<span
								key={tier}
								title={`${user.badge_counts[tier]} ${tier} badges`}
							>
								<span
									className={`${styles.dot} ${styles[tier]}`}
									aria-hidden="true"
								/>
								{user.badge_counts[tier]}
							</span>
						))}
					</span>
				</>
			)}
		</a>
	)
}
