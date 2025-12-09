import React from 'react'
import { motion } from 'framer-motion'
import {
	Search,
	Settings,
	Cog,
	Gauge,
	Disc,
	Zap,
	Paintbrush,
	Thermometer,
	Check,
	ArrowRight,
	Clock,
	Shield,
} from 'lucide-react'
import './ServicesPage.css'

const services = [
	{
		id: 'diagnostics',
		icon: Search,
		title: 'Компьютерная диагностика',
		description:
			'Полная диагностика всех электронных систем автомобиля с использованием дилерского оборудования. Выявление скрытых неисправностей, чтение и расшифровка ошибок.',
		price: 'от 2 500 ₽',
		time: '30-60 мин',
		features: [
			'Диагностика двигателя',
			'Диагностика АКПП/МКПП',
			'Диагностика подвески',
			'Диагностика электрики',
			'Диагностика климата',
			'Расшифровка ошибок',
		],
		guarantee: '2 года',
		color: 'blue',
	},
	{
		id: 'engine',
		icon: Settings,
		title: 'Ремонт двигателя',
		description:
			'Капитальный и частичный ремонт двигателей любой сложности. Работаем с бензиновыми и дизельными моторами всех типов.',
		price: 'от 15 000 ₽',
		time: '1-5 дней',
		features: [
			'Капитальный ремонт ДВС',
			'Замена ГРМ',
			'Ремонт турбины',
			'Замена прокладок',
			'Регулировка клапанов',
			'Ремонт топливной системы',
		],
		guarantee: '2 года',
		color: 'orange',
	},
	{
		id: 'transmission',
		icon: Cog,
		title: 'Ремонт КПП',
		description:
			'Профессиональный ремонт механических и автоматических коробок передач. Диагностика, ремонт, замена масла.',
		price: 'от 8 000 ₽',
		time: '1-3 дня',
		features: [
			'Ремонт АКПП',
			'Ремонт МКПП',
			'Ремонт DSG/S-tronic',
			'Ремонт вариатора',
			'Замена масла КПП',
			'Адаптация после ремонта',
		],
		guarantee: '2 года',
		color: 'cyan',
	},
	{
		id: 'suspension',
		icon: Gauge,
		title: 'Ходовая часть',
		description:
			'Диагностика и ремонт подвески. Замена амортизаторов, рычагов, сайлентблоков, ступичных подшипников.',
		price: 'от 3 000 ₽',
		time: '2-8 часов',
		features: [
			'Замена амортизаторов',
			'Замена рычагов',
			'Замена сайлентблоков',
			'Замена ступиц',
			'Развал-схождение',
			'Ремонт рулевого',
		],
		guarantee: '2 года',
		color: 'blue',
	},
	{
		id: 'brakes',
		icon: Disc,
		title: 'Тормозная система',
		description:
			'Замена тормозных колодок, дисков, суппортов. Прокачка тормозной системы, ремонт ABS.',
		price: 'от 2 000 ₽',
		time: '1-4 часа',
		features: [
			'Замена колодок',
			'Замена дисков',
			'Замена суппортов',
			'Прокачка тормозов',
			'Ремонт ABS',
			'Замена тормозных шлангов',
		],
		guarantee: '2 года',
		color: 'orange',
	},
	{
		id: 'electrical',
		icon: Zap,
		title: 'Электрика',
		description:
			'Ремонт электрооборудования автомобиля. Поиск утечек, установка дополнительного оборудования.',
		price: 'от 1 500 ₽',
		time: '1-8 часов',
		features: [
			'Ремонт проводки',
			'Ремонт генератора',
			'Ремонт стартера',
			'Поиск утечек тока',
			'Установка доп. оборудования',
			'Ремонт освещения',
		],
		guarantee: '2 года',
		color: 'cyan',
	},
	{
		id: 'maintenance',
		icon: Thermometer,
		title: 'Техобслуживание',
		description:
			'Плановое техническое обслуживание по регламенту производителя. Замена масел, фильтров, жидкостей.',
		price: 'от 5 000 ₽',
		time: '1-3 часа',
		features: [
			'Замена масла ДВС',
			'Замена фильтров',
			'Замена свечей',
			'Замена антифриза',
			'Замена тормозной жидкости',
			'Проверка всех систем',
		],
		guarantee: '2 года',
		color: 'blue',
	},
	{
		id: 'body',
		icon: Paintbrush,
		title: 'Кузовной ремонт',
		description:
			'Удаление вмятин, покраска, полировка. Восстановление геометрии кузова после ДТП.',
		price: 'от 5 000 ₽',
		time: '1-7 дней',
		features: [
			'Удаление вмятин (PDR)',
			'Локальная покраска',
			'Полная покраска',
			'Полировка кузова',
			'Ремонт после ДТП',
			'Антикоррозийная обработка',
		],
		guarantee: '3 года',
		color: 'orange',
	},
]

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5 },
	},
}

const ServicesPage = () => {
	return (
		<div className='services-page'>
			{/* Hero */}
			<section className='page-hero'>
				<div className='container'>
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Наши <span className='text-gradient'>услуги</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Полный спектр услуг по ремонту и обслуживанию автомобилей
					</motion.p>
				</div>
			</section>

			{/* Services List */}
			<section className='services-list section'>
				<div className='container'>
					<motion.div
						className='services-grid'
						variants={containerVariants}
						initial='hidden'
						animate='visible'
					>
						{services.map(service => (
							<motion.div
								key={service.id}
								className={`service-detail-card service-detail-card--${service.color}`}
								variants={itemVariants}
								id={service.id}
							>
								<div className='service-header'>
									<div className='service-icon'>
										<service.icon size={32} />
									</div>
									<div className='service-meta'>
										<div className='meta-item'>
											<Clock size={16} />
											<span>{service.time}</span>
										</div>
										<div className='meta-item'>
											<Shield size={16} />
											<span>Гарантия {service.guarantee}</span>
										</div>
									</div>
								</div>

								<h2 className='service-title'>{service.title}</h2>
								<p className='service-description'>{service.description}</p>

								<div className='service-features'>
									<h4>Что входит:</h4>
									<ul>
										{service.features.map((feature, i) => (
											<li key={i}>
												<Check size={16} />
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</div>

								<div className='service-footer'>
									<div className='service-price'>
										<span className='price-label'>Стоимость</span>
										<span className='price-value tech-text'>
											{service.price}
										</span>
									</div>
									<button className='btn btn-primary'>
										Записаться
										<ArrowRight size={18} />
									</button>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>
		</div>
	)
}

export default ServicesPage
