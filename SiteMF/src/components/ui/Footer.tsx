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
		<footer className='text-white border-t border-white/10' style={{ backgroundColor: '#000000' }}>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20'>
					{/* Brand */}
					<div>
						<Link href='/' className='inline-block mb-8'>
							<div className='flex items-center gap-3'>
								<div className='w-11 h-11 bg-white flex items-center justify-center'>
									<span className='text-black font-bold' style={{ letterSpacing: '0.05em' }}>M&F</span>
								</div>
								<span className='font-bold text-xl text-white' style={{ letterSpacing: '0.05em' }}>Digital</span>
							</div>
						</Link>
						<p className='text-base mb-8 leading-relaxed' style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
							Создаём цифровые продукты, которые приносят деньги.
						</p>
						<p className='text-xs uppercase tracking-wider' style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
							© {new Date().getFullYear()} M&F Digital
						</p>
					</div>

					{/* Services */}
					<div>
						<h4 className='font-semibold text-sm uppercase tracking-[0.3em] mb-8' style={{ color: '#ffffff' }}>
							Услуги
						</h4>
						<ul className='space-y-3'>
							{footerLinks.services.map(link => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-sm font-medium transition-colors duration-200'
										style={{ color: 'rgba(255, 255, 255, 0.7)' }}
										onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
										onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div>
						<h4 className='font-semibold text-sm uppercase tracking-[0.3em] mb-8' style={{ color: '#ffffff' }}>
							Компания
						</h4>
						<ul className='space-y-3'>
							{footerLinks.company.map(link => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-sm font-medium transition-colors duration-200'
										style={{ color: 'rgba(255, 255, 255, 0.7)' }}
										onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
										onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className='font-semibold text-sm uppercase tracking-[0.3em] mb-8' style={{ color: '#ffffff' }}>
							Связаться
						</h4>
						<ul className='space-y-3'>
							{footerLinks.social.map(link => (
								<li key={link.href}>
									<a
										href={link.href}
										target='_blank'
										rel='noopener noreferrer'
										className='inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200'
										style={{ color: 'rgba(255, 255, 255, 0.7)' }}
										onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
										onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
									>
										<span className='text-base'>{link.icon}</span>
										{link.label}
									</a>
								</li>
							))}
						</ul>
						<div className='mt-6'>
							<a
								href='tel:+79001234567'
								className='text-base font-medium transition-colors duration-200'
								style={{ color: 'rgba(255, 255, 255, 0.7)' }}
								onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
								onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
							>
								+7 900 123 45 67
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className='border-t border-white/10'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8 py-10'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
						<p className='text-xs uppercase tracking-wider' style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
							Все права защищены. Сделано с 🖤 в России.
						</p>
						<div className='flex items-center gap-6'>
							<Link
								href='/privacy'
								className='text-xs uppercase tracking-wider transition-colors duration-200'
								style={{ color: 'rgba(255, 255, 255, 0.5)' }}
								onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
								onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
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
