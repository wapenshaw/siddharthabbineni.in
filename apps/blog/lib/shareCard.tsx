import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

/**
 * The picture LinkedIn, X, Slack and the rest show for a shared link, drawn
 * like the blog: the title in a painted grid box, its position above it.
 * Rendered at build by the og.png route handlers.
 */

const CARD_SIZE = { width: 1200, height: 630 }

const TARMAC = '#14171d'
const INK = '#f4f5f7'
const SOFT = '#c3c7d0'
const MUTED = '#9aa0ad'
const AMBER = '#ffb000'
const PURPLE = '#b67cff'
const GREEN = '#33d17a'

// Satori needs TTF or OTF; these are static cuts of the blog's web fonts
const font = (file: string) =>
	readFile(join(process.cwd(), 'assets/fonts', file))
const fonts = Promise.all([
	font('SairaCondensed-Bold.ttf'),
	font('SairaCondensed-ExtraBold.ttf'),
	font('AtkinsonHyperlegible-Regular.ttf'),
])

/** Long titles step down in size so they stay within three lines */
const titleSize = (title: string) =>
	title.length < 40 ? 88 : title.length < 70 ? 72 : 60

const clip = (text: string, max: number) =>
	text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text

export async function shareCard({
	pos,
	newest = false,
	title,
	meta,
}: {
	/** P1, a year, or the blog's name on the home card */
	pos: string
	newest?: boolean
	title: string
	meta?: string
}) {
	const [bold, extraBold, regular] = await fonts
	const text = clip(title, 110)

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				padding: '52px 72px 48px',
				background: TARMAC,
				color: INK,
				fontFamily: 'Atkinson',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 16,
					fontFamily: 'Saira',
					fontSize: 34,
					fontWeight: 800,
				}}
			>
				<div
					style={{
						width: 20,
						height: 20,
						borderRadius: 10,
						background: GREEN,
						boxShadow: `0 0 18px ${GREEN}`,
					}}
				/>
				Free practice
			</div>

			{/* the painted grid box the title sits in */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					marginTop: 'auto',
					paddingTop: 30,
					borderTop: `7px solid ${INK}`,
					borderLeft: `7px solid ${INK}`,
					borderRight: `7px solid ${INK}`,
					paddingLeft: 28,
					paddingRight: 28,
				}}
			>
				<div
					style={{
						display: 'flex',
						fontFamily: 'Saira',
						fontSize: 40,
						fontWeight: 700,
						color: newest ? PURPLE : AMBER,
					}}
				>
					{pos}
				</div>
				<div
					style={{
						display: 'flex',
						marginTop: 6,
						fontFamily: 'Saira',
						fontSize: titleSize(text),
						fontWeight: 800,
						lineHeight: 1.02,
					}}
				>
					{text}
				</div>
				{meta && (
					<div
						style={{
							display: 'flex',
							marginTop: 22,
							fontSize: 30,
							color: SOFT,
						}}
					>
						{meta}
					</div>
				)}
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: 40,
					fontSize: 26,
					color: MUTED,
				}}
			>
				<span>Siddharth Abbineni</span>
				<span>blog.siddharthabbineni.in</span>
			</div>
		</div>,
		{
			...CARD_SIZE,
			fonts: [
				{ name: 'Saira', data: bold, weight: 700, style: 'normal' },
				{ name: 'Saira', data: extraBold, weight: 800, style: 'normal' },
				{ name: 'Atkinson', data: regular, weight: 400, style: 'normal' },
			],
		}
	)
}
