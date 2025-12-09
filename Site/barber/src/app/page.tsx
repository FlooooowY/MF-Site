'use client'

import { useState, useEffect } from 'react'
import {
	Header,
	Hero,
	Services,
	Masters,
	Gallery,
	Reviews,
	Contacts,
	Footer,
	BookingModal,
	LoadingScreen,
	AboutSection,
	CookieConsent,
	TelegramButton,
	SoundToggle,
	ScrollProgress,
} from '@/components'

export default function Home() {
	const [isBookingOpen, setIsBookingOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	// Handle booking button clicks throughout the page
	useEffect(() => {
		const handleBookingClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			const bookingLink = target.closest('a[href="#booking"]')
			if (bookingLink) {
				e.preventDefault()
				setIsBookingOpen(true)
			}
		}

		document.addEventListener('click', handleBookingClick)
		return () => document.removeEventListener('click', handleBookingClick)
	}, [])

	const handleLoadingComplete = () => {
		setIsLoading(false)
	}

	return (
		<>
			{/* Loading Screen */}
			{isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

			<main id='main-content' className='relative' role='main'>
				{/* Scroll Progress Indicator */}
				<ScrollProgress />

				{/* Header */}
				<Header />

				{/* Hero Section */}
				<Hero />

				{/* About Section */}
				<AboutSection />

				{/* Services Section */}
				<Services />

				{/* Masters Section */}
				<Masters />

				{/* Gallery Section */}
				<Gallery />

				{/* Reviews Section */}
				<Reviews />

				{/* Contacts Section */}
				<Contacts />

				{/* Footer */}
				<Footer />

				{/* Booking Modal */}
				<BookingModal
					isOpen={isBookingOpen}
					onClose={() => setIsBookingOpen(false)}
				/>

				{/* Floating Elements */}
				<TelegramButton />
				<SoundToggle />

				{/* Cookie Consent */}
				<CookieConsent />

				{/* Floating CTA Button (Mobile) */}
				<button
					onClick={() => setIsBookingOpen(true)}
					className='fixed bottom-6 right-6 z-40 md:hidden btn-primary px-6 py-4 rounded-full shadow-gold-intense animate-pulse-gold'
					aria-label='Записаться на стрижку'
				>
					<span className='flex items-center gap-2'>
						<span>★</span>
						<span>Записаться</span>
					</span>
				</button>
			</main>
		</>
	)
}
