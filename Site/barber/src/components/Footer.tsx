'use client'

import { motion } from 'framer-motion'
import { Send, Phone, MapPin } from 'lucide-react'
import Logo from './Logo'
import { contactInfo } from '@/lib/data'

const footerLinks = {
	navigation: [
		{ label: 'Услуги', href: '#services' },
		{ label: 'Мастера', href: '#masters' },
		{ label: 'Галерея', href: '#gallery' },
		{ label: 'Отзывы', href: '#reviews' },
		{ label: 'Контакты', href: '#contacts' },
	],
	services: [
		{ label: 'Стрижка', href: '#services' },
		{ label: 'Королевское бритьё', href: '#services' },
		{ label: 'Уход за бородой', href: '#services' },
		{ label: 'Комплекс "Джентльмен"', href: '#services' },
	],
}

export default function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='bg-obsidian relative overflow-hidden'>
			{/* Top Border */}
			<div className='h-px bg-gradient-to-r from-transparent via-royal-gold/30 to-transparent' />

			<div className='container-custom py-16 md:py-20'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
					{/* Brand Column */}
					<div className='lg:col-span-1'>
						<Logo className='h-12 w-auto mb-6' />
						<p className='text-smoke text-sm leading-relaxed mb-6'>
							Цифровой джентльменский клуб, где традиции ремесла встречаются с
							эстетикой современного стиля.
						</p>
						{/* Social Links */}
						<div className='flex gap-3'>
							<a
								href={contactInfo.social.telegram}
								target='_blank'
								rel='noopener noreferrer'
								className='w-10 h-10 rounded-lg bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-obsidian transition-all'
								aria-label='Telegram'
							>
								<Send className='w-4 h-4' />
							</a>
							<a
								href={contactInfo.social.instagram}
								target='_blank'
								rel='noopener noreferrer'
								className='w-10 h-10 rounded-lg bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-obsidian transition-all'
								aria-label='Instagram'
							>
								<svg
									className='w-4 h-4'
									viewBox='0 0 24 24'
									fill='currentColor'
								>
									<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
								</svg>
							</a>
							<a
								href={contactInfo.social.vk}
								target='_blank'
								rel='noopener noreferrer'
								className='w-10 h-10 rounded-lg bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-obsidian transition-all'
								aria-label='VK'
							>
								<svg
									className='w-4 h-4'
									viewBox='0 0 24 24'
									fill='currentColor'
								>
									<path d='M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.563c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.042-2.763-5.32-2.763-5.784 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.456 2.284 4.617 2.87 4.617.22 0 .322-.102.322-.661v-2.541c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.422c0 .373.17.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.745-.576.745z' />
								</svg>
							</a>
						</div>
					</div>

					{/* Navigation Column */}
					<div>
						<h4 className='font-cormorant text-lg font-semibold text-ivory mb-6'>
							Навигация
						</h4>
						<ul className='space-y-3'>
							{footerLinks.navigation.map(link => (
								<li key={link.href}>
									<a
										href={link.href}
										className='text-smoke hover:text-royal-gold transition-colors text-sm'
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Services Column */}
					<div>
						<h4 className='font-cormorant text-lg font-semibold text-ivory mb-6'>
							Услуги
						</h4>
						<ul className='space-y-3'>
							{footerLinks.services.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className='text-smoke hover:text-royal-gold transition-colors text-sm'
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Column */}
					<div>
						<h4 className='font-cormorant text-lg font-semibold text-ivory mb-6'>
							Контакты
						</h4>
						<ul className='space-y-4'>
							<li className='flex items-start gap-3'>
								<MapPin className='w-5 h-5 text-royal-gold flex-shrink-0 mt-0.5' />
								<span className='text-smoke text-sm'>
									{contactInfo.address}
								</span>
							</li>
							<li className='flex items-center gap-3'>
								<Phone className='w-5 h-5 text-royal-gold flex-shrink-0' />
								<a
									href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
									className='text-smoke hover:text-royal-gold transition-colors text-sm font-roboto-mono'
								>
									{contactInfo.phone}
								</a>
							</li>
						</ul>

						{/* CTA */}
						<a
							href='#booking'
							className='btn-primary w-full text-center mt-6 text-sm'
						>
							Записаться
						</a>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-16 pt-8 border-t border-royal-gold/10'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
						<p className='text-smoke/60 text-sm'>
							© {currentYear} BROTHERHOOD. Все права защищены.
						</p>
						<div className='flex items-center gap-6 text-sm'>
							<a
								href='#'
								className='text-smoke/60 hover:text-royal-gold transition-colors'
							>
								Политика конфиденциальности
							</a>
							<a
								href='#'
								className='text-smoke/60 hover:text-royal-gold transition-colors'
							>
								Пользовательское соглашение
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-deep-indigo/20 rounded-full blur-3xl -z-10' />

			{/* Masonic Symbol Watermark */}
			<div className='absolute bottom-10 right-10 opacity-5 hidden lg:block'>
				<svg width='120' height='120' viewBox='0 0 200 200' fill='none'>
					<path
						d='M100 20L170 160H30L100 20Z'
						stroke='#D4AF37'
						strokeWidth='2'
					/>
					<path
						d='M100 50L140 140H60L100 50Z'
						stroke='#D4AF37'
						strokeWidth='1'
					/>
					<circle cx='100' cy='100' r='20' stroke='#D4AF37' strokeWidth='1' />
				</svg>
			</div>
		</footer>
	)
}

