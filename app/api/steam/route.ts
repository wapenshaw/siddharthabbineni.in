import { NextResponse } from 'next/server'
import type {
	SteamAchievement,
	AchievementSchema,
	RecentAchievement,
	SteamProfileStats,
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

interface OwnedGame {
	appid: number
	name: string
	playtime_forever: number
	has_community_visible_stats?: boolean
}

async function getProfileStats(): Promise<SteamProfileStats> {
	const ownedData = await fetchJson<{
		response: { game_count?: number; games?: OwnedGame[] }
	}>(
		`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&include_appinfo=1&include_played_free_games=1`
	)

	const allGames = ownedData?.response?.games ?? []
	const totalGames = ownedData?.response?.game_count ?? allGames.length
	const playedGames = allGames.filter((g) => g.playtime_forever > 0)

	// Check achievement completion for played games that have stats
	const gamesWithStats = playedGames.filter(
		(g) => g.has_community_visible_stats
	)

	// Sample up to 50 games to avoid rate limits
	const sampled = gamesWithStats.slice(0, 50)

	const achievementResults = await Promise.all(
		sampled.map(async (game) => {
			const data = await fetchJson<{
				playerstats: { achievements?: SteamAchievement[] }
			}>(
				`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&appid=${game.appid}`
			)
			const achs = data?.playerstats?.achievements ?? []
			if (achs.length === 0) return { total: 0, completed: 0, perfect: false }
			const completed = achs.filter((a) => a.achieved === 1).length
			return {
				total: achs.length,
				completed,
				perfect: completed === achs.length && achs.length > 0,
			}
		})
	)

	return {
		totalGames,
		playedGames: playedGames.length,
		perfectGames: achievementResults.filter((r) => r.perfect).length,
		totalAchievements: achievementResults.reduce(
			(sum, r) => sum + r.completed,
			0
		),
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
		// Fetch recent achievements and profile stats in parallel
		const [recentResult, stats] = await Promise.all([
			getRecentAchievements(),
			getProfileStats(),
		])

		return NextResponse.json({
			achievements: recentResult,
			stats,
		} satisfies SteamAchievementsResponse)
	} catch {
		return NextResponse.json(
			{ achievements: [], error: 'Steam API error' } satisfies SteamAchievementsResponse,
			{ status: 500 }
		)
	}
}

async function getRecentAchievements(): Promise<RecentAchievement[]> {
	const gamesData = await fetchJson<{
		response: { games?: { appid: number; name: string }[] }
	}>(
		`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&count=5`
	)

	const games = gamesData?.response?.games ?? []
	if (games.length === 0) return []

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

	return gameResults
		.flat()
		.sort((a, b) => b.unlocktime - a.unlocktime)
		.slice(0, 5)
}
