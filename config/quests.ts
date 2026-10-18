export type SideQuest = {
	name: string
	status: string
	/** Highlights the status pill in the accent colour */
	shipped?: boolean
	url: string
	line: string
	stack: string
}

export const sideQuests: SideQuest[] = [
	{
		name: 'NuPrint',
		status: 'v1.0',
		shipped: true,
		url: 'https://github.com/wapenshaw/nuprint',
		line: 'Print from a computer straight to pocket Bluetooth thermal printers. No phone app, no pairing.',
		stack: 'Rust · Tauri 2 · Bluetooth LE',
	},
	{
		name: 'LoftLog',
		status: 'In progress',
		url: 'https://github.com/wapenshaw/loftlog',
		line: 'A home’s care in one place: rooms, things, repairs, and the papers that prove it.',
		stack: 'Next.js · Turso · S3 · Clerk',
	},
	{
		name: 'CardWise',
		status: 'In progress',
		url: 'https://github.com/wapenshaw/CardWise',
		line: 'Local-first credit card statement parser and cashback reconciliation.',
		stack: '.NET · Clean Architecture',
	},
]
