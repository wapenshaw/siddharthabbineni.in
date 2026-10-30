import { TRACK_PATH } from 'config/track'
import styles from './Backdrop.module.css'

/**
 * Shows only on screens bigger than 1920×1080, around the page: the circuit
 * faint and huge, speed lines and a chequered corner.
 */
export default function Backdrop() {
	return (
		<div className={styles.backdrop} aria-hidden="true">
			<svg
				className={styles.circuit}
				viewBox="180 40 410 540"
				aria-hidden="true"
			>
				<path d={TRACK_PATH} className={styles.tarmac} />
				<path d={TRACK_PATH} className={styles.racingLine} />
			</svg>
			<span className={styles.speed} />
			<span className={styles.checker} />
		</div>
	)
}
