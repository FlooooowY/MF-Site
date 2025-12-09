import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
	Shield,
	Clock,
	Award,
	Wrench,
	Camera,
	FileCheck,
	CreditCard,
	HeadphonesIcon,
} from 'lucide-react'
import './AdvantagesSection.css'

const advantages = [
	{
		icon: Shield,
		title: 'Гарантия 2 года',
		description:
			'На все виды работ и установленные запчасти. Уверенность в качестве.',
		color: 'blue',
	},
	{
		icon: Clock,
		title: 'Работаем 24/7',
		description:
			'Срочная помощь в любое время дня и ночи. Эвакуатор за 30 минут.',
		color: 'orange',
	},
	{
		icon: Camera,
		title: 'Фотоотчёты',
		description:
			'Отправляем фото каждого этапа работ в мессенджер. Полная прозрачность.',
		color: 'cyan',
	},
	{
		icon: Award,
		title: 'Сертифицированные мастера',
		description:
			'Специалисты с опытом работы от 10 лет в официальных дилерских центрах.',
		color: 'green',
	},
	{
		icon: Wrench,
		title: 'Оригинальные запчасти',
		description:
			'Работаем только с проверенными поставщиками. Гарантия подлинности.',
		color: 'blue',
	},
	{
		icon: FileCheck,
		title: 'Диагностика бесплатно',
		description:
			'При проведении ремонта стоимость диагностики не оплачивается.',
		color: 'orange',
	},
	{
		icon: CreditCard,
		title: 'Оплата в рассрочку',
		description:
			'Удобные условия оплаты без переплат. До 12 месяцев без процентов.',
		color: 'cyan',
	},
	{
		icon: HeadphonesIcon,
		title: 'Персональный менеджер',
		description:
			'Один контакт для всех вопросов. Всегда на связи и готов помочь.',
		color: 'green',
	},
]

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.16, 1, 0.3, 1],
		},
	},
}

const AdvantagesSection = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<section className='advantages section' id='advantages' ref={ref}>
			<div className='container'>
				<motion.div
					className='section-title'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<h2>
						Почему выбирают <span className='text-gradient'>нас</span>
					</h2>
					<p>8 причин доверить свой автомобиль профессионалам АвтоМастер Про</p>
				</motion.div>

				<motion.div
					className='advantages__grid'
					variants={containerVariants}
					initial='hidden'
					animate={isInView ? 'visible' : 'hidden'}
				>
					{advantages.map((item, index) => (
						<motion.div
							key={index}
							className={`advantage-card advantage-card--${item.color}`}
							variants={itemVariants}
							whileHover={{
								y: -8,
								transition: { duration: 0.3 },
							}}
						>
							<div className='advantage-card__icon'>
								<item.icon size={28} />
							</div>
							<h3 className='advantage-card__title'>{item.title}</h3>
							<p className='advantage-card__description'>{item.description}</p>

							{/* Animated background line */}
							<div className='advantage-card__line' />
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* Background decoration */}
			<div className='advantages__bg'>
				<div className='bg-gradient bg-gradient--1' />
				<div className='bg-gradient bg-gradient--2' />
			</div>
		</section>
	)
}

export default AdvantagesSection
