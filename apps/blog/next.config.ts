import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Plain files in out/: Azure serves the blog from its edge, with no server
	output: 'export',
	// /<slug>/index.html, so every post has a clean folder URL
	trailingSlash: true,
	typedRoutes: true,
	images: {
		unoptimized: true,
	},
	// This app has its own lockfile inside the portfolio's repo
	turbopack: {
		root: process.cwd(),
	},
}

// Plugins are named as strings with plain options so Turbopack can load them
const withMDX = createMDX({
	// .md is plain markdown (the old blog), .mdx can use components
	extension: /\.mdx?$/,
	options: {
		// front matter is read by lib/posts.ts; this keeps it out of the body
		remarkPlugins: ['remark-frontmatter', 'remark-gfm'],
		rehypePlugins: [
			// ids on headings: each h2 is a lap in the lap counter
			'rehype-slug',
			[
				'rehype-pretty-code',
				{
					// both themes are emitted; globals.css picks one by data-theme
					theme: { light: 'github-light', dark: 'github-dark' },
					keepBackground: false,
				},
			],
		],
	},
})

export default withMDX(nextConfig)
