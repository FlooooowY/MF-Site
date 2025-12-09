'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Image from 'next/image'

const reviews = [
	{
		id: 1,
		name: 'Мария Петрова',
		avatar:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
		rating: 5,
		text: 'Лучший кофе в городе! Атмосфера невероятная, бариста — настоящие профессионалы. Мой любимый капучино просто идеален каждый раз.',
		date: '2 дня назад',
	},
	{
		id: 2,
		name: 'Алексей Смирнов',
		avatar:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
		rating: 5,
		text: 'Открыл для себя Cold Brew — это любовь с первого глотка! Программа лояльности — отличный бонус. Захожу сюда каждое утро.',
		date: '5 дней назад',
	},
	{
		id: 3,
		name: 'Елена Козлова',
		avatar:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
		rating: 5,
		text: 'Уютное место с душой! Здесь можно не только выпить отличный кофе, но и поработать в приятной атмосфере. Рекомендую раф с лавандой!',
		date: '1 неделю назад',
	},
	{
		id: 4,
		name: 'Дмитрий Волков',
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
		rating: 4,
		text: 'Отличное качество кофе и быстрое обслуживание. Единственное — хотелось бы больше десертов в меню. Но кофе выше всяких похвал!',
		date: '2 недели назад',
	},
]

export default function Reviews() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(0)

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 300 : -300,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 300 : -300,
			opacity: 0,
		}),
	}

	const paginate = (newDirection: number) => {
		setDirection(newDirection)
		setCurrentIndex(prev => {
			let next = prev + newDirection
			if (next < 0) next = reviews.length - 1
			if (next >= reviews.length) next = 0
			return next
		})
	}

	// Auto-slide
	useEffect(() => {
		const timer = setInterval(() => {
			paginate(1)
		}, 5000)
		return () => clearInterval(timer)
	}, [])

	return (
		<section ref={ref} className='py-24 md:py-32 relative overflow-hidden'>
			{/* Background */}
			<div className='absolute inset-0 opacity-5'>
				<div className='absolute top-0 right-0 w-96 h-96 bg-gold-primary rounded-full blur-3xl' />
				<div className='absolute bottom-0 left-0 w-96 h-96 bg-gold-primary rounded-full blur-3xl' />
			</div>

			<div className='container mx-auto px-4 relative z-10'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'
				>
					<span className='inline-block text-gold-primary font-medium tracking-wider uppercase mb-4'>
						Отзывы
					</span>
					<h2 className='font-playfair text-section-mobile md:text-section font-bold mb-6'>
						<span className='heading-foam'>Что говорят гости</span>
					</h2>
				</motion.div>

				{/* Reviews Carousel */}
				<div className='max-w-4xl mx-auto relative'>
					{/* Navigation buttons */}
					<button
						onClick={() => paginate(-1)}
						className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 w-12 h-12 bg-coffee-dark/80 backdrop-blur-sm border border-cream/20 rounded-full flex items-center justify-center text-cream hover:text-gold-primary hover:border-gold-primary/50 transition-all'
					>
						<ChevronLeft className='w-6 h-6' />
					</button>
					<button
						onClick={() => paginate(1)}
						className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 w-12 h-12 bg-coffee-dark/80 backdrop-blur-sm border border-cream/20 rounded-full flex items-center justify-center text-cream hover:text-gold-primary hover:border-gold-primary/50 transition-all'
					>
						<ChevronRight className='w-6 h-6' />
					</button>

					{/* Review card */}
					<div className='relative h-[400px] md:h-[350px]'>
						<AnimatePresence custom={direction} mode='wait'>
							<motion.div
								key={currentIndex}
								custom={direction}
								variants={slideVariants}
								initial='enter'
								animate='center'
								exit='exit'
								transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
								className='absolute inset-0'
							>
								<div className='h-full bg-coffee-dark/50 backdrop-blur-sm border border-cream/10 rounded-3xl p-8 md:p-12'>
									{/* Quote icon */}
									<Quote className='w-12 h-12 text-gold-primary/30 mb-6' />

									{/* Review text */}
									<p className='text-cream/90 text-lg md:text-xl leading-relaxed mb-8'>
										&ldquo;{reviews[currentIndex].text}&rdquo;
									</p>

									{/* Author */}
									<div className='flex items-center gap-4'>
										<div className='relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold-primary/50'>
											<Image
												src={reviews[currentIndex].avatar}
												alt={reviews[currentIndex].name}
												fill
												className='object-cover'
											/>
										</div>
										<div>
											<div className='font-semibold text-cream'>
												{reviews[currentIndex].name}
											</div>
											<div className='flex items-center gap-2'>
												<div className='flex'>
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`w-4 h-4 ${
																i < reviews[currentIndex].rating
																	? 'text-gold-primary fill-gold-primary'
																	: 'text-cream/30'
															}`}
														/>
													))}
												</div>
												<span className='text-cream/50 text-sm'>
													{reviews[currentIndex].date}
												</span>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Dots */}
					<div className='flex justify-center gap-2 mt-8'>
						{reviews.map((_, index) => (
							<button
								key={index}
								onClick={() => {
									setDirection(index > currentIndex ? 1 : -1)
									setCurrentIndex(index)
								}}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									index === currentIndex
										? 'w-8 bg-gold-primary'
										: 'bg-cream/30 hover:bg-cream/50'
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
