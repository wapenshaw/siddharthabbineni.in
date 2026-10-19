import Reader, { ReaderSkeleton } from 'components/Press/Reader'
import { profile } from 'config/profile'
import { getPosts } from 'lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import styles from '../blog.module.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
	return (await getPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const post = (await getPosts()).find((p) => p.slug === slug)
	if (!post) {
		return {}
	}
	return {
		title: `${post.title} | ${profile.name}`,
		description: post.description,
		keywords: post.tags,
		alternates: {
			canonical: `/blog/${post.slug}`,
		},
		openGraph: {
			type: 'article',
			title: post.title,
			description: post.description,
			url: `/blog/${post.slug}`,
			publishedTime: post.date,
			authors: [profile.name],
			tags: post.tags,
		},
	}
}

/** The slug is read inside Suspense, so the route keeps an instant shell (Partial Prefetching) */
export default function PostPage({ params }: Props) {
	return (
		<Suspense fallback={<ReaderSkeleton className={styles.reader} />}>
			<PostReader params={params} />
		</Suspense>
	)
}

async function PostReader({ params }: Props) {
	const { slug } = await params
	const posts = await getPosts()
	// unknown slugs would otherwise render on request (no dynamicParams with Cache Components)
	if (!posts.some((p) => p.slug === slug)) {
		notFound()
	}
	return <Reader posts={posts} slug={slug} className={styles.reader} />
}
