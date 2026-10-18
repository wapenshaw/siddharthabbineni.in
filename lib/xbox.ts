import { cacheLife } from 'next/cache'
import type {
	XboxAchievement,
	XboxAchievementsResponse,
	XboxProfile,
} from 'types/xbox'

const XBOX_API_KEY = process.env.XBOX_API_KEY
const XBOX_XUID = process.env.XBOX_XUID
const XBL_BASE = 'https://xbl.io/api/v2'

interface XblActivityItem {
	achievementName: string
	achievementDescription: string
	achievementIcon: string
	contentTitle: string
	date: string
	gamerscore: number
	rarityCategory: string
	rarityPercentage: number
	activityItemType: string
}

interface XblProfilePerson {
	displayPicRaw: string
	gamertag: string
	gamerScore: string
}

async function fetchXbl<T>(path: string): Promise<T | null> {
	try {
		const res = await fetch(`${XBL_BASE}${path}`, {
			headers: {
				'X-Authorization': XBOX_API_KEY ?? '',
				Accept: 'application/json',
				'Accept-Language': 'en-US',
			},
		})
		if (!res.ok) {
			console.error(`[Xbox] ${path} returned ${res.status}`)
			return null
		}
		return (await res.json()) as T
	} catch (e) {
		console.error(`[Xbox] fetch error for ${path}:`, e)
		return null
	}
}

async function getRecentAchievements(): Promise<XboxAchievement[]> {
	const data = await fetchXbl<{ activityItems?: XblActivityItem[] }>(
		'/activity/history'
	)
	return (data?.activityItems ?? [])
		.filter((item) => item.activityItemType === 'Achievement')
		.slice(0, 6)
		.map((item) => ({
			name: item.achievementName,
			description: item.achievementDescription,
			icon: item.achievementIcon,
			unlocktime: Math.floor(new Date(item.date).getTime() / 1000),
			gameName: item.contentTitle,
			progress: item.rarityCategory
				? `${item.rarityPercentage}% · ${item.rarityCategory}`
				: `${item.gamerscore} GS`,
		}))
}

async function getProfile(): Promise<XboxProfile | undefined> {
	const data = await fetchXbl<{ people?: XblProfilePerson[] }>(
		`/player/summary/${XBOX_XUID}`
	)
	const person = data?.people?.[0]
	if (!person) {
		return undefined
	}
	return {
		gamertag: person.gamertag,
		gamerscore: parseInt(person.gamerScore, 10) || 0,
		avatarUrl: person.displayPicRaw,
	}
}

/** Cached with the 'gaming' profile from next.config.ts */
export async function getXboxAchievements(): Promise<XboxAchievementsResponse> {
	'use cache'
	cacheLife('gaming')

	if (!XBOX_API_KEY || !XBOX_XUID) {
		return { achievements: [], error: 'Xbox API not configured' }
	}
	try {
		const [achievements, profile] = await Promise.all([
			getRecentAchievements(),
			getProfile(),
		])
		return { achievements, profile }
	} catch {
		return { achievements: [], error: 'Xbox API error' }
	}
}
