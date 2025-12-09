'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Leaf, Flame, CircleDot, Wind, Coffee } from 'lucide-react'

const steps = [
	{
		icon: Leaf,
		title: 'Сбор урожая',
		description: 'Отборные зёрна арабики с плантаций Эфиопии и Колумбии',
		color: 'from-green-500 to-emerald-600',
	},
	{
		icon: Flame,
		title: 'Обжарка',
		description:
			'Средняя обжарка для идеального баланса кислотности и сладости',
		color: 'from-orange-500 to-red-600',
	},
	{
		icon: CircleDot,
		title: 'Помол',
		description: 'Свежий помол перед каждым приготовлением',
		color: 'from-amber-500 to-yellow-600',
	},
	{
		icon: Wind,
		title: 'Заваривание',
		description: 'Профессиональное оборудование и мастерство бариста',
		color: 'from-blue-400 to-cyan-500',
	},
	{
		icon: Coffee,
		title: 'Подача',
		description: 'Идеальная температура и презентация вашего напитка',
		color: 'from-gold-primary to-gold-light',
	},
]

export default function Philosophy() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<section
			id='philosophy'
			ref={ref}
			className='py-24 md:py-32 relative overflow-hidden'
		>
			{/* Background decoration */}
			<div className='absolute inset-0 opacity-5'>
				<div className='absolute top-0 left-1/4 w-96 h-96 bg-gold-primary rounded-full blur-3xl' />
				<div className='absolute bottom-0 right-1/4 w-96 h-96 bg-gold-primary rounded-full blur-3xl' />
			</div>

			<div className='container mx-auto px-4 relative z-10'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className='text-center mb-16 md:mb-24'
				>
					<span className='inline-block text-gold-primary font-medium tracking-wider uppercase mb-4'>
						Наша философия
					</span>
					<h2 className='font-playfair text-section-mobile md:text-section font-bold mb-6'>
						<span className='heading-foam'>Путь зерна</span>
					</h2>
					<p className='text-cream/70 text-lg max-w-2xl mx-auto'>
						От плантации до чашки — каждый этап создания вашего идеального кофе
						наполнен заботой и мастерством
					</p>
				</motion.div>

				{/* Timeline */}
				<div className='relative'>
					{/* Connection Line */}
					<div className='hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent -translate-y-1/2' />

					<div className='grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4'>
						{steps.map((step, index) => (
							<motion.div
								key={step.title}
								initial={{ opacity: 0, y: 60 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.6, delay: index * 0.15 }}
								className='relative group'
							>
								{/* Card */}
								<div className='bg-coffee-dark/50 backdrop-blur-sm border border-cream/10 rounded-2xl p-6 hover:border-gold-primary/50 transition-all duration-500 hover:shadow-gold-glow'>
									{/* Icon */}
									<motion.div
										whileHover={{ scale: 1.1, rotate: 5 }}
										className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}
									>
										<step.icon className='w-8 h-8 text-white' />
									</motion.div>

									{/* Number badge */}
									<div className='absolute -top-3 -right-3 w-8 h-8 bg-gold-primary rounded-full flex items-center justify-center font-fraunces font-bold text-coffee-dark'>
										{index + 1}
									</div>

									{/* Content */}
									<h3 className='font-playfair text-xl font-semibold text-cream mb-2'>
										{step.title}
									</h3>
									<p className='text-cream/60 text-sm leading-relaxed'>
										{step.description}
									</p>
								</div>

								{/* Arrow (except last) */}
								{index < steps.length - 1 && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={isInView ? { opacity: 1 } : {}}
										transition={{ delay: index * 0.15 + 0.3 }}
										className='hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gold-primary/50'
									>
										<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
											<path
												d='M5 12h14M12 5l7 7-7 7'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</motion.div>
								)}
							</motion.div>
						))}
					</div>
				</div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.8 }}
					className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'
				>
					{[
						{ value: '12+', label: 'Сортов кофе' },
						{ value: '50k+', label: 'Чашек в месяц' },
						{ value: '4.9', label: 'Рейтинг' },
						{ value: '7', label: 'Лет опыта' },
					].map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.5 }}
							animate={isInView ? { opacity: 1, scale: 1 } : {}}
							transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
							className='p-6'
						>
							<div className='font-fraunces text-4xl md:text-5xl font-bold text-gold-primary mb-2'>
								{stat.value}
							</div>
							<div className='text-cream/60 text-sm uppercase tracking-wider'>
								{stat.label}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
