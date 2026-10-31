/**
 * Personal projects for the Garage. Most repos are private, so a card links to
 * GitHub only when `repo` is set; otherwise to a post about it, if there is one.
 */
export type Project = {
	name: string
	status: string
	/** Shipped projects get the green tab */
	shipped?: boolean
	line: string
	stack: string[]
	/** Slug of a post about it on the blog (apps/blog/posts) */
	post?: string
	/** The project's own website */
	site?: string
	/** owner/name of a public repo; its latest release replaces the version in `status` */
	repo?: string
	/** Screenshots in public/, one for each colour mode, both the same size */
	shot?: {
		light: string
		dark: string
		alt: string
		width: number
		height: number
	}
}

export const projects: Project[] = [
	{
		name: 'NuPrint',
		status: 'Shipped',
		shipped: true,
		line: 'Print notes, pictures and PDF pages from Windows, macOS or Linux to a pocket Bluetooth thermal printer. No phone app, no pairing, no driver.',
		stack: ['Rust', 'Tauri 2', 'Bluetooth LE'],
		post: 'nuprint-printing-without-the-phone-app',
		site: 'https://nuprint.app',
		repo: 'wapenshaw/nuprint',
		shot: {
			light: '/garage/nuprint-light.png',
			dark: '/garage/nuprint-dark.png',
			alt: 'NuPrint on the desktop: what to print on the left, and a preview of the paper as it will come out of the printer',
			width: 1250,
			height: 1013,
		},
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
