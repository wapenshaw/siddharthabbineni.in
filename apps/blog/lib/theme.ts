export type Theme = 'dark' | 'light'

export const DEFAULT_THEME: Theme = 'dark'

export const THEME_STORAGE_KEY = 'theme'

/**
 * Runs in <head> before first paint so a stored theme never flashes. Falls
 * back to the OS preference, then dark.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'${DEFAULT_THEME}';d.setAttribute('data-theme',t)}catch(e){}})()`
