export type Mode = 'dark' | 'light'

export const DEFAULT_MODE: Mode = 'dark'

export const MODE_STORAGE_KEY = 'mode'

/**
 * Runs in <head> before first paint so a stored mode never flashes. Falls
 * back to the OS preference, then dark.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,m=localStorage.getItem('${MODE_STORAGE_KEY}');if(m!=='dark'&&m!=='light')m=matchMedia('(prefers-color-scheme: light)').matches?'light':'${DEFAULT_MODE}';d.setAttribute('data-mode',m)}catch(e){}})()`
