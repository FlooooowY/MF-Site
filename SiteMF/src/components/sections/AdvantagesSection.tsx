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
		description: 'Строгое тестирование и code review. Исправляем баги за 24 часа. Каждый проект проходит проверку перед сдачей.',
	},
	{
		number: '05',
		title: 'Команда экспертов',
		description: '10+ специалистов с опытом в Яндексе, VK, Тинькофф.',
	},
	{
		number: '06',
		title: 'Быстрый старт',
		description: 'Начинаем работу за 3 дня. Первые результаты — через неделю.',
	},
]

export function AdvantagesSection() {
	const [ref, isInView] = useInView<HTMLDivElement>({
		threshold: 0.1,
		triggerOnce: true,
	})

	return (
		<section 
			className='py-20 bg-[var(--background)] relative' 
			ref={ref}
			style={{ marginTop: '150px', marginBottom: '150px' }}
		>
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
							className='group p-10 lg:p-12 bg-white hover:bg-neutral-50 border-2 border-[var(--foreground)]/5 hover:border-[var(--foreground)]/20 rounded-2xl transition-all duration-500 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 text-center flex flex-col items-center relative overflow-hidden'
							style={{ textAlign: 'center', alignItems: 'center' }}
							initial={{ opacity: 0, y: 40 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 * index }}
						>
							{/* Gradient overlay */}
							<div className='absolute inset-0 bg-gradient-to-br from-[var(--foreground)]/0 to-[var(--foreground)]/0 group-hover:from-[var(--foreground)]/[0.02] group-hover:to-transparent transition-all duration-500 pointer-events-none' />
							
							{/* Number */}
							<div className='relative mb-10'>
								<span className='text-6xl font-bold text-black/10 group-hover:text-black/20 transition-colors duration-500'>
									{advantage.number}
								</span>
							</div>

							{/* Title */}
							<h3 className='relative text-2xl lg:text-3xl font-bold text-black mb-6 tracking-tight transition-colors duration-500' style={{ lineHeight: '1.3' }}>
								{advantage.title}
							</h3>

							{/* Description */}
							<p className='relative text-black/60 group-hover:text-black/80 leading-relaxed text-base lg:text-lg transition-colors duration-500'>
								{advantage.description}
							</p>
						</motion.div>
					))}
				</div>

				{/* Bottom Stat */}
				<motion.div
					className='text-center py-32 border-t border-[var(--foreground)]/5'
					style={{ marginTop: '120px' }}
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
