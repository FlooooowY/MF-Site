'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Clock, Mail, Instagram, Send } from 'lucide-react'

const contactInfo = [
	{
		icon: MapPin,
		title: 'Адрес',
		content: 'ул. Кофейная, 42',
		subtitle: 'Центральный район',
	},
	{
		icon: Phone,
		title: 'Телефон',
		content: '+7 (999) 123-45-67',
		subtitle: 'Для бронирования',
	},
	{
		icon: Clock,
		title: 'Часы работы',
		content: '8:00 — 22:00',
		subtitle: 'Ежедневно',
	},
	{
		icon: Mail,
		title: 'Email',
		content: 'hello@aromacraft.ru',
		subtitle: 'Для сотрудничества',
	},
]

export default function Contact() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<section id='contact' ref={ref} className='py-24 md:py-32 relative'>
			<div className='container mx-auto px-4'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'
				>
					<span className='inline-block text-gold-primary font-medium tracking-wider uppercase mb-4'>
						Контакты
					</span>
					<h2 className='font-playfair text-section-mobile md:text-section font-bold mb-6'>
						<span className='heading-foam'>Ждём вас в гости</span>
					</h2>
				</motion.div>

				<div className='grid lg:grid-cols-2 gap-12'>
					{/* Map placeholder */}
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='relative h-[400px] rounded-2xl overflow-hidden border border-cream/10'
					>
						{/* Placeholder map */}
						<div className='absolute inset-0 bg-coffee-dark/80'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.3847458!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIxLjAiTiAzN8KwMzcnMDEuMiJF!5e0!3m2!1sru!2sru!4v1234567890'
								width='100%'
								height='100%'
								style={{
									border: 0,
									filter: 'grayscale(100%) invert(92%) contrast(90%)',
								}}
								allowFullScreen
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
							/>
						</div>

						{/* Custom marker */}
						<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10'>
							<motion.div
								animate={{ y: [0, -10, 0] }}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
								className='relative'
							>
								<div className='w-12 h-12 bg-terracotta rounded-full flex items-center justify-center shadow-lg'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 100 100'
										className='text-white'
									>
										<path
											d='M30 50 Q50 30 70 50 Q75 60 70 70 Q50 90 30 70 Q25 60 30 50'
											fill='currentColor'
										/>
										<path
											d='M40 35 Q45 25 40 15 M50 30 Q55 20 50 10 M60 35 Q65 25 60 15'
											stroke='currentColor'
											strokeWidth='4'
											strokeLinecap='round'
											fill='none'
										/>
									</svg>
								</div>
								<div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-terracotta rotate-45' />
							</motion.div>
						</div>
					</motion.div>

					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.4 }}
						className='space-y-6'
					>
						{/* Info cards */}
						<div className='grid sm:grid-cols-2 gap-4'>
							{contactInfo.map((item, index) => (
								<motion.div
									key={item.title}
									initial={{ opacity: 0, y: 20 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
									className='bg-coffee-dark/50 backdrop-blur-sm border border-cream/10 rounded-xl p-5 hover:border-gold-primary/30 transition-all duration-300'
								>
									<div className='flex items-start gap-4'>
										<div className='w-10 h-10 bg-gold-primary/10 rounded-lg flex items-center justify-center flex-shrink-0'>
											<item.icon className='w-5 h-5 text-gold-primary' />
										</div>
										<div>
											<div className='text-cream/60 text-sm mb-1'>
												{item.title}
											</div>
											<div className='text-cream font-semibold'>
												{item.content}
											</div>
											<div className='text-cream/50 text-sm'>
												{item.subtitle}
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* Social links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.9 }}
							className='bg-coffee-dark/50 backdrop-blur-sm border border-cream/10 rounded-xl p-6'
						>
							<h3 className='text-cream font-semibold mb-4'>
								Мы в социальных сетях
							</h3>
							<div className='flex gap-4'>
								{[
									{ icon: Instagram, label: 'Instagram', href: '#' },
									{ icon: Send, label: 'Telegram', href: '#' },
								].map(social => (
									<motion.a
										key={social.label}
										href={social.href}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										className='w-12 h-12 bg-gold-primary/10 hover:bg-gold-primary/20 border border-gold-primary/30 rounded-xl flex items-center justify-center text-gold-primary transition-colors'
									>
										<social.icon className='w-5 h-5' />
									</motion.a>
								))}
							</div>
						</motion.div>

						{/* Newsletter */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 1 }}
							className='bg-gradient-to-br from-gold-primary/10 to-transparent border border-gold-primary/20 rounded-xl p-6'
						>
							<h3 className='text-cream font-semibold mb-2'>
								Подпишитесь на новости
							</h3>
							<p className='text-cream/60 text-sm mb-4'>
								Получайте специальные предложения и акции первыми
							</p>
							<div className='flex gap-2'>
								<input
									type='email'
									placeholder='Ваш email'
									className='flex-1 px-4 py-3 bg-coffee-dark/50 border border-cream/20 rounded-lg text-cream placeholder:text-cream/40 focus:border-gold-primary focus:outline-none transition-colors'
								/>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='px-6 py-3 bg-terracotta hover:bg-terracotta-hover text-white font-semibold rounded-lg transition-colors'
								>
									Подписаться
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
