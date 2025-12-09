'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { services } from '@/data/services'
import { useInView } from '@/hooks/useInView'

export function ServicesSection() {
	const [ref, isInView] = useInView<HTMLDivElement>({
		threshold: 0.2,
		triggerOnce: true,
	})

	return (
		<section className='py-40 lg:py-48 bg-[var(--background)] relative' ref={ref}>
			{/* Subtle background pattern */}
			<div className='absolute inset-0 opacity-[0.02]'>
				<div className='absolute inset-0' 
					style={{
						backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
						backgroundSize: '48px 48px'
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
						Наши услуги
					</motion.span>
					<motion.h2
						className='text-5xl lg:text-7xl font-bold text-[var(--foreground)] mb-10 tracking-tight'
						style={{ lineHeight: '1.2' }}
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.1 }}
					>
						Что мы делаем
					</motion.h2>
					<motion.p
						className='max-w-2xl mx-auto text-[var(--color-medium-gray)] text-xl leading-relaxed'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.2 }}
					>
						Полный цикл цифровой разработки: от идеи до запуска и масштабирования
					</motion.p>
				</div>

				{/* Services Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20'>
					{services.map((service, index) => (
						<motion.div
							key={service.id}
							initial={{ opacity: 0, y: 40 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 * index }}
						>
							<Link href={`/services#${service.id}`}>
								<div className='group cursor-pointer h-full p-14 lg:p-20 bg-neutral-50/50 hover:bg-neutral-100/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1'>
									{/* Icon */}
									<div className='text-6xl mb-12 opacity-60 group-hover:opacity-100 transition-opacity'>
										{service.icon}
									</div>

									{/* Title */}
									<h3 className='text-3xl lg:text-4xl font-bold text-[var(--foreground)] mb-10 tracking-tight' style={{ lineHeight: '1.3' }}>
										{service.title}
									</h3>

									{/* Description */}
									<p className='text-[var(--color-medium-gray)] mb-12 leading-relaxed text-lg lg:text-xl'>
										{service.shortDescription}
									</p>

									{/* Technologies */}
									<div className='flex flex-wrap gap-4 mb-12'>
										{service.technologies.slice(0, 4).map(tech => (
											<span
												key={tech}
												className='px-5 py-2.5 border border-[var(--foreground)]/10 text-xs font-mono text-[var(--color-medium-gray)] tracking-wider'
											>
												{tech}
											</span>
										))}
									</div>

									{/* Footer */}
									<div className='flex items-center justify-between pt-12 border-t border-[var(--foreground)]/5'>
										<div>
											<span className='text-xs text-[var(--color-medium-gray)] uppercase tracking-wider'>от</span>
											<span className='ml-3 text-2xl font-bold text-[var(--foreground)]'>
												{service.startPrice.toLocaleString('ru-RU')} ₽
											</span>
										</div>
										<span className='text-sm font-semibold text-[var(--foreground)] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2'>
											Подробнее <span>→</span>
										</span>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
