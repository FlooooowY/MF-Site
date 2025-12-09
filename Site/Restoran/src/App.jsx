import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import Menu from './components/Menu'
import FloorPlan from './components/FloorPlan'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import WineCard from './components/WineCard'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import PageLoader from './components/PageLoader'

function App() {
	const [isLoading, setIsLoading] = useState(true)
	const [isBookingOpen, setIsBookingOpen] = useState(false)
	const [isNightMode, setIsNightMode] = useState(false)

	useEffect(() => {
		// Simulate loading
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 2000)

		// Check for night mode (after 20:00)
		const checkNightMode = () => {
			const hour = new Date().getHours()
			setIsNightMode(hour >= 20 || hour < 6)
		}

		checkNightMode()
		const nightInterval = setInterval(checkNightMode, 60000)

		return () => {
			clearTimeout(timer)
			clearInterval(nightInterval)
		}
	}, [])

	useEffect(() => {
		if (isNightMode) {
			document.body.classList.add('night-mode')
		} else {
			document.body.classList.remove('night-mode')
		}
	}, [isNightMode])

	const openBooking = () => setIsBookingOpen(true)
	const closeBooking = () => setIsBookingOpen(false)

	return (
		<Router>
			<div className='app'>
				<PageLoader isLoading={isLoading} />
				<Navbar onBookingClick={openBooking} />

				<main>
					<Hero onBookingClick={openBooking} />
					<Philosophy />
					<Menu />
					<FloorPlan onBookingClick={openBooking} />
					<Gallery />
					<Reviews />
					<WineCard />
					<Contact />
				</main>

				<Footer />

				<BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
			</div>
		</Router>
	)
}

export default App
