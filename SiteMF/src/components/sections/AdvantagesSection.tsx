'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const advantages = [
	{
		number: '01',
		title: 'Результат, а не процесс',
		description: 'Мы фокусируемся на метриках: ROI, конверсии, выручке. Не на количестве часов.',
	},
	{
		number: '02',
		title: 'Технологии будущего',
		description: 'Используем ИИ, ML и современные фреймворки. Ваш продукт не устареет через год.',
	},
	{
		number: '03',
		title: 'Прозрачность на 100%',
		description: 'Еженедельные демо, доступ к Jira, понятные отчёты. Вы всегда в курсе.',
	},
	{
		number: '04',
		title: 'Гарантия качества',
		description: '12 месяцев бесплатной поддержки. Исправляем баги за 24 часа.',
	},
	{
		number: '05',
		title: 'Команда экспертов',
		description: '20+ специалистов с опытом в Яндексе, VK, Тинькофф.',
	},
	{
		number: '06',
		title: 'Быстрый старт',
		description: 'Начинаем работу за 3 дня. Первые результаты — через 2 недели.',
	},
]

export function AdvantagesSection() {
	const [ref, isInView] = useInView<HTMLDivElement>({
		threshold: 0.1,
		triggerOnce: true,
	})

	return (
		<section className='py-40 lg:py-48 bg-[var(--background)] relative' ref={ref}>
			{/* Subtle background gradient */}
			<div className='absolute inset-0 opacity-[0.03]'>
				<div className='absolute inset-0' 
					style={{
						backgroundImage: 'linear-gradient(to bottom, transparent 0%, currentColor 50%, transparent 100%)'
					}}
				/>
			</div>

			<div className='max-w-7xl mx-auto px-6 lg:px-8 relative'>
				{/* Header */}
				<div className='text-center mb-32 lg:mb-40'>
					<motion.span
						className='inline-block text-xs font-mono tracking-[0.3em] text-[var(--color-medium-gray)] uppercase mb-8'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
					>
						Почему мы
					</motion.span>
					<motion.h2
						className='text-5xl lg:text-7xl font-bold text-[var(--foreground)] mb-10 tracking-tight'
						style={{ lineHeight: '1.2' }}
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.1 }}
					>
						Наши преимущества
					</motion.h2>
				</div>

				{/* Advantages Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-32 lg:mb-40'>
					{advantages.map((advantage, index) => (
						<motion.div
							key={advantage.number}
							className='group p-14 bg-neutral-50/50 hover:bg-neutral-100/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1'
							initial={{ opacity: 0, y: 40 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 * index }}
						>
							{/* Number */}
							<div className='mb-12'>
								<span className='text-5xl font-bold text-[var(--foreground)]/10'>
									{advantage.number}
								</span>
							</div>

							{/* Title */}
							<h3 className='text-2xl lg:text-3xl font-bold text-[var(--foreground)] mb-8 tracking-tight' style={{ lineHeight: '1.3' }}>
								{advantage.title}
							</h3>

							{/* Description */}
							<p className='text-[var(--color-medium-gray)] leading-relaxed text-base lg:text-lg'>
								{advantage.description}
							</p>
						</motion.div>
					))}
				</div>

				{/* Bottom Stat */}
				<motion.div
					className='text-center py-32 border-t border-[var(--foreground)]/5'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.8 }}
				>
					<p className='text-sm font-mono text-[var(--color-medium-gray)] mb-16 uppercase tracking-[0.3em]'>
						Средний ROI наших клиентов
					</p>
					<div className='text-8xl lg:text-9xl font-bold text-[var(--foreground)] tracking-tight' style={{ lineHeight: '1' }}>
						340%
					</div>
				</motion.div>
			</div>
		</section>
	)
}
