import { type PixelIconName, pixelIcons } from 'config/pixelIcons'

/** Size of one art pixel in CSS pixels */
const SCALE = 2

/** Turns each horizontal run of '#' into one rectangle of the path */
function toPath(rows: string[]) {
	let d = ''
	rows.forEach((row, y) => {
		for (const run of row.matchAll(/#+/g)) {
			d += `M${run.index} ${y}h${run[0].length}v1h-${run[0].length}z`
		}
	})
	return d
}

export default function PixelIcon({
	name,
	className,
}: {
	name: PixelIconName
	className?: string
}) {
	const rows = pixelIcons[name]
	const width = Math.max(...rows.map((r) => r.length))
	const height = rows.length

	return (
		<svg
			className={className}
			width={width * SCALE}
			height={height * SCALE}
			viewBox={`0 0 ${width} ${height}`}
			fill="currentColor"
			shapeRendering="crispEdges"
			aria-hidden="true"
		>
			<path d={toPath(rows)} />
		</svg>
	)
}
