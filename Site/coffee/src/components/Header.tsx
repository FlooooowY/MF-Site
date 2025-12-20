'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Coffee } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

const navItems = [
	{ name: 'Меню', href: '#menu' },
	{ name: 'Лояльность', href: '#loyalty' },
	{ name: 'О нас', href: '#philosophy' },
	{ name: 'Контакты', href: '#contact' },
]

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const { getTotalItems, openCart } = useCartStore()
	const totalItems = getTotalItems()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				isScrolled
					? 'bg-coffee-dark/95 backdrop-blur-md shadow-lg py-3'
					: 'bg-transparent py-6'
			}`}
		>
			<nav className='container mx-auto px-4 flex items-center justify-between'>
				{/* Logo */}
				<Link href='/' className='flex items-center gap-2 group'>
					<motion.div
						whileHover={{ rotate: 15 }}
						transition={{ type: 'spring', stiffness: 300 }}
					>
						<Coffee className='w-8 h-8 text-gold-primary' />
					</motion.div>
					<span className='font-playfair text-xl font-bold tracking-wider'>
						<span className='text-cream'>AROMA</span>
						<span className='text-gold-primary'> CRAFT</span>
					</span>
				</Link>

				{/* Desktop Navigation */}
				<div className='hidden md:flex items-center gap-8'>
					{navItems.map(item => (
						<Link
							key={item.name}
							href={item.href}
							className='relative text-cream/80 hover:text-cream transition-colors group'
						>
							{item.name}
							<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gold-primary transition-all duration-300 group-hover:w-full' />
						</Link>
					))}
				</div>

				{/* Cart & Mobile Menu */}
				<div className='flex items-center gap-4'>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						onClick={openCart}
						className='relative p-2 text-cream hover:text-gold-primary transition-colors'
					>
						<ShoppingBag className='w-6 h-6' />
						<AnimatePresence>
							{totalItems > 0 && (
								<motion.span
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0 }}
									className='absolute -top-1 -right-1 w-5 h-5 bg-terracotta rounded-full text-xs flex items-center justify-center font-semibold text-cream'
								>
									{totalItems}
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className='md:hidden p-2 text-cream hover:text-gold-primary transition-colors'
					>
						<AnimatePresence mode='wait'>
							{isMobileMenuOpen ? (
								<motion.div
									key='close'
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: 90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<X className='w-6 h-6' />
								</motion.div>
							) : (
								<motion.div
									key='menu'
									initial={{ rotate: 90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: -90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Menu className='w-6 h-6' />
								</motion.div>
							)}
						</AnimatePresence>
					</button>
				</div>
			</nav>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
						className='md:hidden bg-coffee-dark/98 backdrop-blur-lg border-t border-gold-primary/20'
					>
						<div className='container mx-auto px-4 py-6 flex flex-col gap-4'>
							{navItems.map((item, index) => (
								<motion.div
									key={item.name}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
								>
									<Link
										href={item.href}
										onClick={() => setIsMobileMenuOpen(false)}
										className='block py-3 text-lg text-cream hover:text-gold-primary transition-colors border-b border-cream/10'
									>
										{item.name}
									</Link>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	)
}
