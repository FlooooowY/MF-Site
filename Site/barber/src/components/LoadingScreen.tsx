'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
	onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
	const [isVisible, setIsVisible] = useState(true)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		// Simulate loading progress
		const interval = setInterval(() => {
			setProgress(prev => {
				if (prev >= 100) {
					clearInterval(interval)
					return 100
				}
				return prev + Math.random() * 15
			})
		}, 150)

		// Hide after animation
		const timer = setTimeout(() => {
			setIsVisible(false)
			setTimeout(onComplete, 500)
		}, 3000)

		return () => {
			clearInterval(interval)
			clearTimeout(timer)
		}
	}, [onComplete])

	const pathVariants = {
		hidden: {
			pathLength: 0,
			opacity: 0,
		},
		visible: {
			pathLength: 1,
			opacity: 1,
			transition: {
				pathLength: { duration: 2, ease: 'easeInOut' },
				opacity: { duration: 0.3 },
			},
		},
	}

	const fillVariants = {
		hidden: { fillOpacity: 0 },
		visible: {
			fillOpacity: 1,
			transition: { duration: 0.5, delay: 1.8 },
		},
	}

	const textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, delay: 2.2 },
		},
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian'
				>
					{/* Animated Background */}
					<div className='absolute inset-0 overflow-hidden'>
						<motion.div
							className='absolute inset-0'
							style={{
								background:
									'radial-gradient(ellipse at center, rgba(45, 43, 85, 0.3) 0%, transparent 70%)',
							}}
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.3, 0.5, 0.3],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
						{/* Floating particles */}
						{[...Array(20)].map((_, i) => (
							<motion.div
								key={i}
								className='absolute w-1 h-1 bg-royal-gold rounded-full'
								style={{
									left: `${Math.random() * 100}%`,
									top: `${Math.random() * 100}%`,
								}}
								animate={{
									y: [0, -100, 0],
									opacity: [0, 0.8, 0],
								}}
								transition={{
									duration: 3 + Math.random() * 2,
									repeat: Infinity,
									delay: Math.random() * 2,
								}}
							/>
						))}
					</div>

					{/* Logo Animation */}
					<div className='relative z-10'>
						<svg
							viewBox='0 0 200 200'
							className='w-48 h-48 md:w-64 md:h-64'
							xmlns='http://www.w3.org/2000/svg'
						>
							{/* Outer Triangle */}
							<motion.path
								d='M100 20 L180 160 L20 160 Z'
								stroke='#D4AF37'
								strokeWidth='2'
								fill='none'
								initial='hidden'
								animate='visible'
								variants={pathVariants}
							/>
							{/* Inner Triangle */}
							<motion.path
								d='M100 50 L150 140 L50 140 Z'
								stroke='#D4AF37'
								strokeWidth='1.5'
								fill='none'
								initial='hidden'
								animate='visible'
								variants={pathVariants}
							/>
							{/* Eye Circle */}
							<motion.circle
								cx='100'
								cy='110'
								r='20'
								stroke='#D4AF37'
								strokeWidth='2'
								fill='none'
								initial='hidden'
								animate='visible'
								variants={pathVariants}
							/>
							{/* Eye Inner */}
							<motion.circle
								cx='100'
								cy='110'
								r='8'
								fill='#D4AF37'
								initial='hidden'
								animate='visible'
								variants={fillVariants}
							/>
							{/* Rays */}
							{[...Array(8)].map((_, i) => {
								const angle = (i * 45 * Math.PI) / 180
								const x1 = 100 + Math.cos(angle) * 25
								const y1 = 110 + Math.sin(angle) * 25
								const x2 = 100 + Math.cos(angle) * 35
								const y2 = 110 + Math.sin(angle) * 35
								return (
									<motion.line
										key={i}
										x1={x1}
										y1={y1}
										x2={x2}
										y2={y2}
										stroke='#D4AF37'
										strokeWidth='1'
										initial={{ pathLength: 0, opacity: 0 }}
										animate={{ pathLength: 1, opacity: 1 }}
										transition={{
											duration: 0.3,
											delay: 2 + i * 0.05,
										}}
									/>
								)
							})}
						</svg>
					</div>

					{/* Text */}
					<motion.div
						className='relative z-10 text-center mt-8'
						initial='hidden'
						animate='visible'
						variants={textVariants}
					>
						<h1 className='font-cormorant text-4xl md:text-5xl font-bold text-royal-gold tracking-wider'>
							BROTHERHOOD
						</h1>
						<p className='font-montserrat text-smoke text-sm tracking-widest mt-2'>
							Где традиции встречают стиль
						</p>
					</motion.div>

					{/* Progress Bar */}
					<div className='relative z-10 w-48 md:w-64 mt-12'>
						<div className='h-0.5 bg-royal-gold/20 rounded-full overflow-hidden'>
							<motion.div
								className='h-full bg-gradient-to-r from-royal-gold to-gold-light'
								initial={{ width: 0 }}
								animate={{ width: `${Math.min(progress, 100)}%` }}
								transition={{ duration: 0.3 }}
							/>
						</div>
						<motion.p
							className='text-center font-roboto-mono text-xs text-smoke mt-3'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						>
							Загрузка... {Math.min(Math.floor(progress), 100)}%
						</motion.p>
					</div>

					{/* Corner decorations */}
					<div className='absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-royal-gold/30' />
					<div className='absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-royal-gold/30' />
					<div className='absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-royal-gold/30' />
					<div className='absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-royal-gold/30' />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
