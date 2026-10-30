import { cacheLife } from 'next/cache'
import type {
	AchievementSchema,
	RecentAchievement,
	SteamAchievement,
	SteamAchievementsResponse,
} from 'types/steam'

const STEAM_API_KEY = process.env.STEAM_API_KEY
const STEAM_USER_ID = process.env.STEAM_USER_ID
const API = 'https://api.steampowered.com'

async function fetchJson<T>(url: string): Promise<T | null> {
	try {
		const res = await fetch(url)
		if (!res.ok) {
			return null
		}
		return (await res.json()) as T
	} catch {
		return null
	}
}

interface OwnedGame {
	appid: number
	name: string
	rtime_last_played?: number
	has_community_visible_stats?: boolean
}

/**
 * The five most recently played games that have achievements. Uses the owned
 * games list because GetRecentlyPlayedGames only covers the last two weeks.
 */
async function getLastPlayedGames(): Promise<OwnedGame[]> {
	const owned = await fetchJson<{ response: { games?: OwnedGame[] } }>(
		`${API}/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&include_appinfo=1&include_played_free_games=1`
	)
	return (owned?.response?.games ?? [])
		.filter((g) => g.has_community_visible_stats && g.rtime_last_played)
		.sort((a, b) => (b.rtime_last_played ?? 0) - (a.rtime_last_played ?? 0))
		.slice(0, 5)
}

async function getRecentAchievements(): Promise<RecentAchievement[]> {
	const games = await getLastPlayedGames()
	if (games.length === 0) {
		return []
	}

	const gameResults = await Promise.all(
		games.map(async (game) => {
			const [playerData, schemaData] = await Promise.all([
				fetchJson<{
					playerstats: { achievements?: SteamAchievement[] }
				}>(
					`${API}/ISteamUserStats/GetPlayerAchievements/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&appid=${game.appid}`
				),
				fetchJson<{
					game: {
						availableGameStats?: { achievements?: AchievementSchema[] }
					}
				}>(
					`${API}/ISteamUserStats/GetSchemaForGame/v2/?key=${STEAM_API_KEY}&appid=${game.appid}`
				),
			])

			const unlocked =
				playerData?.playerstats?.achievements?.filter(
					(a) => a.achieved === 1
				) ?? []

			const schemaMap = new Map(
				(schemaData?.game?.availableGameStats?.achievements ?? []).map((s) => [
					s.name,
					s,
				])
			)

			return unlocked.map((a): RecentAchievement => {
				const schema = schemaMap.get(a.apiname)
				return {
					name: schema?.displayName ?? a.apiname,
					description: schema?.description ?? '',
					icon: schema?.icon ?? '',
					unlocktime: a.unlocktime,
					gameName: game.name,
					appid: game.appid,
				}
			})
		})
	)

	return gameResults
		.flat()
		.sort((a, b) => b.unlocktime - a.unlocktime)
		.slice(0, 6)
}

/** Cached with the 'gaming' profile from next.config.ts; a failure for minutes */
export async function getSteamAchievements(): Promise<SteamAchievementsResponse> {
	'use cache'

	if (!STEAM_API_KEY || !STEAM_USER_ID) {
		// the keys are Azure app settings; retry soon once they're added
		cacheLife('minutes')
		return { achievements: [], error: 'Steam API not configured' }
	}
	try {
		const achievements = await getRecentAchievements()
		cacheLife('gaming')
		return { achievements }
	} catch {
		cacheLife('minutes')
		return { achievements: [], error: 'Steam API error' }
	}
}
