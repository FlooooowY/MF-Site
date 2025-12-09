import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
	Search,
	Settings,
	Cog,
	Gauge,
	Disc,
	Zap,
	Paintbrush,
	Thermometer,
	ArrowRight,
} from 'lucide-react'
import './ServicesSection.css'

const services = [
	{
		id: 'diagnostics',
		icon: Search,
		title: 'Диагностика',
		description:
			'Компьютерная диагностика всех систем автомобиля с использованием дилерского оборудования',
		price: 'от 2 500 ₽',
		time: '30-60 мин',
		features: ['Чтение ошибок', 'Анализ датчиков', 'Рекомендации'],
		category: 'diagnostics',
	},
	{
		id: 'engine',
		icon: Settings,
		title: 'Ремонт двигателя',
		description:
			'Капитальный и частичный ремонт ДВС любой сложности. Работаем со всеми типами моторов',
		price: 'от 15 000 ₽',
		time: '1-5 дней',
		features: ['Любые типы ДВС', 'Турбины', 'Форсунки'],
		category: 'repair',
	},
	{
		id: 'transmission',
		icon: Cog,
		title: 'Ремонт КПП',
		description:
			'Механические и автоматические коробки передач. Диагностика, ремонт, замена масла',
		price: 'от 8 000 ₽',
		time: '1-3 дня',
		features: ['АКПП/МКПП', 'DSG/Вариатор', 'Роботы'],
		category: 'repair',
	},
	{
		id: 'suspension',
		icon: Gauge,
		title: 'Ходовая часть',
		description:
			'Диагностика и ремонт подвески. Замена амортизаторов, рычагов, сайлентблоков',
		price: 'от 3 000 ₽',
		time: '2-8 часов',
		features: ['Передняя ось', 'Задняя ось', 'Рулевое'],
		category: 'repair',
	},
	{
		id: 'brakes',
		icon: Disc,
		title: 'Тормозная система',
		description:
			'Замена колодок, дисков, суппортов. Прокачка системы, ремонт ABS',
		price: 'от 2 000 ₽',
		time: '1-4 часа',
		features: ['Колодки/Диски', 'Суппорты', 'ABS/ESP'],
		category: 'repair',
	},
	{
		id: 'electrical',
		icon: Zap,
		title: 'Электрика',
		description:
			'Ремонт электрооборудования, поиск утечек, установка доп. оборудования',
		price: 'от 1 500 ₽',
		time: '1-8 часов',
		features: ['Проводка', 'Генератор', 'Стартер'],
		category: 'repair',
	},
	{
		id: 'maintenance',
		icon: Thermometer,
		title: 'Техобслуживание',
		description:
			'Плановое ТО по регламенту производителя. Замена масел, фильтров, жидкостей',
		price: 'от 5 000 ₽',
		time: '1-3 часа',
		features: ['Масло/Фильтры', 'Жидкости', 'Свечи'],
		category: 'maintenance',
	},
	{
		id: 'body',
		icon: Paintbrush,
		title: 'Кузовной ремонт',
		description:
			'Удаление вмятин, покраска, полировка. Восстановление после ДТП',
		price: 'от 5 000 ₽',
		time: '1-7 дней',
		features: ['Покраска', 'Полировка', 'PDR'],
		category: 'body',
	},
]

const categories = [
	{ id: 'all', label: 'Все услуги' },
	{ id: 'diagnostics', label: 'Диагностика' },
	{ id: 'repair', label: 'Ремонт' },
	{ id: 'maintenance', label: 'ТО' },
	{ id: 'body', label: 'Кузовные' },
]

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.2,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.16, 1, 0.3, 1],
		},
	},
}

const ServicesSection = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const [activeCategory, setActiveCategory] = useState('all')
	const [hoveredService, setHoveredService] = useState(null)

	const filteredServices =
		activeCategory === 'all'
			? services
			: services.filter(s => s.category === activeCategory)

	return (
		<section className='services section' id='services' ref={ref}>
			<div className='container'>
				<motion.div
					className='section-title'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<h2>
						Наши <span className='text-gradient'>услуги</span>
					</h2>
					<p>Полный спектр автомобильного сервиса премиум-класса</p>
				</motion.div>

				{/* Category Filter */}
				<motion.div
					className='services__filter'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{categories.map(cat => (
						<button
							key={cat.id}
							className={`filter-btn ${
								activeCategory === cat.id ? 'active' : ''
							}`}
							onClick={() => setActiveCategory(cat.id)}
						>
							{cat.label}
							{activeCategory === cat.id && (
								<motion.div
									className='filter-btn__indicator'
									layoutId='filterIndicator'
									transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								/>
							)}
						</button>
					))}
				</motion.div>

				{/* Services Grid */}
				<motion.div
					className='services__grid'
					variants={containerVariants}
					initial='hidden'
					animate={isInView ? 'visible' : 'hidden'}
				>
					{filteredServices.map(service => (
						<motion.div
							key={service.id}
							className={`service-card ${
								hoveredService === service.id ? 'hovered' : ''
							}`}
							variants={itemVariants}
							onMouseEnter={() => setHoveredService(service.id)}
							onMouseLeave={() => setHoveredService(null)}
							layout
						>
							{/* Layer 1 - Background */}
							<div className='service-card__layer service-card__layer--bg' />

							{/* Layer 2 - Content */}
							<div className='service-card__layer service-card__layer--content'>
								<div className='service-card__icon'>
									<service.icon size={32} />
								</div>

								<h3 className='service-card__title'>{service.title}</h3>
								<p className='service-card__description'>
									{service.description}
								</p>

								<div className='service-card__features'>
									{service.features.map((feature, i) => (
										<span key={i} className='feature-tag'>
											{feature}
										</span>
									))}
								</div>

								<div className='service-card__footer'>
									<div className='service-card__price'>
										<span className='price-label'>Стоимость</span>
										<span className='price-value tech-text'>
											{service.price}
										</span>
									</div>
									<div className='service-card__time'>
										<span className='time-value'>{service.time}</span>
									</div>
								</div>

								<button className='service-card__cta'>
									<span>Подробнее</span>
									<ArrowRight size={18} />
								</button>
							</div>

							{/* Decorative elements */}
							<div className='service-card__glow' />
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* Background */}
			<div className='services__bg'>
				<div className='mesh-gradient' />
			</div>
		</section>
	)
}

export default ServicesSection
