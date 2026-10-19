import Backdrop from 'components/Backdrop'
import Header from 'components/Header'
import Socials from 'components/Header/Socials'
import StackOverflowChip from 'components/Header/StackOverflow'
import Nav from 'components/Nav'
import MotionRoot from 'components/Nav/MotionRoot'
import Navigator from 'components/Nav/Navigator'
import SectionMotion from 'components/Nav/SectionMotion'
import { StandaloneWatch } from 'components/Press/ReadingMode'
import TeamRadio from 'components/TeamRadio'
import styles from './layout.module.css'

/**
 * The frame every section shares: header, section nav, the Team radio bar.
 * On desktops it is one screen that never scrolls; the open section fills
 * the middle.
 */
export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<MotionRoot>
			<Backdrop />
			<div className={styles.app}>
				<Header className={styles.header} />
				<Nav className={styles.nav} />
				<SectionMotion className={styles.main}>{children}</SectionMotion>
				<TeamRadio className={styles.radio} />
				<footer className={styles.foot}>
					<Socials />
					<StackOverflowChip />
				</footer>
			</div>
			<Navigator />
			<StandaloneWatch />
		</MotionRoot>
	)
}
