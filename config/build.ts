export type Game = {
	name: string
	/** Shown until the icon file exists */
	abbr: string
	/** Drop a 64×64 transparent PNG at this path */
	icon: string
}

export type CharacterClass = {
	name: string
	line: string
	games?: Game[]
}

export const characterBuild: CharacterClass[] = [
	{
		name: 'Architect',
		line: 'Multi-cloud, event-driven, C4 on the whiteboard.',
	},
	{
		name: 'Coder',
		line: 'C#, Python, Go, Rust, TypeScript. Still ships.',
	},
	{
		name: 'Automator',
		line: 'Terraform and Ansible for the repeatable. AgentCore and AI Foundry for the judgment calls.',
	},
	{
		name: 'Gamer',
		line: 'All-time favourites:',
		games: [
			{ name: 'Quake III Arena', abbr: 'Q3A', icon: '/games/quake3.png' },
			{
				name: 'Age of Empires II: The Conquerors',
				abbr: 'AoC',
				icon: '/games/aoc.png',
			},
			{ name: 'Captain Claw', abbr: 'CLAW', icon: '/games/claw.png' },
		],
	},
	// Cards past the fourth only show when the screen is tall enough to fit them
	{
		name: 'Lead',
		line: 'Led teams of up to eight engineers, from school ERPs to core banking.',
	},
	{
		name: 'Hiker',
		line: 'Weekends on the trail, well out of signal range.',
	},
]
