'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Star, Clock, Award } from 'lucide-react'
import { masters } from '@/lib/data'
import { useSound } from '@/lib/sounds'

// Animated Star with sparks effect
function AnimatedStar({
	filled,
	index,
	showSparks,
}: {
	filled: boolean
	index: number
	showSparks: boolean
}) {
	return (
		<motion.div
			className='relative'
			initial={{ scale: 0, rotate: -180 }}
			animate={{ scale: 1, rotate: 0 }}
			transition={{
				delay: index * 0.08,
				type: 'spring',
				stiffness: 500,
				damping: 15,
			}}
		>
			<Star
				className={`w-4 h-4 ${
					filled ? 'fill-royal-gold text-royal-gold' : 'text-smoke/30'
				}`}
			/>
			{/* Sparks for 5-star rating */}
			{showSparks && filled && index === 4 && (
				<>
					{[...Array(8)].map((_, i) => {
						const angle = (i * 45 * Math.PI) / 180
						return (
							<motion.div
								key={i}
								className='absolute w-1 h-1 bg-royal-gold rounded-full'
								style={{
									left: '50%',
									top: '50%',
								}}
								initial={{
									scale: 0,
									x: 0,
									y: 0,
									opacity: 1,
								}}
								animate={{
									scale: [0, 1.5, 0],
									x: Math.cos(angle) * 20,
									y: Math.sin(angle) * 20,
									opacity: [1, 1, 0],
								}}
								transition={{
									duration: 0.8,
									delay: 0.5 + i * 0.03,
									ease: 'easeOut',
								}}
							/>
						)
					})}
					{/* Center glow */}
					<motion.div
						className='absolute inset-0 rounded-full'
						initial={{ scale: 0, opacity: 0 }}
						animate={{
							scale: [0, 2, 0],
							opacity: [0, 0.5, 0],
						}}
						transition={{
							duration: 0.6,
							delay: 0.4,
						}}
						style={{
							background:
								'radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, transparent 70%)',
						}}
					/>
				</>
			)}
		</motion.div>
	)
}

function MasterCard({
	master,
	index,
}: {
	master: (typeof masters)[0]
	index: number
}) {
	const [isFlipped, setIsFlipped] = useState(false)
	const [rotateX, setRotateX] = useState(0)
	const [rotateY, setRotateY] = useState(0)
	const [showSparks, setShowSparks] = useState(false)
	const { playTick, playSwoosh } = useSound()

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isFlipped) return
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const centerX = rect.width / 2
		const centerY = rect.height / 2
		const rotateXValue = ((y - centerY) / centerY) * -10
		const rotateYValue = ((x - centerX) / centerX) * 10
		setRotateX(rotateXValue)
		setRotateY(rotateYValue)
	}

	const handleMouseLeave = () => {
		setRotateX(0)
		setRotateY(0)
	}

	const handleFlip = () => {
		setIsFlipped(!isFlipped)
		playSwoosh()
		if (!isFlipped && master.rating === 5) {
			setShowSparks(true)
			setTimeout(() => setShowSparks(false), 1500)
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.15 }}
			className='perspective-1000'
			role='article'
			aria-label={`${master.name} - ${master.role}`}
		>
			<div
				className='relative w-full aspect-[3/4] cursor-pointer'
				style={{ perspective: '1000px' }}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onClick={handleFlip}
				onKeyDown={e => e.key === 'Enter' && handleFlip()}
				tabIndex={0}
				role='button'
				aria-label={
					isFlipped ? 'Показать информацию о мастере' : 'Показать портфолио'
				}
			>
				<motion.div
					className='relative w-full h-full'
					style={{
						transformStyle: 'preserve-3d',
					}}
					animate={{
						rotateY: isFlipped ? 180 : rotateY,
						rotateX: isFlipped ? 0 : rotateX,
					}}
					transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
				>
					{/* Front Side */}
					<div
						className='absolute inset-0 card-master'
						style={{ backfaceVisibility: 'hidden' }}
					>
						{/* Image */}
						<div className='relative h-[60%] overflow-hidden'>
							<Image
								src={master.image}
								alt={master.name}
								fill
								className='object-cover transition-transform duration-500 group-hover:scale-105'
								sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-deep-indigo via-transparent to-transparent' />

							{/* Experience Badge */}
							<div className='absolute top-4 right-4 bg-royal-gold/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1'>
								<Clock className='w-3 h-3 text-obsidian' aria-hidden='true' />
								<span className='font-roboto-mono text-xs font-medium text-obsidian'>
									{master.experience}
								</span>
							</div>
						</div>

						{/* Info */}
						<div className='p-6'>
							<h3 className='font-cormorant text-2xl font-semibold text-ivory mb-1'>
								{master.name}
							</h3>
							<p className='text-royal-gold font-montserrat text-sm mb-4'>
								{master.role}
							</p>

							{/* Rating with sparks */}
							<div className='flex items-center gap-2 mb-4'>
								<div
									className='flex items-center gap-1'
									role='img'
									aria-label={`Рейтинг ${master.rating} из 5`}
								>
									{[...Array(5)].map((_, i) => (
										<AnimatedStar
											key={i}
											filled={i < Math.floor(master.rating)}
											index={i}
											showSparks={showSparks && master.rating === 5}
										/>
									))}
								</div>
								<span className='font-roboto-mono text-sm text-ivory'>
									({master.rating})
								</span>
							</div>

							{/* Reviews Count */}
							<p className='text-smoke text-sm'>
								{master.reviewsCount} отзывов
							</p>

							{/* CTA */}
							<motion.a
								href='#booking'
								className='btn-primary w-full mt-6 text-sm text-center block focus-gold'
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={e => e.stopPropagation()}
							>
								Записаться
							</motion.a>
						</div>

						{/* Glare Effect */}
						<div
							className='absolute inset-0 pointer-events-none transition-opacity'
							style={{
								background: `radial-gradient(circle at ${50 + rotateY * 3}% ${
									50 + rotateX * 3
								}%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)`,
								opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0,
							}}
							aria-hidden='true'
						/>
					</div>

					{/* Back Side */}
					<div
						className='absolute inset-0 card-master p-6'
						style={{
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
						}}
					>
						<div className='h-full flex flex-col'>
							<h3 className='font-cormorant text-2xl font-semibold text-ivory mb-2'>
								Портфолио
							</h3>
							<div className='divider-gold w-16 mb-4' aria-hidden='true' />

							{/* Portfolio Grid */}
							<div className='grid grid-cols-2 gap-2 flex-1'>
								{master.portfolio.map((img, i) => (
									<div
										key={i}
										className='relative aspect-square rounded overflow-hidden'
									>
										<Image
											src={img}
											alt={`Работа ${i + 1} мастера ${master.name}`}
											fill
											className='object-cover'
											sizes='150px'
										/>
									</div>
								))}
							</div>

							{/* Specializations */}
							<div className='mt-4'>
								<p className='text-smoke text-xs mb-2'>Специализации:</p>
								<div className='flex flex-wrap gap-2'>
									{master.specialization.map((spec, i) => (
										<span
											key={i}
											className='px-2 py-1 bg-royal-gold/10 text-royal-gold text-xs rounded'
										>
											{spec}
										</span>
									))}
								</div>
							</div>

							<a
								href='#booking'
								className='btn-secondary w-full mt-4 text-sm text-center block focus-gold'
								onClick={e => e.stopPropagation()}
							>
								Подробнее
							</a>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Click hint */}
			<p className='text-center text-smoke/50 text-xs mt-3' aria-hidden='true'>
				Нажмите для просмотра портфолио
			</p>
		</motion.div>
	)
}

export default function Masters() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<section
			id='masters'
			className='py-24 md:py-32 bg-obsidian relative overflow-hidden'
			aria-labelledby='masters-heading'
		>
			<div className='container-custom relative z-10'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-center mb-16 md:mb-20'
				>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<Award className='w-6 h-6 text-royal-gold' aria-hidden='true' />
						<span className='font-roboto-mono text-royal-gold text-sm tracking-widest uppercase'>
							Команда экспертов
						</span>
					</div>
					<h2 id='masters-heading' className='section-title mb-4'>
						Наши мастера
					</h2>
					<div className='divider-gold w-24 mx-auto mb-6' aria-hidden='true' />
					<p className='section-subtitle max-w-2xl mx-auto'>
						Хранители традиций ремесла. Каждый мастер — профессионал с
						многолетним опытом и уникальным стилем.
					</p>
				</motion.div>

				{/* Masters Grid */}
				<div
					ref={ref}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'
					role='list'
				>
					{masters.map((master, index) => (
						<MasterCard key={master.id} master={master} index={index} />
					))}
				</div>
			</div>

			{/* Decorative Elements */}
			<div
				className='absolute top-1/4 -left-32 w-64 h-64 bg-royal-gold/5 rounded-full blur-3xl'
				aria-hidden='true'
			/>
			<div
				className='absolute bottom-1/4 -right-32 w-96 h-96 bg-deep-indigo/30 rounded-full blur-3xl'
				aria-hidden='true'
			/>

			{/* Masonic Symbol */}
			<div
				className='absolute top-20 right-20 opacity-5 hidden lg:block'
				aria-hidden='true'
			>
				<svg width='200' height='200' viewBox='0 0 200 200' fill='none'>
					<path
						d='M100 10L180 170H20L100 10Z'
						stroke='#D4AF37'
						strokeWidth='2'
					/>
					<circle cx='100' cy='100' r='30' stroke='#D4AF37' strokeWidth='2' />
				</svg>
			</div>
		</section>
	)
}
