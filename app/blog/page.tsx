import ThemeControls from 'components/ThemeControls'
import { profile } from 'config/profile'
import { getArticles } from 'lib/devto'
import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './blog.module.css'

export const metadata: Metadata = {
	title: `Devlog | ${profile.name}`,
	description: `Articles and guides by ${profile.name}`,
	alternates: {
		canonical: '/blog',
	},
}

export default async function BlogPage() {
	const articles = await getArticles()

	return (
		<main className={styles.page}>
			<header className={`panel ${styles.header}`}>
				<Link href="/" className={`disp ${styles.back}`}>
					← Player profile
				</Link>
				<h1 className={`disp ${styles.title}`}>Devlog</h1>
				<ThemeControls />
			</header>

			{articles.length === 0 ? (
				<p className={styles.empty}>
					No posts could be loaded. Read them on{' '}
					<a
						href={profile.links.devto}
						target="_blank"
						rel="noopener noreferrer"
					>
						dev.to
					</a>
					.
				</p>
			) : (
				<ul className={styles.list}>
					{articles.map((a) => (
						<li key={a.id}>
							<a
								className={`panel ${styles.post}`}
								href={a.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span className={styles.meta}>
									{a.readable_publish_date} · {a.reading_time_minutes} min read
								</span>
								<span className={`disp ${styles.postTitle}`}>{a.title}</span>
								{a.description && (
									<span className={styles.description}>{a.description}</span>
								)}
								{a.tag_list.length > 0 && (
									<span className={styles.tags}>
										{a.tag_list.map((t) => (
											<span key={t} className="chip">
												#{t}
											</span>
										))}
									</span>
								)}
							</a>
						</li>
					))}
				</ul>
			)}
		</main>
	)
}
