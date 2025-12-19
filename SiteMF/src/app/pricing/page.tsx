'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { AnimatedHeading } from '@/components/ui/AnimatedText'
import { Card3D } from '@/components/ui/Card3D'
import { pricingData, PricingCategory, PricingTier } from '@/data/pricing'
import Link from 'next/link'

export default function PricingPage() {
	const [activeCategory, setActiveCategory] = useState(pricingData[0].id)
	const [hoveredTier, setHoveredTier] = useState<string | null>(null)

	const currentCategory = pricingData.find(c => c.id === activeCategory)

	return (
		<>
			<Header />
			<main style={{ paddingTop: '120px' }}>
				{/* Hero */}
				<section className='py-16 lg:py-24'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12 text-center'>
						<motion.span
							className='inline-block font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#757575] mb-4'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							ТАРИФЫ
						</motion.span>
						<AnimatedHeading tag='h1' className='text-5xl lg:text-7xl mb-6'>
							Прозрачные цены
						</AnimatedHeading>
						<motion.p
							className='max-w-2xl mx-auto text-[#757575] text-lg lg:text-xl'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							Никаких скрытых платежей. Фиксированная стоимость или почасовая
							оплата — выбирайте, что удобнее.
						</motion.p>
					</div>
				</section>

				{/* Category Tabs */}
				<section className='py-8 lg:py-12 sticky top-20 lg:top-24 bg-white/95 backdrop-blur-md z-30' style={{ marginTop: '30px' }}>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='flex flex-wrap items-center justify-center gap-6 lg:gap-8'>
							{pricingData.map(category => (
								<motion.button
									key={category.id}
									className={`px-8 py-4 lg:px-10 lg:py-5 font-[family-name:var(--font-heading)] text-lg lg:text-xl font-medium transition-all duration-300 flex items-center gap-3 ${
										activeCategory === category.id
											? 'text-black'
											: 'text-gray-400 hover:text-gray-600'
									}`}
									onClick={() => setActiveCategory(category.id)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.98 }}
								>
									<span className='text-2xl lg:text-3xl'>{category.icon}</span>
									<span className='relative'>
										{category.title}
										{activeCategory === category.id && (
											<motion.div
												className='absolute -bottom-2 left-0 right-0 h-0.5 bg-black'
												layoutId='activeCategory'
												initial={false}
												transition={{ type: 'spring', stiffness: 500, damping: 30 }}
											/>
										)}
									</span>
								</motion.button>
							))}
						</div>
					</div>
				</section>

				{/* Pricing Cards */}
				<section className='py-16 lg:py-24' style={{ paddingTop: '80px' }}>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<AnimatePresence mode='wait'>
							{currentCategory && (
								<motion.div
									key={currentCategory.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.4 }}
								>
									{/* Category description */}
									<div className='text-center mb-12'>
										<h2 className='font-[family-name:var(--font-heading)] text-3xl font-bold mb-2'>
											{currentCategory.title}
										</h2>
										<p className='text-[#757575]'>
											{currentCategory.description}
										</p>
									</div>

									{/* Tiers Grid */}
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
										{currentCategory.tiers.map((tier, index) => (
											<motion.div
												key={tier.id}
												initial={{ opacity: 0, y: 40 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.4, delay: index * 0.1 }}
												onMouseEnter={() => setHoveredTier(tier.id)}
												onMouseLeave={() => setHoveredTier(null)}
											>
												<Card3D
													className={`h-full p-8 relative overflow-hidden ${
														tier.popular
															? 'border-2 border-black'
															: 'border border-[#E0E0E0]'
													}`}
													intensity={6}
												>
													{/* Popular badge */}
													{tier.popular && (
														<div className='absolute top-0 right-0 z-10'>
															<div className='bg-black text-white px-4 py-1 font-[family-name:var(--font-mono)] text-xs'>
																ПОПУЛЯРНЫЙ
															</div>
														</div>
													)}

													{/* Header */}
													<div className='mb-6' style={{ paddingTop: '24px' }}>
														<h3 className='font-[family-name:var(--font-heading)] text-2xl font-bold mb-2'>
															{tier.name}
														</h3>
														<p className='text-[#757575] text-sm'>
															{tier.description}
														</p>
													</div>

													{/* Price */}
													<div className='mb-8'>
														<div className='font-[family-name:var(--font-heading)] text-4xl font-bold'>
															{tier.priceLabel}
														</div>
													</div>

													{/* Features */}
													<ul className='space-y-3 mb-8'>
														{tier.features.map((feature, i) => (
															<motion.li
																key={i}
																className='flex items-start gap-3 text-sm'
																initial={{ opacity: 0, x: -10 }}
																animate={{ opacity: 1, x: 0 }}
																transition={{ delay: 0.3 + i * 0.05 }}
															>
																<span
																	className={`mt-0.5 ${
																		feature.included
																			? 'text-black'
																			: 'text-[#E0E0E0]'
																	}`}
																>
																	{feature.included ? '✓' : '—'}
																</span>
																<span
																	className={
																		feature.included
																			? 'text-black'
																			: 'text-[#C0C0C0]'
																	}
																>
																	{feature.text}
																</span>
															</motion.li>
														))}
													</ul>

													{/* CTA */}
													<Link href='/contacts'>
														<motion.button
															whileHover={{ scale: 1.02 }}
															whileTap={{ scale: 0.98 }}
															className='w-full px-8 py-3 text-sm font-medium rounded-md shadow-lg transition-all duration-200'
															style={{ backgroundColor: '#ffffff', color: '#000000', border: '2px solid #e5e5e5' }}
														>
															{tier.cta} →
														</motion.button>
													</Link>

													{/* Hover glow effect */}
													<motion.div
														className='absolute inset-0 pointer-events-none'
														initial={{ opacity: 0 }}
														animate={{
															opacity: hoveredTier === tier.id ? 0.05 : 0,
														}}
														style={{
															background:
																'radial-gradient(circle at center, #000 0%, transparent 70%)',
														}}
													/>
												</Card3D>
											</motion.div>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</section>

				{/* Additional Info */}
				<section className='py-16 lg:py-24 bg-white' style={{ marginTop: '50px' }}>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
							{[
								{
									icon: '💰',
									title: 'Гибкая оплата',
									description:
										'Разбиваем оплату на этапы: предоплата 30%, остальное — по готовности',
								},
								{
									icon: '📋',
									title: 'Детальная смета',
									description:
										'Вы всегда знаете, за что платите. Прозрачная декомпозиция работ',
								},
								{
									icon: '🔒',
									title: 'Фиксированная цена',
									description:
										'После согласования ТЗ цена не меняется. Даже если мы ошиблись в оценке',
								},
							].map((item, i) => (
								<motion.div
									key={item.title}
									className='text-center p-8'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
								>
									<motion.span
										className='text-4xl block mb-4'
										whileHover={{ scale: 1.2, rotate: 10 }}
									>
										{item.icon}
									</motion.span>
									<h3 className='font-[family-name:var(--font-heading)] text-xl font-bold mb-2'>
										{item.title}
									</h3>
									<p className='text-[#757575] text-sm'>{item.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section className='py-16 lg:py-24' style={{ marginTop: '50px' }}>
					<div className='max-w-3xl mx-auto px-6 lg:px-12'>
						<div className='text-center mb-12'>
							<AnimatedHeading tag='h2' className='text-3xl lg:text-4xl mb-4'>
								Частые вопросы
							</AnimatedHeading>
						</div>

						<div className='space-y-4'>
							{[
								{
									q: 'Что входит в стоимость?',
									a: 'Дизайн, разработка, тестирование, развёртывание и документация. Хостинг на первый год включён в стоимость.',
								},
								{
									q: 'Есть ли скрытые платежи?',
									a: 'Нет. Все работы фиксируются в договоре. Дополнительная оплата только за новый функционал, которого не было в ТЗ.',
								},
								{
									q: 'Можно ли в рассрочку?',
									a: 'Да. Стандартная схема: 30% предоплата, 30% после дизайна, 40% после сдачи. Для крупных проектов — индивидуальный график.',
								},
								{
									q: 'Что если проект не понравится?',
									a: 'На этапе дизайна — до 3 раундов правок бесплатно. После согласования макетов работаем строго по ТЗ.',
								},
								{
									q: 'Сколько длится разработка?',
									a: 'Лендинг — 2-4 недели. Корпоративный сайт — 4-8 недель. Сложные проекты — от 12 недель. Сроки фиксируем в договоре.',
								},
							].map((faq, i) => (
								<motion.details
									key={i}
									className='group border border-[#E0E0E0] p-6 cursor-pointer'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
								>
									<summary className='font-[family-name:var(--font-heading)] font-semibold text-lg flex items-center justify-between list-none'>
										{faq.q}
										<motion.span className='text-[#757575] group-open:rotate-45 transition-transform'>
											+
										</motion.span>
									</summary>
									<p className='mt-4 text-[#757575] leading-relaxed'>{faq.a}</p>
								</motion.details>
							))}
						</div>
					</div>
				</section>

				{/* CTA */}
				<section 
					className='py-32 lg:py-48'
					style={{ backgroundColor: '#000000', marginTop: '50px', paddingTop: '80px', paddingBottom: '80px' }}
				>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12 text-center'>
						<motion.h2
							className='font-[family-name:var(--font-heading)] text-4xl lg:text-6xl font-bold mb-6'
							style={{ color: '#ffffff' }}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							Нужна индивидуальная оценка?
						</motion.h2>
						<motion.p
							className='text-lg mb-8 max-w-2xl mx-auto'
							style={{ color: 'rgba(255, 255, 255, 0.7)' }}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
						>
							Расскажите о проекте — подготовим детальную смету за 24 часа
						</motion.p>
						<motion.div
							className='flex flex-col sm:flex-row items-center justify-center gap-4'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
						>
							<Link href='/contacts'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='px-10 py-4 text-sm font-medium rounded-md shadow-lg transition-all duration-200'
									style={{ backgroundColor: '#ffffff', color: '#000000' }}
								>
									Получить смету →
								</motion.button>
							</Link>
							<a href='tel:+79282323520'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='px-10 py-4 text-sm font-medium rounded-md shadow-lg transition-all duration-200'
									style={{ backgroundColor: '#ffffff', color: '#000000' }}
								>
									+7 928 232 35 20
								</motion.button>
							</a>
						</motion.div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
