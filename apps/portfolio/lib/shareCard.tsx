import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { profile } from 'config/profile'
import type { SectionColour } from 'config/sections'
import { TRACK_PATH } from 'config/track'
import { ImageResponse } from 'next/og'

/**
 * The picture LinkedIn, X, Slack and the rest show for a shared link, drawn
 * like the site: a section tab, the title, and the nameplate along the
 * bottom. Rendered at build by the opengraph-image routes.
 */

export const CARD_SIZE = { width: 1200, height: 630 }

const COLOURS: Record<SectionColour, { c: string; on: string }> = {
	red: { c: '#e10600', on: '#ffffff' },
	purple: { c: '#8e44ec', on: '#ffffff' },
	yellow: { c: '#ffc906', on: '#15151e' },
	green: { c: '#00c16e', on: '#15151e' },
	blue: { c: '#1777e5', on: '#ffffff' },
}

const CARBON = '#15151e'
const MUTED = '#a3a3ab'

// Satori needs TTF or OTF, so these sit beside the site's own web fonts
const assets = Promise.all([
	readFile(join(process.cwd(), 'assets/fonts/TitilliumWeb-SemiBold.ttf')),
	readFile(join(process.cwd(), 'assets/fonts/TitilliumWeb-BoldItalic.ttf')),
	readFile(join(process.cwd(), 'public', profile.avatar)),
])

/** Long titles step down in size so they stay within three lines */
const titleSize = (title: string) =>
	title.length < 36 ? 84 : title.length < 64 ? 68 : 56

const clip = (text: string, max: number) =>
	text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text

export async function shareCard({
	tab,
	colour,
	title,
	meta,
}: {
	tab: string
	colour: SectionColour
	title: string
	meta?: string
}) {
	const [semiBold, boldItalic, avatar] = await assets
	const { c, on } = COLOURS[colour]
	const text = clip(title, 120)

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
				padding: '56px 64px 0',
				background: CARBON,
				color: '#ffffff',
				fontFamily: 'Titillium',
			}}
		>
			{/* the whole circuit, faint, off the right edge */}
			<svg
				viewBox="180 40 410 540"
				aria-hidden="true"
				width={560}
				height={737}
				style={{ position: 'absolute', right: -90, top: -40, opacity: 0.14 }}
			>
				<path
					d={TRACK_PATH}
					fill="none"
					stroke="#ffffff"
					strokeWidth={14}
					strokeLinejoin="round"
				/>
			</svg>

			<div style={{ display: 'flex' }}>
				<div
					style={{
						display: 'flex',
						padding: '4px 34px 6px 26px',
						background: c,
						color: on,
						transform: 'skewX(-16deg)',
					}}
				>
					<span
						style={{
							transform: 'skewX(16deg)',
							fontSize: 36,
							fontStyle: 'italic',
							fontWeight: 700,
						}}
					>
						{tab}
					</span>
				</div>
			</div>

			<div
				style={{
					display: 'flex',
					marginTop: 40,
					maxWidth: 1000,
					fontSize: titleSize(text),
					fontStyle: 'italic',
					fontWeight: 700,
					lineHeight: 1.08,
				}}
			>
				{text}
			</div>

			{meta && (
				<div
					style={{
						display: 'flex',
						marginTop: 26,
						fontSize: 30,
						fontWeight: 600,
						color: MUTED,
					}}
				>
					{meta}
				</div>
			)}

			{/* the nameplate: headshot on red, first name small, surname big */}
			<div
				style={{
					display: 'flex',
					alignItems: 'stretch',
					height: 120,
					marginTop: 'auto',
					marginLeft: -64,
					marginBottom: 48,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 26,
						paddingRight: 30,
						background: '#ffffff',
						color: CARBON,
					}}
				>
					<div
						style={{
							display: 'flex',
							width: 150,
							height: 120,
							position: 'relative',
							background: '#e10600',
						}}
					>
						<img
							src={`data:image/jpeg;base64,${avatar.toString('base64')}`}
							width={150}
							height={120}
							style={{ objectFit: 'cover', objectPosition: '50% 15%' }}
							alt=""
						/>
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: 150,
								height: 120,
								display: 'flex',
								backgroundImage:
									'linear-gradient(to top, rgba(225,6,0,0.75), rgba(225,6,0,0) 55%)',
								borderBottom: '7px solid #e10600',
							}}
						/>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<span style={{ fontSize: 28, fontWeight: 600, lineHeight: 1 }}>
							{profile.name.split(' ')[0]}
						</span>
						<span
							style={{
								fontSize: 60,
								fontStyle: 'italic',
								fontWeight: 700,
								lineHeight: 1,
								textTransform: 'uppercase',
							}}
						>
							{profile.name.split(' ').slice(1).join(' ')}
						</span>
					</div>
				</div>
				{/* the plate's cut edge, then the red and yellow slashes */}
				<div
					style={{
						width: 44,
						marginLeft: -22,
						background: '#ffffff',
						transform: 'skewX(-16deg)',
					}}
				/>
				<div
					style={{
						width: 40,
						marginLeft: 6,
						background: '#e10600',
						transform: 'skewX(-16deg)',
					}}
				/>
				<div
					style={{
						width: 24,
						marginLeft: 8,
						background: '#ffc906',
						transform: 'skewX(-16deg)',
					}}
				/>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						marginLeft: 'auto',
						fontSize: 28,
						fontWeight: 600,
						color: MUTED,
					}}
				>
					siddharthabbineni.in
				</div>
			</div>
		</div>,
		{
			...CARD_SIZE,
			fonts: [
				{ name: 'Titillium', data: semiBold, weight: 600, style: 'normal' },
				{ name: 'Titillium', data: boldItalic, weight: 700, style: 'italic' },
			],
		}
	)
}
