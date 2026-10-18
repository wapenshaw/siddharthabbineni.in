import {
	GitHubIcon,
	InstagramIcon,
	LinkedInIcon,
	TwitterIcon,
} from 'components/BrandIcons'
import { GamepadIcon, MailIcon } from 'components/Icons'
import ThemeControls from 'components/ThemeControls'
import { profile } from 'config/profile'
import styles from './ProfileStrip.module.css'
import ResumeButton from './ResumeButton'
import StackOverflowBadge from './StackOverflowBadge'
import ViewSwitch from './ViewSwitch'

const socials = [
	{ href: profile.links.github, label: 'GitHub', icon: <GitHubIcon /> },
	{ href: profile.links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
	{ href: profile.links.x, label: 'Twitter', icon: <TwitterIcon /> },
	{
		href: profile.links.exophase,
		label: 'Exophase gaming profile',
		icon: <GamepadIcon />,
	},
	{
		href: profile.links.instagram,
		label: 'Instagram',
		icon: <InstagramIcon />,
	},
]

export default function ProfileStrip({ className }: { className?: string }) {
	return (
		<header className={`panel ${styles.strip} ${className ?? ''}`}>
			<div className={styles.avatar}>
				<span className={styles.photo}>
					<img
						src={profile.avatar}
						alt={profile.name}
						width={400}
						height={400}
					/>
				</span>
				{/* the photo already carries the name, so the logo badge is decorative */}
				<span className={styles.badge} aria-hidden="true">
					<span
						className={styles.mark}
						style={{
							maskImage: `url(${profile.logo})`,
							WebkitMaskImage: `url(${profile.logo})`,
						}}
					/>
				</span>
			</div>

			<div className={styles.who}>
				<div className={styles.now}>
					<span className={styles.nowDot} />
					Now playing: {profile.nowPlaying}
				</div>
				<h1 className={`disp ${styles.name}`}>{profile.name}</h1>
				<ul className={styles.classes} aria-label="Classes">
					{profile.classes.map((c) => (
						<li key={c} className="pill pill-acc">
							{c}
						</li>
					))}
					<li className={styles.divider} aria-hidden="true" />
					{profile.subclasses.map((c) => (
						<li key={c} className="pill">
							{c}
						</li>
					))}
				</ul>
			</div>

			<div className={styles.summary}>
				<p className={styles.bio}>{profile.bio}</p>
				<StackOverflowBadge />
			</div>

			<div className={styles.actions}>
				<div className={styles.row}>
					<ThemeControls />
					<span className={styles.sep} aria-hidden="true" />
					{socials.map((s) => (
						<a
							key={s.label}
							className="icon-btn"
							href={s.href}
							aria-label={s.label}
							title={s.label}
							target="_blank"
							rel="noopener noreferrer"
						>
							{s.icon}
						</a>
					))}
				</div>
				{/* Devlog is the main action; email is just a link, so it gets an icon */}
				<div className={styles.buttons}>
					<ViewSwitch />
					<ResumeButton href={profile.resumeUrl} />
					<a
						className={`btn ${styles.mail}`}
						href={`mailto:${profile.email}`}
						aria-label={`Email ${profile.name}`}
						title={profile.email}
					>
						<MailIcon />
					</a>
				</div>
			</div>
		</header>
	)
}
