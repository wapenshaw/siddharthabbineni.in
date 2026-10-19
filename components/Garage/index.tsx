import Stack from 'components/Stack'
import tower from 'components/Tower.module.css'
import { profile } from 'config/profile'
import { projects } from 'config/quests'
import { GITHUB_USER, getUpstreamPullRequests } from 'lib/github'
import { postHref } from 'lib/postFormat'
import Link from 'next/link'
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
	const prs = await getUpstreamPullRequests()
	const merged = prs.filter((p) => p.state === 'merged').length
	const open = prs.length - merged
	const [lead, ...rest] = projects

	return (
		<main className={styles.garage} aria-labelledby="garage-title">
			<h1 id="garage-title" className="sr-only">
				Garage
			</h1>
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
					<h2 id="prs-title">Open source contributions</h2>
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
			<div className={styles.body}>
				<h2 className={styles.name}>{project.name}</h2>
				<p className={styles.line}>{project.line}</p>
				<Stack items={project.stack} />
				{project.post && (
					<Link
						className={`btn btn-carbon sl ${styles.read}`}
						href={postHref(project.post)}
					>
						Read how I built it
					</Link>
				)}
			</div>
		</article>
	)
}
