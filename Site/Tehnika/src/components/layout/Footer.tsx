'use client'

import Link from 'next/link'
import {
	Mail,
	Phone,
	MapPin,
	Send,
	Facebook,
	Instagram,
	Youtube,
	MessageCircle,
} from 'lucide-react'

export default function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='relative bg-primary-dark border-t border-white/10'>
			{/* Wave Divider */}
			<div className='absolute -top-px left-0 right-0 overflow-hidden'>
				<svg viewBox='0 0 1440 60' className='w-full h-auto fill-primary'>
					<path d='M0,30 Q360,0 720,30 T1440,30 V0 H0 Z' />
				</svg>
			</div>

			<div className='container mx-auto px-6 pt-20 pb-8'>
				{/* Newsletter */}
				<div className='relative mb-16 p-8 rounded-3xl bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 border border-white/10 overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-accent-purple/5' />
					<div className='relative flex flex-col lg:flex-row items-center justify-between gap-6'>
						<div>
							<h3 className='text-2xl font-clash font-semibold mb-2'>
								Подпишитесь на новости
							</h3>
							<p className='text-white/60'>
								Получайте эксклюзивные предложения и скидки первыми
							</p>
						</div>
						<div className='flex w-full lg:w-auto gap-3'>
							<input
								type='email'
								placeholder='Ваш email'
								className='input-search flex-1 lg:w-80'
							/>
							<button className='btn-glow flex items-center gap-2 whitespace-nowrap'>
								Подписаться
								<Send size={18} />
							</button>
						</div>
					</div>
				</div>

				{/* Links Grid */}
				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12'>
					{/* Company */}
					<div className='col-span-2'>
						<Link href='/' className='flex items-center gap-3 mb-6'>
							<div className='w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-2xl font-bold'>
								T
							</div>
							<div>
								<div className='font-clash font-semibold text-xl'>TECHNO</div>
								<div className='text-[10px] text-white/50 tracking-widest uppercase'>
									megastore
								</div>
							</div>
						</Link>
						<p className='text-white/60 mb-6 max-w-xs'>
							Крупнейший магазин электроники в России. Более 50 000 товаров с
							гарантией качества.
						</p>
						<div className='flex gap-3'>
							<a
								href='#'
								className='p-3 rounded-xl bg-white/5 hover:bg-accent-blue/20 hover:text-accent-blue transition-all'
							>
								<Facebook size={20} />
							</a>
							<a
								href='#'
								className='p-3 rounded-xl bg-white/5 hover:bg-accent-blue/20 hover:text-accent-blue transition-all'
							>
								<Instagram size={20} />
							</a>
							<a
								href='#'
								className='p-3 rounded-xl bg-white/5 hover:bg-accent-blue/20 hover:text-accent-blue transition-all'
							>
								<Youtube size={20} />
							</a>
							<a
								href='#'
								className='p-3 rounded-xl bg-white/5 hover:bg-accent-blue/20 hover:text-accent-blue transition-all'
							>
								<MessageCircle size={20} />
							</a>
						</div>
					</div>

					{/* Catalog */}
					<div>
						<h4 className='font-semibold mb-4'>Каталог</h4>
						<ul className='space-y-3'>
							<li>
								<Link
									href='/catalog/smartphones'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Смартфоны
								</Link>
							</li>
							<li>
								<Link
									href='/catalog/laptops'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Ноутбуки
								</Link>
							</li>
							<li>
								<Link
									href='/catalog/tv'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Телевизоры
								</Link>
							</li>
							<li>
								<Link
									href='/catalog/gaming'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Игровые консоли
								</Link>
							</li>
							<li>
								<Link
									href='/catalog/audio'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Аудиотехника
								</Link>
							</li>
						</ul>
					</div>

					{/* Company */}
					<div>
						<h4 className='font-semibold mb-4'>Компания</h4>
						<ul className='space-y-3'>
							<li>
								<Link
									href='/about'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									О нас
								</Link>
							</li>
							<li>
								<Link
									href='/stores'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Магазины
								</Link>
							</li>
							<li>
								<Link
									href='/careers'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Вакансии
								</Link>
							</li>
							<li>
								<Link
									href='/partners'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Партнёрам
								</Link>
							</li>
							<li>
								<Link
									href='/press'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Для прессы
								</Link>
							</li>
						</ul>
					</div>

					{/* Help */}
					<div>
						<h4 className='font-semibold mb-4'>Помощь</h4>
						<ul className='space-y-3'>
							<li>
								<Link
									href='/delivery'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Доставка
								</Link>
							</li>
							<li>
								<Link
									href='/payment'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Оплата
								</Link>
							</li>
							<li>
								<Link
									href='/return'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Возврат
								</Link>
							</li>
							<li>
								<Link
									href='/warranty'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									Гарантия
								</Link>
							</li>
							<li>
								<Link
									href='/faq'
									className='text-white/60 hover:text-accent-blue transition-colors'
								>
									FAQ
								</Link>
							</li>
						</ul>
					</div>

					{/* Contacts */}
					<div>
						<h4 className='font-semibold mb-4'>Контакты</h4>
						<ul className='space-y-4'>
							<li>
								<a
									href='tel:88005553535'
									className='flex items-center gap-3 text-white/60 hover:text-accent-blue transition-colors'
								>
									<Phone size={18} />8 800 555-35-35
								</a>
							</li>
							<li>
								<a
									href='mailto:info@techno.ru'
									className='flex items-center gap-3 text-white/60 hover:text-accent-blue transition-colors'
								>
									<Mail size={18} />
									info@techno.ru
								</a>
							</li>
							<li>
								<div className='flex items-start gap-3 text-white/60'>
									<MapPin size={18} className='flex-shrink-0 mt-1' />
									<span>Москва, ул. Техническая, 1</span>
								</div>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom */}
				<div className='pt-8 border-t border-white/10'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
						<div className='flex flex-wrap items-center justify-center gap-6 text-sm text-white/40'>
							<span>© {currentYear} TECHNO MEGASTORE</span>
							<Link
								href='/privacy'
								className='hover:text-white transition-colors'
							>
								Политика конфиденциальности
							</Link>
							<Link
								href='/terms'
								className='hover:text-white transition-colors'
							>
								Условия использования
							</Link>
						</div>
						<div className='flex items-center gap-4'>
							<span className='text-sm text-white/40'>Мы принимаем:</span>
							<div className='flex gap-2'>
								{['VISA', 'MC', 'MIR', 'SBP'].map(card => (
									<div
										key={card}
										className='px-3 py-1 rounded bg-white/10 text-xs font-medium'
									>
										{card}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
