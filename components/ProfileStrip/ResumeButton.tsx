'use client'

import { type MouseEvent, useRef, useState } from 'react'
import styles from './ResumeButton.module.css'

/** Phones and the stacked layout open the PDF directly; embedded PDFs barely work there */
const EMBED_QUERY = '(min-width: 1181px) and (min-height: 541px)'

/**
 * Opens the resume PDF in a dialog that powers on like a CRT. Without
 * JavaScript, or on small screens, the button is a plain link to the PDF.
 */
export default function ResumeButton({ href }: { href: string }) {
	const dialog = useRef<HTMLDialogElement>(null)
	const [loaded, setLoaded] = useState(false)
	const [closing, setClosing] = useState(false)

	const open = (e: MouseEvent) => {
		if (!window.matchMedia(EMBED_QUERY).matches) {
			return
		}
		e.preventDefault()
		setLoaded(true)
		setClosing(false)
		dialog.current?.showModal()
	}

	const close = () => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			dialog.current?.close()
			return
		}
		// The power-off animation ends in onAnimationEnd, which closes the dialog
		setClosing(true)
	}

	return (
		<>
			<a
				className="btn"
				href={href}
				target="_blank"
				rel="noopener"
				onClick={open}
			>
				Resume
			</a>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click is a mouse shortcut; Esc and the Close button cover keyboards */}
			<dialog
				ref={dialog}
				className={styles.dialog}
				data-closing={closing || undefined}
				aria-labelledby="resume-title"
				onCancel={(e) => {
					e.preventDefault()
					close()
				}}
				onClick={(e) => {
					// A click on the backdrop lands on the dialog element itself
					if (e.target === e.currentTarget) {
						close()
					}
				}}
				onAnimationEnd={(e) => {
					// the backdrop's own animation reports here too, with a pseudoElement
					if (e.target === e.currentTarget && !e.pseudoElement && closing) {
						setClosing(false)
						dialog.current?.close()
					}
				}}
			>
				<div className={styles.bar}>
					<span id="resume-title" className="label label-hi">
						Resume · PDF
					</span>
					<div className={styles.actions}>
						<a className="btn" href={href} download>
							Download
						</a>
						<a className="btn" href={href} target="_blank" rel="noopener">
							Open
						</a>
						<button
							type="button"
							className="icon-btn"
							onClick={close}
							aria-label="Close"
							title="Close"
						>
							×
						</button>
					</div>
				</div>
				{loaded && (
					<iframe
						className={styles.frame}
						src={`${href}#view=FitH&navpanes=0`}
						title="Resume"
					/>
				)}
			</dialog>
		</>
	)
}
