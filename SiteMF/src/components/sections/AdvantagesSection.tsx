'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const advantages = [
	{
		number: '01',
		title: 'Результат, а не процесс',
		description: 'Мы фокусируемся на метриках: ROI, конверсии, выручке. Не на количестве часов.',
		icon: '📊',
	},
	{
		number: '02',
		title: 'Технологии будущего',
		description: 'Используем ИИ, ML и современные фреймворки. Ваш продукт не устареет через год.',
		icon: '🚀',
	},
	{
		number: '03',
		title: 'Прозрачность на 100%',
		description: 'Еженедельные демо, доступ к Jira, понятные отчёты. Вы всегда в курсе.',
		icon: '🔍',
	},
	{
		number: '04',
		title: 'Гарантия качества',
		description: '12 месяцев бесплатной поддержки. Исправляем баги за 24 часа.',
		icon: '🛡️',
	},
	{
		number: '05',
		title: 'Команда экспертов',
		description: '20+ специалистов с опытом в Яндексе, VK, Тинькофф.',
		icon: '👥',
	},
	{
		number: '06',
		title: 'Быстрый старт',
		description: 'Начинаем работу за 3 дня. Первые результаты — через 2 недели.',
		icon: '⚡',
	},
]

export function AdvantagesSection() {
	const [ref, isInView] = useInView<HTMLDivElement>({
		threshold: 0.1,
		triggerOnce: true,
	})

	return (
		<section className='py-24 lg:py-32 bg-neutral-900 text-white' ref={ref}>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-16'>
					<motion.span
						className='inline-block text-xs font-mono tracking-widest text-neutral-500 uppercase mb-4'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
					>
						Почему мы
					</motion.span>
					<motion.h2
						className='text-4xl lg:text-5xl font-bold text-white mb-6'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.1 }}
					>
						Наши преимущества
					</motion.h2>
				</div>

				{/* Advantages Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{advantages.map((advantage, index) => (
						<motion.div
							key={advantage.number}
							className='bg-neutral-800/50 border border-neutral-700 p-8 hover:bg-neutral-800 transition-colors'
							initial={{ opacity: 0, y: 40 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 * index }}
						>
							{/* Number & Icon */}
							<div className='flex items-center justify-between mb-6'>
								<span className='text-sm font-mono text-neutral-500'>
									{advantage.number}
								</span>
								<span className='text-2xl'>
									{advantage.icon}
								</span>
							</div>

							{/* Title */}
							<h3 className='text-xl font-bold text-white mb-3'>
								{advantage.title}
							</h3>

							{/* Description */}
							<p className='text-neutral-400 leading-relaxed text-sm'>
								{advantage.description}
							</p>
						</motion.div>
					))}
				</div>

				{/* Bottom Stat */}
				<motion.div
					className='text-center mt-16 pt-16 border-t border-neutral-800'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.8 }}
				>
					<p className='text-sm font-mono text-neutral-500 mb-4'>
						Средний ROI наших клиентов
					</p>
					<div className='text-6xl lg:text-8xl font-bold text-white'>
						340%
					</div>
				</motion.div>
			</div>
		</section>
	)
}
