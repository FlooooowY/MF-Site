'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Card3D } from '@/components/ui/Card3D'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { AnimatedHeading } from '@/components/ui/AnimatedText'
import {
	portfolioProjects,
	portfolioCategories,
	PortfolioProject,
} from '@/data/portfolio'
import Link from 'next/link'

export default function PortfolioPage() {
	const [activeCategory, setActiveCategory] = useState('all')
	const [selectedProject, setSelectedProject] =
		useState<PortfolioProject | null>(null)

	const filteredProjects = useMemo(() => {
		if (activeCategory === 'all') return portfolioProjects
		return portfolioProjects.filter(p => p.category === activeCategory)
	}, [activeCategory])

	return (
		<>
			<Header />
			<main className='pt-24 lg:pt-32'>
				{/* Hero */}
				<section className='py-16 lg:py-24'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<motion.span
							className='inline-block font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#757575] mb-4'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							ПОРТФОЛИО
						</motion.span>
						<AnimatedHeading tag='h1' className='text-5xl lg:text-7xl mb-6'>
							Наши проекты
						</AnimatedHeading>
						<motion.p
							className='max-w-2xl text-[#757575] text-lg lg:text-xl'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							Каждый проект — это история успеха. Реальные результаты для
							реального бизнеса. ROI, который можно измерить.
						</motion.p>

						{/* Stats */}
						<motion.div
							className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-[#E0E0E0]'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							{[
								{ value: '150+', label: 'Проектов' },
								{ value: '₽500M+', label: 'Принесли клиентам' },
								{ value: '340%', label: 'Средний ROI' },
								{ value: '95%', label: 'Рекомендуют нас' },
							].map((stat, i) => (
								<div key={stat.label}>
									<div className='font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold mb-1'>
										{stat.value}
									</div>
									<div className='font-[family-name:var(--font-mono)] text-xs text-[#757575] tracking-wider'>
										{stat.label}
									</div>
								</div>
							))}
						</motion.div>
					</div>
				</section>

				{/* Filters */}
				<section className='py-8 border-y border-[#E0E0E0] sticky top-20 lg:top-24 bg-white/95 backdrop-blur-md z-30'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='flex flex-wrap items-center gap-3'>
							{portfolioCategories.map(category => (
								<motion.button
									key={category.id}
									className={`px-4 py-2 font-[family-name:var(--font-heading)] text-sm tracking-wide transition-all duration-300 ${
										activeCategory === category.id
											? 'bg-black text-white'
											: 'bg-transparent text-[#757575] hover:text-black hover:bg-[#F5F5F5]'
									}`}
									onClick={() => setActiveCategory(category.id)}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<span className='mr-2'>{category.icon}</span>
									{category.label}
								</motion.button>
							))}
						</div>
					</div>
				</section>

				{/* Projects Grid */}
				<section className='py-16 lg:py-24'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
							layout
						>
							<AnimatePresence mode='popLayout'>
								{filteredProjects.map((project, index) => (
									<motion.div
										key={project.id}
										layout
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										transition={{ duration: 0.4, delay: index * 0.05 }}
									>
										<Card3D
											className='h-full cursor-pointer overflow-hidden group'
											onClick={() => setSelectedProject(project)}
										>
											{/* Image placeholder */}
											<div className='relative h-56 bg-gradient-to-br from-[#121212] to-[#1a1a1a] overflow-hidden'>
												{/* Animated pattern */}
												<motion.div
													className='absolute inset-0 opacity-20'
													animate={{
														backgroundPosition: ['0% 0%', '100% 100%'],
													}}
													transition={{
														duration: 20,
														repeat: Infinity,
														repeatType: 'reverse',
													}}
													style={{
														backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
														backgroundSize: '20px 20px',
													}}
												/>

												{/* Year badge */}
												<div className='absolute top-4 right-4'>
													<span className='px-2 py-1 bg-white/10 backdrop-blur-sm text-white font-[family-name:var(--font-mono)] text-xs'>
														{project.year}
													</span>
												</div>

												{/* Category badge */}
												<div className='absolute top-4 left-4'>
													<span className='px-3 py-1 bg-white/10 backdrop-blur-sm text-white font-[family-name:var(--font-mono)] text-xs'>
														{project.categoryLabel}
													</span>
												</div>

												{/* Scan line effect */}
												<motion.div
													className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent'
													initial={{ y: '-100%' }}
													whileHover={{
														y: ['0%', '5600%'],
													}}
													transition={{
														duration: 1.5,
														ease: 'linear',
													}}
												/>

												{/* Hover overlay */}
												<motion.div className='absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
													<span className='text-white font-[family-name:var(--font-heading)] text-sm tracking-wider'>
														ПОДРОБНЕЕ
													</span>
												</motion.div>
											</div>

											{/* Content */}
											<div className='p-6'>
												<span className='font-[family-name:var(--font-mono)] text-xs text-[#757575]'>
													{project.client}
												</span>
												<h3 className='font-[family-name:var(--font-heading)] text-xl font-bold mt-2 mb-3 group-hover:text-[#757575] transition-colors'>
													{project.title}
												</h3>
												<p className='text-[#757575] text-sm mb-4 line-clamp-2'>
													{project.shortDescription}
												</p>

												{/* Technologies */}
												<div className='flex flex-wrap gap-1 mb-4'>
													{project.technologies.slice(0, 3).map(tech => (
														<span
															key={tech}
															className='px-2 py-0.5 bg-[#F5F5F5] font-[family-name:var(--font-mono)] text-[10px] text-[#757575]'
														>
															{tech}
														</span>
													))}
													{project.technologies.length > 3 && (
														<span className='px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[#757575]'>
															+{project.technologies.length - 3}
														</span>
													)}
												</div>

												{/* Results preview */}
												<div className='flex items-center gap-4 pt-4 border-t border-[#E0E0E0]'>
													{project.results.slice(0, 2).map((result, i) => (
														<div key={i} className='flex-1'>
															<div className='font-[family-name:var(--font-heading)] text-lg font-bold'>
																{result.value}
															</div>
															<div className='font-[family-name:var(--font-mono)] text-[10px] text-[#757575]'>
																{result.metric}
															</div>
														</div>
													))}
												</div>
											</div>
										</Card3D>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>

						{filteredProjects.length === 0 && (
							<motion.div
								className='text-center py-16'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
							>
								<p className='text-[#757575]'>
									Проектов в этой категории пока нет
								</p>
							</motion.div>
						)}
					</div>
				</section>

				{/* CTA Section */}
				<section className='py-24 lg:py-32 bg-black text-white'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12 text-center'>
						<motion.h2
							className='font-[family-name:var(--font-heading)] text-4xl lg:text-6xl font-bold mb-6'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							Хотите такой же результат?
						</motion.h2>
						<motion.p
							className='text-[#757575] text-lg mb-8 max-w-2xl mx-auto'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
						>
							Расскажите о вашем проекте — мы предложим решение, которое
							принесёт измеримый результат
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
						>
							<Link href='/contacts'>
								<Button
									variant='secondary'
									size='lg'
									className='border-white text-white hover:bg-white hover:text-black'
								>
									Обсудить проект →
								</Button>
							</Link>
						</motion.div>
					</div>
				</section>
			</main>
			<Footer />

			{/* Project Modal */}
			<Modal
				isOpen={!!selectedProject}
				onClose={() => setSelectedProject(null)}
			>
				{selectedProject && (
					<div className='grid grid-cols-1 lg:grid-cols-2'>
						{/* Left side - Image */}
						<div className='relative h-64 lg:h-auto min-h-[400px] bg-gradient-to-br from-[#121212] to-[#1a1a1a]'>
							<div className='absolute inset-0 opacity-20'>
								<div
									className='absolute inset-0'
									style={{
										backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
										backgroundSize: '20px 20px',
									}}
								/>
							</div>
							<div className='absolute bottom-6 left-6 right-6'>
								<span className='px-3 py-1 bg-white/10 backdrop-blur-sm text-white font-[family-name:var(--font-mono)] text-xs'>
									{selectedProject.categoryLabel}
								</span>
								{selectedProject.revenue && (
									<div className='mt-4 p-4 bg-white/10 backdrop-blur-sm'>
										<div className='font-[family-name:var(--font-mono)] text-xs text-white/60 mb-1'>
											Принесли клиенту
										</div>
										<div className='font-[family-name:var(--font-heading)] text-2xl font-bold text-white'>
											₽{(selectedProject.revenue / 1000000).toFixed(1)}M+
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Right side - Content */}
						<div className='p-8 lg:p-12 max-h-[80vh] overflow-y-auto'>
							<span className='font-[family-name:var(--font-mono)] text-xs text-[#757575]'>
								{selectedProject.client} • {selectedProject.year} •{' '}
								{selectedProject.timeline}
							</span>
							<h2 className='font-[family-name:var(--font-heading)] text-3xl font-bold mt-2 mb-4'>
								{selectedProject.title}
							</h2>
							<p className='text-[#757575] mb-6'>
								{selectedProject.fullDescription}
							</p>

							{/* Challenge & Solution */}
							<div className='space-y-6 mb-8'>
								<div className='p-4 bg-[#FAFAFA]'>
									<h4 className='font-[family-name:var(--font-heading)] font-semibold mb-2 flex items-center gap-2'>
										<span className='text-lg'>🎯</span> Задача
									</h4>
									<p className='text-sm text-[#757575]'>
										{selectedProject.challenge}
									</p>
								</div>
								<div className='p-4 bg-[#FAFAFA]'>
									<h4 className='font-[family-name:var(--font-heading)] font-semibold mb-2 flex items-center gap-2'>
										<span className='text-lg'>💡</span> Решение
									</h4>
									<p className='text-sm text-[#757575]'>
										{selectedProject.solution}
									</p>
								</div>
							</div>

							{/* Results */}
							<div className='mb-8'>
								<h4 className='font-[family-name:var(--font-heading)] font-semibold mb-4 flex items-center gap-2'>
									<span className='text-lg'>📊</span> Результаты
								</h4>
								<div className='grid grid-cols-2 gap-4'>
									{selectedProject.results.map((result, i) => (
										<motion.div
											key={i}
											className='p-4 bg-black text-white'
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: i * 0.1 }}
										>
											<div className='font-[family-name:var(--font-heading)] text-2xl font-bold'>
												{result.value}
											</div>
											{result.growth && (
												<div className='font-[family-name:var(--font-mono)] text-xs text-[#00ff00] mb-1'>
													{result.growth}
												</div>
											)}
											<div className='font-[family-name:var(--font-mono)] text-xs text-[#757575]'>
												{result.metric}
											</div>
										</motion.div>
									))}
								</div>
							</div>

							{/* Technologies */}
							<div className='mb-8'>
								<h4 className='font-[family-name:var(--font-heading)] font-semibold mb-3 flex items-center gap-2'>
									<span className='text-lg'>⚙️</span> Технологии
								</h4>
								<div className='flex flex-wrap gap-2'>
									{selectedProject.technologies.map(tech => (
										<motion.span
											key={tech}
											className='px-3 py-1 bg-[#F5F5F5] font-[family-name:var(--font-mono)] text-xs'
											whileHover={{
												scale: 1.05,
												backgroundColor: '#000',
												color: '#fff',
											}}
										>
											{tech}
										</motion.span>
									))}
								</div>
							</div>

							{/* Testimonial */}
							{selectedProject.testimonial && (
								<div className='mb-8 p-6 bg-[#FAFAFA] border-l-4 border-black'>
									<p className='text-base italic mb-4'>
										"{selectedProject.testimonial.text}"
									</p>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold'>
											{selectedProject.testimonial.author[0]}
										</div>
										<div>
											<p className='font-[family-name:var(--font-heading)] font-semibold text-sm'>
												{selectedProject.testimonial.author}
											</p>
											<p className='font-[family-name:var(--font-mono)] text-xs text-[#757575]'>
												{selectedProject.testimonial.position}
											</p>
										</div>
									</div>
								</div>
							)}

							{/* CTA */}
							<div className='flex flex-col sm:flex-row gap-4'>
								<Link href='/contacts' className='flex-1'>
									<Button variant='primary' className='w-full'>
										Хочу так же
									</Button>
								</Link>
								<Button
									variant='secondary'
									onClick={() => setSelectedProject(null)}
								>
									Закрыть
								</Button>
							</div>
						</div>
					</div>
				)}
			</Modal>
		</>
	)
}
