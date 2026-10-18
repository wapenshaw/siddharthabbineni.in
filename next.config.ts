import type { NextConfig } from 'next'

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
	images: {
		unoptimized: true,
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-Frame-Options', value: 'DENY' },
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
				],
			},
		]
	},
}

export default nextConfig
