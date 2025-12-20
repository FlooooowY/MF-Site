import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ToastProvider } from '@/components/Toast'

export const metadata: Metadata = {
	title: 'AROMA CRAFT COFFEE — Кофе как искусство',
	description:
		'Крафтовый кофе с душой. Каждая чашка — история вкуса. Программа лояльности, быстрый заказ, доставка.',
	keywords: 'кофе, кофейня, капучино, латте, эспрессо, крафтовый кофе',
	manifest: '/manifest.json',
	openGraph: {
		title: 'AROMA CRAFT COFFEE',
		description: 'Кофе как искусство — от экрана до чашки',
		type: 'website',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'AROMA CRAFT COFFEE',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'AROMA CRAFT COFFEE — Кофе как искусство',
		description: 'Крафтовый кофе с душой. Каждая чашка — история вкуса.',
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/icon.svg', type: 'image/svg+xml' },
		],
		apple: '/apple-touch-icon.png',
	},
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: '#2D1B19',
	viewportFit: 'cover',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru' className='scroll-smooth'>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
			</head>
			<body className='antialiased'>
				<ToastProvider>
					<div className='noise-overlay' aria-hidden='true' />
					{children}
				</ToastProvider>
			</body>
		</html>
	)
}
