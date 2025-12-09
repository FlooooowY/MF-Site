'use client'

import { motion } from 'framer-motion'
import { Coffee, Heart } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
	menu: [
		{ name: 'Эспрессо', href: '#menu' },
		{ name: 'Капучино', href: '#menu' },
		{ name: 'Латте', href: '#menu' },
		{ name: 'Cold Brew', href: '#menu' },
	],
	company: [
		{ name: 'О нас', href: '#philosophy' },
		{ name: 'Вакансии', href: '#' },
		{ name: 'Франшиза', href: '#' },
		{ name: 'Контакты', href: '#contact' },
	],
	legal: [
		{ name: 'Политика конфиденциальности', href: '#' },
		{ name: 'Условия использования', href: '#' },
		{ name: 'Оферта', href: '#' },
	],
}

export default function Footer() {
	return (
		<footer className='relative pt-20 pb-8 border-t border-cream/10'>
			{/* Background decoration */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute bottom-0 left-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl' />
				<div className='absolute bottom-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl' />
			</div>

			<div className='container mx-auto px-4 relative z-10'>
				<div className='grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16'>
					{/* Brand */}
					<div className='lg:col-span-2'>
						<Link href='/' className='flex items-center gap-2 mb-6'>
							<Coffee className='w-8 h-8 text-gold-primary' />
							<span className='font-playfair text-xl font-bold tracking-wider'>
								<span className='text-cream'>AROMA</span>
								<span className='text-gold-primary'> CRAFT</span>
							</span>
						</Link>
						<p className='text-cream/60 mb-6 max-w-sm'>
							Кофе как искусство — от экрана до чашки. Мы создаём не просто
							напитки, а моменты наслаждения в вашем дне.
						</p>
						{/* Coffee beans decoration */}
						<div className='flex gap-2'>
							{[...Array(5)].map((_, i) => (
								<motion.svg
									key={i}
									initial={{ rotate: 0 }}
									animate={{ rotate: 360 }}
									transition={{
										duration: 20 + i * 5,
										repeat: Infinity,
										ease: 'linear',
									}}
									width='24'
									height='24'
									viewBox='0 0 100 100'
									className='text-gold-primary/30'
								>
									<ellipse
										cx='50'
										cy='50'
										rx='40'
										ry='25'
										fill='currentColor'
									/>
								</motion.svg>
							))}
						</div>
					</div>

					{/* Menu Links */}
					<div>
						<h4 className='font-playfair text-lg font-semibold text-cream mb-4'>
							Меню
						</h4>
						<ul className='space-y-3'>
							{footerLinks.menu.map(link => (
								<li key={link.name}>
									<Link
										href={link.href}
										className='text-cream/60 hover:text-gold-primary transition-colors'
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Links */}
					<div>
						<h4 className='font-playfair text-lg font-semibold text-cream mb-4'>
							Компания
						</h4>
						<ul className='space-y-3'>
							{footerLinks.company.map(link => (
								<li key={link.name}>
									<Link
										href={link.href}
										className='text-cream/60 hover:text-gold-primary transition-colors'
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Legal Links */}
					<div>
						<h4 className='font-playfair text-lg font-semibold text-cream mb-4'>
							Правовая информация
						</h4>
						<ul className='space-y-3'>
							{footerLinks.legal.map(link => (
								<li key={link.name}>
									<Link
										href={link.href}
										className='text-cream/60 hover:text-gold-primary transition-colors text-sm'
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div className='pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4'>
					<div className='text-cream/50 text-sm flex items-center gap-1'>
						© 2025 AROMA CRAFT COFFEE. Сделано с{' '}
						<Heart className='w-4 h-4 text-terracotta fill-terracotta inline' />{' '}
						и кофе
					</div>

					<div className='flex items-center gap-6'>
						<span className='text-cream/40 text-sm'>Принимаем к оплате:</span>
						<div className='flex gap-3'>
							{['Visa', 'MC', 'Mir', 'SBP'].map(card => (
								<div
									key={card}
									className='px-3 py-1 bg-cream/10 rounded text-cream/60 text-xs font-medium'
								>
									{card}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
