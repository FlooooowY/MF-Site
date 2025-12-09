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
		<footer className='bg-black text-white'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
					{/* Brand */}
					<div>
						<Link href='/' className='inline-block mb-6'>
							<div className='flex items-center gap-3'>
								<div className='w-11 h-11 bg-white flex items-center justify-center'>
									<span className='text-black font-bold'>M&F</span>
								</div>
								<span className='font-bold text-xl'>Digital</span>
							</div>
						</Link>
						<p className='text-neutral-400 text-sm mb-6'>
							Создаём цифровые продукты, которые приносят деньги.
						</p>
						<p className='text-xs text-neutral-500'>
							© {new Date().getFullYear()} M&F Digital
						</p>
					</div>

					{/* Services */}
					<div>
						<h4 className='font-semibold text-sm uppercase tracking-wider mb-6'>
							Услуги
						</h4>
						<ul className='space-y-3'>
							{footerLinks.services.map(link => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-neutral-400 hover:text-white transition-colors text-sm'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div>
						<h4 className='font-semibold text-sm uppercase tracking-wider mb-6'>
							Компания
						</h4>
						<ul className='space-y-3'>
							{footerLinks.company.map(link => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-neutral-400 hover:text-white transition-colors text-sm'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className='font-semibold text-sm uppercase tracking-wider mb-6'>
							Связаться
						</h4>
						<ul className='space-y-4'>
							{footerLinks.social.map(link => (
								<li key={link.href}>
									<a
										href={link.href}
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm'
									>
										<span className='text-lg'>{link.icon}</span>
										{link.label}
									</a>
								</li>
							))}
						</ul>
						<div className='mt-8'>
							<a
								href='tel:+79001234567'
								className='text-lg font-mono text-white hover:text-neutral-300 transition-colors'
							>
								+7 900 123 45 67
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className='border-t border-neutral-800'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8 py-6'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
						<p className='text-neutral-500 text-xs'>
							Все права защищены. Сделано с 🖤 в России.
						</p>
						<div className='flex items-center gap-6'>
							<Link
								href='/privacy'
								className='text-neutral-500 hover:text-white text-xs transition-colors'
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
