export interface XboxAchievement {
	name: string
	description: string
	icon: string
	unlocktime: number
	gameName: string
	progress: string
}

export interface XboxProfileStats {
	gamertag: string
	gamerscore: number
	avatarUrl: string
	totalGames: number
	gamesWithAchievements: number
	perfectGames: number
	totalAchievements: number
}

export interface XboxAchievementsResponse {
	achievements: XboxAchievement[]
	profile?: XboxProfileStats
	error?: string
}
