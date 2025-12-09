'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react'
import { heroSlides } from '@/data/products'

export default function HeroSection() {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % heroSlides.length)
		}, 6000)
		return () => clearInterval(interval)
	}, [])

	const handleMouseMove = (e: React.MouseEvent) => {
		const { clientX, clientY, currentTarget } = e
		const { width, height, left, top } = currentTarget.getBoundingClientRect()
		const x = (clientX - left - width / 2) / width
		const y = (clientY - top - height / 2) / height
		setMousePosition({ x: x * 20, y: y * 20 })
	}

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
	}

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % heroSlides.length)
	}

	const prevSlide = () => {
		setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)
	}

	return (
		<section
			className='relative min-h-screen flex items-center overflow-hidden pt-32 pb-20'
			onMouseMove={handleMouseMove}
		>
			{/* Background */}
			<div className='absolute inset-0'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentSlide}
						initial={{ opacity: 0, scale: 1.1 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
						className='absolute inset-0'
					>
						<Image
							src={heroSlides[currentSlide].image}
							alt=''
							fill
							className='object-cover opacity-30'
							priority
						/>
						<div
							className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].gradient} opacity-90`}
						/>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Floating Particles */}
			<div className='absolute inset-0 overflow-hidden'>
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute w-2 h-2 rounded-full bg-accent-blue/30'
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -30, 0],
							opacity: [0.3, 0.6, 0.3],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}
			</div>

			<div className='container mx-auto px-6 relative z-10'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					{/* Content */}
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentSlide}
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 50 }}
							transition={{ duration: 0.5 }}
						>
							<motion.span
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
								className='inline-block px-4 py-2 rounded-full bg-accent-purple/20 text-accent-purple text-sm font-medium mb-6'
							>
								🔥 Товар недели
							</motion.span>

							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className='font-clash text-display-xl font-semibold mb-6 leading-tight'
							>
								{heroSlides[currentSlide].title}
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className='text-body-lg text-white/70 mb-8 max-w-lg'
							>
								{heroSlides[currentSlide].subtitle}
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
								className='flex items-end gap-4 mb-8'
							>
								<div className='price-tag text-5xl font-bold'>
									{formatPrice(heroSlides[currentSlide].price)}
								</div>
								{heroSlides[currentSlide].oldPrice && (
									<div className='price-old text-2xl mb-1'>
										{formatPrice(heroSlides[currentSlide].oldPrice)}
									</div>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className='flex flex-wrap gap-4'
							>
								<Link href={`/product/${heroSlides[currentSlide].id}`}>
									<button className='btn-glow flex items-center gap-2 text-lg px-8 py-4'>
										Купить сейчас
										<ArrowRight size={20} />
									</button>
								</Link>
								<button className='btn-neon flex items-center gap-2 text-lg'>
									<Play size={20} />
									Смотреть обзор
								</button>
							</motion.div>
						</motion.div>
					</AnimatePresence>

					{/* Product Image with 3D Effect */}
					<div className='relative'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={currentSlide}
								initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
								animate={{
									opacity: 1,
									scale: 1,
									rotateY: 0,
									x: mousePosition.x,
									y: mousePosition.y,
								}}
								exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
								transition={{
									duration: 0.7,
									x: { duration: 0.1 },
									y: { duration: 0.1 },
								}}
								className='relative aspect-square'
								style={{ perspective: 1000 }}
							>
								{/* Glow Effect */}
								<div className='absolute inset-0 blur-3xl bg-accent-blue/30 rounded-full scale-75 animate-pulse' />

								{/* Product Image */}
								<div className='relative w-full h-full'>
									<Image
										src={heroSlides[currentSlide].image}
										alt={heroSlides[currentSlide].title}
										fill
										className='object-contain drop-shadow-2xl'
										priority
									/>
								</div>

								{/* Floating Elements */}
								<motion.div
									animate={{ y: [0, -15, 0] }}
									transition={{ duration: 3, repeat: Infinity }}
									className='absolute -top-10 -right-10 w-32 h-32 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 backdrop-blur-xl border border-white/10 flex items-center justify-center'
								>
									<div className='text-center'>
										<div className='text-2xl font-bold text-accent-blue'>
											−12%
										</div>
										<div className='text-xs text-white/60'>скидка</div>
									</div>
								</motion.div>

								<motion.div
									animate={{ y: [0, 15, 0] }}
									transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
									className='absolute -bottom-5 -left-5 px-6 py-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-white/10'
								>
									<div className='flex items-center gap-2'>
										<div className='w-3 h-3 rounded-full bg-green-400 animate-pulse' />
										<span className='text-sm font-medium'>В наличии</span>
									</div>
								</motion.div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Slide Controls */}
				<div className='flex items-center justify-between mt-12'>
					{/* Dots */}
					<div className='flex gap-3'>
						{heroSlides.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentSlide(index)}
								className={`relative h-2 rounded-full transition-all duration-300 ${
									index === currentSlide
										? 'w-12 bg-accent-blue'
										: 'w-2 bg-white/30'
								}`}
							>
								{index === currentSlide && (
									<motion.div
										layoutId='slideIndicator'
										className='absolute inset-0 rounded-full bg-accent-blue'
									/>
								)}
							</button>
						))}
					</div>

					{/* Arrows */}
					<div className='flex gap-3'>
						<button
							onClick={prevSlide}
							className='p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-accent-blue/50'
						>
							<ChevronLeft size={24} />
						</button>
						<button
							onClick={nextSlide}
							className='p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-accent-blue/50'
						>
							<ChevronRight size={24} />
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
