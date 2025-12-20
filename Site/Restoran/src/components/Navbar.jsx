import React, { useState, useEffect } from 'react'

function Navbar({ onBookingClick }) {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToSection = sectionId => {
		const element = document.getElementById(sectionId)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
		setIsMobileMenuOpen(false)
	}

	return (
		<nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
			<a
				href='#'
				className='navbar-logo'
				onClick={() => scrollToSection('hero')}
			>
				AURELIO
			</a>

			<div className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
				<a
					href='#philosophy'
					className='navbar-link'
					onClick={e => {
						e.preventDefault()
						scrollToSection('philosophy')
					}}
				>
					О нас
				</a>
				<a
					href='#menu'
					className='navbar-link'
					onClick={e => {
						e.preventDefault()
						scrollToSection('menu')
					}}
				>
					Меню
				</a>
				<a
					href='#floor-plan'
					className='navbar-link'
					onClick={e => {
						e.preventDefault()
						scrollToSection('floor-plan')
					}}
				>
					Зал
				</a>
				<a
					href='#gallery'
					className='navbar-link'
					onClick={e => {
						e.preventDefault()
						scrollToSection('gallery')
					}}
				>
					Галерея
				</a>
				<a
					href='#wine'
					className='navbar-link'
					onClick={e => {
						e.preventDefault()
						scrollToSection('wine')
					}}
				>
					Винная карта
				</a>
				<a
					href='#contact'
					className='navbar-link'
					onClick={e => {
						e.preventDefault()
						scrollToSection('contact')
					}}
				>
					Контакты
				</a>
				<button className='btn btn-primary' onClick={onBookingClick}>
					Забронировать
				</button>
			</div>

			<button
				className='menu-toggle'
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				aria-label='Toggle menu'
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</nav>
	)
}

export default Navbar
