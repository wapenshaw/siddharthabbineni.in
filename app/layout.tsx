import type { Metadata } from 'next'
import Script from 'next/script'
import { Provider } from 'components/ui/provider'
import 'styles/globals.css'

export const metadata: Metadata = {
	title: 'Siddharth Abbineni | Software Engineer',
	description: "Siddharth Abbineni's Personal Website",
	openGraph: {
		title: 'Siddharth Abbineni, Software Engineer',
		siteName: 'Wapenshaw',
		url: 'https://siddharthabbineni.in',
		description: 'Developer, Gamer, Engineer',
		type: 'profile',
		images: ['https://siddharthabbineni.in/SA_avatar.png'],
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
