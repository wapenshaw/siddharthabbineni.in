import createMDX from '@next/mdx'
import type { NextConfig } from 'next'
import { isStaging } from './config/site'

const nextConfig: NextConfig = {
	output: 'standalone',
	typedRoutes: true,
	// Data is cached per function with 'use cache' + cacheLife (see lib/)
	cacheComponents: true,
	// <Link> prefetches the route's static shell only
	partialPrefetching: true,
	cacheLife: {
		// Steam and Xbox: refresh every 6 hours, drop after a quiet day
		gaming: { stale: 3600, revalidate: 21_600, expire: 86_400 },
	},
	// Posts are read from content/posts at build and on revalidation; the
	// share cards (lib/shareCard.tsx) read their fonts and the headshot
	outputFileTracingIncludes: {
		'/**': ['./content/posts/*', './assets/fonts/*', './public/SA_avatar.jpg'],
	},
	images: {
		unoptimized: true,
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					// SAMEORIGIN so the resume dialog can embed the PDF
					{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
					// keeps staging out of search results; files Azure serves without
					// Next.js get the same header from the deploy workflow
					...(isStaging
						? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
						: []),
				],
			},
		]
	},
}

// Plugins are named as strings with plain options so Turbopack can load them
const withMDX = createMDX({
	// .md is plain markdown (the archive), .mdx can use components
	extension: /\.mdx?$/,
	options: {
		// front matter is read by lib/posts.ts; this keeps it out of the body
		remarkPlugins: ['remark-frontmatter', 'remark-gfm'],
		rehypePlugins: [
			[
				'rehype-pretty-code',
				{
					// both themes are emitted; Press.module.css picks one by the site's mode
					theme: { light: 'github-light', dark: 'github-dark' },
					keepBackground: false,
				},
			],
		],
	},
})

export default withMDX(nextConfig)
