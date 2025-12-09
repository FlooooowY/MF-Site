import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BookingModal from './components/BookingModal'
import CalculatorModal from './components/CalculatorModal'
import OilDropsEffect from './components/effects/OilDropsEffect'
import './styles/App.css'

function App() {
	const [isBookingOpen, setIsBookingOpen] = useState(false)
	const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
	const [isDarkMode, setIsDarkMode] = useState(true)

	useEffect(() => {
		// Auto dark mode based on time
		const hour = new Date().getHours()
		if (hour >= 20 || hour < 6) {
			setIsDarkMode(true)
		}
	}, [])

	return (
		<Router>
			<div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
				<OilDropsEffect />
				<Header
					onBookingClick={() => setIsBookingOpen(true)}
					onCalculatorClick={() => setIsCalculatorOpen(true)}
					isDarkMode={isDarkMode}
					toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
				/>

				<main>
					<Routes>
						<Route
							path='/'
							element={
								<HomePage
									onBookingClick={() => setIsBookingOpen(true)}
									onCalculatorClick={() => setIsCalculatorOpen(true)}
								/>
							}
						/>
						<Route path='/services' element={<ServicesPage />} />
						<Route path='/about' element={<AboutPage />} />
						<Route path='/contact' element={<ContactPage />} />
					</Routes>
				</main>

				<Footer />

				{isBookingOpen && (
					<BookingModal onClose={() => setIsBookingOpen(false)} />
				)}

				{isCalculatorOpen && (
					<CalculatorModal onClose={() => setIsCalculatorOpen(false)} />
				)}
			</div>
		</Router>
	)
}

export default App
