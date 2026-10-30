import { cacheLife } from 'next/cache'
import type {
	XboxAchievement,
	XboxAchievementsResponse,
	XboxProfile,
} from 'types/xbox'

/**
 * OpenXBL (https://api.xbl.io/docs). The key belongs to the account it reads,
 * so the "own account" endpoints need no XUID.
 */
const XBOX_API_KEY = process.env.XBOX_API_KEY
const XBL_BASE = 'https://api.xbl.io/v2'

/** How many recently played titles to pull unlocks from */
const RECENT_TITLES = 5

interface XblPerson {
	xuid: string
	displayPicRaw: string
	gamertag: string
	gamerScore: string
}

interface XblTitle {
	titleId: string
	name: string
	achievement?: { currentGamerscore?: number }
	titleHistory?: { lastTimePlayed?: string }
}

interface XblAchievement {
	name: string
	description: string
	progressState: string
	progression?: { timeUnlocked?: string }
	mediaAssets?: { type: string; url: string }[]
	rarity?: { currentCategory?: string; currentPercentage?: number }
	titleAssociations?: { name: string }[]
}

/** Every response is wrapped as { content, code } */
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
		const body = (await res.json()) as { content?: T }
		return body.content ?? null
	} catch (e) {
		console.error(`[Xbox] fetch error for ${path}:`, e)
		return null
	}
}

async function getPerson(): Promise<XblPerson | undefined> {
	const data = await fetchXbl<{ people?: XblPerson[] }>('/player/summary')
	return data?.people?.[0]
}

/**
 * Unlocks from the most recently played titles that have achievements. The
 * activity history endpoint lags by years, so it is not used.
 */
async function getRecentAchievements(xuid: string): Promise<XboxAchievement[]> {
	const data = await fetchXbl<{ titles?: XblTitle[] }>('/titles')
	const titles = (data?.titles ?? [])
		.filter((t) => (t.achievement?.currentGamerscore ?? 0) > 0)
		.sort((a, b) =>
			(b.titleHistory?.lastTimePlayed ?? '').localeCompare(
				a.titleHistory?.lastTimePlayed ?? ''
			)
		)
		.slice(0, RECENT_TITLES)

	const perTitle = await Promise.all(
		titles.map(async (title) => {
			const res = await fetchXbl<{ achievements?: XblAchievement[] }>(
				`/achievements/player/${xuid}/${title.titleId}`
			)
			return (res?.achievements ?? [])
				.filter(
					(a) => a.progressState === 'Achieved' && a.progression?.timeUnlocked
				)
				.map(
					(a): XboxAchievement => ({
						name: a.name,
						description: a.description,
						icon: a.mediaAssets?.find((m) => m.type === 'Icon')?.url ?? '',
						unlocktime: Math.floor(
							new Date(a.progression?.timeUnlocked ?? 0).getTime() / 1000
						),
						gameName: a.titleAssociations?.[0]?.name ?? title.name,
						progress: a.rarity?.currentCategory
							? `${a.rarity.currentPercentage}% · ${a.rarity.currentCategory}`
							: '',
					})
				)
		})
	)

	return perTitle
		.flat()
		.sort((a, b) => b.unlocktime - a.unlocktime)
		.slice(0, 6)
}

/**
 * Cached with the 'gaming' profile from next.config.ts. A failure (a 429 from
 * the free tier's hourly limit, say) is cached for minutes, not hours.
 */
export async function getXboxAchievements(): Promise<XboxAchievementsResponse> {
	'use cache'

	if (!XBOX_API_KEY) {
		// the keys are Azure app settings; retry soon once they're added
		cacheLife('minutes')
		return { achievements: [], error: 'Xbox API not configured' }
	}
	try {
		const person = await getPerson()
		if (!person) {
			cacheLife('minutes')
			return { achievements: [], error: 'Xbox API error' }
		}
		const profile: XboxProfile = {
			gamertag: person.gamertag,
			gamerscore: Number.parseInt(person.gamerScore, 10) || 0,
			avatarUrl: person.displayPicRaw,
		}
		const achievements = await getRecentAchievements(person.xuid)
		cacheLife('gaming')
		return { achievements, profile }
	} catch {
		cacheLife('minutes')
		return { achievements: [], error: 'Xbox API error' }
	}
}
