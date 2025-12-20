'use client'

import { motion } from 'framer-motion'
import { Coffee, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			{/* Background decoration */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl' />
				<div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl' />
			</div>

			<div className='text-center relative z-10'>
				{/* Animated coffee cup */}
				<motion.div
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ duration: 0.8, type: 'spring' }}
					className='relative inline-block mb-8'
				>
					<div className='w-32 h-32 bg-coffee-medium/50 rounded-full flex items-center justify-center border-2 border-gold-primary/30'>
						<Coffee className='w-16 h-16 text-gold-primary' />
					</div>

					{/* Steam animation */}
					<div className='absolute -top-8 left-1/2 -translate-x-1/2'>
						{[0, 1, 2].map(i => (
							<motion.div
								key={i}
								className='absolute w-2 h-2 bg-cream/30 rounded-full blur-sm'
								style={{ left: `${i * 12 - 12}px` }}
								animate={{
									y: [0, -30],
									opacity: [0, 0.8, 0],
									scale: [0.5, 1.5],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									delay: i * 0.3,
								}}
							/>
						))}
					</div>
				</motion.div>

				{/* 404 text */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<h1 className='font-fraunces text-8xl md:text-9xl font-bold text-gold-primary mb-4'>
						404
					</h1>
					<h2 className='font-playfair text-2xl md:text-3xl text-cream mb-4'>
						Упс! Кофе закончился
					</h2>
					<p className='text-cream/60 text-lg max-w-md mx-auto mb-8'>
						Похоже, эта страница растворилась как сахар в вашем латте. Давайте
						вернём вас к чашечке отличного кофе!
					</p>
				</motion.div>

				{/* Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className='flex flex-col sm:flex-row gap-4 justify-center'
				>
					<Link href='/'>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='btn-shine relative px-8 py-4 bg-terracotta text-cream font-semibold rounded-full shadow-button overflow-hidden flex items-center gap-2'
						>
							<Home className='w-5 h-5' />
							На главную
						</motion.button>
					</Link>

					<motion.button
						onClick={() => window.history.back()}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='px-8 py-4 border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-coffee-dark font-semibold rounded-full transition-all duration-300 flex items-center gap-2 justify-center'
					>
						<ArrowLeft className='w-5 h-5' />
						Назад
					</motion.button>
				</motion.div>

				{/* Decorative beans */}
				<div className='absolute -bottom-20 -left-20 opacity-10'>
					<motion.svg
						animate={{ rotate: 360 }}
						transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
						width='150'
						height='150'
						viewBox='0 0 100 100'
						className='fill-gold-primary'
					>
						<ellipse cx='50' cy='50' rx='40' ry='25' />
					</motion.svg>
				</div>
				<div className='absolute -top-10 -right-10 opacity-10'>
					<motion.svg
						animate={{ rotate: -360 }}
						transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
						width='100'
						height='100'
						viewBox='0 0 100 100'
						className='fill-gold-primary'
					>
						<ellipse cx='50' cy='50' rx='40' ry='25' />
					</motion.svg>
				</div>
			</div>
		</div>
	)
}
