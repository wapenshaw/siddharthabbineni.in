import { GamepadIcon, GitHubIcon, LinkedInIcon, XIcon } from 'components/Icons'
import ThemeControls from 'components/ThemeControls'
import { profile } from 'config/profile'
import styles from './ProfileStrip.module.css'

const socials = [
	{ href: profile.links.github, label: 'GitHub', icon: <GitHubIcon /> },
	{ href: profile.links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
	{ href: profile.links.x, label: 'X', icon: <XIcon /> },
	{
		href: profile.links.exophase,
		label: 'Exophase gaming profile',
		icon: <GamepadIcon />,
	},
]

export default function ProfileStrip({ className }: { className?: string }) {
	return (
		<header className={`panel ${styles.strip} ${className ?? ''}`}>
			<div className={styles.avatar} aria-hidden="true">
				<span className={`disp ${styles.initials}`}>{profile.initials}</span>
				<span className={`disp ${styles.since}`}>{profile.startYear}</span>
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
					<a
						className="btn"
						href={profile.resumeUrl}
						target="_blank"
						rel="noopener"
					>
						Resume
					</a>
				</div>
			</div>
		</header>
	)
}
