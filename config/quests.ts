/**
 * Personal projects for the Garage. Their repos are private, so cards link to
 * a post about the project when there is one, never to GitHub.
 */
export type Project = {
	name: string
	status: string
	/** Shipped projects get the green tab */
	shipped?: boolean
	line: string
	stack: string[]
	/** Slug of a post about it in content/posts */
	post?: string
}

export const projects: Project[] = [
	{
		name: 'NuPrint',
		status: 'Shipped, v1.0',
		shipped: true,
		line: 'Print from a computer straight to pocket Bluetooth thermal printers. No phone app, no pairing.',
		stack: ['Rust', 'Tauri 2', 'Bluetooth LE'],
		post: 'nuprint-printing-without-the-phone-app',
	},
	{
		name: 'LoftLog',
		status: 'In progress',
		line: 'A home’s care in one place: rooms, things, repairs, and the papers that prove it.',
		stack: ['Next.js', 'Turso', 'S3', 'Clerk'],
	},
	{
		name: 'CardWise',
		status: 'In progress',
		line: 'Local-first credit card statement parser and cashback reconciliation.',
		stack: ['.NET', 'Clean Architecture'],
	},
]
