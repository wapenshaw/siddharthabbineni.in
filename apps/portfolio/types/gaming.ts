export type Platform = 'Steam' | 'Xbox'

/** A Steam or Xbox achievement, merged into one list by unlock time */
export interface Unlock {
	platform: Platform
	name: string
	game: string
	icon: string
	/** Unix seconds */
	unlocktime: number
}
