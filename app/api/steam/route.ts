import { NextResponse } from 'next/server'
import type {
	SteamAchievement,
	AchievementSchema,
	RecentAchievement,
	SteamAchievementsResponse,
} from 'types/steam'

const STEAM_API_KEY = process.env.STEAM_API_KEY
const STEAM_USER_ID = process.env.STEAM_USER_ID

async function fetchJson<T>(url: string): Promise<T | null> {
	try {
		const res = await fetch(url, { next: { revalidate: 18_000 } })
		if (!res.ok) return null
		return res.json()
	} catch {
		return null
	}
}

export async function GET() {
	if (!STEAM_API_KEY || !STEAM_USER_ID) {
		return NextResponse.json(
			{ achievements: [], error: 'Steam API not configured' } satisfies SteamAchievementsResponse,
			{ status: 503 }
		)
	}

	try {
		const gamesData = await fetchJson<{
			response: { games?: { appid: number; name: string }[] }
		}>(
			`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&count=5`
		)

		const games = gamesData?.response?.games ?? []
		if (games.length === 0) {
			return NextResponse.json({
				achievements: [],
			} satisfies SteamAchievementsResponse)
		}

		// Fetch player achievements + schema for each game in parallel
		const gameResults = await Promise.all(
			games.map(async (game) => {
				const [playerData, schemaData] = await Promise.all([
					fetchJson<{
						playerstats: { achievements?: SteamAchievement[] }
					}>(
						`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&appid=${game.appid}`
					),
					fetchJson<{
						game: {
							availableGameStats?: {
								achievements?: AchievementSchema[]
							}
						}
					}>(
						`https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${STEAM_API_KEY}&appid=${game.appid}`
					),
				])

				const achievements =
					playerData?.playerstats?.achievements?.filter(
						(a) => a.achieved === 1
					) ?? []

				const schemaMap = new Map(
					(
						schemaData?.game?.availableGameStats?.achievements ?? []
					).map((s) => [s.name, s])
				)

				return achievements.map((a): RecentAchievement => {
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

		// Flatten, sort by newest first, take top 5
		const allAchievements = gameResults
			.flat()
			.sort((a, b) => b.unlocktime - a.unlocktime)
			.slice(0, 5)

		return NextResponse.json({
			achievements: allAchievements,
		} satisfies SteamAchievementsResponse)
	} catch {
		return NextResponse.json(
			{ achievements: [], error: 'Steam API error' } satisfies SteamAchievementsResponse,
			{ status: 500 }
		)
	}
}
