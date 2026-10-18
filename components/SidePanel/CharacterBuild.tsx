import { characterBuild } from 'config/build'
import styles from './CharacterBuild.module.css'
import GameIcon from './GameIcon'

export default function CharacterBuild() {
	return (
		<ul className={styles.grid}>
			{characterBuild.map((c, i) => (
				<li key={c.name} className={styles.card}>
					<span className={`disp ${styles.key}`}>
						{String(i + 1).padStart(2, '0')}
					</span>
					<span className={`disp ${styles.name}`}>{c.name}</span>
					<span className={styles.line}>{c.line}</span>
					{c.games && (
						<span className={styles.games}>
							{c.games.map((g) => (
								<span key={g.name} className={styles.game} title={g.name}>
									<GameIcon icon={g.icon} abbr={g.abbr} />
									<span className={styles.gameName}>{g.name}</span>
								</span>
							))}
						</span>
					)}
				</li>
			))}
		</ul>
	)
}
