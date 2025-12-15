'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	className?: string
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
	// Lock body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	// Close on escape
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', handleEscape)
		return () => window.removeEventListener('keydown', handleEscape)
	}, [onClose])

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 z-50 flex items-center justify-center p-4'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{/* Backdrop */}
					<motion.div
						className='absolute inset-0 bg-black/60 backdrop-blur-sm'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>

					{/* Modal Content */}
					<motion.div
						className={cn(
							'relative z-10 bg-white max-w-6xl w-full max-h-[90vh] overflow-y-auto',
							'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]',
							className
						)}
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
					>
						{/* Close Button */}
						<motion.button
							className='absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-[#757575] hover:text-black transition-colors z-10'
							onClick={onClose}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<line x1='18' y1='6' x2='6' y2='18' />
								<line x1='6' y1='6' x2='18' y2='18' />
							</svg>
						</motion.button>

						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
