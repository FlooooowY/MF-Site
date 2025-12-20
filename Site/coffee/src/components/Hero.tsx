'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'

export default function Hero() {
	const containerRef = useRef<HTMLDivElement>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'],
	})

	const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0])
	const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100])
	const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const { clientX, clientY } = e
			const { innerWidth, innerHeight } = window
			setMousePosition({
				x: (clientX - innerWidth / 2) / 50,
				y: (clientY - innerHeight / 2) / 50,
			})
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	return (
		<section ref={containerRef} className='relative h-screen overflow-hidden'>
			{/* Video Background */}
			<motion.div style={{ scale }} className='absolute inset-0'>
				<video
					autoPlay
					muted
					loop
					playsInline
					className='w-full h-full object-cover'
					poster='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80'
				>
					<source
						src='https://cdn.coverr.co/videos/coverr-coffee-beans-being-poured-3912/1080p.mp4'
						type='video/mp4'
					/>
				</video>
			</motion.div>

			{/* Gradient Overlay */}
			<motion.div
				style={{ opacity: overlayOpacity }}
				className='absolute inset-0 bg-gradient-to-b from-coffee-dark/80 via-coffee-dark/70 to-coffee-dark/90'
			/>

			{/* Animated particles */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute w-1 h-1 bg-gold-primary/30 rounded-full'
						initial={{
							x:
								Math.random() *
								(typeof window !== 'undefined' ? window.innerWidth : 1000),
							y:
								Math.random() *
								(typeof window !== 'undefined' ? window.innerHeight : 800),
						}}
						animate={{
							y: [null, -100],
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: Math.random() * 5 + 5,
							repeat: Infinity,
							delay: Math.random() * 5,
						}}
					/>
				))}
			</div>

			{/* Content */}
			<motion.div
				style={{ y: textY }}
				className='relative z-10 h-full flex flex-col items-center justify-center text-center px-4'
			>
				{/* Animated Logo */}
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
					style={{
						transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
					}}
					className='mb-8'
				>
					<svg
						width='120'
						height='120'
						viewBox='0 0 120 120'
						className='text-gold-primary'
					>
						<motion.circle
							cx='60'
							cy='60'
							r='55'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 2, ease: 'easeInOut' }}
						/>
						<motion.path
							d='M40 50 Q60 30 80 50 Q85 60 80 70 Q60 90 40 70 Q35 60 40 50'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
						/>
						{/* Steam lines */}
						<motion.path
							d='M50 35 Q55 25 50 15'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{ duration: 1, delay: 1.5 }}
						/>
						<motion.path
							d='M60 30 Q65 20 60 10'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{ duration: 1, delay: 1.7 }}
						/>
						<motion.path
							d='M70 35 Q75 25 70 15'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{ duration: 1, delay: 1.9 }}
						/>
					</svg>
				</motion.div>

				{/* Title */}
				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className='font-playfair text-hero-mobile md:text-hero font-bold mb-6'
				>
					<span className='block heading-foam'>Кофе как</span>
					<span className='block text-cream'>искусство</span>
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className='text-lg md:text-xl text-cream/80 mb-10 max-w-md'
				>
					Каждая чашка — история вкуса, рождённая в сердце города
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.7 }}
					className='flex flex-col sm:flex-row gap-4'
				>
					<motion.a
						href='#menu'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='btn-shine relative px-8 py-4 bg-terracotta text-cream font-semibold rounded-full shadow-button animate-pulse-cta overflow-hidden'
					>
						<span className='relative z-10 flex items-center gap-2'>
							Выбрать кофе
							<Sparkles className='w-5 h-5' />
						</span>
					</motion.a>

					<motion.a
						href='#loyalty'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='px-8 py-4 border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-coffee-dark font-semibold rounded-full transition-all duration-300'
					>
						Программа лояльности
					</motion.a>
				</motion.div>
			</motion.div>

			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5 }}
				className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10'
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
					className='flex flex-col items-center gap-2 text-cream/60'
				>
					<span className='text-sm tracking-wider uppercase'>Листайте</span>
					<ChevronDown className='w-6 h-6' />
				</motion.div>
			</motion.div>

			{/* Decorative beans */}
			<motion.div
				initial={{ opacity: 0, rotate: 0 }}
				animate={{ opacity: 0.1, rotate: 360 }}
				transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
				className='absolute -bottom-20 -left-20 w-64 h-64'
			>
				<svg viewBox='0 0 100 100' className='w-full h-full fill-gold-primary'>
					<ellipse cx='50' cy='50' rx='40' ry='25' />
					<path
						d='M30 50 Q50 30 70 50'
						fill='none'
						stroke='currentColor'
						strokeWidth='3'
					/>
				</svg>
			</motion.div>
		</section>
	)
}
