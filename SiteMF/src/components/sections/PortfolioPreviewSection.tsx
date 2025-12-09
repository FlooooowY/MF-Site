'use client'

import { useState } from 'react'
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
		<section className='py-24 lg:py-32 bg-white' ref={ref}>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				{/* Header */}
				<div className='flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12'>
					<div>
						<motion.span
							className='inline-block text-xs font-mono tracking-widest text-neutral-500 uppercase mb-4'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
						>
							Портфолио
						</motion.span>
						<motion.h2
							className='text-4xl lg:text-5xl font-bold text-black mb-4'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 }}
						>
							Наши проекты
						</motion.h2>
						<motion.p
							className='text-neutral-600 text-lg max-w-xl'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.2 }}
						>
							Каждый проект — это история успеха. Реальные результаты для реального бизнеса.
						</motion.p>
					</div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.3 }}
						className='mt-6 lg:mt-0'
					>
						<Link href='/portfolio'>
							<Button variant='secondary'>Все проекты →</Button>
						</Link>
					</motion.div>
				</div>

				{/* Projects Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{previewProjects.map((project, index) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 40 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 * index }}
							className='group'
						>
							<div className='bg-white border border-neutral-200 hover:border-neutral-400 transition-all hover:shadow-lg overflow-hidden'>
								{/* Image */}
								<div className='relative h-48 bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden'>
									{/* Category badge */}
									<div className='absolute top-4 left-4 z-10'>
										<span className='px-3 py-1 bg-white/90 text-black text-xs font-medium'>
											{project.categoryLabel}
										</span>
									</div>

									{/* Pattern */}
									<div 
										className='absolute inset-0 opacity-10'
										style={{
											backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
											backgroundSize: '24px 24px',
										}}
									/>

									{/* Hover overlay */}
									<div className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
										<span className='text-white font-medium text-sm'>
											Смотреть проект →
										</span>
									</div>
								</div>

								{/* Content */}
								<div className='p-6'>
									<p className='text-xs font-mono text-neutral-500 mb-2'>
										{project.client}
									</p>
									<h3 className='text-lg font-bold text-black mb-2 group-hover:text-neutral-600 transition-colors'>
										{project.title}
									</h3>
									<p className='text-neutral-600 text-sm mb-4 line-clamp-2'>
										{project.shortDescription}
									</p>

									{/* Results */}
									<div className='flex items-center gap-6 pt-4 border-t border-neutral-100'>
										{project.results.slice(0, 2).map((result, i) => (
											<div key={i}>
												<div className='text-lg font-bold text-black'>
													{result.value}
												</div>
												<div className='text-xs text-neutral-500'>
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
