import { profile } from 'config/profile'
import { getSteamAchievements } from 'lib/steam'
import { getXboxAchievements } from 'lib/xbox'
import type { Unlock } from 'types/gaming'
import styles from './TrophyCabinet.module.css'

const MAX_UNLOCKS = 6

const formatDate = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	timeZone: 'Asia/Kolkata',
})

/** Steam and Xbox are each cached for hours (lib/), so this renders into the static shell */
export default async function Unlocks() {
	const [steam, xbox] = await Promise.all([
		getSteamAchievements(),
		getXboxAchievements(),
	])

	const unlocks: Unlock[] = [
		...steam.achievements.map((a) => ({
			platform: 'Steam' as const,
			name: a.name,
			game: a.gameName,
			icon: a.icon,
			unlocktime: a.unlocktime,
		})),
		...xbox.achievements.map((a) => ({
			platform: 'Xbox' as const,
			name: a.name,
			game: a.gameName,
			icon: a.icon,
			unlocktime: a.unlocktime,
		})),
	]
		.sort((a, b) => b.unlocktime - a.unlocktime)
		.slice(0, MAX_UNLOCKS)

	const gamerscore = xbox.profile?.gamerscore

	return (
		<>
			<UnlocksHead
				gamerscore={gamerscore ? `${gamerscore.toLocaleString('en-US')} G` : ''}
			/>
			{unlocks.length === 0 ? (
				<p className={styles.offline}>
					The live feed is offline right now. The full history is on{' '}
					<a
						href={profile.links.exophase}
						target="_blank"
						rel="noopener noreferrer"
					>
						Exophase
					</a>
					.
				</p>
			) : (
				<ul className={styles.unlocks}>
					{unlocks.map((u) => (
						<li
							key={`${u.platform}-${u.game}-${u.name}`}
							className={styles.unlock}
						>
							{u.icon ? (
								<img
									className={styles.icon}
									src={u.icon}
									alt=""
									width={40}
									height={40}
									loading="lazy"
								/>
							) : (
								<span className={`ph ${styles.icon}`} />
							)}
							<span className={styles.unlockText}>
								<span className={styles.unlockName}>{u.name}</span>
								<span className={styles.unlockMeta}>
									{u.game} · {u.platform} ·{' '}
									{formatDate.format(new Date(u.unlocktime * 1000))}
								</span>
							</span>
						</li>
					))}
				</ul>
			)}
		</>
	)
}

function UnlocksHead({ gamerscore }: { gamerscore: string }) {
	return (
		<div className={styles.unlocksHead}>
			<h3 className="label label-hi">Recent unlocks · live</h3>
			<span className={`label ${styles.gamerscore}`}>{gamerscore}</span>
		</div>
	)
}

export function UnlocksSkeleton() {
	return (
		<>
			<UnlocksHead gamerscore="" />
			<ul
				className={styles.unlocks}
				aria-busy="true"
				aria-label="Loading unlocks"
			>
				{Array.from({ length: MAX_UNLOCKS }, (_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed placeholder rows
					<li key={i} className={styles.unlock}>
						<span className={`ph ${styles.icon}`} />
						<span className={styles.unlockText}>
							<span className={`ph ${styles.bar}`} />
							<span className={`ph ${styles.bar} ${styles.barShort}`} />
						</span>
					</li>
				))}
			</ul>
		</>
	)
}
