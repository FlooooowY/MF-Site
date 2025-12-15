'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContactForm } from './ContactForm'

export function FloatingContactButton() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			{/* Floating Button */}
			<motion.button
				className='fixed bottom-8 right-8 z-50 px-6 py-2.5 text-sm font-medium rounded-md shadow-lg transition-all duration-200'
				style={{ backgroundColor: '#ffffff', color: '#000000' }}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setIsOpen(true)}
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 1, duration: 0.5, type: 'spring' }}
			>
				Оставить заявку →
			</motion.button>

			{/* Modal */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
						/>

						{/* Modal Content */}
						<motion.div
							className='fixed inset-0 z-[101] flex items-center justify-center p-4'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
						>
							<motion.div
								className='bg-[var(--background)] max-w-2xl w-full p-12 lg:p-16 max-h-[90vh] overflow-y-auto'
								initial={{ scale: 0.9, y: 50 }}
								animate={{ scale: 1, y: 0 }}
								exit={{ scale: 0.9, y: 50 }}
								transition={{ type: 'spring', damping: 25 }}
								onClick={e => e.stopPropagation()}
							>
								{/* Close button */}
								<button
									className='absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[var(--foreground)] hover:bg-neutral-100 transition-colors'
									onClick={() => setIsOpen(false)}
								>
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M6 18L18 6M6 6l12 12'
										/>
									</svg>
								</button>

								<h3 className='text-4xl font-bold text-[var(--foreground)] mb-4 tracking-tight'>
									Оставить заявку
								</h3>
								<p className='text-[var(--color-medium-gray)] text-lg mb-10 leading-relaxed'>
									Заполните форму — мы перезвоним для обсуждения деталей
								</p>

								<ContactForm variant='full' />
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	)
}



