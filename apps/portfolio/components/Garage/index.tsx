import { GithubLogo, Globe, PenNib } from '@phosphor-icons/react/ssr'
import Stack from 'components/Stack'
import tower from 'components/Tower.module.css'
import { profile } from 'config/profile'
import { projects } from 'config/quests'
import { blogPostUrl } from 'lib/blog'
import {
	GITHUB_USER,
	getLatestRelease,
	getUpstreamPullRequests,
} from 'lib/github'
import styles from './Garage.module.css'

const prDate = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC',
})

const MAX_PRS = 8

/** GitHub's search for the same list: my PRs to other people's repos */
const ALL_PRS = `https://github.com/search?type=pullrequests&q=${encodeURIComponent(
	`is:pr author:${GITHUB_USER} -user:${GITHUB_USER}`
)}`

/**
 * Projects as cards, the newest one biggest; PRs to other people's repos as a
 * timing tower, newest first. Open ones are "under review", like an incident
 * the stewards haven't ruled on yet.
 */
export default async function Garage() {
	const [prs, releases] = await Promise.all([
		getUpstreamPullRequests(),
		Promise.all(
			projects.map((p) => (p.repo ? getLatestRelease(p.repo) : null))
		),
	])
	const merged = prs.filter((p) => p.state === 'merged').length
	const open = prs.length - merged
	const [lead, ...rest] = projects.map((p, i) => ({
		...p,
		status: releases[i] ? `${p.status}, ${releases[i]}` : p.status,
	}))

	return (
		<main className={styles.garage} aria-labelledby="garage-title">
			<h2 id="garage-title" className="sr-only">
				Garage
			</h2>
			<div className={styles.cards}>
				{lead && <ProjectCard project={lead} big />}
				<div className={styles.row}>
					{rest.map((p) => (
						<ProjectCard key={p.name} project={p} />
					))}
				</div>
			</div>

			<aside className={tower.tower} aria-labelledby="prs-title">
				<div className={tower.head}>
					<h3 id="prs-title">Open source contributions</h3>
					<span>
						{merged} merged{open > 0 && `, ${open} under review`}
					</span>
				</div>
				{prs.length === 0 ? (
					<p className={tower.empty}>
						GitHub isn’t answering right now. My pull requests are on{' '}
						<a
							href={profile.links.github}
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
						</a>
						.
					</p>
				) : (
					<>
						<div className={tower.columns} aria-hidden="true">
							<span>Pull request</span>
							<span>Result</span>
						</div>
						<ol className={tower.rows}>
							{prs.slice(0, MAX_PRS).map((p, i) => (
								<li key={p.url}>
									<a
										className={tower.row}
										href={p.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<span className={tower.pos}>{i + 1}</span>
										<span className={tower.text}>
											<b>{p.title}</b>
											<small>
												{p.repo} #{p.number}
											</small>
										</span>
										{p.state === 'open' ? (
											<span className={`${tower.date} ${styles.review}`}>
												Under review
											</span>
										) : (
											<span className={tower.date}>
												{prDate.format(new Date(p.date))}
											</span>
										)}
									</a>
								</li>
							))}
						</ol>
					</>
				)}
				<a
					className={tower.foot}
					href={ALL_PRS}
					target="_blank"
					rel="noopener noreferrer"
				>
					All on GitHub
				</a>
			</aside>
		</main>
	)
}

function ProjectCard({
	project,
	big = false,
}: {
	project: (typeof projects)[number]
	big?: boolean
}) {
	return (
		<article className={`panel ${styles.card} ${big ? styles.big : ''}`}>
			<span
				className={`tab slr ${project.shipped ? '' : styles.quietTab}`}
				data-colour={project.shipped ? 'green' : undefined}
			>
				{project.status}
			</span>
			<div className={`${styles.body} ${project.shot ? styles.withShot : ''}`}>
				<h3 className={styles.name}>{project.name}</h3>
				<p className={styles.line}>{project.line}</p>
				<div className={styles.kit}>
					<Stack items={project.stack} />
					<div className={styles.links}>
						{project.site && (
							<a
								className="btn btn-carbon sl"
								href={project.site}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Globe weight="bold" aria-hidden="true" />
								{new URL(project.site).host}
							</a>
						)}
						{project.repo && (
							<a
								className="btn sl"
								href={`https://github.com/${project.repo}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<GithubLogo weight="bold" aria-hidden="true" />
								Source
							</a>
						)}
						{project.post && (
							<a
								className={`btn sl ${project.site ? '' : 'btn-carbon'}`}
								href={blogPostUrl(project.post)}
							>
								<PenNib weight="bold" aria-hidden="true" />
								How I built it
							</a>
						)}
					</div>
				</div>
				{project.shot && (
					<figure className={styles.shot}>
						<img
							className={styles.light}
							src={project.shot.light}
							alt={project.shot.alt}
							width={project.shot.width}
							height={project.shot.height}
						/>
						<img
							className={styles.dark}
							src={project.shot.dark}
							alt={project.shot.alt}
							width={project.shot.width}
							height={project.shot.height}
						/>
					</figure>
				)}
			</div>
		</article>
	)
}
