import SearchShortcut from 'components/SearchShortcut'
import {
	AUTHOR,
	BLOG_NAME,
	DEPLOY_URL,
	DESCRIPTION,
	isStaging,
	PORTFOLIO_URL,
	SITE_URL,
	SOCIAL,
} from 'lib/site'
import { DEFAULT_THEME, themeInitScript } from 'lib/theme'
import type { Metadata } from 'next'
import {
	Atkinson_Hyperlegible_Mono,
	Atkinson_Hyperlegible_Next,
	Saira,
} from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// Saira is drawn at 75% width for headings (.cond)
const saira = Saira({
	subsets: ['latin'],
	axes: ['wdth'],
	variable: '--font-saira',
	display: 'swap',
})

const body = Atkinson_Hyperlegible_Next({
	subsets: ['latin'],
	variable: '--font-body',
	display: 'swap',
})

const mono = Atkinson_Hyperlegible_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
	display: 'swap',
})

const TITLE = `${BLOG_NAME} | ${AUTHOR}`

/** The share card (app/og.png), as metadata wants it */
const SHARE_IMAGE = {
	url: '/og.png',
	width: 1200,
	height: 630,
	alt: `${BLOG_NAME}, the blog of ${AUTHOR}`,
}

export const metadata: Metadata = {
	title: { default: TITLE, template: `%s | ${BLOG_NAME}` },
	description: DESCRIPTION,
	authors: [{ name: AUTHOR, url: PORTFOLIO_URL }],
	creator: AUTHOR,
	metadataBase: new URL(DEPLOY_URL),
	// staging also sends an X-Robots-Tag header (the deploy workflow)
	...(isStaging && { robots: { index: false, follow: false } }),
	alternates: {
		canonical: `${SITE_URL}/`,
		types: {
			'application/rss+xml': [{ url: '/feed.xml', title: TITLE }],
		},
	},
	openGraph: {
		title: TITLE,
		siteName: BLOG_NAME,
		description: DESCRIPTION,
		url: `${SITE_URL}/`,
		type: 'website',
		locale: 'en_US',
		images: [SHARE_IMAGE],
	},
	twitter: {
		card: 'summary_large_image',
		title: TITLE,
		description: DESCRIPTION,
		creator: `@${SOCIAL.x}`,
		images: [SHARE_IMAGE],
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="en"
			data-theme={DEFAULT_THEME}
			className={`${saira.variable} ${body.variable} ${mono.variable}`}
			// the init script sets data-theme before hydration
			suppressHydrationWarning
		>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: constant theme script from lib/theme */}
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body>
				<a className="skip" href="#content">
					Skip to the content
				</a>
				{/* grows to fill the screen, so the footer sits at the bottom of a short page */}
				<div className="page">{children}</div>
				<SearchShortcut />
				<footer className="site-footer">
					<span>blog.siddharthabbineni.in</span>
					<a href={PORTFOLIO_URL}>The portfolio</a>
					<a href={SOCIAL.github}>GitHub</a>
					<a href="/feed.xml">RSS</a>
				</footer>
				{isStaging ? null : (
					<>
						<Script
							src="https://www.googletagmanager.com/gtag/js?id=G-GK9R79RGL6"
							strategy="afterInteractive"
						/>
						<Script id="google-analytics" strategy="afterInteractive">
							{`
								window.dataLayer = window.dataLayer || [];
								function gtag(){window.dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', 'G-GK9R79RGL6');
							`}
						</Script>
					</>
				)}
			</body>
		</html>
	)
}
