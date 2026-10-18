import { jobs } from 'config/experience'
import { profile } from 'config/profile'
import { DEFAULT_MODE, DEFAULT_SKIN, themeInitScript } from 'config/skins'
import type { Metadata } from 'next'
import { Barlow, Chakra_Petch } from 'next/font/google'
import Script from 'next/script'
import 'styles/globals.css'

const display = Chakra_Petch({
	subsets: ['latin'],
	weight: ['500', '600', '700'],
	variable: '--font-display',
	display: 'swap',
})

const body = Barlow({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-body',
	display: 'swap',
})

const SITE_URL = 'https://www.siddharthabbineni.in'
const TITLE = `${profile.name} | Automation Engineer & Cloud Architect`
const DESCRIPTION = `${profile.name}: automation engineer, cloud architect and developer in ${profile.location}. Platform automation, Azure and AWS, .NET, Python and Terraform.`
const current = jobs.at(-1)

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	keywords: [
		profile.name,
		'Automation Engineer',
		'Cloud Architect',
		'Platform Engineering',
		'Azure',
		'AWS',
		'Terraform',
		'Ansible',
		'.NET',
		'Hyderabad',
	],
	authors: [{ name: profile.name }],
	creator: profile.name,
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: TITLE,
		siteName: profile.name,
		url: SITE_URL,
		description: DESCRIPTION,
		type: 'profile',
		images: [
			{
				url: '/SA_avatar.png',
				width: 400,
				height: 400,
				alt: profile.name,
			},
		],
		locale: 'en_US',
	},
	twitter: {
		card: 'summary',
		title: TITLE,
		description: DESCRIPTION,
		creator: `@${profile.handle}`,
	},
	icons: {
		icon: '/favicons/favicon.ico',
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
			data-skin={DEFAULT_SKIN}
			data-mode={DEFAULT_MODE}
			className={`${display.variable} ${body.variable}`}
			// The init script rewrites data-skin/data-mode before hydration
			suppressHydrationWarning
		>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: constant theme script from config/skins */}
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD serialised from config
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Person',
							name: profile.name,
							url: SITE_URL,
							image: `${SITE_URL}/SA_avatar.png`,
							jobTitle: current?.role,
							worksFor: current && {
								'@type': 'Organization',
								name: current.company,
								url: current.url,
							},
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Hyderabad',
								addressCountry: 'IN',
							},
							sameAs: [
								profile.links.linkedin,
								profile.links.github,
								profile.links.devto,
								profile.links.x,
							],
						}),
					}}
				/>
			</head>
			<body>
				{children}
				{process.env.NEXT_PUBLIC_SITE_URL?.includes('staging') ? null : (
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
