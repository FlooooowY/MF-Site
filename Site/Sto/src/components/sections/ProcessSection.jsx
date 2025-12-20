import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
	ClipboardList,
	Search,
	FileCheck,
	Wrench,
	CheckCircle,
	Car,
	Clock,
	Camera,
} from 'lucide-react'
import './ProcessSection.css'

const processSteps = [
	{
		id: 1,
		icon: ClipboardList,
		title: 'Заявка',
		shortDesc: 'Оставьте заявку',
		description:
			'Заполните форму на сайте или позвоните нам. Менеджер свяжется с вами в течение 15 минут для уточнения деталей и записи на удобное время.',
		time: '5-15 минут',
		details: [
			'Описание проблемы',
			'Выбор удобного времени',
			'Предварительная оценка',
		],
		image: '/images/process-1.jpg',
	},
	{
		id: 2,
		icon: Search,
		title: 'Диагностика',
		shortDesc: 'Проверяем автомобиль',
		description:
			'Проводим полную компьютерную диагностику с использованием дилерского оборудования. Выявляем все неисправности и составляем план ремонта.',
		time: '30-60 минут',
		details: [
			'Компьютерная диагностика',
			'Визуальный осмотр',
			'Тест-драйв при необходимости',
		],
		image: '/images/process-2.jpg',
	},
	{
		id: 3,
		icon: FileCheck,
		title: 'Согласование',
		shortDesc: 'Утверждаем план',
		description:
			'Предоставляем детальную смету с указанием всех работ и запчастей. Согласовываем стоимость и сроки выполнения. Никаких скрытых платежей.',
		time: '15-30 минут',
		details: ['Детальная смета', 'Выбор запчастей', 'Согласование сроков'],
		image: '/images/process-3.jpg',
	},
	{
		id: 4,
		icon: Wrench,
		title: 'Ремонт',
		shortDesc: 'Выполняем работы',
		description:
			'Сертифицированные мастера выполняют ремонт согласно утвержденному плану. На каждом этапе отправляем фотоотчёт в мессенджер.',
		time: 'По плану',
		details: ['Фотоотчёты', 'Оригинальные запчасти', 'Контроль качества'],
		image: '/images/process-4.jpg',
	},
	{
		id: 5,
		icon: CheckCircle,
		title: 'Проверка',
		shortDesc: 'Контроль качества',
		description:
			'После завершения работ проводим финальную проверку и тест-драйв. Убеждаемся, что все системы работают исправно.',
		time: '30-60 минут',
		details: ['Тестирование', 'Проверка систем', 'Тест-драйв'],
		image: '/images/process-5.jpg',
	},
	{
		id: 6,
		icon: Car,
		title: 'Выдача',
		shortDesc: 'Забираете автомобиль',
		description:
			'Выдаем автомобиль с полным пакетом документов, включая гарантийный талон на 2 года. Проводим инструктаж по рекомендациям.',
		time: '15-20 минут',
		details: ['Документы и гарантия', 'Рекомендации', 'Запись на ТО'],
		image: '/images/process-6.jpg',
	},
]

const ProcessSection = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const [activeStep, setActiveStep] = useState(1)

	const activeStepData = processSteps.find(s => s.id === activeStep)

	return (
		<section className='process section' id='process' ref={ref}>
			<div className='container'>
				<motion.div
					className='section-title'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<h2>
						Как мы <span className='text-gradient'>работаем</span>
					</h2>
					<p>Прозрачный процесс от заявки до выдачи автомобиля</p>
				</motion.div>

				{/* Timeline */}
				<motion.div
					className='process__timeline'
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<div className='timeline-track'>
						<div
							className='timeline-progress'
							style={{
								width: `${
									((activeStep - 1) / (processSteps.length - 1)) * 100
								}%`,
							}}
						/>
					</div>

					<div className='timeline-steps'>
						{processSteps.map((step, index) => (
							<button
								key={step.id}
								className={`timeline-step ${
									activeStep === step.id ? 'active' : ''
								} ${activeStep > step.id ? 'completed' : ''}`}
								onClick={() => setActiveStep(step.id)}
							>
								<div className='step-marker'>
									<step.icon size={20} />
								</div>
								<span className='step-label'>{step.shortDesc}</span>
							</button>
						))}
					</div>
				</motion.div>

				{/* Step Content */}
				<div className='process__content'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={activeStep}
							className='step-content'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
						>
							<div className='step-content__info'>
								<div className='step-number'>
									<span>Этап</span>
									<strong>{activeStep}</strong>
									<span>из {processSteps.length}</span>
								</div>

								<h3 className='step-title'>
									<activeStepData.icon size={28} />
									{activeStepData.title}
								</h3>

								<p className='step-description'>{activeStepData.description}</p>

								<div className='step-details'>
									{activeStepData.details.map((detail, i) => (
										<motion.div
											key={i}
											className='detail-item'
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.1 + i * 0.1 }}
										>
											<CheckCircle size={16} />
											<span>{detail}</span>
										</motion.div>
									))}
								</div>

								<div className='step-meta'>
									<div className='meta-item'>
										<Clock size={18} />
										<span>Время: {activeStepData.time}</span>
									</div>
									<div className='meta-item'>
										<Camera size={18} />
										<span>Фотоотчёт в мессенджер</span>
									</div>
								</div>
							</div>

							<div className='step-content__visual'>
								<div className='visual-placeholder'>
									<activeStepData.icon size={64} />
									<span>Этап {activeStep}</span>
								</div>

								{/* Decorative elements */}
								<div className='visual-decor'>
									<div className='decor-ring decor-ring--1' />
									<div className='decor-ring decor-ring--2' />
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Navigation */}
				<div className='process__nav'>
					<button
						className='nav-btn'
						onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
						disabled={activeStep === 1}
					>
						← Предыдущий этап
					</button>
					<div className='nav-dots'>
						{processSteps.map(step => (
							<button
								key={step.id}
								className={`nav-dot ${activeStep === step.id ? 'active' : ''}`}
								onClick={() => setActiveStep(step.id)}
							/>
						))}
					</div>
					<button
						className='nav-btn'
						onClick={() =>
							setActiveStep(Math.min(processSteps.length, activeStep + 1))
						}
						disabled={activeStep === processSteps.length}
					>
						Следующий этап →
					</button>
				</div>
			</div>
		</section>
	)
}

export default ProcessSection
