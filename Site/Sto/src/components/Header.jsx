import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Calculator, Moon, Sun, Wrench } from 'lucide-react'
import './Header.css'

const Header = ({
	onBookingClick,
	onCalculatorClick,
	isDarkMode,
	toggleDarkMode,
}) => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		setIsMobileMenuOpen(false)
	}, [location])

	const navLinks = [
		{ to: '/', label: 'Главная' },
		{ to: '/services', label: 'Услуги' },
		{ to: '/about', label: 'О нас' },
		{ to: '/contact', label: 'Контакты' },
	]

	return (
		<header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
			<div className='header__container container'>
				{/* Logo */}
				<Link to='/' className='header__logo'>
					<div className='logo-icon'>
						<Wrench className='logo-wrench' />
					</div>
					<div className='logo-text'>
						<span className='logo-name'>АвтоМастер</span>
						<span className='logo-suffix'>Про</span>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<nav className='header__nav'>
					{navLinks.map(link => (
						<Link
							key={link.to}
							to={link.to}
							className={`nav-link ${
								location.pathname === link.to ? 'nav-link--active' : ''
							}`}
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div className='header__actions'>
					<button
						className='action-btn action-btn--calc'
						onClick={onCalculatorClick}
						title='Калькулятор стоимости'
					>
						<Calculator size={20} />
						<span>Калькулятор</span>
					</button>

					<a href='tel:+78001234567' className='action-btn action-btn--phone'>
						<Phone size={20} />
						<span>8 800 123-45-67</span>
					</a>

					<button
						className='btn btn-secondary header__cta'
						onClick={onBookingClick}
					>
						Записаться
					</button>

					<button
						className='theme-toggle'
						onClick={toggleDarkMode}
						title={isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
					>
						{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
					</button>

					{/* Mobile Menu Toggle */}
					<button
						className='mobile-toggle'
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label='Меню'
					>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}
			>
				<nav className='mobile-menu__nav'>
					{navLinks.map(link => (
						<Link
							key={link.to}
							to={link.to}
							className={`mobile-nav-link ${
								location.pathname === link.to ? 'mobile-nav-link--active' : ''
							}`}
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className='mobile-menu__actions'>
					<button
						className='btn btn-outline btn-lg'
						onClick={() => {
							setIsMobileMenuOpen(false)
							onCalculatorClick()
						}}
					>
						<Calculator size={20} />
						Калькулятор стоимости
					</button>

					<button
						className='btn btn-secondary btn-lg'
						onClick={() => {
							setIsMobileMenuOpen(false)
							onBookingClick()
						}}
					>
						<Phone size={20} />
						Записаться на ремонт
					</button>

					<a href='tel:+78001234567' className='mobile-phone'>
						<Phone size={24} />
						<span>8 800 123-45-67</span>
					</a>
				</div>
			</div>
		</header>
	)
}

export default Header
