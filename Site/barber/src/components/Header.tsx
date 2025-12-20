'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from './Logo'
import { useSound } from '@/lib/sounds'

const navItems = [
	{ label: 'О нас', href: '#about' },
	{ label: 'Услуги', href: '#services' },
	{ label: 'Мастера', href: '#masters' },
	{ label: 'Галерея', href: '#gallery' },
	{ label: 'Отзывы', href: '#reviews' },
	{ label: 'Контакты', href: '#contacts' },
]

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const { playTick } = useSound()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isMobileMenuOpen])

	const handleNavClick = () => {
		playTick()
		setIsMobileMenuOpen(false)
	}

	return (
		<>
			{/* Skip to content link for accessibility */}
			<a
				href='#main-content'
				className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-royal-gold focus:text-obsidian focus:rounded focus:outline-none'
			>
				Перейти к основному содержимому
			</a>

			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
				className={cn(
					'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
					isScrolled
						? 'bg-obsidian/90 backdrop-blur-md border-b border-royal-gold/10'
						: 'bg-transparent'
				)}
				role='banner'
			>
				<div className='container-custom'>
					<div className='flex items-center justify-between h-20 md:h-24'>
						{/* Logo */}
						<a
							href='#'
							className='relative z-10 focus-gold rounded'
							aria-label='BROTHERHOOD - На главную'
						>
							<Logo className='h-10 md:h-12 w-auto' />
						</a>

						{/* Desktop Navigation */}
						<nav
							className='hidden lg:flex items-center gap-8'
							role='navigation'
							aria-label='Основная навигация'
						>
							{navItems.map(item => (
								<a
									key={item.href}
									href={item.href}
									className='relative font-montserrat text-sm font-medium text-ivory/80 hover:text-royal-gold transition-colors duration-300 group focus-gold rounded px-1'
									onClick={() => playTick()}
								>
									{item.label}
									<span
										className='absolute -bottom-1 left-0 w-0 h-0.5 bg-royal-gold transition-all duration-300 group-hover:w-full'
										aria-hidden='true'
									/>
								</a>
							))}
						</nav>

						{/* Desktop Actions */}
						<div className='hidden lg:flex items-center gap-6'>
							<a
								href='tel:+79990000000'
								className='flex items-center gap-2 text-ivory/80 hover:text-royal-gold transition-colors focus-gold rounded px-2 py-1'
								aria-label='Позвонить: +7 999 000-00-00'
							>
								<Phone className='w-4 h-4' aria-hidden='true' />
								<span className='font-roboto-mono text-sm'>
									+7 999 000-00-00
								</span>
							</a>
							<button
								className='flex items-center gap-2 text-ivory/80 hover:text-royal-gold transition-colors focus-gold rounded px-2 py-1'
								aria-label='Войти в личный кабинет'
							>
								<User className='w-4 h-4' aria-hidden='true' />
								<span className='font-montserrat text-sm'>Войти</span>
							</button>
							<a
								href='#booking'
								className='btn-primary text-xs px-6 py-3 focus-gold'
								onClick={() => playTick()}
							>
								Записаться
							</a>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => {
								setIsMobileMenuOpen(!isMobileMenuOpen)
								playTick()
							}}
							className='lg:hidden relative z-10 p-2 text-ivory focus-gold rounded'
							aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
							aria-expanded={isMobileMenuOpen}
							aria-controls='mobile-menu'
						>
							{isMobileMenuOpen ? (
								<X className='w-6 h-6' />
							) : (
								<Menu className='w-6 h-6' />
							)}
						</button>
					</div>
				</div>
			</motion.header>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						id='mobile-menu'
						initial={{ opacity: 0, x: '-100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '-100%' }}
						transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
						className='fixed inset-0 z-40 lg:hidden'
						role='dialog'
						aria-modal='true'
						aria-label='Мобильное меню навигации'
					>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='absolute inset-0 bg-obsidian/80 backdrop-blur-sm'
							onClick={() => setIsMobileMenuOpen(false)}
							aria-hidden='true'
						/>

						{/* Menu Panel */}
						<motion.div
							className='absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-b from-deep-indigo to-velvet-night border-r border-royal-gold/20 overflow-y-auto'
							style={{
								boxShadow: '10px 0 40px rgba(0, 0, 0, 0.5)',
							}}
						>
							{/* Menu Header */}
							<div className='p-6 pt-24 border-b border-royal-gold/10'>
								<Logo className='h-10 w-auto' />
							</div>

							{/* Navigation */}
							<nav className='p-6' aria-label='Мобильная навигация'>
								<ul className='space-y-1' role='list'>
									{navItems.map((item, index) => (
										<motion.li
											key={item.href}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
										>
											<a
												href={item.href}
												onClick={handleNavClick}
												className='flex items-center gap-3 py-4 text-lg font-cormorant font-medium text-ivory hover:text-royal-gold transition-colors border-b border-royal-gold/10 focus-gold rounded'
											>
												<span className='text-royal-gold' aria-hidden='true'>
													▸
												</span>
												{item.label}
											</a>
										</motion.li>
									))}
								</ul>
							</nav>

							{/* CTA */}
							<div className='p-6 space-y-4'>
								<a
									href='#booking'
									onClick={handleNavClick}
									className='btn-primary w-full text-center block focus-gold'
								>
									Записаться
								</a>

								<div className='space-y-3 pt-4'>
									<a
										href='tel:+79990000000'
										className='flex items-center gap-3 text-ivory/70 hover:text-royal-gold transition-colors focus-gold rounded px-2 py-1'
										aria-label='Позвонить: +7 999 000-00-00'
									>
										<Phone
											className='w-5 h-5 text-royal-gold'
											aria-hidden='true'
										/>
										<span className='font-roboto-mono'>+7 999 000-00-00</span>
									</a>
								</div>
							</div>

							{/* Decorative Element */}
							<div
								className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian/50 to-transparent pointer-events-none'
								aria-hidden='true'
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
