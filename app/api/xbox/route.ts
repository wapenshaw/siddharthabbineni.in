import { NextResponse } from 'next/server'
import type {
	XboxAchievement,
	XboxProfileStats,
	XboxAchievementsResponse,
} from 'types/xbox'

const XBOX_API_KEY = process.env.XBOX_API_KEY
const XBOX_XUID = process.env.XBOX_XUID
const XBL_BASE = 'https://xbl.io/api/v2'

/** Cache this route's response for 6 hours */
export const revalidate = 21600

interface XblTitle {
	name: string
	displayImage: string
	titleHistory?: { lastTimePlayed: string }
	achievement: {
		currentAchievements: number
		totalAchievements: number
		currentGamerscore: number
		totalGamerscore: number
		progressPercentage: number
	}
}

interface XblProfilePerson {
	displayPicRaw: string
	gamertag: string
	gamerScore: string
}

async function fetchXbl<T>(path: string): Promise<T | null> {
	try {
		const url = `${XBL_BASE}${path}`
		const res = await fetch(url, {
			headers: {
				'X-Authorization': XBOX_API_KEY!,
				Accept: 'application/json',
				'Accept-Language': 'en-US',
			},
			next: { revalidate: 21_600 },
		})
		if (!res.ok) {
			console.error(`[Xbox] ${path} returned ${res.status}`)
			return null
		}
		return res.json() as Promise<T>
	} catch (e) {
		console.error(`[Xbox] fetch error for ${path}:`, e)
		return null
	}
}

async function getRecentGames(): Promise<XboxAchievement[]> {
	const data = await fetchXbl<{ titles: XblTitle[] }>(
		`/achievements/player/${XBOX_XUID}`
	)
	if (!data?.titles) return []

	const withAch = data.titles
		.filter(
			(t) => t.achievement.currentAchievements > 0 && t.titleHistory
		)
		.sort(
			(a, b) =>
				new Date(b.titleHistory!.lastTimePlayed).getTime() -
				new Date(a.titleHistory!.lastTimePlayed).getTime()
		)
		.slice(0, 5)

	return withAch.map((t): XboxAchievement => {
		const a = t.achievement
		return {
			name: t.name,
			description: `${a.currentGamerscore}/${a.totalGamerscore} GS`,
			icon: t.displayImage,
			unlocktime: Math.floor(
				new Date(t.titleHistory!.lastTimePlayed).getTime() / 1000
			),
			gameName: t.name,
			progress: `${a.progressPercentage}%`,
		}
	})
}

async function getProfileAndStats(): Promise<XboxProfileStats | null> {
	const [profileData, achievementsData] = await Promise.all([
		fetchXbl<{ people: XblProfilePerson[] }>(
			`/player/summary/${XBOX_XUID}`
		),
		fetchXbl<{ titles: XblTitle[] }>(
			`/achievements/player/${XBOX_XUID}`
		),
	])

	const person = profileData?.people?.[0]
	const titles = achievementsData?.titles ?? []

	const gamesWithAch = titles.filter(
		(t) => t.achievement.currentAchievements > 0
	)
	const perfectGames = titles.filter(
		(t) => t.achievement.progressPercentage === 100
	)
	const totalAchievements = titles.reduce(
		(sum, t) => sum + t.achievement.currentAchievements,
		0
	)

	return {
		gamertag: person?.gamertag ?? 'Unknown',
		gamerscore: parseInt(person?.gamerScore ?? '0', 10),
		avatarUrl: person?.displayPicRaw ?? '',
		totalGames: titles.length,
		gamesWithAchievements: gamesWithAch.length,
		perfectGames: perfectGames.length,
		totalAchievements,
	}
}

export async function GET() {
	if (!XBOX_API_KEY || !XBOX_XUID) {
		return NextResponse.json(
			{
				achievements: [],
				error: 'Xbox API not configured',
			} satisfies XboxAchievementsResponse,
			{ status: 503 }
		)
	}

	try {
		const [achievements, profile] = await Promise.all([
			getRecentGames(),
			getProfileAndStats(),
		])

		return NextResponse.json({
			achievements,
			profile: profile ?? undefined,
		} satisfies XboxAchievementsResponse)
	} catch {
		return NextResponse.json(
			{
				achievements: [],
				error: 'Xbox API error',
			} satisfies XboxAchievementsResponse,
			{ status: 500 }
		)
	}
}
