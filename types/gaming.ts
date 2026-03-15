import type { RecentAchievement, SteamProfileStats } from './steam'
import type { XboxAchievement, XboxProfileStats } from './xbox'

export type Platform = 'steam' | 'xbox'

export interface GamingAchievement {
	platform: Platform
	name: string
	description: string
	icon: string
	unlocktime: number
	gameName: string
	extra?: string
}

export interface GamingData {
	achievements: GamingAchievement[]
	steam?: {
		stats: SteamProfileStats
		profileUrl: string
	}
	xbox?: {
		stats: XboxProfileStats
	}
}

export function steamToGaming(items: RecentAchievement[]): GamingAchievement[] {
	return items.map((a) => ({
		platform: 'steam' as const,
		name: a.name,
		description: a.description,
		icon: a.icon,
		unlocktime: a.unlocktime,
		gameName: a.gameName,
	}))
}

export function xboxToGaming(items: XboxAchievement[]): GamingAchievement[] {
	return items.map((a) => ({
		platform: 'xbox' as const,
		name: a.name,
		description: a.description,
		icon: a.icon,
		unlocktime: a.unlocktime,
		gameName: a.gameName,
		extra: a.progress,
	}))
}

/** Interleave two arrays: [s0, x0, s1, x1, ...] */
export function interleave(
	steam: GamingAchievement[],
	xbox: GamingAchievement[]
): GamingAchievement[] {
	const result: GamingAchievement[] = []
	const maxLen = Math.max(steam.length, xbox.length)
	for (let i = 0; i < maxLen; i++) {
		if (i < steam.length) result.push(steam[i]!)
		if (i < xbox.length) result.push(xbox[i]!)
	}
	return result
}
