import { NextResponse } from 'next/server'

const STEAM_API_KEY = process.env.STEAM_API_KEY
const STEAM_USER_ID = process.env.STEAM_USER_ID

interface SteamAchievement {
	apiname: string
	achieved: number
	unlocktime: number
	name?: string
	description?: string
}

interface SteamGame {
	appid: number
	name: string
	achievements: SteamAchievement[]
	totalAchievements: number
	completedAchievements: number
}

export async function GET() {
	if (!STEAM_API_KEY || !STEAM_USER_ID) {
		return NextResponse.json(
			{ error: 'Steam API not configured' },
			{ status: 503 }
		)
	}

	try {
		// Get recently played games
		const gamesRes = await fetch(
			`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&count=5`,
			{ next: { revalidate: 3600 } }
		)

		if (!gamesRes.ok) {
			return NextResponse.json(
				{ error: 'Failed to fetch Steam data' },
				{ status: gamesRes.status }
			)
		}

		const gamesData = await gamesRes.json()
		const games: SteamGame[] = []

		// Fetch achievements for each game
		for (const game of gamesData.response?.games ?? []) {
			try {
				const achieveRes = await fetch(
					`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&appid=${game.appid}`,
					{ next: { revalidate: 3600 } }
				)

				if (achieveRes.ok) {
					const achieveData = await achieveRes.json()
					const achievements: SteamAchievement[] =
						achieveData.playerstats?.achievements ?? []

					games.push({
						appid: game.appid,
						name: game.name,
						achievements: achievements.filter((a: SteamAchievement) => a.achieved === 1),
						totalAchievements: achievements.length,
						completedAchievements: achievements.filter(
							(a: SteamAchievement) => a.achieved === 1
						).length,
					})
				}
			} catch {
				// Skip games where achievements aren't available
			}
		}

		return NextResponse.json({ games })
	} catch {
		return NextResponse.json(
			{ error: 'Steam API error' },
			{ status: 500 }
		)
	}
}
