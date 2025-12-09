'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

export default function CookieConsent() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// Check if user has already accepted cookies
		const consent = localStorage.getItem('cookie-consent')
		if (!consent) {
			// Show banner after a short delay
			const timer = setTimeout(() => {
				setIsVisible(true)
			}, 2000)
			return () => clearTimeout(timer)
		}
	}, [])

	const handleAccept = () => {
		localStorage.setItem('cookie-consent', 'accepted')
		setIsVisible(false)
	}

	const handleDecline = () => {
		localStorage.setItem('cookie-consent', 'declined')
		setIsVisible(false)
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
					className='fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50'
				>
					<div className='glass-card p-6 relative'>
						{/* Close Button */}
						<button
							onClick={handleDecline}
							className='absolute top-3 right-3 p-1 text-smoke hover:text-ivory transition-colors'
							aria-label='Закрыть'
						>
							<X className='w-4 h-4' />
						</button>

						{/* Content */}
						<div className='flex items-start gap-4'>
							<div className='flex-shrink-0 w-10 h-10 rounded-lg bg-royal-gold/10 flex items-center justify-center'>
								<Cookie className='w-5 h-5 text-royal-gold' />
							</div>
							<div className='flex-1'>
								<h4 className='font-cormorant text-lg font-semibold text-ivory mb-2'>
									Мы используем cookies
								</h4>
								<p className='text-smoke text-sm mb-4 leading-relaxed'>
									Для улучшения работы сайта и персонализации вашего опыта мы
									используем cookies. Продолжая использовать сайт, вы
									соглашаетесь с нашей{' '}
									<a href='#' className='text-royal-gold hover:underline'>
										политикой конфиденциальности
									</a>
									.
								</p>

								{/* Buttons */}
								<div className='flex gap-3'>
									<button
										onClick={handleAccept}
										className='btn-primary text-xs px-4 py-2'
									>
										Принять
									</button>
									<button
										onClick={handleDecline}
										className='btn-secondary text-xs px-4 py-2'
									>
										Отклонить
									</button>
								</div>
							</div>
						</div>

						{/* Decorative Corner */}
						<div className='absolute top-2 left-2 w-4 h-4 border-l border-t border-royal-gold/30' />
						<div className='absolute bottom-2 right-2 w-4 h-4 border-r border-b border-royal-gold/30' />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
