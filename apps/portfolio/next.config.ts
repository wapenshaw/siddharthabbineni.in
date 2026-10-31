import type { NextConfig } from 'next'
import { BLOG_URL, isStaging } from './config/site'

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
	// The share cards (lib/shareCard.tsx) read their fonts and the headshot
	outputFileTracingIncludes: {
		'/**': ['./assets/fonts/*', './public/wapenshaw-helmet.png'],
	},
	images: {
		unoptimized: true,
	},
	// This app has its own lockfile inside the repo
	turbopack: {
		root: process.cwd(),
	},
	// Old addresses: posts moved to the blog, so links and feed readers follow them there
	async redirects() {
		return [
			// Driver profile became the home page
			{ source: '/profile', destination: '/', permanent: true },
			{
				source: '/blog/feed.xml',
				destination: `${BLOG_URL}/feed.xml`,
				permanent: true,
			},
			{
				// not the Press section's own share card
				source: '/blog/:slug((?!opengraph-image)[^/.]+)',
				destination: `${BLOG_URL}/:slug/`,
				permanent: true,
			},
		]
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

export default nextConfig
