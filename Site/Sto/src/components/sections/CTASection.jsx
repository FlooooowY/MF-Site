import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'
import './CTASection.css'

const CTASection = ({ onBookingClick }) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<section className='cta-section section' ref={ref}>
			<div className='container'>
				<motion.div
					className='cta-card'
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<div className='cta-content'>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							Готовы записаться на обслуживание?
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							Оставьте заявку и наш менеджер свяжется с вами в течение 15 минут.
							Диагностика бесплатна при проведении ремонта!
						</motion.p>

						<motion.div
							className='cta-actions'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<button
								className='btn btn-secondary btn-lg'
								onClick={onBookingClick}
							>
								<Calendar size={22} />
								Записаться онлайн
								<ArrowRight size={20} />
							</button>

							<a href='tel:+78001234567' className='btn btn-outline btn-lg'>
								<Phone size={22} />8 800 123-45-67
							</a>
						</motion.div>

						<motion.div
							className='cta-info'
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : {}}
							transition={{ duration: 0.5, delay: 0.5 }}
						>
							<div className='info-item'>
								<MapPin size={18} />
								<span>г. Москва, ул. Автомобильная, 25</span>
							</div>
							<div className='info-item'>
								<Clock size={18} />
								<span>Ежедневно: 8:00 - 22:00</span>
							</div>
						</motion.div>
					</div>

					{/* Decorative elements */}
					<div className='cta-decor'>
						<div className='decor-gradient decor-gradient--1' />
						<div className='decor-gradient decor-gradient--2' />
						<div className='decor-pattern'>
							{[...Array(6)].map((_, i) => (
								<div
									key={i}
									className='pattern-line'
									style={{ animationDelay: `${i * 0.2}s` }}
								/>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

export default CTASection
