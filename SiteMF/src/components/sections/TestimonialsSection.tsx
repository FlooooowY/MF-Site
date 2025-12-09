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
		<section className='py-24 lg:py-32 bg-neutral-50' ref={ref}>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-16'>
					<motion.span
						className='inline-block text-xs font-mono tracking-widest text-neutral-500 uppercase mb-4'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
					>
						Отзывы
					</motion.span>
					<motion.h2
						className='text-4xl lg:text-5xl font-bold text-black'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.1 }}
					>
						Что говорят клиенты
					</motion.h2>
				</div>

				{/* Testimonial */}
				<div className='max-w-4xl mx-auto'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentTestimonial.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className='text-center'
						>
							{/* Quote */}
							<div className='relative mb-8'>
								<span className='absolute -top-6 left-0 text-8xl text-neutral-200 font-serif'>
									"
								</span>
								<p className='text-xl lg:text-2xl text-black leading-relaxed relative z-10 px-8'>
									{currentTestimonial.text}
								</p>
							</div>

							{/* Author */}
							<div className='flex flex-col items-center gap-4 mt-12'>
								<div className='w-16 h-16 bg-black rounded-full flex items-center justify-center'>
									<span className='text-white font-bold text-xl'>
										{currentTestimonial.author
											.split(' ')
											.map(n => n[0])
											.join('')}
									</span>
								</div>
								<div>
									<p className='font-bold text-lg text-black'>
										{currentTestimonial.author}
									</p>
									<p className='text-sm text-neutral-500'>
										{currentTestimonial.position}
									</p>
								</div>

								{/* Metric */}
								<div className='flex items-center gap-2 px-4 py-2 bg-black text-white mt-2'>
									<span className='font-bold text-xl'>
										{currentTestimonial.metric}
									</span>
									<span className='text-xs text-neutral-400'>
										{currentTestimonial.metricLabel}
									</span>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Navigation */}
					<div className='flex items-center justify-center gap-3 mt-12'>
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => setActiveIndex(index)}
								className={`h-2 rounded-full transition-all ${
									index === activeIndex
										? 'bg-black w-8'
										: 'bg-neutral-300 w-2 hover:bg-neutral-400'
								}`}
							/>
						))}
					</div>

					{/* Progress bar */}
					<div className='mt-8 h-0.5 bg-neutral-200 overflow-hidden'>
						<motion.div
							className='h-full bg-black'
							initial={{ width: '0%' }}
							animate={{ width: '100%' }}
							transition={{ duration: 6, ease: 'linear' }}
							key={activeIndex}
						/>
					</div>
				</div>

				{/* Logos */}
				<motion.div
					className='mt-16 pt-16 border-t border-neutral-200'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.4 }}
				>
					<p className='text-center text-neutral-500 text-sm mb-8'>
						Нам доверяют
					</p>
					<div className='flex flex-wrap items-center justify-center gap-8 lg:gap-16'>
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
								className='text-neutral-400 font-bold text-lg hover:text-black transition-colors cursor-default'
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
