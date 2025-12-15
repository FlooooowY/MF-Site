'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { AnimatedHeading } from '@/components/ui/AnimatedText'
import { Card3D } from '@/components/ui/Card3D'
import { services } from '@/data/services'
import { useInView } from '@/hooks/useInView'
import Link from 'next/link'

export default function ServicesPage() {
	return (
		<>
			<Header />
			<main style={{ paddingTop: '120px' }}>
				{/* Hero */}
				<section className='py-16 lg:py-24'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<motion.span
							className='inline-block font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#757575] mb-4'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							УСЛУГИ
						</motion.span>
						<AnimatedHeading tag='h1' className='text-5xl lg:text-7xl mb-6'>
							Что мы делаем
						</AnimatedHeading>
						<motion.p
							className='max-w-2xl text-[#757575] text-lg lg:text-xl'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							Полный цикл цифровой разработки: от идеи до запуска и
							масштабирования. Фокус на результате — каждый проект должен
							приносить деньги.
						</motion.p>
					</div>
				</section>

				{/* Services List */}
				{services.map((service, index) => (
					<ServiceSection key={service.id} service={service} index={index} />
				))}

				{/* Process Section */}
				<section 
					className='py-32 lg:py-48 bg-white'
					style={{ marginTop: '50px', marginBottom: '50px' }}
				>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='text-center mb-16'>
							<AnimatedHeading tag='h2' className='text-4xl lg:text-5xl'>
								Как мы работаем
							</AnimatedHeading>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
							{[
								{
									step: '01',
									title: 'Анализ',
									description:
										'Погружаемся в ваш бизнес, изучаем конкурентов и целевую аудиторию',
								},
								{
									step: '02',
									title: 'Стратегия',
									description:
										'Разрабатываем концепцию и дорожную карту с измеримыми целями',
								},
								{
									step: '03',
									title: 'Реализация',
									description:
										'Создаём продукт итерациями с регулярной демонстрацией прогресса',
								},
								{
									step: '04',
									title: 'Масштабирование',
									description:
										'Анализируем метрики и оптимизируем для максимального ROI',
								},
							].map((phase, i) => (
								<motion.div
									key={phase.step}
									className='relative p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all duration-300'
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
								>
									<div className='flex items-center gap-3 mb-4'>
										<span className='text-2xl font-bold text-gray-300'>
											{phase.step}
										</span>
										<h3 className='text-xl font-bold text-black'>
											{phase.title}
										</h3>
									</div>
									<p className='text-gray-600 text-sm leading-relaxed'>
										{phase.description}
									</p>
								</motion.div>
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
							Не знаете, что выбрать?
						</motion.h2>
						<motion.p
							className='text-lg mb-8 max-w-2xl mx-auto'
							style={{ color: 'rgba(255, 255, 255, 0.7)' }}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
						>
							Расскажите о задаче — мы подберём оптимальное решение и рассчитаем
							стоимость
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
									className='px-8 py-3 text-sm font-medium rounded-md shadow-lg transition-all duration-200'
									style={{ backgroundColor: '#ffffff', color: '#000000' }}
								>
									Получить консультацию →
								</motion.button>
							</Link>
							<Link href='/pricing'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='px-8 py-3 text-sm font-medium rounded-md shadow-lg transition-all duration-200'
									style={{ backgroundColor: '#ffffff', color: '#000000' }}
								>
									Смотреть цены
								</motion.button>
							</Link>
						</motion.div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

interface ServiceSectionProps {
	service: (typeof services)[0]
	index: number
}

function ServiceSection({ service, index }: ServiceSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const [ref, isInView] = useInView<HTMLDivElement>({
		threshold: 0.2,
		triggerOnce: true,
	})

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	})

	const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
	const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])

	const isEven = index % 2 === 0

	return (
		<section
			ref={sectionRef}
			id={service.id}
			className='scroll-mt-32 bg-white'
			style={{ paddingTop: '50px', paddingBottom: '50px' }}
		>
			<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
				<motion.div
					ref={ref}
					className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
						isEven ? '' : 'lg:flex-row-reverse'
					}`}
					style={{ opacity, y }}
				>
					{/* Content */}
					<div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
						<motion.div
							className='flex flex-col items-center mb-6'
							initial={{ opacity: 0, y: -20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6 }}
						>
							<motion.span
								className='text-6xl mb-4'
								whileHover={{ scale: 1.1, rotate: 5 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
								{service.icon}
							</motion.span>
							<span className='font-[family-name:var(--font-mono)] text-xs text-[#757575] tracking-wider'>
								0{index + 1} / 0{services.length}
							</span>
						</motion.div>

						<motion.h2
							className='font-[family-name:var(--font-heading)] text-4xl lg:text-5xl font-bold mb-6'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.1 }}
						>
							{service.title}
						</motion.h2>

						<motion.p
							className='text-[#757575] text-lg leading-relaxed mb-8'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							{service.fullDescription}
						</motion.p>

						{/* Features */}
						<motion.ul
							className='space-y-3 mb-8'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							{service.features.map((feature, i) => (
								<li key={i} className='flex items-start gap-3'>
									<span className='text-black mt-1'>✓</span>
									<span className='text-[#757575]'>{feature}</span>
								</li>
							))}
						</motion.ul>

						{/* Technologies */}
						<motion.div
							className='mb-8'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<span className='font-[family-name:var(--font-mono)] text-xs text-[#757575] block mb-3'>
								ТЕХНОЛОГИИ
							</span>
							<div className='flex flex-wrap gap-2'>
								{service.technologies.map(tech => (
									<span
										key={tech}
										className='px-3 py-1 border border-gray-300 text-black font-[family-name:var(--font-mono)] text-xs rounded'
									>
										{tech}
									</span>
								))}
							</div>
						</motion.div>

						{/* Price & Timeline */}
						<motion.div
							className='flex flex-wrap items-center gap-8 pt-8 border-t border-[#E0E0E0]'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.5 }}
						>
							<div>
								<span className='font-[family-name:var(--font-mono)] text-xs text-[#757575] block'>
									ОТ
								</span>
								<span className='font-[family-name:var(--font-heading)] text-2xl font-bold'>
									{service.startPrice.toLocaleString('ru-RU')} ₽
								</span>
							</div>
							<div>
								<span className='font-[family-name:var(--font-mono)] text-xs text-[#757575] block'>
									СРОКИ
								</span>
								<span className='font-[family-name:var(--font-heading)] text-2xl font-bold'>
									{service.timeline}
								</span>
							</div>
							<Link href='/contacts' className='ml-auto'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className='px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200'
									style={{ backgroundColor: '#ffffff', color: '#000000', border: '2px solid #e5e5e5' }}
								>
									Заказать →
								</motion.button>
							</Link>
						</motion.div>
					</div>

					{/* Visual */}
					<motion.div
						className={`relative h-[400px] lg:h-[600px] ${
							isEven ? 'lg:order-2' : 'lg:order-1'
						}`}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={isInView ? { opacity: 1, scale: 1 } : {}}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						<Card3D className='h-full w-full overflow-hidden' intensity={5}>
							<div className='relative h-full w-full bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100'>
								{/* Animated pattern */}
								<motion.div
									className='absolute inset-0 opacity-5'
									animate={{
										backgroundPosition: ['0% 0%', '100% 100%'],
									}}
									transition={{
										duration: 20,
										repeat: Infinity,
										repeatType: 'reverse',
									}}
									style={{
										backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
										backgroundSize: '20px 20px',
									}}
								/>

								{/* Service icon */}
								<div className='absolute inset-0 flex items-center justify-center'>
									<motion.span
										className='text-8xl lg:text-9xl opacity-20'
										animate={{
											y: [0, -10, 0],
											rotate: [0, 5, 0, -5, 0],
										}}
										transition={{
											duration: 6,
											repeat: Infinity,
											ease: 'easeInOut',
										}}
									>
										{service.icon}
									</motion.span>
								</div>

								{/* Decorative elements */}
								<motion.div
									className='absolute top-1/4 left-1/4 w-32 h-32 border border-black/5 rounded-full'
									animate={{ rotate: 360 }}
									transition={{
										duration: 20,
										repeat: Infinity,
										ease: 'linear',
									}}
								/>
								<motion.div
									className='absolute bottom-1/4 right-1/4 w-48 h-48 border border-black/3 rounded-full'
									animate={{ rotate: -360 }}
									transition={{
										duration: 30,
										repeat: Infinity,
										ease: 'linear',
									}}
								/>
							</div>
						</Card3D>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
