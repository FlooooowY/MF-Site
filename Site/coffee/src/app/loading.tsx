'use client'

import { motion } from 'framer-motion'
import { Coffee } from 'lucide-react'

export default function Loading() {
	return (
		<div className='fixed inset-0 bg-coffee-dark flex items-center justify-center z-50'>
			{/* Background glow */}
			<div className='absolute inset-0 overflow-hidden'>
				<motion.div
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-primary/10 rounded-full blur-3xl'
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>
			</div>

			<div className='relative z-10 text-center'>
				{/* Animated cup */}
				<motion.div
					className='relative inline-block mb-8'
					animate={{ y: [0, -10, 0] }}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					{/* Cup container */}
					<div className='relative'>
						<motion.div
							className='w-24 h-24 rounded-full border-4 border-gold-primary/30 flex items-center justify-center'
							animate={{ rotate: 360 }}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: 'linear',
							}}
						>
							<div className='absolute inset-2 rounded-full border-2 border-dashed border-gold-primary/50' />
						</motion.div>

						<div className='absolute inset-0 flex items-center justify-center'>
							<Coffee className='w-10 h-10 text-gold-primary' />
						</div>
					</div>

					{/* Steam particles */}
					<div className='absolute -top-6 left-1/2 -translate-x-1/2'>
						{[0, 1, 2].map(i => (
							<motion.div
								key={i}
								className='absolute w-1.5 h-1.5 bg-cream/40 rounded-full blur-sm'
								style={{ left: `${i * 10 - 10}px` }}
								animate={{
									y: [0, -25],
									opacity: [0, 0.8, 0],
									scale: [0.5, 1.2],
								}}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									delay: i * 0.2,
								}}
							/>
						))}
					</div>
				</motion.div>

				{/* Loading text */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='font-playfair text-xl text-cream/80'
				>
					Завариваем
					<motion.span
						animate={{ opacity: [0, 1, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
						}}
					>
						...
					</motion.span>
				</motion.div>

				{/* Progress bar */}
				<div className='mt-6 w-48 h-1 bg-coffee-medium rounded-full overflow-hidden mx-auto'>
					<motion.div
						className='h-full bg-gradient-to-r from-gold-primary to-gold-light rounded-full'
						animate={{
							x: ['-100%', '100%'],
						}}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</div>
			</div>
		</div>
	)
}
