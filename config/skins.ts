export type Skin = 'plum' | 'arcade' | 'hotline' | 'electric' | 'midnight'
export type Mode = 'dark' | 'light'

export const DEFAULT_SKIN: Skin = 'midnight'
export const DEFAULT_MODE: Mode = 'dark'

/** Colour values live in styles/globals.css; these drive the swatch buttons */
export const skins: { id: Skin; name: string }[] = [
	{ id: 'plum', name: 'Plum & Lime' },
	{ id: 'arcade', name: 'Arcade' },
	{ id: 'hotline', name: 'Hotline' },
	{ id: 'electric', name: 'Refined Electric' },
	{ id: 'midnight', name: 'Midnight Lime' },
]

/**
 * Off: every visitor gets DEFAULT_SKIN and only the dark/light toggle shows.
 * The other skins stay defined in globals.css; set this to true to bring the
 * swatches back.
 */
export const SKIN_PICKER = false

export const STORAGE_KEYS = { skin: 'skin', mode: 'mode' } as const

/**
 * Runs in <head> before first paint so a stored skin/mode never flashes.
 * Mode falls back to the OS preference, then dark. With the picker off, a
 * skin stored earlier is ignored so nobody gets stuck on one they can't change.
 */
const allowedSkins = SKIN_PICKER ? skins.map((s) => s.id) : [DEFAULT_SKIN]

export const themeInitScript = `(function(){try{var d=document.documentElement,s=localStorage.getItem('${STORAGE_KEYS.skin}'),m=localStorage.getItem('${STORAGE_KEYS.mode}');if(${JSON.stringify(allowedSkins)}.indexOf(s)<0)s='${DEFAULT_SKIN}';if(m!=='dark'&&m!=='light')m=matchMedia('(prefers-color-scheme: light)').matches?'light':'${DEFAULT_MODE}';d.setAttribute('data-skin',s);d.setAttribute('data-mode',m)}catch(e){}})()`
