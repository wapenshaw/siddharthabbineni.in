export type Skin = 'plum' | 'arcade' | 'hotline'
export type Mode = 'dark' | 'light'

export const DEFAULT_SKIN: Skin = 'plum'
export const DEFAULT_MODE: Mode = 'dark'

/** Colour values live in styles/globals.css; these drive the swatch buttons */
export const skins: { id: Skin; name: string }[] = [
	{ id: 'plum', name: 'Plum & Lime' },
	{ id: 'arcade', name: 'Arcade' },
	{ id: 'hotline', name: 'Hotline' },
]

export const STORAGE_KEYS = { skin: 'skin', mode: 'mode' } as const

/**
 * Runs in <head> before first paint so a stored skin/mode never flashes.
 * Mode falls back to the OS preference, then dark.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,s=localStorage.getItem('${STORAGE_KEYS.skin}'),m=localStorage.getItem('${STORAGE_KEYS.mode}');if(${JSON.stringify(skins.map((s) => s.id))}.indexOf(s)<0)s='${DEFAULT_SKIN}';if(m!=='dark'&&m!=='light')m=matchMedia('(prefers-color-scheme: light)').matches?'light':'${DEFAULT_MODE}';d.setAttribute('data-skin',s);d.setAttribute('data-mode',m)}catch(e){}})()`
