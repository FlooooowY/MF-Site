'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { portfolioProjects } from '@/data/portfolio'
import { useInView } from '@/hooks/useInView'

export function PortfolioPreviewSection() {
	const [ref, isInView] = useInView<HTMLDivElement>({
		threshold: 0.1,
		triggerOnce: true,
	})

	const previewProjects = portfolioProjects.slice(0, 6)

	return (
		<section 
			className='py-20 bg-[var(--background)] relative' 
			ref={ref}
			style={{ marginTop: '150px', marginBottom: '150px' }}
		>
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
						className='text-5xl lg:text-7xl font-medium text-[var(--foreground)] mb-10 tracking-tight'
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
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className='px-8 py-3 text-sm font-medium rounded-md transition-all duration-200'
								style={{ backgroundColor: '#ffffff', color: '#000000' }}
							>
								Все проекты →
							</motion.button>
						</Link>
					</motion.div>
				</div>

				{/* Projects Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16'>
					{previewProjects.map((project, index) => (
						<Link key={project.id} href={`/portfolio#${project.id}`}>
							<motion.div
								initial={{ opacity: 0, y: 40 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.1 * index }}
								className='group h-full cursor-pointer'
							>
								<div className='h-full flex flex-col bg-white hover:bg-neutral-50 border-2 border-[var(--foreground)]/5 hover:border-[var(--foreground)]/20 rounded-2xl transition-all duration-500 overflow-hidden hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2'>
								{/* Image with gradient and icon */}
								<div className='relative h-64 overflow-hidden bg-gradient-to-br from-neutral-100 via-neutral-50 to-white'>
									{/* Category badge */}
									<div className='absolute top-6 left-1/2 -translate-x-1/2 z-10'>
										<span className='px-5 py-2.5 bg-[var(--foreground)] text-white text-xs font-mono tracking-wider uppercase rounded-full shadow-lg'>
											{project.categoryLabel}
										</span>
									</div>

									{/* Decorative icon */}
									<div className='absolute inset-0 flex items-center justify-center'>
										<div className='text-8xl opacity-10 group-hover:opacity-20 transition-opacity duration-500'>
											{project.category === 'website' && '🌐'}
											{project.category === 'ai' && '🤖'}
											{project.category === 'bot' && '💬'}
											{project.category === 'custom' && '⚙️'}
										</div>
									</div>

									{/* Subtle pattern */}
									<div 
										className='absolute inset-0 opacity-[0.03]'
										style={{
											backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
											backgroundSize: '32px 32px',
										}}
									/>

									{/* Hover overlay */}
									<div className='absolute inset-0 bg-gradient-to-br from-[var(--foreground)]/90 to-[var(--foreground)]/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
										<span className='text-white font-semibold text-sm tracking-wider uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
											Смотреть проект →
										</span>
									</div>
								</div>

								{/* Content */}
								<div className='flex-1 p-10 text-center flex flex-col items-center justify-between' style={{ textAlign: 'center', alignItems: 'center' }}>
									<div className='w-full'>
										<p className='text-xs font-mono text-black/40 group-hover:text-black/60 mb-4 uppercase tracking-wider transition-colors duration-500'>
											{project.client}
										</p>
										<h3 className='text-2xl lg:text-3xl font-bold text-black group-hover:text-black mb-5 tracking-tight transition-colors duration-500' style={{ lineHeight: '1.3' }}>
											{project.title}
										</h3>
										<p className='text-black/60 group-hover:text-black/80 text-base mb-8 leading-relaxed line-clamp-2 transition-colors duration-500'>
											{project.shortDescription}
										</p>
									</div>

									{/* Results */}
									<div className='flex items-center gap-12 pt-8 border-t border-black/10 w-full justify-center'>
										{project.results.slice(0, 2).map((result, i) => (
											<div key={i} className='text-center'>
												<div className='text-2xl font-bold text-black group-hover:text-black mb-1 transition-colors duration-500'>
													{result.value}
												</div>
												<div className='text-xs text-black/40 group-hover:text-black/60 uppercase tracking-wider transition-colors duration-500'>
													{result.metric}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							</motion.div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
