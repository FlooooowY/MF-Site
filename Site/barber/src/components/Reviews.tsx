'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { reviews } from '@/lib/data'
import { useSound } from '@/lib/sounds'

export default function Reviews() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const { playTick } = useSound()

	const goToNext = useCallback(() => {
		setDirection(1)
		setCurrentIndex(prev => (prev + 1) % reviews.length)
	}, [])

	const goToPrev = useCallback(() => {
		setDirection(-1)
		setCurrentIndex(prev => (prev - 1 + reviews.length) % reviews.length)
	}, [])

	// Auto-advance carousel
	useEffect(() => {
		if (isPaused) return

		const timer = setInterval(() => {
			goToNext()
		}, 6000)

		return () => clearInterval(timer)
	}, [isPaused, goToNext])

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				goToPrev()
				playTick()
			}
			if (e.key === 'ArrowRight') {
				goToNext()
				playTick()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [goToPrev, goToNext, playTick])

	const handlePrev = () => {
		goToPrev()
		playTick()
	}

	const handleNext = () => {
		goToNext()
		playTick()
	}

	const handleDotClick = (index: number) => {
		setDirection(index > currentIndex ? 1 : -1)
		setCurrentIndex(index)
		playTick()
	}

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 100 : -100,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 100 : -100,
			opacity: 0,
		}),
	}

	return (
		<section
			id='reviews'
			className='py-24 md:py-32 bg-obsidian relative overflow-hidden'
			aria-labelledby='reviews-heading'
		>
			<div className='container-custom relative z-10'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-center mb-16'
				>
					<h2 id='reviews-heading' className='section-title mb-4'>
						Отзывы клиентов
					</h2>
					<div className='divider-gold w-24 mx-auto mb-6' aria-hidden='true' />
					<p className='section-subtitle max-w-2xl mx-auto'>
						Что говорят о нас те, кто уже стал частью Brotherhood
					</p>
				</motion.div>

				{/* Reviews Carousel */}
				<div
					className='max-w-4xl mx-auto relative'
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
					role='region'
					aria-label='Карусель отзывов'
					aria-roledescription='карусель'
				>
					{/* Navigation Buttons */}
					<button
						onClick={handlePrev}
						className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 p-3 text-ivory/50 hover:text-royal-gold transition-colors focus-gold rounded-full'
						aria-label='Предыдущий отзыв'
					>
						<ChevronLeft className='w-8 h-8' />
					</button>
					<button
						onClick={handleNext}
						className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 p-3 text-ivory/50 hover:text-royal-gold transition-colors focus-gold rounded-full'
						aria-label='Следующий отзыв'
					>
						<ChevronRight className='w-8 h-8' />
					</button>

					{/* Review Card */}
					<div
						className='relative overflow-hidden'
						aria-live='polite'
						aria-atomic='true'
					>
						<AnimatePresence mode='wait' custom={direction}>
							<motion.article
								key={currentIndex}
								custom={direction}
								variants={slideVariants}
								initial='enter'
								animate='center'
								exit='exit'
								transition={{
									x: { type: 'spring', stiffness: 300, damping: 30 },
									opacity: { duration: 0.3 },
								}}
								className='glass-card p-8 md:p-12'
								aria-roledescription='слайд'
								aria-label={`Отзыв ${currentIndex + 1} из ${reviews.length}`}
							>
								{/* Quote Icon */}
								<div className='flex justify-center mb-6'>
									<div className='w-16 h-16 rounded-full bg-royal-gold/10 flex items-center justify-center'>
										<Quote
											className='w-8 h-8 text-royal-gold'
											aria-hidden='true'
										/>
									</div>
								</div>

								{/* Rating */}
								<div
									className='flex justify-center gap-1 mb-6'
									role='img'
									aria-label={`Рейтинг: ${reviews[currentIndex].rating} из 5 звёзд`}
								>
									{[...Array(5)].map((_, i) => (
										<motion.div
											key={i}
											initial={{ scale: 0, rotate: -180 }}
											animate={{ scale: 1, rotate: 0 }}
											transition={{
												delay: i * 0.1,
												type: 'spring',
												stiffness: 500,
												damping: 15,
											}}
										>
											<Star
												className={`w-6 h-6 ${
													i < reviews[currentIndex].rating
														? 'fill-royal-gold text-royal-gold'
														: 'text-smoke/30'
												}`}
												aria-hidden='true'
											/>
										</motion.div>
									))}
								</div>

								{/* Quote Text */}
								<blockquote className='text-center mb-8'>
									<p className='font-cormorant text-xl md:text-2xl text-ivory leading-relaxed italic'>
										"{reviews[currentIndex].text}"
									</p>
								</blockquote>

								{/* Author */}
								<footer className='flex items-center justify-center gap-4'>
									<div className='relative w-14 h-14 rounded-full overflow-hidden border-2 border-royal-gold/30'>
										<Image
											src={reviews[currentIndex].avatar}
											alt=''
											fill
											className='object-cover'
											aria-hidden='true'
										/>
									</div>
									<div>
										<cite className='font-montserrat font-semibold text-ivory not-italic'>
											{reviews[currentIndex].author}
										</cite>
										<p className='font-roboto-mono text-sm text-smoke'>
											<time dateTime={reviews[currentIndex].date}>
												{new Date(
													reviews[currentIndex].date
												).toLocaleDateString('ru-RU', {
													year: 'numeric',
													month: 'long',
												})}
											</time>
										</p>
									</div>
								</footer>

								{/* Decorative Frame */}
								<div
									className='absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-royal-gold/30'
									aria-hidden='true'
								/>
								<div
									className='absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-royal-gold/30'
									aria-hidden='true'
								/>
								<div
									className='absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-royal-gold/30'
									aria-hidden='true'
								/>
								<div
									className='absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-royal-gold/30'
									aria-hidden='true'
								/>
							</motion.article>
						</AnimatePresence>
					</div>

					{/* Dots Navigation */}
					<div
						className='flex justify-center gap-3 mt-8'
						role='tablist'
						aria-label='Выбор отзыва'
					>
						{reviews.map((_, index) => (
							<button
								key={index}
								onClick={() => handleDotClick(index)}
								className={`h-3 rounded-full transition-all duration-300 focus-gold ${
									index === currentIndex
										? 'bg-royal-gold w-8'
										: 'bg-royal-gold/30 hover:bg-royal-gold/50 w-3'
								}`}
								role='tab'
								aria-selected={index === currentIndex}
								aria-label={`Отзыв ${index + 1}`}
							/>
						))}
					</div>

					{/* Keyboard hint */}
					<p className='text-center text-smoke/30 text-xs mt-4 hidden md:block'>
						Используйте ← → для навигации
					</p>
				</div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto'
					role='list'
					aria-label='Статистика'
				>
					{[
						{ value: '500+', label: 'Довольных клиентов' },
						{ value: '4.9', label: 'Средний рейтинг' },
						{ value: '12', label: 'Лет опыта' },
						{ value: '50K+', label: 'Подписчиков' },
					].map((stat, index) => (
						<motion.div
							key={index}
							className='text-center'
							role='listitem'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: 0.1 * index }}
						>
							<p className='font-cormorant text-4xl md:text-5xl font-bold text-royal-gold mb-2'>
								{stat.value}
							</p>
							<p className='font-montserrat text-sm text-smoke'>{stat.label}</p>
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* Decorative Elements */}
			<div
				className='absolute top-1/4 -left-32 w-64 h-64 bg-deep-indigo/30 rounded-full blur-3xl'
				aria-hidden='true'
			/>
			<div
				className='absolute bottom-1/4 -right-32 w-96 h-96 bg-royal-gold/5 rounded-full blur-3xl'
				aria-hidden='true'
			/>
		</section>
	)
}
