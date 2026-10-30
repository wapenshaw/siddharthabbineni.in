export interface SteamAchievement {
	apiname: string
	achieved: number
	unlocktime: number
	name: string
	description: string
}

export interface AchievementSchema {
	name: string
	defaultvalue: number
	displayName: string
	hidden: number
	description: string
	icon: string
	icongray: string
}

export interface RecentAchievement {
	name: string
	description: string
	icon: string
	unlocktime: number
	gameName: string
	appid: number
}

export interface SteamAchievementsResponse {
	achievements: RecentAchievement[]
	error?: string
}
