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

async function getRecentAchievements(): Promise<RecentAchievement[]> {
	const gamesData = await fetchJson<{
		response: { games?: { appid: number; name: string }[] }
	}>(
		`${API}/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&count=5`
	)

	const games = gamesData?.response?.games ?? []
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

/** Cached with the 'gaming' profile from next.config.ts */
export async function getSteamAchievements(): Promise<SteamAchievementsResponse> {
	'use cache'
	cacheLife('gaming')

	if (!STEAM_API_KEY || !STEAM_USER_ID) {
		return { achievements: [], error: 'Steam API not configured' }
	}
	try {
		return { achievements: await getRecentAchievements() }
	} catch {
		return { achievements: [], error: 'Steam API error' }
	}
}
