import { characterBuild } from 'config/build'
import styles from './CharacterBuild.module.css'
import PixelIcon from './PixelIcon'

/** Square cards: icon and class, a short line, then loadout chips at the foot */
export default function CharacterBuild() {
	return (
		<ul className={styles.grid}>
			{characterBuild.map((c) => (
				<li key={c.name} className={styles.card}>
					<PixelIcon name={c.icon} className={styles.icon} />
					<span className={`disp ${styles.name}`}>{c.name}</span>
					<span className={styles.line}>{c.line}</span>
					{c.loadout && (
						<span className={styles.foot}>
							<span className={styles.loadout}>
								<span className="sr-only">Loadout: </span>
								{c.loadout.map((l) => (
									<span key={l} className={styles.chip}>
										{l}
									</span>
								))}
							</span>
						</span>
					)}
				</li>
			))}
		</ul>
	)
}
