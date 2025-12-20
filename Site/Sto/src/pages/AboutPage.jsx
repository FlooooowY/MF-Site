import React from 'react'
import { motion } from 'framer-motion'
import {
	Award,
	Users,
	Calendar,
	Shield,
	Wrench,
	Building,
	CheckCircle,
	Star,
} from 'lucide-react'
import './AboutPage.css'

const stats = [
	{ value: '15+', label: 'Лет на рынке', icon: Calendar },
	{ value: '50K+', label: 'Довольных клиентов', icon: Users },
	{ value: '25+', label: 'Мастеров в команде', icon: Wrench },
	{ value: '150+', label: 'Сертификатов', icon: Award },
]

const values = [
	{
		title: 'Качество',
		description:
			'Используем только оригинальные запчасти и профессиональное оборудование для достижения максимального результата.',
	},
	{
		title: 'Прозрачность',
		description:
			'Фотоотчёты на каждом этапе работы. Вы всегда знаете, что происходит с вашим автомобилем.',
	},
	{
		title: 'Профессионализм',
		description:
			'Наши мастера имеют сертификаты ведущих производителей и опыт работы в официальных дилерских центрах.',
	},
	{
		title: 'Гарантия',
		description:
			'2 года гарантии на все виды работ. Мы уверены в качестве наших услуг.',
	},
]

const equipment = [
	'Bosch ESI[tronic]',
	'BMW ISTA',
	'VAG ODIS',
	'Mercedes Xentry',
	'Hunter HawkEye Elite',
	'Snap-on VERUS Pro',
]

const AboutPage = () => {
	return (
		<div className='about-page'>
			{/* Hero */}
			<section className='page-hero'>
				<div className='container'>
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						О компании <span className='text-gradient'>АвтоМастер Про</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Премиальный автосервис нового поколения с 2009 года
					</motion.p>
				</div>
			</section>

			{/* Stats */}
			<section className='about-stats section'>
				<div className='container'>
					<motion.div
						className='stats-grid'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								className='stat-card'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 + index * 0.1 }}
							>
								<stat.icon size={32} className='stat-icon' />
								<span className='stat-value tech-text'>{stat.value}</span>
								<span className='stat-label'>{stat.label}</span>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Story */}
			<section className='about-story section'>
				<div className='container'>
					<div className='story-content'>
						<motion.div
							className='story-text'
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2>
								Наша <span className='text-gradient'>история</span>
							</h2>
							<p>
								АвтоМастер Про был основан в 2009 году группой энтузиастов,
								объединённых общей идеей — создать автосервис, которому можно
								полностью доверять. Мы начинали с небольшой мастерской на 3
								подъёмника, а сегодня это современный технический центр площадью
								более 2000 м².
							</p>
							<p>
								За 15 лет мы обслужили более 50 000 автомобилей и заслужили
								репутацию одного из лучших независимых сервисов в Москве. Наша
								команда — это 25+ профессионалов с опытом работы в официальных
								дилерских центрах BMW, Mercedes-Benz, Audi и других премиальных
								марок.
							</p>
							<p>
								Мы инвестируем в самое современное диагностическое оборудование
								и постоянное обучение наших мастеров, чтобы предоставлять услуги
								дилерского уровня по справедливым ценам.
							</p>
						</motion.div>

						<motion.div
							className='story-image'
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<div className='image-placeholder'>
								<Building size={64} />
								<span>Наш технический центр</span>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className='about-values section'>
				<div className='container'>
					<motion.div
						className='section-title'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2>
							Наши <span className='text-gradient'>ценности</span>
						</h2>
					</motion.div>

					<div className='values-grid'>
						{values.map((value, index) => (
							<motion.div
								key={index}
								className='value-card'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
							>
								<CheckCircle size={28} className='value-icon' />
								<h3>{value.title}</h3>
								<p>{value.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Equipment */}
			<section className='about-equipment section'>
				<div className='container'>
					<motion.div
						className='section-title'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2>
							Наше <span className='text-gradient'>оборудование</span>
						</h2>
						<p>
							Используем профессиональное диагностическое оборудование ведущих
							производителей
						</p>
					</motion.div>

					<motion.div
						className='equipment-grid'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
					>
						{equipment.map((item, index) => (
							<motion.div
								key={index}
								className='equipment-item'
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.05 }}
							>
								<Star size={16} />
								<span>{item}</span>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Certificates */}
			<section className='about-certs section'>
				<div className='container'>
					<motion.div
						className='section-title'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2>
							Сертификаты и <span className='text-gradient'>награды</span>
						</h2>
					</motion.div>

					<motion.div
						className='certs-grid'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
					>
						{[1, 2, 3, 4, 5, 6].map(cert => (
							<motion.div
								key={cert}
								className='cert-card'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: cert * 0.05 }}
							>
								<Award size={48} />
								<span>Сертификат #{cert}</span>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>
		</div>
	)
}

export default AboutPage
