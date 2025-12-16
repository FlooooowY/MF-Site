'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const navLinks = [
	{ href: '/', label: 'Главная' },
	{ href: '/services', label: 'Услуги' },
	{ href: '/portfolio', label: 'Портфолио' },
	{ href: '/pricing', label: 'Цены' },
	{ href: '/about', label: 'О нас' },
	{ href: '/contacts', label: 'Контакты' },
]

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { scrollY } = useScroll()
	const [isScrolled, setIsScrolled] = useState(false)

	const headerBg = useTransform(
		scrollY,
		[0, 100],
		['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.95)']
	)

	const headerShadow = useTransform(
		scrollY,
		[0, 100],
		['0 0 0 rgba(0,0,0,0)', '0 4px 30px rgba(0,0,0,0.3)']
	)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	}, [isMenuOpen])

	return (
		<>
			<motion.header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-md'
				}`}
				style={{
					backgroundColor: headerBg,
					boxShadow: headerShadow,
				}}
			>
				<div className='max-w-7xl mx-auto px-6 lg:px-8'>
					<div className='flex items-center justify-between h-20'>
						{/* Logo */}
						<Link href='/' className='relative z-10'>
							<motion.div
								className='flex items-center gap-3'
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<div className='w-11 h-11 bg-white flex items-center justify-center'>
									<span className='text-black font-bold text-base' style={{ letterSpacing: '0.05em' }}>
										M&F
									</span>
								</div>
								<span className='font-bold text-xl hidden sm:block text-white' style={{ letterSpacing: '0.05em' }}>
									Digital
								</span>
							</motion.div>
						</Link>

						{/* Desktop Navigation */}
						<nav className='hidden lg:flex items-center gap-8'>
							{navLinks.map(link => (
								<Link
									key={link.href}
									href={link.href}
									className='text-sm font-medium transition-colors duration-200'
									style={{ color: '#ffffff' }}
								>
									{link.label}
								</Link>
							))}
						</nav>

						{/* CTA Button */}
						<div className='hidden lg:block'>
							<Link href='/contacts'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200'
									style={{ backgroundColor: '#ffffff', color: '#000000' }}
								>
									Оставить заявку →
								</motion.button>
							</Link>
						</div>

						{/* Mobile Menu Button */}
						<motion.button
							className='lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							whileTap={{ scale: 0.9 }}
						>
							<motion.span
								className='w-6 h-0.5 bg-white origin-center'
								animate={{
									rotate: isMenuOpen ? 45 : 0,
									y: isMenuOpen ? 4 : 0,
								}}
							/>
							<motion.span
								className='w-6 h-0.5 bg-white'
								animate={{
									opacity: isMenuOpen ? 0 : 1,
								}}
							/>
							<motion.span
								className='w-6 h-0.5 bg-white origin-center'
								animate={{
									rotate: isMenuOpen ? -45 : 0,
									y: isMenuOpen ? -4 : 0,
								}}
							/>
						</motion.button>
					</div>
				</div>
			</motion.header>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						className='fixed inset-0 z-40 bg-black lg:hidden backdrop-blur-xl'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<nav className='flex flex-col items-center justify-center h-full gap-8'>
							{navLinks.map((link, i) => (
								<motion.div
									key={link.href}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ delay: i * 0.05 }}
								>
									<Link
										href={link.href}
										className='text-3xl font-bold text-white hover:text-white/70 transition-colors'
										onClick={() => setIsMenuOpen(false)}
									>
										{link.label}
									</Link>
								</motion.div>
							))}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: navLinks.length * 0.05 }}
								className='mt-8'
							>
								<Link href='/contacts' onClick={() => setIsMenuOpen(false)}>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className='px-8 py-3 text-base font-medium rounded-md transition-all duration-200'
										style={{ backgroundColor: '#ffffff', color: '#000000' }}
									>
										Оставить заявку →
									</motion.button>
								</Link>
							</motion.div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
