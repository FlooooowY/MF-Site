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
		<section 
			className='py-20 bg-[var(--background)] relative' 
			ref={ref}
			style={{ marginTop: '150px', marginBottom: '150px' }}
		>
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
								<div className='group cursor-pointer h-full p-12 lg:p-16 bg-white hover:bg-neutral-50 border-2 border-[var(--foreground)]/5 hover:border-[var(--foreground)]/20 rounded-3xl transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2 text-center flex flex-col items-center relative overflow-hidden' style={{ textAlign: 'center', alignItems: 'center' }}>
									{/* Gradient overlay on hover */}
									<div className='absolute inset-0 bg-gradient-to-br from-[var(--foreground)]/0 via-[var(--foreground)]/0 to-[var(--foreground)]/0 group-hover:from-[var(--foreground)]/[0.02] group-hover:to-transparent transition-all duration-500 pointer-events-none' />
									
									{/* Icon */}
									<div className='relative text-6xl mb-10 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500'>
										{service.icon}
									</div>

									{/* Title */}
									<h3 className='relative text-3xl lg:text-4xl font-bold text-black mb-8 tracking-tight transition-colors duration-500' style={{ lineHeight: '1.3' }}>
										{service.title}
									</h3>

									{/* Description */}
									<p className='relative text-black/60 group-hover:text-black/80 mb-12 leading-relaxed text-base lg:text-lg max-w-md transition-colors duration-500'>
										{service.shortDescription}
									</p>

									{/* Footer */}
									<div className='relative flex flex-col items-center gap-5 pt-10 border-t border-black/10 w-full mt-auto'>
										<div className='flex items-baseline gap-2'>
											<span className='text-xs text-black/40 group-hover:text-black/60 uppercase tracking-wider transition-colors duration-500'>от</span>
											<span className='text-3xl font-bold text-black transition-colors duration-500'>
												{service.startPrice.toLocaleString('ru-RU')} ₽
											</span>
										</div>
										<span className='text-sm font-semibold text-black group-hover:gap-3 transition-all duration-500 inline-flex items-center gap-2'>
											Подробнее <span className='group-hover:translate-x-1 transition-transform'>→</span>
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
