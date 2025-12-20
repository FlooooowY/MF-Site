'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Compass, Shield, Gem, Clock } from 'lucide-react'

const pillars = [
	{
		icon: <Compass className='w-8 h-8' />,
		title: 'Мистерия',
		description:
			'Атмосфера тайного общества, где посвящённые получают доступ к сакральным знаниям о мужском стиле.',
	},
	{
		icon: <Shield className='w-8 h-8' />,
		title: 'Мастерство',
		description:
			'Культ ремесла, передаваемого из поколения в поколение. Каждый мастер — хранитель традиций.',
	},
	{
		icon: <Gem className='w-8 h-8' />,
		title: 'Модернизм',
		description:
			'Переосмысление классики через призму современных технологий и эстетики.',
	},
	{
		icon: <Clock className='w-8 h-8' />,
		title: 'Традиции',
		description:
			'Каждая процедура — это ритуал, выверенный временем и доведённый до совершенства.',
	},
]

export default function AboutSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.25, 0.1, 0.25, 1],
			},
		},
	}

	return (
		<section
			id='about'
			className='py-24 md:py-32 bg-obsidian relative overflow-hidden'
		>
			{/* Decorative Background */}
			<div className='absolute inset-0'>
				{/* Masonic Symbol */}
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]'>
					<svg width='800' height='800' viewBox='0 0 200 200' fill='none'>
						<path
							d='M100 10 L180 170 L20 170 Z'
							stroke='#D4AF37'
							strokeWidth='1'
						/>
						<circle cx='100' cy='100' r='50' stroke='#D4AF37' strokeWidth='1' />
						<circle cx='100' cy='100' r='30' stroke='#D4AF37' strokeWidth='1' />
					</svg>
				</div>
			</div>

			<div className='container-custom relative z-10'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-center mb-16 md:mb-20'
				>
					<span className='font-roboto-mono text-royal-gold text-sm tracking-widest uppercase mb-4 block'>
						О братстве
					</span>
					<h2 className='section-title mb-6'>
						Философия <span className='text-gradient-gold'>BROTHERHOOD</span>
					</h2>
					<div className='divider-gold w-24 mx-auto mb-8' />
				</motion.div>

				{/* Main Content */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20'>
					{/* Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<p className='font-cormorant text-2xl md:text-3xl text-ivory leading-relaxed mb-6 italic'>
							"BROTHERHOOD — это не просто барбершоп, это храм мужского стиля,
							где каждый посетитель становится частью закрытого братства"
						</p>
						<p className='text-smoke leading-relaxed mb-6'>
							В эпоху массового потребления мы создали пространство, где время
							замедляется, а внимание к деталям становится искусством.
							Вдохновлённые эстетикой тайных обществ и ремесленными традициями
							прошлого, мы переосмыслили опыт посещения барбершопа.
						</p>
						<p className='text-smoke leading-relaxed mb-8'>
							Каждый элемент нашего пространства — от выбора материалов до
							освещения — продуман так, чтобы вы чувствовали себя частью чего-то
							большего. Здесь вас не просто стригут — здесь вас посвящают в
							искусство мужского стиля.
						</p>

						{/* Stats */}
						<div className='grid grid-cols-3 gap-6'>
							{[
								{ value: '12+', label: 'Лет опыта' },
								{ value: '15K+', label: 'Клиентов' },
								{ value: '98%', label: 'Довольны' },
							].map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									className='text-center'
								>
									<p className='font-cormorant text-3xl md:text-4xl font-bold text-royal-gold'>
										{stat.value}
									</p>
									<p className='font-montserrat text-xs text-smoke'>
										{stat.label}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Visual Element */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='relative'
					>
						<div className='relative aspect-square max-w-lg mx-auto'>
							{/* Central Symbol */}
							<div className='absolute inset-0 flex items-center justify-center'>
								<motion.div
									animate={{
										rotate: 360,
									}}
									transition={{
										duration: 60,
										repeat: Infinity,
										ease: 'linear',
									}}
									className='w-full h-full'
								>
									<svg
										viewBox='0 0 200 200'
										className='w-full h-full'
										fill='none'
									>
										{/* Outer ring */}
										<circle
											cx='100'
											cy='100'
											r='95'
											stroke='rgba(212, 175, 55, 0.1)'
											strokeWidth='1'
										/>
										{/* Inner ring */}
										<circle
											cx='100'
											cy='100'
											r='75'
											stroke='rgba(212, 175, 55, 0.15)'
											strokeWidth='1'
										/>
										{/* Decorative marks */}
										{[...Array(12)].map((_, i) => {
											const angle = (i * 30 * Math.PI) / 180
											const x1 = 100 + Math.cos(angle) * 85
											const y1 = 100 + Math.sin(angle) * 85
											const x2 = 100 + Math.cos(angle) * 95
											const y2 = 100 + Math.sin(angle) * 95
											return (
												<line
													key={i}
													x1={x1}
													y1={y1}
													x2={x2}
													y2={y2}
													stroke='rgba(212, 175, 55, 0.3)'
													strokeWidth='2'
												/>
											)
										})}
									</svg>
								</motion.div>
							</div>

							{/* Static center */}
							<div className='absolute inset-0 flex items-center justify-center'>
								<div className='w-3/5 h-3/5'>
									<svg
										viewBox='0 0 200 200'
										className='w-full h-full'
										fill='none'
									>
										{/* Triangle */}
										<path
											d='M100 30 L170 160 L30 160 Z'
											stroke='#D4AF37'
											strokeWidth='2'
											fill='none'
										/>
										{/* Eye */}
										<circle
											cx='100'
											cy='110'
											r='25'
											stroke='#D4AF37'
											strokeWidth='2'
											fill='none'
										/>
										<circle cx='100' cy='110' r='10' fill='#D4AF37' />
									</svg>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Pillars */}
				<motion.div
					ref={ref}
					variants={containerVariants}
					initial='hidden'
					animate={isInView ? 'visible' : 'hidden'}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
				>
					{pillars.map((pillar, index) => (
						<motion.div key={index} variants={itemVariants} className='group'>
							<div className='glass-card p-8 h-full text-center transition-all duration-500 group-hover:border-royal-gold/40'>
								{/* Icon */}
								<motion.div
									className='w-16 h-16 mx-auto rounded-full bg-royal-gold/10 flex items-center justify-center text-royal-gold mb-6 group-hover:bg-royal-gold/20 transition-colors duration-300'
									whileHover={{ scale: 1.1, rotate: 5 }}
								>
									{pillar.icon}
								</motion.div>

								{/* Content */}
								<h3 className='font-cormorant text-xl font-semibold text-ivory mb-3'>
									{pillar.title}
								</h3>
								<p className='text-smoke text-sm leading-relaxed'>
									{pillar.description}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* Decorative Elements */}
			<div className='absolute top-1/4 -left-32 w-64 h-64 bg-royal-gold/5 rounded-full blur-3xl' />
			<div className='absolute bottom-1/4 -right-32 w-96 h-96 bg-deep-indigo/30 rounded-full blur-3xl' />
		</section>
	)
}
