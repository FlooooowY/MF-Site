'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Gift, Sparkles, Crown, Coffee } from 'lucide-react'

const levels = [
	{ name: 'Bronze', cups: 10, icon: Coffee, color: '#CD7F32' },
	{ name: 'Silver', cups: 30, icon: Coffee, color: '#C0C0C0' },
	{ name: 'Gold', cups: 50, icon: Crown, color: '#D4AF37' },
	{ name: 'Platinum', cups: 100, icon: Sparkles, color: '#E5E4E2' },
]

export default function Loyalty() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const [rotateX, setRotateX] = useState(0)
	const [rotateY, setRotateY] = useState(0)
	const currentCups = 6

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2
		setRotateY((e.clientX - centerX) / 10)
		setRotateX(-(e.clientY - centerY) / 10)
	}

	const handleMouseLeave = () => {
		setRotateX(0)
		setRotateY(0)
	}

	return (
		<section
			id='loyalty'
			ref={ref}
			className='py-24 md:py-32 relative overflow-hidden'
		>
			{/* Background decoration */}
			<div className='absolute inset-0'>
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-primary/5 rounded-full blur-3xl' />
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
						Программа лояльности
					</span>
					<h2 className='font-playfair text-section-mobile md:text-section font-bold mb-6'>
						<span className='heading-foam'>Собирайте бонусы</span>
					</h2>
					<p className='text-cream/70 text-lg max-w-2xl mx-auto'>
						Каждая 7-я чашка — в подарок! Копите баллы и получайте эксклюзивные
						награды
					</p>
				</motion.div>

				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					{/* 3D Card */}
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='flex justify-center'
					>
						<motion.div
							onMouseMove={handleMouseMove}
							onMouseLeave={handleMouseLeave}
							style={{
								transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
								transition: 'transform 0.2s ease-out',
							}}
							className='relative w-full max-w-md'
						>
							{/* Card */}
							<div className='aspect-[1.6/1] bg-gradient-to-br from-coffee-medium via-coffee-dark to-coffee-dark rounded-2xl p-6 shadow-2xl border border-gold-primary/30 overflow-hidden'>
								{/* Card pattern */}
								<div className='absolute inset-0 opacity-10'>
									<svg className='w-full h-full' viewBox='0 0 100 100'>
										<pattern
											id='coffee-pattern'
											x='0'
											y='0'
											width='20'
											height='20'
											patternUnits='userSpaceOnUse'
										>
											<circle
												cx='10'
												cy='10'
												r='3'
												fill='currentColor'
												className='text-gold-primary'
											/>
										</pattern>
										<rect
											width='100'
											height='100'
											fill='url(#coffee-pattern)'
										/>
									</svg>
								</div>

								{/* Card content */}
								<div className='relative h-full flex flex-col justify-between'>
									{/* Header */}
									<div className='flex items-start justify-between'>
										<div>
											<div className='font-playfair text-xl font-bold text-cream tracking-wider'>
												AROMA CRAFT
											</div>
											<div className='flex items-center gap-2 mt-1'>
												<Crown className='w-4 h-4 text-gold-primary' />
												<span className='text-gold-primary text-sm font-semibold'>
													GOLD
												</span>
											</div>
										</div>
										<div className='w-12 h-12'>
											<svg
												viewBox='0 0 100 100'
												className='w-full h-full text-gold-primary'
											>
												<circle
													cx='50'
													cy='50'
													r='40'
													fill='none'
													stroke='currentColor'
													strokeWidth='3'
												/>
												<path
													d='M30 50 Q50 30 70 50 Q75 60 70 70 Q50 90 30 70 Q25 60 30 50'
													fill='none'
													stroke='currentColor'
													strokeWidth='3'
												/>
											</svg>
										</div>
									</div>

									{/* User info */}
									<div>
										<div className='text-cream/80 text-sm mb-1'>
											Держатель карты
										</div>
										<div className='font-playfair text-lg text-cream'>
											АЛЕКСЕЙ ИВАНОВ
										</div>
										<div className='text-cream/60 text-sm mt-2 font-mono'>
											**** **** **** 4521
										</div>
									</div>
								</div>

								{/* Shine effect */}
								<motion.div
									className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full'
									animate={{ translateX: ['100%', '-100%'] }}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: 'linear',
										repeatDelay: 2,
									}}
								/>
							</div>

							{/* Card shadow */}
							<div className='absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-gold-primary/20 blur-xl rounded-full' />
						</motion.div>
					</motion.div>

					{/* Progress & Info */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.4 }}
						className='space-y-8'
					>
						{/* Current progress */}
						<div className='bg-coffee-dark/50 backdrop-blur-sm border border-cream/10 rounded-2xl p-6'>
							<div className='flex items-center justify-between mb-4'>
								<span className='text-cream/80'>Ваш прогресс</span>
								<span className='text-gold-primary font-semibold'>
									{currentCups} / 7 чашек
								</span>
							</div>

							{/* Coffee beans progress */}
							<div className='flex justify-between mb-4'>
								{[...Array(7)].map((_, i) => (
									<motion.div
										key={i}
										initial={{ scale: 0, opacity: 0 }}
										animate={isInView ? { scale: 1, opacity: 1 } : {}}
										transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
										className='relative'
									>
										<svg
											width='36'
											height='36'
											viewBox='0 0 100 100'
											className={`${
												i < currentCups ? 'text-gold-primary' : 'text-cream/20'
											} transition-colors duration-300`}
										>
											<ellipse
												cx='50'
												cy='50'
												rx='40'
												ry='25'
												fill='currentColor'
											/>
											<path
												d='M30 50 Q50 30 70 50'
												fill='none'
												stroke='rgba(0,0,0,0.2)'
												strokeWidth='5'
											/>
										</svg>
										{i < currentCups && (
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
												className='absolute -top-1 -right-1'
											>
												<Sparkles className='w-3 h-3 text-gold-light' />
											</motion.div>
										)}
									</motion.div>
								))}
							</div>

							{/* Progress bar */}
							<div className='h-3 bg-coffee-dark rounded-full overflow-hidden'>
								<motion.div
									initial={{ width: 0 }}
									animate={
										isInView ? { width: `${(currentCups / 7) * 100}%` } : {}
									}
									transition={{ duration: 1, delay: 1 }}
									className='h-full bg-gradient-to-r from-gold-primary to-gold-light rounded-full'
								/>
							</div>

							<div className='text-center mt-4 text-cream/60 text-sm'>
								Ещё{' '}
								<span className='text-gold-primary font-semibold'>
									{7 - currentCups} чашки
								</span>{' '}
								до бесплатного капучино!
							</div>
						</div>

						{/* Levels */}
						<div className='grid grid-cols-2 gap-4'>
							{levels.map((level, index) => (
								<motion.div
									key={level.name}
									initial={{ opacity: 0, y: 20 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
									className={`p-4 rounded-xl border transition-all duration-300 ${
										level.name === 'Gold'
											? 'bg-gold-primary/10 border-gold-primary/50'
											: 'bg-coffee-dark/30 border-cream/10 hover:border-cream/30'
									}`}
								>
									<div className='flex items-center gap-3'>
										<div
											className='w-10 h-10 rounded-full flex items-center justify-center'
											style={{
												backgroundColor: `${level.color}20`,
												color: level.color,
											}}
										>
											<level.icon className='w-5 h-5' />
										</div>
										<div>
											<div className='font-semibold text-cream'>
												{level.name}
											</div>
											<div className='text-xs text-cream/60'>
												{level.cups} чашек
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* CTA */}
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full btn-shine relative px-8 py-4 bg-terracotta text-cream font-semibold rounded-full shadow-button overflow-hidden flex items-center justify-center gap-2'
						>
							<Gift className='w-5 h-5' />
							<span className='relative z-10'>Присоединиться к программе</span>
						</motion.button>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
