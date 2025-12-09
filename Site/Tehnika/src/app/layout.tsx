import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MatrixBackground from '@/components/effects/MatrixBackground'

export const metadata: Metadata = {
	title: 'TECHNO MEGASTORE | Магазин электроники и техники',
	description:
		'Крупнейший интернет-магазин электроники. Смартфоны, ноутбуки, телевизоры и бытовая техника с доставкой по всей России.',
	keywords:
		'электроника, техника, смартфоны, ноутбуки, телевизоры, бытовая техника',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<body className='min-h-screen bg-primary antialiased'>
				<MatrixBackground />
				<div className='relative z-10'>
					<Header />
					<main className='min-h-screen'>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}
