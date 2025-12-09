'use client'

import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PortfolioPreviewSection } from '@/components/sections/PortfolioPreviewSection'
import { AdvantagesSection } from '@/components/sections/AdvantagesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ContactForm } from '@/components/ui/ContactForm'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<HeroSection />
				<ServicesSection />
				<AdvantagesSection />
				<PortfolioPreviewSection />
				<TestimonialsSection />

				{/* CTA Section */}
				<section className='py-24 lg:py-32 bg-white'>
					<div className='max-w-7xl mx-auto px-6 lg:px-8'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start'>
							{/* Left - Content */}
							<div>
								<motion.span
									className='inline-block text-xs font-mono tracking-widest text-neutral-500 uppercase mb-4'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
								>
									Начать проект
								</motion.span>
								<motion.h2
									className='text-4xl lg:text-5xl font-bold text-black mb-6'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.1 }}
								>
									Готовы к результату?
								</motion.h2>
								<motion.p
									className='text-neutral-600 text-lg mb-8'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.2 }}
								>
									Расскажите о вашем проекте — мы подготовим индивидуальное
									предложение с оценкой сроков и стоимости. Ответим в течение 2
									часов.
								</motion.p>

								<motion.div
									className='flex flex-wrap items-center gap-4 mb-12'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 }}
								>
									<Link href='/contacts'>
										<Button variant='primary' size='lg'>
											Обсудить проект →
										</Button>
									</Link>
									<a href='tel:+79001234567'>
										<Button variant='ghost' size='lg'>
											+7 900 123 45 67
										</Button>
									</a>
								</motion.div>

								{/* Stats */}
								<motion.div
									className='flex items-center gap-8 pt-8 border-t border-neutral-200'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.4 }}
								>
									<div>
										<div className='text-2xl font-bold text-black'>150+</div>
										<div className='text-xs text-neutral-500'>проектов</div>
									</div>
									<div>
										<div className='text-2xl font-bold text-black'>95%</div>
										<div className='text-xs text-neutral-500'>довольны</div>
									</div>
									<div>
										<div className='text-2xl font-bold text-black'>2ч</div>
										<div className='text-xs text-neutral-500'>ответ</div>
									</div>
								</motion.div>
							</div>

							{/* Right - Form */}
							<motion.div
								className='bg-neutral-50 p-8 lg:p-10'
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.3 }}
							>
								<h3 className='text-2xl font-bold text-black mb-2'>
									Оставить заявку
								</h3>
								<p className='text-neutral-600 text-sm mb-8'>
									Заполните форму — мы перезвоним для обсуждения деталей
								</p>
								<ContactForm variant='compact' />
							</motion.div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
