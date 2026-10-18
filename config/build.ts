import type { PixelIconName } from './pixelIcons'

/**
 * Each card is a square that's only about 110px inside on a small laptop, so
 * keep the copy short: a line of two or three short lines, and chips that fit
 * on two rows (one row if the line takes three).
 */
export type CharacterClass = {
	name: string
	/** Pixel-art icon from config/pixelIcons.ts */
	icon: PixelIconName
	line: string
	/** Short chips at the foot of the card */
	loadout?: string[]
}

export const characterBuild: CharacterClass[] = [
	{
		name: 'Architect',
		icon: 'tower',
		line: 'Designs cloud platforms and critical systems that scale.',
		loadout: ['Cloud', 'Resilience', 'Microservices'],
	},
	{
		name: 'Coder',
		icon: 'terminal',
		line: 'More time in the code than in the meetings.',
		loadout: ['.NET', 'TypeScript', 'Python', 'Go', 'Rust'],
	},
	{
		name: 'Agenteer',
		icon: 'agent',
		line: 'Turns AI agents into workflows that get work done.',
		loadout: ['Agents', 'Workflows', 'Orchestration', 'MCP'],
	},
	{
		name: 'Leader',
		icon: 'shield',
		line: 'Lead from the keyboard. Mentor, then step back.',
		loadout: ['Mentoring', 'Pairing', 'Code reviews'],
	},
	// Cards past the fourth only show when the pane is tall enough for a third row
	{
		name: 'Gamer',
		icon: 'gamepad',
		line: 'Saint in single player, Menace in multiplayer.',
		loadout: ['Quake III', 'Dota 2', 'AoE II', 'Captain Claw'],
	},
	{
		name: 'Tinkerer',
		icon: 'gear',
		line: 'If it can be tweaked, hosted, wired up, or taken apart, I will.',
		loadout: ['Homelab', 'Hardware', 'DIY', 'Networking'],
	},
]
