'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 500) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener('scroll', toggleVisibility, { passive: true })
		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.5, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.5, y: 20 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={scrollToTop}
					className='fixed bottom-24 md:bottom-6 left-6 z-40 w-12 h-12 bg-coffee-dark/90 backdrop-blur-sm border border-gold-primary/30 rounded-full shadow-lg flex items-center justify-center text-gold-primary hover:bg-coffee-medium hover:border-gold-primary/50 transition-colors group'
					aria-label='Наверх'
				>
					<ArrowUp className='w-5 h-5 transition-transform group-hover:-translate-y-0.5' />
				</motion.button>
			)}
		</AnimatePresence>
	)
}
