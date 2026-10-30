export interface StackOverflowUser {
	user_id: number
	reputation: number
	reputation_change_month: number
	badge_counts: {
		gold: number
		silver: number
		bronze: number
	}
}
