/**
 * A post opened straight from a link (LinkedIn, search, a bookmark) shows on
 * its own: the header and the post, no section nav or post list. Moving
 * around inside the site never sets it, because that's client navigation.
 */
export const STANDALONE = 'data-standalone'

/** /blog/<slug>, but not the list itself */
const POST_PATH = /^\/blog\/[^/]+\/?$/

export const isPostPath = (path: string) => POST_PATH.test(path)

/** Runs in <head> before first paint, so the dashboard never flashes first */
export const standaloneInitScript = `(function(){if(${POST_PATH}.test(location.pathname))document.documentElement.setAttribute('${STANDALONE}','')})()`
