import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { NightModeProvider } from '@/components/providers/NightModeProvider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'M&F Digital | Создаём цифровые продукты, которые приносят деньги',
	description:
		'Веб-разработка, ИИ-автоматизация, Telegram-боты и custom ПО. Средний ROI наших клиентов — 340%. Более 150 успешных проектов за 8 лет.',
	keywords: [
		'веб-разработка',
		'создание сайтов',
		'ИИ автоматизация',
		'Telegram боты',
		'разработка ПО',
		'digital агентство',
		'M&F Digital',
	],
	authors: [{ name: 'M&F Digital' }],
	creator: 'M&F Digital',
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		url: 'https://mf.digital',
		siteName: 'M&F Digital',
		title: 'M&F Digital | Создаём цифровые продукты, которые приносят деньги',
		description:
			'Веб-разработка, ИИ-автоматизация, Telegram-боты и custom ПО. Средний ROI наших клиентов — 340%.',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'M&F Digital',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'M&F Digital | Цифровые продукты, которые приносят деньги',
		description:
			'Веб-разработка, ИИ-автоматизация, Telegram-боты и custom ПО. ROI 340%.',
		images: ['/og-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<head>
				{/* Preconnect to font providers */}
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
				{/* Clash Grotesk & Satoshi from custom source or fallback */}
				<link
					href='https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&f[]=satoshi@400,500,700&display=swap'
					rel='stylesheet'
				/>
				{/* JetBrains Mono */}
				<link
					href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap'
					rel='stylesheet'
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
			>
				<NightModeProvider>
					<CustomCursor />
					{children}
				</NightModeProvider>
			</body>
		</html>
	)
}
