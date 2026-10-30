/**
 * The career route is part of the Nürburgring GP circuit, traced from
 * "Circuit Nürburgring-2013-GP.svg" by Pitlane02 on Wikimedia Commons
 * (CC BY-SA 3.0). The credit isn't on the page yet; it'll get a spot later.
 */
export const TRACK_CREDIT = {
	text: 'Track: Pitlane02, CC BY-SA 3.0',
	url: 'https://commons.wikimedia.org/wiki/File:Circuit_N%C3%BCrburgring-2013-GP.svg',
}

/** The circuit's main line, drawn with pathLength 100 so segments are percentages along it */
export const TRACK_PATH =
	'M 428.28 235.82 C 384.67 268.57 377.13 278.27 369.34 271.50 C 361.99 265.11 367.78 257.88 371.92 249.26 C 376.18 240.39 385.19 235.30 387.95 224.45 C 389.71 217.52 382.55 208.80 376.06 205.83 C 362.10 199.46 343.48 207.26 330.56 211.00 C 317.46 214.79 306.38 221.48 307.29 231.68 C 308.40 244.11 316.43 248.40 325.39 248.75 C 329.54 248.91 334.06 250.77 336.76 257.02 C 339.91 264.31 338.62 281.77 334.18 299.93 C 326.25 332.33 304.28 384.48 309.88 399.72 C 315.86 416.00 346.20 418.73 353.31 429.19 C 365.38 446.97 319.86 459.31 302.12 473.14 C 281.78 489.00 254.57 512.93 241.11 532.60 C 229.76 549.19 215.24 560.55 203.88 550.70 C 194.07 542.17 199.58 532.43 212.16 520.71 C 237.13 497.45 268.51 462.97 270.58 450.91 C 272.70 438.58 263.54 425.37 264.89 412.13 C 267.84 383.35 300.23 305.46 302.12 285.46 C 303.94 266.19 256.79 259.34 248.35 241.51 C 242.13 228.36 324.84 142.41 339.86 133.45 C 353.28 125.45 423.67 115.44 476.88 102.40 C 494.46 98.09 484.06 77.72 494.46 72.95 C 503.09 68.99 549.87 57.03 561.16 69.34 C 571.89 81.04 565.98 93.12 560.12 97.77 Z'

/** The stretch the route uses, after turning the circuit 180° so it climbs to the present */
export const TRACK_VIEWBOX = { x: 200, y: 215, width: 165, height: 365 }
export const TRACK_ROTATE = 'rotate(180 292.5 387.5)'

type TrackPoint = {
	/** Percentage along the path */
	at: number
	/** The point in the path's own (unrotated) coordinates */
	x: number
	y: number
}

/** Where life before work starts: the grey run-up to the first job */
export const RUN_UP: TrackPoint = { at: 9, x: 376.1, y: 205.8 }

/**
 * One stop per job in config/experience.ts, oldest first. A new job needs a
 * new stop a few percent further on; the road after the last stop is the open
 * end of the route.
 */
export const STOPS: TrackPoint[] = [
	{ at: 14, x: 307.7, y: 234.4 },
	{ at: 19, x: 334.2, y: 299.8 },
	{ at: 24, x: 310.7, y: 379.5 },
	{ at: 28, x: 347.7, y: 424.3 },
	{ at: 33, x: 300.4, y: 474.5 },
]

/** Where the dashes after the current job fade out; moves on with the last stop */
export const ROAD_END: TrackPoint = { at: 41.3, x: 199.3, y: 544.2 }

/** A point's height down the route, as a percentage; turning the circuit 180° about y 387.5 flips y */
export const topOf = ({ y }: TrackPoint) =>
	((2 * 387.5 - y - TRACK_VIEWBOX.y) / TRACK_VIEWBOX.height) * 100
