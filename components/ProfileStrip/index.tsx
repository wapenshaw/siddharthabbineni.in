import { GamepadIcon, GitHubIcon, LinkedInIcon, XIcon } from 'components/Icons'
import ThemeControls from 'components/ThemeControls'
import { profile } from 'config/profile'
import styles from './ProfileStrip.module.css'
import ResumeButton from './ResumeButton'
import ViewSwitch from './ViewSwitch'

const socials = [
	{ href: profile.links.github, label: 'GitHub', icon: <GitHubIcon /> },
	{ href: profile.links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
	{ href: profile.links.x, label: 'X/Twitter', icon: <XIcon /> },
	{
		href: profile.links.exophase,
		label: 'Exophase gaming profile',
		icon: <GamepadIcon />,
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
						width={300}
						height={300}
					/>
				</span>
				<span className={`disp ${styles.initials}`} title="Siddharth Abbineni">
					{/* the photo already carries the name, so the logo is decorative */}
					<img
						className={styles.logoLight}
						src={profile.initialsAvatar.light}
						alt=""
						width={20}
						height={18}
					/>
					<img
						className={styles.logoDark}
						src={profile.initialsAvatar.dark}
						alt=""
						width={20}
						height={18}
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

			<p className={styles.bio}>{profile.bio}</p>

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
				<div className={styles.row}>
					<a className="btn btn-fill" href={`mailto:${profile.email}`}>
						Send invite
					</a>
					<ResumeButton href={profile.resumeUrl} />
					<ViewSwitch />
				</div>
			</div>
		</header>
	)
}
