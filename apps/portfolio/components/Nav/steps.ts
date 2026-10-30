/**
 * The wheel and PageUp/PageDown step through the site: a page that has steps
 * of its own (Seasons' stints) claims each step by calling preventDefault on
 * this event; unclaimed steps move to the next or previous section.
 */
export const STEP_EVENT = 'f1:step'

/** 1 goes down the nav (and back in time on Seasons), -1 goes up */
export type StepDetail = { dir: 1 | -1 }

export function onStep(handler: (dir: 1 | -1) => boolean) {
	const listener = (e: Event) => {
		if (handler((e as CustomEvent<StepDetail>).detail.dir)) {
			e.preventDefault()
		}
	}
	window.addEventListener(STEP_EVENT, listener)
	return () => window.removeEventListener(STEP_EVENT, listener)
}

/** True when keys belong to what has focus: a text box, or an open dialog */
export function keysAreBusy(e: KeyboardEvent) {
	const target = e.target as HTMLElement
	return (
		e.defaultPrevented ||
		e.altKey ||
		e.ctrlKey ||
		e.metaKey ||
		target.isContentEditable ||
		['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
		document.querySelector('dialog[open]') !== null
	)
}
