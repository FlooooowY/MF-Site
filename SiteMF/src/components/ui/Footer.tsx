'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const footerLinks = {
	services: [
		{ href: '/services#web', label: 'Веб-разработка' },
		{ href: '/services#ai', label: 'ИИ-автоматизация' },
		{ href: '/services#bots', label: 'Telegram-боты' },
		{ href: '/services#software', label: 'Custom ПО' },
	],
	company: [
		{ href: '/about', label: 'О нас' },
		{ href: '/portfolio', label: 'Портфолио' },
		{ href: '/pricing', label: 'Цены' },
		{ href: '/contacts', label: 'Контакты' },
	],
	social: [
		{ href: 'https://t.me/mfdigital', label: 'Telegram', icon: '📱' },
		{ href: 'https://wa.me/79001234567', label: 'WhatsApp', icon: '💬' },
		{ href: 'mailto:hello@mf.digital', label: 'Email', icon: '✉️' },
	],
}

export function Footer() {
	return (
		<footer className='bg-[var(--foreground)] text-[var(--background)] border-t border-[var(--foreground)]/10'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20'>
					{/* Brand */}
					<div>
						<Link href='/' className='inline-block mb-8'>
							<div className='flex items-center gap-3'>
								<div className='w-11 h-11 bg-[var(--background)] flex items-center justify-center'>
									<span className='text-[var(--foreground)] font-bold'>M&F</span>
								</div>
								<span className='font-bold text-xl tracking-tight'>Digital</span>
							</div>
						</Link>
						<p className='text-[var(--background)]/60 text-base mb-8 leading-relaxed'>
							Создаём цифровые продукты, которые приносят деньги.
						</p>
						<p className='text-xs text-[var(--background)]/40 uppercase tracking-wider'>
							© {new Date().getFullYear()} M&F Digital
						</p>
					</div>

					{/* Services */}
					<div>
						<h4 className='font-semibold text-sm uppercase tracking-[0.3em] mb-8 text-[var(--background)]/80'>
							Услуги
						</h4>
						<ul className='space-y-4'>
							{footerLinks.services.map(link => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-[var(--background)]/60 hover:text-[var(--background)] transition-colors text-base'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div>
						<h4 className='font-semibold text-sm uppercase tracking-[0.3em] mb-8 text-[var(--background)]/80'>
							Компания
						</h4>
						<ul className='space-y-4'>
							{footerLinks.company.map(link => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-[var(--background)]/60 hover:text-[var(--background)] transition-colors text-base'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className='font-semibold text-sm uppercase tracking-[0.3em] mb-8 text-[var(--background)]/80'>
							Связаться
						</h4>
						<ul className='space-y-5'>
							{footerLinks.social.map(link => (
								<li key={link.href}>
									<a
										href={link.href}
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center gap-3 text-[var(--background)]/60 hover:text-[var(--background)] transition-colors text-base'
									>
										<span className='text-xl opacity-60'>{link.icon}</span>
										{link.label}
									</a>
								</li>
							))}
						</ul>
						<div className='mt-10'>
							<a
								href='tel:+79001234567'
								className='text-xl font-mono text-[var(--background)] hover:opacity-70 transition-opacity tracking-tight'
							>
								+7 900 123 45 67
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className='border-t border-[var(--background)]/10'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8 py-10'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
						<p className='text-[var(--background)]/40 text-xs uppercase tracking-wider'>
							Все права защищены. Сделано с 🖤 в России.
						</p>
						<div className='flex items-center gap-6'>
							<Link
								href='/privacy'
								className='text-[var(--background)]/40 hover:text-[var(--background)] text-xs uppercase tracking-wider transition-colors'
							>
								Политика конфиденциальности
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
