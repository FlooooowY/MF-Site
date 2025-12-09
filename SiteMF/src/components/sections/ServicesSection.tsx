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
		<section className='py-24 lg:py-32 bg-neutral-50' ref={ref}>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-16'>
					<motion.span
						className='inline-block text-xs font-mono tracking-widest text-neutral-500 uppercase mb-4'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
					>
						Наши услуги
					</motion.span>
					<motion.h2
						className='text-4xl lg:text-5xl font-bold text-black mb-6'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.1 }}
					>
						Что мы делаем
					</motion.h2>
					<motion.p
						className='max-w-2xl mx-auto text-neutral-600 text-lg'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.2 }}
					>
						Полный цикл цифровой разработки: от идеи до запуска и масштабирования
					</motion.p>
				</div>

				{/* Services Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{services.map((service, index) => (
						<motion.div
							key={service.id}
							initial={{ opacity: 0, y: 40 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 * index }}
						>
							<Link href={`/services#${service.id}`}>
								<div className='bg-white border border-neutral-200 p-8 lg:p-10 h-full group cursor-pointer hover:border-neutral-400 hover:shadow-lg transition-all'>
									{/* Icon */}
									<div className='text-4xl mb-6'>
										{service.icon}
									</div>

									{/* Title */}
									<h3 className='text-2xl font-bold text-black mb-4 group-hover:text-neutral-600 transition-colors'>
										{service.title}
									</h3>

									{/* Description */}
									<p className='text-neutral-600 mb-6 leading-relaxed'>
										{service.shortDescription}
									</p>

									{/* Technologies */}
									<div className='flex flex-wrap gap-2 mb-6'>
										{service.technologies.slice(0, 4).map(tech => (
											<span
												key={tech}
												className='px-3 py-1 bg-neutral-100 text-xs font-mono text-neutral-600'
											>
												{tech}
											</span>
										))}
									</div>

									{/* Footer */}
									<div className='flex items-center justify-between pt-6 border-t border-neutral-200'>
										<div>
											<span className='text-xs text-neutral-500'>от</span>
											<span className='ml-2 text-xl font-bold text-black'>
												{service.startPrice.toLocaleString('ru-RU')} ₽
											</span>
										</div>
										<span className='text-sm font-semibold text-black group-hover:translate-x-1 transition-transform inline-flex items-center gap-1'>
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
