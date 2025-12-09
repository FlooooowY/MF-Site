'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { portfolioProjects } from '@/data/portfolio'
import { useInView } from '@/hooks/useInView'

export function PortfolioPreviewSection() {
	const [ref, isInView] = useInView<HTMLDivElement>({
		threshold: 0.1,
		triggerOnce: true,
	})

	const previewProjects = portfolioProjects.slice(0, 6)

	return (
		<section className='py-40 lg:py-48 bg-[var(--background)] relative' ref={ref}>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-32 lg:mb-40'>
					<motion.span
						className='inline-block text-xs font-mono tracking-[0.3em] text-[var(--color-medium-gray)] uppercase mb-8'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
					>
						Портфолио
					</motion.span>
					<motion.h2
						className='text-5xl lg:text-7xl font-bold text-[var(--foreground)] mb-10 tracking-tight'
						style={{ lineHeight: '1.2' }}
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.1 }}
					>
						Наши проекты
					</motion.h2>
					<motion.p
						className='max-w-2xl mx-auto text-[var(--color-medium-gray)] text-xl leading-relaxed mb-12'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.2 }}
					>
						Каждый проект — это история успеха. Реальные результаты для реального бизнеса.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.3 }}
					>
						<Link href='/portfolio'>
							<Button variant='secondary' size='lg'>Все проекты →</Button>
						</Link>
					</motion.div>
				</div>

				{/* Projects Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16'>
					{previewProjects.map((project, index) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 40 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 * index }}
							className='group'
						>
							<div className='bg-neutral-50/50 hover:bg-neutral-100/50 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1'>
								{/* Image */}
								<div className='relative h-64 bg-[var(--foreground)]/5 overflow-hidden'>
									{/* Category badge */}
									<div className='absolute top-6 left-6 z-10'>
										<span className='px-4 py-2 bg-[var(--foreground)] text-[var(--background)] text-xs font-mono tracking-wider uppercase'>
											{project.categoryLabel}
										</span>
									</div>

									{/* Pattern */}
									<div 
										className='absolute inset-0 opacity-[0.03]'
										style={{
											backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
											backgroundSize: '32px 32px',
										}}
									/>

									{/* Hover overlay */}
									<div className='absolute inset-0 bg-[var(--foreground)]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<span className='text-[var(--background)] font-medium text-sm tracking-wider uppercase'>
											Смотреть проект →
										</span>
									</div>
								</div>

								{/* Content */}
								<div className='p-12'>
									<p className='text-xs font-mono text-[var(--color-medium-gray)] mb-5 uppercase tracking-wider'>
										{project.client}
									</p>
									<h3 className='text-2xl lg:text-3xl font-bold text-[var(--foreground)] mb-6 tracking-tight' style={{ lineHeight: '1.3' }}>
										{project.title}
									</h3>
									<p className='text-[var(--color-medium-gray)] text-base lg:text-lg mb-10 leading-relaxed line-clamp-2'>
										{project.shortDescription}
									</p>

									{/* Results */}
									<div className='flex items-center gap-10 pt-10 border-t border-[var(--foreground)]/5'>
										{project.results.slice(0, 2).map((result, i) => (
											<div key={i}>
												<div className='text-xl font-bold text-[var(--foreground)]'>
													{result.value}
												</div>
												<div className='text-xs text-[var(--color-medium-gray)] uppercase tracking-wider'>
													{result.metric}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
