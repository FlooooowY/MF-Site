'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const testimonials = [
	{
		id: 1,
		text: 'M&F Digital превратили наш бизнес. Сайт стал главным инструментом продаж. ROI за первый год — 1200%. Рекомендую всем, кто хочет результат, а не красивые презентации.',
		author: 'Алексей Морозов',
		position: 'CEO, LuxAuto Group',
		metric: '+250%',
		metricLabel: 'рост заявок',
	},
	{
		id: 2,
		text: 'Внедрили ИИ-ассистента для обработки заявок. Теперь менеджеры тратят на рутину в 5 раз меньше времени. Окупилось за 2 месяца.',
		author: 'Мария Петрова',
		position: 'Директор по развитию, TechStart',
		metric: '5x',
		metricLabel: 'экономия времени',
	},
	{
		id: 3,
		text: 'Telegram-бот для записи клиентов работает идеально. 70% записей теперь через бота, нагрузка на администраторов упала вдвое.',
		author: 'Дмитрий Соколов',
		position: 'Владелец, Beauty Lab',
		metric: '70%',
		metricLabel: 'автозаписей',
	},
]

export function TestimonialsSection() {
	const [ref, isInView] = useInView<HTMLDivElement>({
		threshold: 0.2,
		triggerOnce: true,
	})
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex(prev => (prev + 1) % testimonials.length)
		}, 6000)
		return () => clearInterval(interval)
	}, [])

	const currentTestimonial = testimonials[activeIndex]

	return (
		<section 
			className='py-20 bg-[var(--background)] relative' 
			ref={ref}
			style={{ marginTop: '150px', marginBottom: '150px' }}
		>
			{/* Subtle background */}
			<div className='absolute inset-0 opacity-[0.02]'>
				<div className='absolute inset-0' 
					style={{
						backgroundImage: 'radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)',
						backgroundSize: '64px 64px'
					}}
				/>
			</div>

			<div className='max-w-7xl mx-auto px-6 lg:px-8 relative'>
				{/* Header */}
				<div className='text-center mb-32 lg:mb-40'>
					<motion.span
						className='inline-block text-xs font-mono tracking-[0.3em] text-[var(--color-medium-gray)] uppercase mb-8'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
					>
						Отзывы
					</motion.span>
					<motion.h2
						className='text-5xl lg:text-7xl font-bold text-[var(--foreground)] tracking-tight'
						style={{ lineHeight: '1.2' }}
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.1 }}
					>
						Что говорят клиенты
					</motion.h2>
				</div>

				{/* Testimonial */}
				<div className='max-w-5xl mx-auto mb-20'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentTestimonial.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className='text-center'
						>
							{/* Quote */}
							<div className='relative mb-20'>
								<p className='text-2xl lg:text-3xl text-[var(--foreground)] leading-relaxed font-light tracking-tight px-8'>
									"{currentTestimonial.text}"
								</p>
							</div>

							{/* Author */}
							<div className='flex flex-col items-center gap-6 mt-20'>
								<div className='w-20 h-20 border-2 border-[var(--foreground)]/10 rounded-full flex items-center justify-center'>
									<span className='text-[var(--foreground)] font-bold text-2xl'>
										{currentTestimonial.author
											.split(' ')
											.map(n => n[0])
											.join('')}
									</span>
								</div>
								<div>
									<p className='font-bold text-xl text-[var(--foreground)] tracking-tight'>
										{currentTestimonial.author}
									</p>
									<p className='text-sm text-[var(--color-medium-gray)] mt-1'>
										{currentTestimonial.position}
									</p>
								</div>

								{/* Metric */}
								<div className='flex items-center gap-3 px-6 py-3 border border-[var(--foreground)]/10 mt-4'>
									<span className='font-bold text-2xl text-[var(--foreground)]'>
										{currentTestimonial.metric}
									</span>
									<span className='text-xs text-[var(--color-medium-gray)] uppercase tracking-wider'>
										{currentTestimonial.metricLabel}
									</span>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Navigation */}
					<div className='flex items-center justify-center gap-4' style={{ marginTop: '140px' }}>
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => setActiveIndex(index)}
								className={`h-2 rounded-full transition-all ${
									index === activeIndex
										? 'bg-[var(--foreground)] w-12'
										: 'bg-[var(--foreground)]/20 w-2 hover:bg-[var(--foreground)]/40'
								}`}
							/>
						))}
					</div>

					{/* Progress bar */}
					<div className='mt-12 h-px bg-[var(--foreground)]/10 overflow-hidden'>
						<motion.div
							className='h-full bg-[var(--foreground)]'
							initial={{ width: '0%' }}
							animate={{ width: '100%' }}
							transition={{ duration: 6, ease: 'linear' }}
							key={activeIndex}
						/>
					</div>
				</div>

				{/* Logos */}
				<motion.div
					className='pt-20 border-t border-[var(--foreground)]/5'
					style={{ marginTop: '120px' }}
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.4 }}
				>
					<p className='text-center text-[var(--color-medium-gray)] text-sm mb-12 uppercase tracking-[0.3em]'>
						Нам доверяют
					</p>
					<div className='flex flex-wrap items-center justify-center gap-12 lg:gap-20'>
						{[
							'LuxAuto',
							'TechStart',
							'Beauty Lab',
							'LogisTrans',
							'FoodRush',
							'MedCenter',
						].map(company => (
							<span
								key={company}
								className='text-[var(--foreground)]/30 font-bold text-xl hover:text-[var(--foreground)] transition-colors cursor-default tracking-tight'
							>
								{company}
							</span>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
