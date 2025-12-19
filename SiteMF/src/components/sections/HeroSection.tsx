'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
	const containerRef = useRef<HTMLDivElement>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const { scrollY } = useScroll()

	const opacity = useTransform(scrollY, [0, 500], [1, 0])
	const scale = useTransform(scrollY, [0, 500], [1, 0.95])
	const y = useTransform(scrollY, [0, 500], [0, 100])

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!containerRef.current) return
			const rect = containerRef.current.getBoundingClientRect()
			setMousePosition({
				x: (e.clientX - rect.left - rect.width / 2) / rect.width,
				y: (e.clientY - rect.top - rect.height / 2) / rect.height,
			})
		}

		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	return (
		<motion.section
			ref={containerRef}
			className='relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]'
			style={{ opacity, scale }}
		>
			{/* Background Elements */}
			<div className='absolute inset-0 overflow-hidden'>
				{/* Animated circles with blur */}
				<div className='absolute inset-0 opacity-30'>
					<motion.div
						className='absolute w-[800px] h-[800px] border border-neutral-300/40 rounded-full blur-[1px]'
						style={{
							left: '50%',
							top: '50%',
							x: '-50%',
							y: '-50%',
						}}
						animate={{ rotate: 360 }}
						transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
					/>
					<motion.div
						className='absolute w-[600px] h-[600px] border border-neutral-200/30 rounded-full blur-[1px]'
						style={{
							left: '50%',
							top: '50%',
							x: '-50%',
							y: '-50%',
						}}
						animate={{ rotate: -360 }}
						transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
					/>
					<motion.div
						className='absolute w-[400px] h-[400px] border border-neutral-100/20 rounded-full blur-[1px]'
						style={{
							left: '50%',
							top: '50%',
							x: '-50%',
							y: '-50%',
						}}
						animate={{ rotate: 360 }}
						transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
					/>
				</div>

				{/* Floating dots - more subtle */}
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute w-1 h-1 bg-neutral-400/40 rounded-full blur-[0.5px]'
						style={{
							left: `${15 + Math.random() * 70}%`,
							top: `${15 + Math.random() * 70}%`,
						}}
						animate={{
							y: [0, -15, 0],
							opacity: [0.2, 0.5, 0.2],
						}}
						transition={{
							duration: 4 + Math.random() * 3,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}

				{/* Radial gradient to fade circles in center */}
				<div className='absolute inset-0 bg-gradient-radial from-[var(--background)]/60 via-transparent to-transparent' 
					style={{
						background: 'radial-gradient(circle at center, var(--background) 0%, transparent 40%, transparent 100%)'
					}}
				/>
				
				{/* Edge gradient overlay */}
				<div className='absolute inset-0 bg-gradient-to-b from-[var(--background)]/70 via-transparent to-[var(--background)]/70' />
			</div>

			{/* Content */}
			<motion.div
				className='relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center'
				style={{ y }}
			>
				{/* Tagline */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='mb-16'
				>
					<span className='inline-flex items-center gap-2 px-4 py-2 bg-black text-xs font-mono tracking-wider text-white rounded-full'>
						<span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
						DIGITAL SOLUTIONS THAT PRINT MONEY
					</span>
				</motion.div>

				{/* Main Heading */}
				<div className='mb-20'>
					<h1 className='text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--foreground)] text-center' style={{ lineHeight: '1.4' }}>
						<motion.span
							className='block mb-6'
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							Создаём цифровые
						</motion.span>
						<motion.span
							className='block mb-6'
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
						>
							продукты, которые
						</motion.span>
						<motion.span
							className='block'
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							приносят деньги
						</motion.span>
					</h1>
				</div>

				{/* Subheading */}
				<motion.div
					className='flex flex-col items-center justify-center text-center'
					style={{ marginBottom: '64px' }}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
				>
					<p className='text-lg md:text-xl text-[var(--color-medium-gray)] leading-relaxed max-w-2xl' style={{ marginBottom: '40px' }}>
						Веб-разработка, ИИ-автоматизация, Telegram-боты и custom ПО.
					</p>
					<p className='text-[var(--foreground)] font-semibold text-xl md:text-2xl'>
						Средний ROI наших клиентов — 340%
					</p>
				</motion.div>

				{/* CTA Buttons */}
				<motion.div
					className='flex flex-col sm:flex-row items-center justify-center gap-6'
					style={{ marginBottom: '96px' }}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<Link href='/contacts'>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='px-8 py-3 text-sm font-medium rounded-md transition-all duration-200'
							style={{ backgroundColor: '#ffffff', color: '#000000' }}
						>
							Обсудить проект →
						</motion.button>
					</Link>
					<Link href='/portfolio'>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='px-8 py-3 text-sm font-medium rounded-md transition-all duration-200'
							style={{ backgroundColor: '#ffffff', color: '#000000' }}
						>
							Смотреть кейсы
						</motion.button>
					</Link>
				</motion.div>

				{/* Stats */}
				<motion.div
					className='grid grid-cols-2 md:grid-cols-4 gap-16 max-w-5xl mx-auto'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 1 }}
				>
					{[
						{ value: '150+', label: 'Проектов' },
						{ value: '₽500M', label: 'Заработали клиентам' },
						{ value: '95%', label: 'Довольных клиентов' },
						{ value: '8', label: 'Лет на рынке' },
					].map((stat, i) => (
						<motion.div
							key={stat.label}
							className='text-center'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2 + i * 0.1 }}
						>
							<div className='text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-3'>
								{stat.value}
							</div>
							<div className='text-xs font-mono text-[var(--color-medium-gray)] uppercase tracking-[0.2em]'>
								{stat.label}
							</div>
						</motion.div>
					))}
				</motion.div>
			</motion.div>

			{/* Scroll indicator */}
			<motion.div
				className='absolute bottom-8 left-1/2 -translate-x-1/2'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5 }}
			>
				<motion.div
					className='flex flex-col items-center gap-2 cursor-pointer'
					animate={{ y: [0, 8, 0] }}
					transition={{ duration: 1.5, repeat: Infinity }}
					onClick={() =>
						window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
					}
				>
					<span className='text-xs font-mono text-neutral-400 tracking-widest'>
						SCROLL
					</span>
					<div className='w-px h-12 bg-gradient-to-b from-neutral-400 to-transparent' />
				</motion.div>
			</motion.div>
		</motion.section>
	)
}
