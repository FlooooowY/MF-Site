import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
	MapPin,
	Phone,
	Mail,
	Clock,
	Send,
	Instagram,
	MessageCircle,
	User,
	FileText,
} from 'lucide-react'
import './ContactPage.css'

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setIsSubmitting(true)
		await new Promise(resolve => setTimeout(resolve, 1500))
		setIsSubmitting(false)
		setIsSuccess(true)
	}

	return (
		<div className='contact-page'>
			{/* Hero */}
			<section className='page-hero'>
				<div className='container'>
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<span className='text-gradient'>Контакты</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Свяжитесь с нами любым удобным способом
					</motion.p>
				</div>
			</section>

			{/* Contact Content */}
			<section className='contact-content section'>
				<div className='container'>
					<div className='contact-grid'>
						{/* Contact Info */}
						<motion.div
							className='contact-info'
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2>Как нас найти</h2>

							<div className='info-cards'>
								<div className='info-card'>
									<div className='info-icon'>
										<MapPin size={24} />
									</div>
									<div className='info-content'>
										<h4>Адрес</h4>
										<p>г. Москва, ул. Автомобильная, 25</p>
										<a href='#' className='info-link'>
											Построить маршрут
										</a>
									</div>
								</div>

								<div className='info-card'>
									<div className='info-icon'>
										<Phone size={24} />
									</div>
									<div className='info-content'>
										<h4>Телефон</h4>
										<a href='tel:+78001234567' className='phone-link'>
											8 800 123-45-67
										</a>
										<span className='info-note'>Бесплатно по России</span>
									</div>
								</div>

								<div className='info-card'>
									<div className='info-icon'>
										<Mail size={24} />
									</div>
									<div className='info-content'>
										<h4>Email</h4>
										<a href='mailto:info@automaster.pro'>info@automaster.pro</a>
									</div>
								</div>

								<div className='info-card'>
									<div className='info-icon'>
										<Clock size={24} />
									</div>
									<div className='info-content'>
										<h4>Режим работы</h4>
										<p>Ежедневно: 8:00 - 22:00</p>
										<span className='info-note'>Без выходных</span>
									</div>
								</div>
							</div>

							<div className='social-links'>
								<h4>Мы в соцсетях</h4>
								<div className='socials'>
									<a href='#' className='social-btn' aria-label='Instagram'>
										<Instagram size={20} />
									</a>
									<a href='#' className='social-btn' aria-label='Telegram'>
										<Send size={20} />
									</a>
									<a href='#' className='social-btn' aria-label='WhatsApp'>
										<MessageCircle size={20} />
									</a>
								</div>
							</div>
						</motion.div>

						{/* Contact Form */}
						<motion.div
							className='contact-form-wrapper'
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							{!isSuccess ? (
								<form className='contact-form' onSubmit={handleSubmit}>
									<h2>Напишите нам</h2>
									<p>Оставьте заявку и мы свяжемся с вами в течение 15 минут</p>

									<div className='form-group'>
										<label className='form-label'>
											<User size={16} />
											Ваше имя
										</label>
										<input
											type='text'
											name='name'
											value={formData.name}
											onChange={handleChange}
											className='form-input'
											placeholder='Александр'
											required
										/>
									</div>

									<div className='form-group'>
										<label className='form-label'>
											<Phone size={16} />
											Телефон
										</label>
										<input
											type='tel'
											name='phone'
											value={formData.phone}
											onChange={handleChange}
											className='form-input'
											placeholder='+7 (999) 123-45-67'
											required
										/>
									</div>

									<div className='form-group'>
										<label className='form-label'>
											<Mail size={16} />
											Email
										</label>
										<input
											type='email'
											name='email'
											value={formData.email}
											onChange={handleChange}
											className='form-input'
											placeholder='email@example.com'
										/>
									</div>

									<div className='form-group'>
										<label className='form-label'>
											<FileText size={16} />
											Сообщение
										</label>
										<textarea
											name='message'
											value={formData.message}
											onChange={handleChange}
											className='form-textarea'
											placeholder='Опишите ваш вопрос...'
											rows={4}
										/>
									</div>

									<button
										type='submit'
										className='btn btn-secondary btn-lg'
										disabled={isSubmitting}
									>
										{isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
										<Send size={20} />
									</button>
								</form>
							) : (
								<motion.div
									className='form-success'
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
								>
									<div className='success-icon'>✓</div>
									<h3>Сообщение отправлено!</h3>
									<p>Мы свяжемся с вами в ближайшее время.</p>
								</motion.div>
							)}
						</motion.div>
					</div>
				</div>
			</section>

			{/* Map */}
			<section className='contact-map'>
				<div className='map-placeholder'>
					<MapPin size={64} />
					<span>Карта</span>
					<p>г. Москва, ул. Автомобильная, 25</p>
				</div>
			</section>
		</div>
	)
}

export default ContactPage
