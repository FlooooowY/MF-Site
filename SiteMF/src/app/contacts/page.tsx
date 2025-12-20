'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { ContactForm } from '@/components/ui/ContactForm'
import { AnimatedHeading } from '@/components/ui/AnimatedText'

const contactInfo = [
	{
		icon: '📱',
		title: 'Telegram',
		value: '@mf_digitals',
		href: 'https://t.me/mf_digitals',
		description: 'Ответим за 15 минут',
	},
	{
		icon: '📞',
		title: 'Телефон',
		value: '+7 928 232 35 20',
		href: 'tel:+79282323520',
		description: 'Пн-Пт, 10:00-19:00 МСК',
	},
	{
		icon: '✉️',
		title: 'Email',
		value: 'mfdigital.com',
		href: 'mailto:mfdigital.com',
		description: 'Ответим за 2 часа',
	},
	{
		icon: '💬',
		title: 'WhatsApp',
		value: '+7 928 232 35 20',
		href: 'https://wa.me/79282323520',
		description: 'Для быстрой связи',
	},
]

const offices = [
	{
		city: 'Москва',
		address: 'БЦ "Белая Площадь", Лесная ул., 7',
		metro: 'м. Белорусская',
	},
	{
		city: 'Онлайн',
		address: 'Работаем с клиентами по всему миру',
		metro: 'Zoom / Google Meet',
	},
]

export default function ContactsPage() {
	return (
		<>
			<Header />
			<main style={{ paddingTop: '120px' }}>
				{/* Hero */}
				<section className='py-16 lg:py-24'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24'>
							{/* Left - Info */}
							<div>
								<motion.span
									className='inline-block font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#757575] mb-4'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6 }}
								>
									КОНТАКТЫ
								</motion.span>
								<AnimatedHeading tag='h1' className='text-5xl lg:text-7xl mb-6'>
									Давайте обсудим
								</AnimatedHeading>
								<motion.p
									className='text-[#757575] text-lg lg:text-xl leading-relaxed mb-12'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									Расскажите о вашем проекте — мы ответим в течение 2 часов в
									рабочее время. Или позвоните, если вопрос срочный.
								</motion.p>

								{/* Contact Cards */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12'>
									{contactInfo.map((contact, i) => (
										<motion.a
											key={contact.title}
											href={contact.href}
											target={
												contact.href.startsWith('http') ? '_blank' : undefined
											}
											rel={
												contact.href.startsWith('http')
													? 'noopener noreferrer'
													: undefined
											}
											className='block group'
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
										>
											<div className='p-6 border-b border-gray-200 hover:border-gray-400 transition-colors'>
												<div className='mb-2'>
													<span className='text-lg'>{contact.icon}</span>
												</div>
												<h3 className='font-[family-name:var(--font-heading)] font-semibold mb-1 text-sm' style={{ letterSpacing: '0.05em' }}>
													{contact.title}
												</h3>
												<p className='font-[family-name:var(--font-mono)] text-base mb-1'>
													{contact.value}
												</p>
												<p className='text-[#757575] text-xs'>
													{contact.description}
												</p>
											</div>
										</motion.a>
									))}
								</div>

								{/* Offices */}
								<motion.div
									style={{ marginTop: '40px' }}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.7 }}
								>
									<h3 className='font-[family-name:var(--font-heading)] font-semibold mb-6 text-sm'>
										Офисы
									</h3>
									<div className='space-y-6'>
										{offices.map(office => (
											<div
												key={office.city}
												className='pb-6 border-b border-gray-200 last:border-0'
											>
												<h4 className='font-[family-name:var(--font-heading)] font-semibold mb-1'>
													{office.city}
												</h4>
												<p className='text-[#757575] text-sm mb-1'>
													{office.address}
												</p>
												<p className='font-[family-name:var(--font-mono)] text-xs text-[#757575]'>
													{office.metro}
												</p>
											</div>
										))}
									</div>
								</motion.div>
							</div>

							{/* Right - Form */}
							<motion.div
								className='lg:sticky lg:top-32 h-fit'
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<div className='border-b border-gray-200 pb-12'>
									<h2 className='font-[family-name:var(--font-heading)] text-2xl font-bold mb-2'>
										Оставить заявку
									</h2>
									<p className='text-[#757575] text-sm mb-8'>
										Заполните форму — мы свяжемся с вами для обсуждения деталей
									</p>
									<ContactForm variant='full' />
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Map Section */}
				<section className='py-24 lg:py-32 bg-white' style={{ marginTop: '50px' }}>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
							{/* Map placeholder */}
							<motion.div
								className='relative h-[400px] lg:h-[500px] bg-gradient-to-br from-[#121212] to-[#1a1a1a] overflow-hidden'
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8 }}
							>
								<div className='absolute inset-0 opacity-20'>
									<div
										className='absolute inset-0'
										style={{
											backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
											backgroundSize: '20px 20px',
										}}
									/>
								</div>
								<div className='absolute inset-0 flex items-center justify-center'>
									<div className='text-center'>
										<span className='text-6xl block mb-4'>🗺️</span>
										<span className='text-white font-[family-name:var(--font-heading)] text-xl'>
											Интерактивная карта
										</span>
										<p className='text-white/50 text-sm mt-2'>
											Подключите Yandex Maps API
										</p>
									</div>
								</div>

								{/* Location pin */}
								<motion.div
									className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
									animate={{ y: [0, -10, 0] }}
									transition={{ duration: 2, repeat: Infinity }}
								>
									<div className='w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg'>
										<span className='text-lg'>📍</span>
									</div>
								</motion.div>
							</motion.div>

							{/* Info */}
							<div>
								<motion.h2
									className='font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold mb-6'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
								>
									Приезжайте в гости
								</motion.h2>
								<motion.p
									className='text-[#757575] text-lg mb-8'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.1 }}
								>
									Предпочитаем встречаться лично для обсуждения крупных
									проектов. У нас уютный офис с хорошим кофе и переговорной с
									видом на город.
								</motion.p>

								<motion.div
									className='space-y-4 mb-8'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.2 }}
								>
									<div className='flex items-center gap-4'>
										<span className='text-xl'>📍</span>
										<span>БЦ "Белая Площадь", Лесная ул., 7, Москва</span>
									</div>
									<div className='flex items-center gap-4'>
										<span className='text-xl'>🚇</span>
										<span>5 минут от м. Белорусская</span>
									</div>
									<div className='flex items-center gap-4'>
										<span className='text-xl'>🕐</span>
										<span>Пн-Пт: 10:00 - 19:00</span>
									</div>
								</motion.div>

								<motion.a
									href='https://yandex.ru/maps/-/CCUBZ4XJDA'
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-2 font-[family-name:var(--font-heading)] font-semibold hover:text-[#757575] transition-colors'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 }}
									whileHover={{ x: 5 }}
								>
									Построить маршрут
									<span>→</span>
								</motion.a>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section className='pt-24 lg:pt-32' style={{ marginTop: '50px', marginBottom: '30px', paddingBottom: '60px' }}>
					<div className='max-w-3xl mx-auto px-6 lg:px-12'>
						<div className='text-center mb-24 lg:mb-32'>
							<AnimatedHeading tag='h2' className='text-3xl lg:text-4xl'>
								Частые вопросы
							</AnimatedHeading>
						</div>

						<div className='space-y-6'>
							{[
								{
									q: 'Как быстро вы отвечаете?',
									a: 'В рабочее время (10:00-19:00 МСК) — в течение 2 часов. В Telegram — обычно за 15 минут.',
								},
								{
									q: 'Работаете с клиентами из других городов?',
									a: 'Да, 60% наших клиентов из регионов и других стран. Работаем через Zoom/Google Meet.',
								},
								{
									q: 'Можно приехать в офис без записи?',
									a: 'Лучше предупредить заранее — так мы точно будем на месте и подготовим переговорную.',
								},
								{
									q: 'Делаете ли вы бесплатные консультации?',
									a: 'Да, первая консультация до 30 минут бесплатна. Обсудим вашу задачу и предложим решение.',
								},
							].map((faq, i) => (
								<motion.details
									key={i}
									className='group border border-[#E0E0E0] p-6 cursor-pointer'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
								>
									<summary className='font-[family-name:var(--font-heading)] font-semibold text-lg flex items-center justify-between list-none'>
										{faq.q}
										<motion.span className='text-[#757575] group-open:rotate-45 transition-transform'>
											+
										</motion.span>
									</summary>
									<p className='mt-4 text-[#757575] leading-relaxed'>{faq.a}</p>
								</motion.details>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
