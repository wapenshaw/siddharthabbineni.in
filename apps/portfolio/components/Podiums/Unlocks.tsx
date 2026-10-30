import tower from 'components/Tower.module.css'
import { profile } from 'config/profile'
import { getSteamAchievements } from 'lib/steam'
import { getXboxAchievements } from 'lib/xbox'
import type { Unlock } from 'types/gaming'

const MAX_UNLOCKS = 6

const formatDate = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	timeZone: 'Asia/Kolkata',
})

const byNewest = (a: Unlock, b: Unlock) => b.unlocktime - a.unlocktime

/**
 * Half the rows go to each platform, so a busy month on one never hides the
 * other. A platform with fewer unlocks leaves its spare rows to the other.
 */
function pickEvenly(steam: Unlock[], xbox: Unlock[]): Unlock[] {
	const half = MAX_UNLOCKS / 2
	const s = [...steam].sort(byNewest)
	const x = [...xbox].sort(byNewest)
	const steamCount = Math.min(s.length, Math.max(half, MAX_UNLOCKS - x.length))
	const xboxCount = Math.min(x.length, MAX_UNLOCKS - steamCount)
	return [...s.slice(0, steamCount), ...x.slice(0, xboxCount)].sort(byNewest)
}

/** Steam and Xbox are each cached for hours (lib/), so this renders into the static shell */
export default async function Unlocks() {
	const [steam, xbox] = await Promise.all([
		getSteamAchievements(),
		getXboxAchievements(),
	])

	const unlocks = pickEvenly(
		steam.achievements.map((a) => ({
			platform: 'Steam',
			name: a.name,
			game: a.gameName,
			icon: a.icon,
			unlocktime: a.unlocktime,
		})),
		xbox.achievements.map((a) => ({
			platform: 'Xbox',
			name: a.name,
			game: a.gameName,
			icon: a.icon,
			unlocktime: a.unlocktime,
		}))
	)
	const gamerscore = xbox.profile?.gamerscore

	return (
		<>
			<UnlocksHead
				gamerscore={gamerscore ? `${gamerscore.toLocaleString('en-US')} G` : ''}
			/>
			{unlocks.length === 0 ? (
				<p className={tower.empty}>
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
				<ol className={tower.rows}>
					{unlocks.map((u) => (
						<li key={`${u.platform}-${u.game}-${u.name}`} className={tower.row}>
							{u.icon ? (
								<img
									className={tower.icon}
									src={u.icon}
									alt=""
									width={40}
									height={40}
									loading="lazy"
								/>
							) : (
								<span className={`ph ${tower.icon}`} />
							)}
							<span className={tower.text}>
								<b>{u.name}</b>
								<small>
									{u.game}, {u.platform}
								</small>
							</span>
							<span className={tower.date}>
								{formatDate.format(new Date(u.unlocktime * 1000))}
							</span>
						</li>
					))}
				</ol>
			)}
		</>
	)
}

function UnlocksHead({ gamerscore }: { gamerscore: string }) {
	return (
		<div className={tower.head}>
			<h2 id="unlocks-title">Achievements</h2>
			<span>{gamerscore || 'Live from Steam and Xbox'}</span>
		</div>
	)
}

export function UnlocksSkeleton() {
	return (
		<>
			<UnlocksHead gamerscore="" />
			<ol className={tower.rows} aria-busy="true" aria-label="Loading">
				{Array.from({ length: MAX_UNLOCKS }, (_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed placeholder rows
					<li key={i} className={tower.row}>
						<span className={`ph ${tower.icon}`} />
					</li>
				))}
			</ol>
		</>
	)
}
