'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Crown, Palette, Sparkles } from 'lucide-react'
import { services } from '@/lib/data'
import { useSound } from '@/lib/sounds'

// Animated Icon Components
function AnimatedScissors({ isHovered }: { isHovered: boolean }) {
	return (
		<svg className='w-8 h-8' viewBox='0 0 24 24' fill='none'>
			<motion.g
				animate={isHovered ? { rotate: [0, -15, 15, -15, 0] } : { rotate: 0 }}
				transition={{ duration: 0.5 }}
				style={{ transformOrigin: '12px 12px' }}
			>
				{/* Left blade */}
				<motion.path
					d='M6 9l4.5 4.5M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					animate={isHovered ? { rotate: -10 } : { rotate: 0 }}
					style={{ transformOrigin: '10.5px 13.5px' }}
				/>
				{/* Right blade */}
				<motion.path
					d='M6 15l4.5-4.5M6 15a3 3 0 1 1 0 6 3 3 0 0 1 0-6z'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					animate={isHovered ? { rotate: 10 } : { rotate: 0 }}
					style={{ transformOrigin: '10.5px 10.5px' }}
				/>
				{/* Handle */}
				<motion.path
					d='M10.5 10.5L20 4M10.5 13.5L20 20'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
				/>
			</motion.g>
		</svg>
	)
}

function AnimatedRazor({ isHovered }: { isHovered: boolean }) {
	return (
		<svg className='w-8 h-8' viewBox='0 0 24 24' fill='none'>
			<motion.g
				animate={isHovered ? { rotate: [0, -5, 5, 0] } : { rotate: 0 }}
				transition={{ duration: 0.4 }}
				style={{ transformOrigin: '12px 12px' }}
			>
				{/* Blade */}
				<motion.path
					d='M4 4l16 16'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					animate={isHovered ? { pathLength: [1, 0.8, 1] } : {}}
					transition={{ duration: 0.3 }}
				/>
				<motion.path
					d='M8 8l8 8'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					opacity={0.5}
				/>
				{/* Handle */}
				<motion.circle
					cx='6'
					cy='18'
					r='2'
					stroke='currentColor'
					strokeWidth='2'
					fill='none'
					animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
					transition={{ duration: 0.3 }}
				/>
				{/* Shine effect */}
				{isHovered && (
					<motion.line
						x1='10'
						y1='6'
						x2='14'
						y2='10'
						stroke='currentColor'
						strokeWidth='1'
						initial={{ opacity: 0, pathLength: 0 }}
						animate={{ opacity: [0, 1, 0], pathLength: [0, 1, 0] }}
						transition={{ duration: 0.5 }}
					/>
				)}
			</motion.g>
		</svg>
	)
}

function AnimatedBeard({ isHovered }: { isHovered: boolean }) {
	return (
		<svg className='w-8 h-8' viewBox='0 0 24 24' fill='none'>
			<motion.path
				d='M12 2a9 9 0 0 1 9 9c0 3.5-2 6.5-5 8l-4 3-4-3c-3-1.5-5-4.5-5-8a9 9 0 0 1 9-9z'
				stroke='currentColor'
				strokeWidth='2'
				fill='none'
				animate={
					isHovered
						? { scale: [1, 1.05, 1], strokeWidth: [2, 2.5, 2] }
						: { scale: 1 }
				}
				transition={{ duration: 0.4 }}
				style={{ transformOrigin: '12px 12px' }}
			/>
			{/* Eyes */}
			<motion.circle
				cx='8'
				cy='10'
				r='1.5'
				fill='currentColor'
				animate={isHovered ? { scale: [1, 0.5, 1] } : {}}
				transition={{ duration: 0.3, delay: 0.1 }}
			/>
			<motion.circle
				cx='16'
				cy='10'
				r='1.5'
				fill='currentColor'
				animate={isHovered ? { scale: [1, 0.5, 1] } : {}}
				transition={{ duration: 0.3, delay: 0.15 }}
			/>
			{/* Beard lines */}
			{isHovered && (
				<>
					<motion.path
						d='M8 16 Q12 20, 16 16'
						stroke='currentColor'
						strokeWidth='1'
						fill='none'
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 1 }}
						transition={{ duration: 0.4 }}
					/>
				</>
			)}
		</svg>
	)
}

function AnimatedCrown({ isHovered }: { isHovered: boolean }) {
	return (
		<motion.div
			animate={isHovered ? { y: [0, -3, 0] } : { y: 0 }}
			transition={{ duration: 0.4 }}
		>
			<Crown className='w-8 h-8' />
			{isHovered && (
				<motion.div
					className='absolute inset-0 flex items-center justify-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					{[...Array(3)].map((_, i) => (
						<motion.div
							key={i}
							className='absolute w-1 h-1 bg-royal-gold rounded-full'
							initial={{ y: 0, opacity: 0 }}
							animate={{
								y: -15 - i * 5,
								opacity: [0, 1, 0],
								x: (i - 1) * 8,
							}}
							transition={{ duration: 0.5, delay: i * 0.1 }}
						/>
					))}
				</motion.div>
			)}
		</motion.div>
	)
}

function AnimatedPalette({ isHovered }: { isHovered: boolean }) {
	return (
		<motion.div
			animate={isHovered ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
			transition={{ duration: 0.5 }}
		>
			<Palette className='w-8 h-8' />
		</motion.div>
	)
}

function AnimatedSpa({ isHovered }: { isHovered: boolean }) {
	return (
		<motion.div
			animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: 1 }}
			transition={{ duration: 0.4 }}
		>
			<Sparkles className='w-8 h-8' />
			{isHovered && (
				<>
					{[...Array(4)].map((_, i) => (
						<motion.div
							key={i}
							className='absolute w-1 h-1 bg-royal-gold rounded-full'
							style={{
								left: `${50 + Math.cos((i * Math.PI) / 2) * 30}%`,
								top: `${50 + Math.sin((i * Math.PI) / 2) * 30}%`,
							}}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
							transition={{ duration: 0.6, delay: i * 0.1 }}
						/>
					))}
				</>
			)}
		</motion.div>
	)
}

function ServiceIcon({
	icon,
	isHovered,
}: {
	icon: string
	isHovered: boolean
}) {
	switch (icon) {
		case 'scissors':
			return <AnimatedScissors isHovered={isHovered} />
		case 'razor':
			return <AnimatedRazor isHovered={isHovered} />
		case 'beard':
			return <AnimatedBeard isHovered={isHovered} />
		case 'crown':
			return <AnimatedCrown isHovered={isHovered} />
		case 'palette':
			return <AnimatedPalette isHovered={isHovered} />
		case 'spa':
			return <AnimatedSpa isHovered={isHovered} />
		default:
			return null
	}
}

function ServiceCard({
	service,
	index,
}: {
	service: (typeof services)[0]
	index: number
}) {
	const [isHovered, setIsHovered] = useState(false)
	const { playTick } = useSound()

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className='group'
			onMouseEnter={() => {
				setIsHovered(true)
				playTick()
			}}
			onMouseLeave={() => setIsHovered(false)}
		>
			<motion.div
				className='glass-card p-8 h-full transition-all duration-500 group-hover:border-royal-gold/40 group-hover:shadow-card-hover cursor-pointer'
				whileHover={{ y: -5 }}
				role='article'
				aria-label={`${service.name} - ${service.price} рублей`}
			>
				{/* Icon */}
				<div className='relative w-16 h-16 rounded-lg bg-royal-gold/10 flex items-center justify-center text-royal-gold mb-6 group-hover:bg-royal-gold/20 transition-colors duration-300'>
					<ServiceIcon icon={service.icon} isHovered={isHovered} />
				</div>

				{/* Content */}
				<h3 className='font-cormorant text-2xl font-semibold text-ivory mb-3 group-hover:text-royal-gold transition-colors'>
					{service.name}
				</h3>
				<p className='text-smoke text-sm leading-relaxed mb-6'>
					{service.description}
				</p>

				{/* Price & Duration */}
				<div className='flex items-center justify-between pt-4 border-t border-royal-gold/10'>
					<span className='font-roboto-mono text-xl font-semibold text-royal-gold'>
						{service.price.toLocaleString()} ₽
					</span>
					<span className='font-roboto-mono text-sm text-smoke'>
						{service.duration}
					</span>
				</div>

				{/* Hover effect glow */}
				<motion.div
					className='absolute inset-0 rounded-xl pointer-events-none'
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 1 : 0 }}
					style={{
						background:
							'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
					}}
				/>
			</motion.div>
		</motion.div>
	)
}

export default function Services() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<section
			id='services'
			className='py-24 md:py-32 velvet-bg relative'
			aria-labelledby='services-heading'
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
					<h2 id='services-heading' className='section-title mb-4'>
						Наши услуги
					</h2>
					<div className='divider-gold w-24 mx-auto mb-6' aria-hidden='true' />
					<p className='section-subtitle max-w-2xl mx-auto'>
						Премиальные услуги от мастеров своего дела. Каждая процедура — это
						ритуал, превращающий обычный визит в незабываемый опыт.
					</p>
				</motion.div>

				{/* Services Grid */}
				<div
					ref={ref}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
					role='list'
				>
					{services.map((service, index) => (
						<ServiceCard key={service.id} service={service} index={index} />
					))}
				</div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className='text-center mt-12'
				>
					<a
						href='#booking'
						className='btn-secondary inline-block focus-gold'
						aria-label='Записаться на услугу'
					>
						Записаться на услугу
					</a>
				</motion.div>
			</div>

			{/* Decorative Elements */}
			<div
				className='absolute top-0 left-0 w-64 h-64 bg-royal-gold/5 rounded-full blur-3xl'
				aria-hidden='true'
			/>
			<div
				className='absolute bottom-0 right-0 w-96 h-96 bg-deep-indigo/50 rounded-full blur-3xl'
				aria-hidden='true'
			/>
		</section>
	)
}
