import type { Metadata } from 'next'
import Script from 'next/script'
import { Provider } from 'components/ui/provider'
import 'styles/globals.css'

export const metadata: Metadata = {
	title: 'Siddharth Abbineni | Cloud & Software Architect',
	description:
		'Siddharth Abbineni — Cloud & Software Architect based in Hyderabad, India. Specializing in Azure, AWS, .NET, React, and cloud-native solutions.',
	keywords: [
		'Siddharth Abbineni',
		'Cloud Architect',
		'Software Architect',
		'Azure',
		'AWS',
		'React',
		'.NET',
		'TypeScript',
		'Hyderabad',
	],
	authors: [{ name: 'Siddharth Abbineni' }],
	creator: 'Siddharth Abbineni',
	metadataBase: new URL('https://www.siddharthabbineni.in'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'Siddharth Abbineni | Cloud & Software Architect',
		siteName: 'Siddharth Abbineni',
		url: 'https://www.siddharthabbineni.in',
		description:
			'Cloud & Software Architect based in Hyderabad, India. Azure, AWS, .NET, React, and cloud-native solutions.',
		type: 'profile',
		images: [
			{
				url: '/SA_avatar.png',
				width: 400,
				height: 400,
				alt: 'Siddharth Abbineni',
			},
		],
		locale: 'en_US',
	},
	twitter: {
		card: 'summary',
		title: 'Siddharth Abbineni | Cloud & Software Architect',
		description:
			'Cloud & Software Architect based in Hyderabad. Azure, AWS, .NET, React.',
		creator: '@tHeSiD',
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
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Sora:ital,wght@0,100;0,300;0,400;0,500;0,600;1,100;1,300;1,400;1,500;1,600&display=swap"
					rel="stylesheet"
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Person',
							name: 'Siddharth Abbineni',
							url: 'https://www.siddharthabbineni.in',
							image: 'https://www.siddharthabbineni.in/SA_avatar.png',
							jobTitle: 'Cloud & Software Architect',
							worksFor: { '@type': 'Organization', name: 'Ashera' },
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Hyderabad',
								addressCountry: 'IN',
							},
							sameAs: [
								'https://www.linkedin.com/in/siddharthabbineni/',
								'https://github.com/wapenshaw',
								'https://dev.to/wapenshaw',
								'https://www.twitter.com/tHeSiD',
							],
						}),
					}}
				/>
			</head>
			<body>
				<Provider>{children}</Provider>
				<Script
					defer
					src="https://www.googletagmanager.com/gtag/js?id=G-GK9R79RGL6"
					strategy="afterInteractive"
				/>
				<Script defer id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){window.dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-GK9R79RGL6');
					`}
				</Script>
			</body>
		</html>
	)
}
