import { jobs } from 'config/experience'
import { profile } from 'config/profile'
import {
	BLOG_URL,
	DEPLOY_URL,
	isStaging,
	PERSON_ID,
	SITE_URL,
} from 'config/site'
import { DEFAULT_MODE, themeInitScript } from 'config/theme'
import { pageMetadata } from 'lib/pageMetadata'
import type { Metadata } from 'next'
import { Titillium_Web } from 'next/font/google'
import Script from 'next/script'
import 'styles/globals.css'

const f1 = Titillium_Web({
	subsets: ['latin'],
	weight: ['400', '600', '700', '900'],
	style: ['normal', 'italic'],
	variable: '--font-f1',
	display: 'swap',
})

const TITLE = `${profile.name} | Automation Engineer & Cloud Architect`
const DESCRIPTION = `${profile.name}: automation engineer, cloud architect and developer in ${profile.location}. Platform automation, Azure and AWS, .NET, Python and Terraform.`
const current = jobs.at(-1)

export const metadata: Metadata = {
	...pageMetadata({ title: TITLE, description: DESCRIPTION, path: '' }),
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
	metadataBase: new URL(DEPLOY_URL),
	// staging also sends an X-Robots-Tag header (next.config.ts)
	...(isStaging && { robots: { index: false, follow: false } }),
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="en"
			data-mode={DEFAULT_MODE}
			className={f1.variable}
			// The init script sets data-mode before hydration
			suppressHydrationWarning
		>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: constant theme script from config/theme */}
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD serialised from config
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Person',
							// the blog's posts name their author by this id
							'@id': PERSON_ID,
							name: profile.name,
							alternateName: ['wapenshaw', profile.handle],
							url: SITE_URL,
							image: `${SITE_URL}${profile.avatar}`,
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
								profile.links.x,
								profile.links.stackoverflow,
								profile.links.instagram,
								BLOG_URL,
								'https://dev.to/wapenshaw',
							],
						}),
					}}
				/>
			</head>
			<body>
				{children}
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
