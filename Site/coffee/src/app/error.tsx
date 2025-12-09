'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Coffee, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			{/* Background decoration */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl' />
				<div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl' />
			</div>

			<div className='text-center relative z-10 max-w-md'>
				{/* Error icon */}
				<motion.div
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ duration: 0.8, type: 'spring' }}
					className='relative inline-block mb-8'
				>
					<div className='w-32 h-32 bg-terracotta/20 rounded-full flex items-center justify-center border-2 border-terracotta/50'>
						<Coffee className='w-16 h-16 text-terracotta' />
					</div>

					{/* Spilled effect */}
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.5 }}
						className='absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-6 bg-terracotta/20 rounded-full blur-md'
					/>
				</motion.div>

				{/* Error text */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<h1 className='font-playfair text-3xl md:text-4xl font-bold text-cream mb-4'>
						Ой! Кофе пролился
					</h1>
					<p className='text-cream/60 text-lg mb-8'>
						Что-то пошло не так. Наши бариста уже работают над решением
						проблемы. Попробуйте обновить страницу или вернуться на главную.
					</p>
				</motion.div>

				{/* Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className='flex flex-col sm:flex-row gap-4 justify-center'
				>
					<motion.button
						onClick={reset}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='btn-shine relative px-8 py-4 bg-terracotta text-cream font-semibold rounded-full shadow-button overflow-hidden flex items-center gap-2 justify-center'
					>
						<RefreshCw className='w-5 h-5' />
						Попробовать снова
					</motion.button>

					<Link href='/'>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='w-full px-8 py-4 border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-coffee-dark font-semibold rounded-full transition-all duration-300 flex items-center gap-2 justify-center'
						>
							<Home className='w-5 h-5' />
							На главную
						</motion.button>
					</Link>
				</motion.div>
			</div>
		</div>
	)
}
