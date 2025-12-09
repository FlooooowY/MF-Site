'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Coffee, CreditCard, User } from 'lucide-react'

const navItems = [
	{ id: 'home', icon: Home, label: 'Главная', href: '#' },
	{ id: 'menu', icon: Coffee, label: 'Меню', href: '#menu' },
	{ id: 'loyalty', icon: CreditCard, label: 'Бонусы', href: '#loyalty' },
	{ id: 'profile', icon: User, label: 'Профиль', href: '#contact' },
]

export default function MobileNav() {
	const [activeSection, setActiveSection] = useState('home')
	const [isVisible, setIsVisible] = useState(false)
	const [lastScrollY, setLastScrollY] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY

			// Show after scrolling down a bit
			if (currentScrollY > 300) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}

			// Determine active section
			const sections = ['menu', 'loyalty', 'philosophy', 'contact']
			let current = 'home'

			for (const section of sections) {
				const element = document.getElementById(section)
				if (element) {
					const rect = element.getBoundingClientRect()
					if (rect.top <= window.innerHeight / 2) {
						current = section === 'philosophy' ? 'home' : section
					}
				}
			}

			setActiveSection(current)
			setLastScrollY(currentScrollY)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [lastScrollY])

	const handleClick = (href: string, id: string) => {
		if (href === '#') {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			const element = document.querySelector(href)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' })
			}
		}
		setActiveSection(id)
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.nav
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
					className='fixed bottom-0 left-0 right-0 z-50 md:hidden'
				>
					{/* Backdrop blur container */}
					<div className='bg-coffee-dark/95 backdrop-blur-lg border-t border-gold-primary/20 px-4 py-2 pb-safe'>
						<div className='flex items-center justify-around'>
							{navItems.map(item => {
								const isActive =
									activeSection === item.id ||
									(item.id === 'profile' && activeSection === 'contact')

								return (
									<button
										key={item.id}
										onClick={() => handleClick(item.href, item.id)}
										className='relative flex flex-col items-center py-2 px-4 group'
									>
										{/* Active indicator */}
										{isActive && (
											<motion.div
												layoutId='activeTab'
												className='absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-primary rounded-full'
												transition={{
													type: 'spring',
													stiffness: 500,
													damping: 30,
												}}
											/>
										)}

										{/* Icon container */}
										<motion.div
											whileTap={{ scale: 0.9 }}
											className={`relative p-2 rounded-xl transition-all duration-300 ${
												isActive
													? 'bg-gold-primary/20 text-gold-primary'
													: 'text-cream/60 group-hover:text-cream'
											}`}
										>
											<item.icon className='w-5 h-5' />

											{/* Glow effect for active */}
											{isActive && (
												<motion.div
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{ opacity: 1, scale: 1 }}
													className='absolute inset-0 bg-gold-primary/20 rounded-xl blur-md'
												/>
											)}
										</motion.div>

										{/* Label */}
										<span
											className={`text-xs mt-1 transition-colors duration-300 ${
												isActive ? 'text-gold-primary' : 'text-cream/50'
											}`}
										>
											{item.label}
										</span>
									</button>
								)
							})}
						</div>

						{/* Mini loyalty progress bar */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
							className='mt-2 px-2'
						>
							<div className='flex items-center gap-2'>
								<CreditCard className='w-3 h-3 text-gold-primary/60' />
								<div className='flex-1 h-1 bg-coffee-medium rounded-full overflow-hidden'>
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: '85.7%' }}
										transition={{ duration: 1, delay: 0.5 }}
										className='h-full bg-gradient-to-r from-gold-primary to-gold-light rounded-full'
									/>
								</div>
								<span className='text-xs text-cream/50'>6/7</span>
							</div>
						</motion.div>
					</div>
				</motion.nav>
			)}
		</AnimatePresence>
	)
}
