import React from 'react'
import { Link } from 'react-router-dom'
import {
	MapPin,
	Phone,
	Mail,
	Clock,
	Instagram,
	Send,
	MessageCircle,
	Wrench,
	Shield,
	Award,
} from 'lucide-react'
import './Footer.css'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='footer'>
			<div className='footer__top'>
				<div className='container'>
					<div className='footer__grid'>
						{/* Brand Column */}
						<div className='footer__brand'>
							<Link to='/' className='footer__logo'>
								<div className='logo-icon'>
									<Wrench size={24} />
								</div>
								<div className='logo-text'>
									<span className='logo-name'>АвтоМастер</span>
									<span className='logo-suffix'>Про</span>
								</div>
							</Link>
							<p className='footer__tagline'>
								Премиальный автосервис нового поколения. Профессиональный ремонт
								и обслуживание автомобилей с гарантией качества.
							</p>

							<div className='footer__trust'>
								<div className='trust-badge'>
									<Shield size={20} />
									<span>Гарантия 2 года</span>
								</div>
								<div className='trust-badge'>
									<Award size={20} />
									<span>15+ лет опыта</span>
								</div>
							</div>
						</div>

						{/* Services Column */}
						<div className='footer__column'>
							<h4 className='footer__title'>Услуги</h4>
							<ul className='footer__list'>
								<li>
									<Link to='/services#diagnostics'>Диагностика</Link>
								</li>
								<li>
									<Link to='/services#engine'>Ремонт двигателя</Link>
								</li>
								<li>
									<Link to='/services#transmission'>Ремонт КПП</Link>
								</li>
								<li>
									<Link to='/services#suspension'>Ходовая часть</Link>
								</li>
								<li>
									<Link to='/services#brakes'>Тормозная система</Link>
								</li>
								<li>
									<Link to='/services#electrical'>Электрика</Link>
								</li>
								<li>
									<Link to='/services#body'>Кузовной ремонт</Link>
								</li>
							</ul>
						</div>

						{/* Company Column */}
						<div className='footer__column'>
							<h4 className='footer__title'>Компания</h4>
							<ul className='footer__list'>
								<li>
									<Link to='/about'>О нас</Link>
								</li>
								<li>
									<Link to='/about#team'>Наши мастера</Link>
								</li>
								<li>
									<Link to='/about#equipment'>Оборудование</Link>
								</li>
								<li>
									<Link to='/about#certificates'>Сертификаты</Link>
								</li>
								<li>
									<Link to='/contact'>Контакты</Link>
								</li>
								<li>
									<Link to='/reviews'>Отзывы</Link>
								</li>
							</ul>
						</div>

						{/* Contact Column */}
						<div className='footer__column footer__contact'>
							<h4 className='footer__title'>Контакты</h4>

							<div className='contact-item'>
								<MapPin size={20} />
								<div>
									<span>г. Москва, ул. Автомобильная, 25</span>
									<a href='#' className='contact-link'>
										Показать на карте
									</a>
								</div>
							</div>

							<div className='contact-item'>
								<Phone size={20} />
								<div>
									<a href='tel:+78001234567'>8 800 123-45-67</a>
									<span className='contact-note'>Бесплатно по России</span>
								</div>
							</div>

							<div className='contact-item'>
								<Mail size={20} />
								<a href='mailto:info@automaster.pro'>info@automaster.pro</a>
							</div>

							<div className='contact-item'>
								<Clock size={20} />
								<div>
									<span>Пн-Вс: 8:00 - 22:00</span>
									<span className='contact-note'>Без выходных</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='footer__bottom'>
				<div className='container'>
					<div className='footer__bottom-content'>
						<div className='footer__copyright'>
							<p>© {currentYear} АвтоМастер Про. Все права защищены.</p>
							<div className='footer__legal'>
								<Link to='/privacy'>Политика конфиденциальности</Link>
								<Link to='/terms'>Пользовательское соглашение</Link>
							</div>
						</div>

						<div className='footer__socials'>
							<a href='#' className='social-link' aria-label='Instagram'>
								<Instagram size={20} />
							</a>
							<a href='#' className='social-link' aria-label='Telegram'>
								<Send size={20} />
							</a>
							<a href='#' className='social-link' aria-label='WhatsApp'>
								<MessageCircle size={20} />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
