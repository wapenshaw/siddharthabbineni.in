import Backdrop from 'components/Backdrop'
import Header from 'components/Header'
import Socials from 'components/Header/Socials'
import StackOverflowChip from 'components/Header/StackOverflow'
import Nav from 'components/Nav'
import MotionRoot from 'components/Nav/MotionRoot'
import Navigator from 'components/Nav/Navigator'
import SectionMotion from 'components/Nav/SectionMotion'
import TeamRadio from 'components/TeamRadio'
import { profile } from 'config/profile'
import { BLOG_URL } from 'config/site'
import styles from './layout.module.css'

/**
 * The frame every section shares: header, section nav, the Team radio bar.
 * On desktops it is one screen that never scrolls; the open section fills
 * the middle. On phones the Team radio is a bar fixed to the bottom of the
 * screen, and Resume and Blog move from the header to the end of the page.
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
				{/* phones only: the PDF opens directly, as the header's Resume does there */}
				<div className={styles.links}>
					<a
						className="btn btn-red sl"
						href={profile.resumeUrl}
						target="_blank"
						rel="noopener"
					>
						Resume
					</a>
					<a className="btn btn-white sl" href={BLOG_URL}>
						Blog
					</a>
				</div>
				<footer className={styles.foot}>
					<Socials />
					<StackOverflowChip />
				</footer>
			</div>
			<Navigator />
		</MotionRoot>
	)
}
