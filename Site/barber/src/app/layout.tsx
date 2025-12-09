import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
	themeColor: '#2D2B55',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
}

export const metadata: Metadata = {
	title: 'BROTHERHOOD | Премиальный барбершоп в Москве',
	description:
		'Цифровой джентльменский клуб нового поколения. Премиальные стрижки, королевское бритьё и уход за бородой от лучших мастеров Москвы. Запишитесь онлайн!',
	keywords:
		'барбершоп, барбершоп москва, мужская стрижка, стрижка бороды, королевское бритьё, fade стрижка, мужской стиль, премиум барбершоп, brotherhood',
	authors: [{ name: 'BROTHERHOOD Barbershop' }],
	creator: 'BROTHERHOOD',
	publisher: 'BROTHERHOOD',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://brotherhood-barber.ru'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'BROTHERHOOD | Премиальный барбершоп в Москве',
		description:
			'Цифровой джентльменский клуб. Где традиции встречают стиль. Запишитесь к лучшим мастерам города.',
		type: 'website',
		locale: 'ru_RU',
		url: 'https://brotherhood-barber.ru',
		siteName: 'BROTHERHOOD Barbershop',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'BROTHERHOOD - Премиальный барбершоп',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'BROTHERHOOD | Премиальный барбершоп',
		description: 'Цифровой джентльменский клуб. Где традиции встречают стиль.',
		images: ['/og-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
	},
	manifest: '/manifest.json',
}

// JSON-LD structured data
const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'BarberShop',
	name: 'BROTHERHOOD Barbershop',
	image: 'https://brotherhood-barber.ru/og-image.jpg',
	'@id': 'https://brotherhood-barber.ru',
	url: 'https://brotherhood-barber.ru',
	telephone: '+7-999-000-00-00',
	priceRange: '₽₽',
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'ул. Тверская, 15',
		addressLocality: 'Москва',
		postalCode: '125009',
		addressCountry: 'RU',
	},
	geo: {
		'@type': 'GeoCoordinates',
		latitude: 55.7639,
		longitude: 37.6042,
	},
	openingHoursSpecification: [
		{
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			],
			opens: '10:00',
			closes: '22:00',
		},
	],
	aggregateRating: {
		'@type': 'AggregateRating',
		ratingValue: '4.9',
		reviewCount: '296',
	},
	sameAs: [
		'https://t.me/brotherhood',
		'https://instagram.com/brotherhood',
		'https://vk.com/brotherhood',
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className='antialiased'>{children}</body>
		</html>
	)
}
