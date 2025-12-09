'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

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
			className='relative min-h-screen flex items-center justify-center overflow-hidden bg-white'
			style={{ opacity, scale }}
		>
			{/* Background Elements */}
			<div className='absolute inset-0'>
				{/* Animated circles */}
				<motion.div
					className='absolute w-[800px] h-[800px] border border-neutral-200 rounded-full'
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
					className='absolute w-[600px] h-[600px] border border-neutral-100 rounded-full'
					style={{
						left: '50%',
						top: '50%',
						x: '-50%',
						y: '-50%',
					}}
					animate={{ rotate: -360 }}
					transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
				/>

				{/* Floating dots */}
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute w-1.5 h-1.5 bg-neutral-300 rounded-full'
						style={{
							left: `${10 + Math.random() * 80}%`,
							top: `${10 + Math.random() * 80}%`,
						}}
						animate={{
							y: [0, -20, 0],
							opacity: [0.3, 0.6, 0.3],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}

				{/* Gradient overlay */}
				<div className='absolute inset-0 bg-gradient-to-b from-white via-transparent to-white' />
			</div>

			{/* Content */}
			<motion.div
				className='relative z-10 max-w-6xl mx-auto px-6 text-center'
				style={{ y }}
			>
				{/* Tagline */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='mb-8'
				>
					<span className='inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 text-xs font-mono tracking-wider text-neutral-600 rounded-full'>
						<span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
						DIGITAL SOLUTIONS THAT PRINT MONEY
					</span>
				</motion.div>

				{/* Main Heading */}
				<div className='mb-8'>
					<h1 className='text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.1]'>
						<motion.span
							className='block'
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							Создаём цифровые
						</motion.span>
						<motion.span
							className='block'
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
						>
							продукты, которые
						</motion.span>
						<motion.span
							className='block relative'
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							<span className='relative inline-block'>
								приносят деньги
								<motion.span
									className='absolute -bottom-2 left-0 h-4 bg-yellow-300/50 -z-10'
									initial={{ width: 0 }}
									animate={{ width: '100%' }}
									transition={{ duration: 0.8, delay: 1 }}
								/>
							</span>
						</motion.span>
					</h1>
				</div>

				{/* Subheading */}
				<motion.p
					className='max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 mb-12'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
				>
					Веб-разработка, ИИ-автоматизация, Telegram-боты и custom ПО.
					<br />
					<span className='text-black font-semibold'>
						Средний ROI наших клиентов — 340%
					</span>
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					className='flex flex-col sm:flex-row items-center justify-center gap-4'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<Link href='/contacts'>
						<Button variant='primary' size='lg'>
							Обсудить проект →
						</Button>
					</Link>
					<Link href='/portfolio'>
						<Button variant='secondary' size='lg'>
							Смотреть кейсы
						</Button>
					</Link>
				</motion.div>

				{/* Stats */}
				<motion.div
					className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto'
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
							<div className='text-3xl md:text-4xl font-bold text-black mb-1'>
								{stat.value}
							</div>
							<div className='text-xs font-mono text-neutral-500 uppercase tracking-wider'>
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
