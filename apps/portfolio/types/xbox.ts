export interface XboxAchievement {
	name: string
	description: string
	icon: string
	unlocktime: number
	gameName: string
	progress: string
}

export interface XboxProfile {
	gamertag: string
	gamerscore: number
	avatarUrl: string
}

export interface XboxAchievementsResponse {
	achievements: XboxAchievement[]
	profile?: XboxProfile
	error?: string
}
