'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Button } from '@/components/ui/Button'
import { AnimatedHeading, AnimatedCounter } from '@/components/ui/AnimatedText'
import { Card3D } from '@/components/ui/Card3D'
import { teamMembers, stats, values } from '@/data/team'
import { useInView } from '@/hooks/useInView'
import Link from 'next/link'

export default function AboutPage() {
	const [statsRef, statsInView] = useInView<HTMLDivElement>({
		threshold: 0.3,
		triggerOnce: true,
	})

	return (
		<>
			<Header />
			<main className='pt-24 lg:pt-32'>
				{/* Hero */}
				<section className='py-16 lg:py-24'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center'>
							<div>
								<motion.span
									className='inline-block font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#757575] mb-4'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6 }}
								>
									О НАС
								</motion.span>
								<AnimatedHeading tag='h1' className='text-5xl lg:text-7xl mb-6'>
									M&F Digital
								</AnimatedHeading>
								<motion.p
									className='text-[#757575] text-lg lg:text-xl leading-relaxed mb-8'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									Мы не просто делаем сайты и ботов. Мы создаём цифровые
									системы, которые приносят деньги. За 8 лет мы помогли 150+
									компаниям заработать более 500 миллионов рублей.
								</motion.p>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
								>
									<Link href='/contacts'>
										<Button variant='primary' size='lg'>
											Обсудить проект →
										</Button>
									</Link>
								</motion.div>
							</div>

							{/* Image placeholder */}
							<motion.div
								className='relative h-[400px] lg:h-[600px] bg-gradient-to-br from-[#121212] to-[#1a1a1a] overflow-hidden'
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8, delay: 0.3 }}
							>
								<div className='absolute inset-0 opacity-20'>
									<div
										className='absolute inset-0'
										style={{
											backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
											backgroundSize: '20px 20px',
										}}
									/>
								</div>
								<div className='absolute inset-0 flex items-center justify-center'>
									<span className='text-white font-[family-name:var(--font-heading)] text-6xl lg:text-8xl font-bold opacity-20'>
										M&F
									</span>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Stats */}
				<section ref={statsRef} className='py-16 lg:py-24 bg-black text-white'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
							{stats.map((stat, i) => (
								<motion.div
									key={stat.label}
									className='text-center'
									initial={{ opacity: 0, y: 20 }}
									animate={statsInView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: i * 0.1 }}
								>
									<div className='font-[family-name:var(--font-heading)] text-4xl lg:text-6xl font-bold mb-2'>
										{stat.value}
									</div>
									<div className='font-[family-name:var(--font-mono)] text-xs text-[#757575] tracking-wider uppercase'>
										{stat.label}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Values */}
				<section className='py-24 lg:py-32'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='text-center mb-16'>
							<motion.span
								className='inline-block font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#757575] mb-4'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
							>
								ФИЛОСОФИЯ
							</motion.span>
							<AnimatedHeading tag='h2' className='text-4xl lg:text-6xl'>
								Наши принципы
							</AnimatedHeading>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{values.map((value, i) => (
								<motion.div
									key={value.title}
									className='p-8 lg:p-12 border border-[#E0E0E0] group hover:border-black transition-colors duration-300'
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
								>
									<span className='font-[family-name:var(--font-mono)] text-xs text-[#757575]'>
										0{i + 1}
									</span>
									<h3 className='font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mt-4 mb-4 group-hover:text-[#757575] transition-colors'>
										{value.title}
									</h3>
									<p className='text-[#757575] leading-relaxed'>
										{value.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Team */}
				<section className='py-24 lg:py-32 bg-[#FAFAFA]'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='text-center mb-16'>
							<motion.span
								className='inline-block font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#757575] mb-4'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
							>
								КОМАНДА
							</motion.span>
							<AnimatedHeading tag='h2' className='text-4xl lg:text-6xl mb-4'>
								Люди, которые делают магию
							</AnimatedHeading>
							<motion.p
								className='text-[#757575] text-lg max-w-2xl mx-auto'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2 }}
							>
								20+ специалистов с опытом работы в Яндексе, VK, Тинькофф и
								международных компаниях
							</motion.p>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
							{teamMembers.map((member, i) => (
								<motion.div
									key={member.id}
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
								>
									<Card3D className='h-full overflow-hidden group'>
										{/* Avatar placeholder */}
										<div className='relative h-64 bg-gradient-to-br from-[#121212] to-[#1a1a1a] overflow-hidden'>
											<div className='absolute inset-0 flex items-center justify-center'>
												<span className='text-white font-[family-name:var(--font-heading)] text-4xl font-bold opacity-50'>
													{member.name
														.split(' ')
														.map(n => n[0])
														.join('')}
												</span>
											</div>

											{/* Hover overlay with social links */}
											<motion.div className='absolute inset-0 bg-black/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
												{member.social?.telegram && (
													<a
														href={`https://t.me/${member.social.telegram.replace(
															'@',
															''
														)}`}
														target='_blank'
														rel='noopener noreferrer'
														className='text-white hover:text-[#C0C0C0] transition-colors'
													>
														📱
													</a>
												)}
												{member.social?.linkedin && (
													<a
														href={`https://linkedin.com/in/${member.social.linkedin}`}
														target='_blank'
														rel='noopener noreferrer'
														className='text-white hover:text-[#C0C0C0] transition-colors'
													>
														💼
													</a>
												)}
												{member.social?.github && (
													<a
														href={`https://github.com/${member.social.github}`}
														target='_blank'
														rel='noopener noreferrer'
														className='text-white hover:text-[#C0C0C0] transition-colors'
													>
														💻
													</a>
												)}
											</motion.div>
										</div>

										{/* Content */}
										<div className='p-6'>
											<h3 className='font-[family-name:var(--font-heading)] text-lg font-bold'>
												{member.name}
											</h3>
											<p className='font-[family-name:var(--font-mono)] text-xs text-[#757575] mb-3'>
												{member.position}
											</p>
											<p className='text-[#757575] text-sm mb-4 line-clamp-2'>
												{member.bio}
											</p>
											<div className='flex flex-wrap gap-1'>
												{member.skills.slice(0, 3).map(skill => (
													<span
														key={skill}
														className='px-2 py-0.5 bg-[#F5F5F5] font-[family-name:var(--font-mono)] text-[10px] text-[#757575]'
													>
														{skill}
													</span>
												))}
											</div>
										</div>
									</Card3D>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Process */}
				<section className='py-24 lg:py-32'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
						<div className='text-center mb-16'>
							<motion.span
								className='inline-block font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#757575] mb-4'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
							>
								ПРОЦЕСС
							</motion.span>
							<AnimatedHeading tag='h2' className='text-4xl lg:text-6xl'>
								Как мы работаем
							</AnimatedHeading>
						</div>

						<div className='relative'>
							{/* Timeline line */}
							<div className='absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-[#E0E0E0] transform lg:-translate-x-1/2' />

							{[
								{
									step: '01',
									title: 'Погружение',
									description:
										'Изучаем ваш бизнес, анализируем конкурентов, определяем цели и метрики успеха',
									duration: '2-5 дней',
								},
								{
									step: '02',
									title: 'Стратегия',
									description:
										'Разрабатываем концепцию, прототипы, формируем ТЗ и дорожную карту проекта',
									duration: '5-10 дней',
								},
								{
									step: '03',
									title: 'Дизайн',
									description:
										'Создаём уникальный визуальный язык, UI-kit, адаптивные макеты',
									duration: '7-14 дней',
								},
								{
									step: '04',
									title: 'Разработка',
									description:
										'Пишем чистый код, интегрируем системы, настраиваем аналитику',
									duration: '2-8 недель',
								},
								{
									step: '05',
									title: 'Тестирование',
									description:
										'Проверяем на всех устройствах, оптимизируем скорость, исправляем баги',
									duration: '3-7 дней',
								},
								{
									step: '06',
									title: 'Запуск',
									description:
										'Развёртываем на продакшн, настраиваем мониторинг, передаём документацию',
									duration: '1-3 дня',
								},
							].map((phase, i) => (
								<motion.div
									key={phase.step}
									className={`relative flex items-center gap-8 mb-12 ${
										i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
									}`}
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
								>
									{/* Step number */}
									<div className='absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-[family-name:var(--font-mono)] text-xs z-10'>
										{phase.step}
									</div>

									{/* Content */}
									<div
										className={`ml-16 lg:ml-0 lg:w-1/2 ${
											i % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
										}`}
									>
										<div
											className={`p-6 border border-[#E0E0E0] bg-white ${
												i % 2 === 0 ? '' : ''
											}`}
										>
											<h3 className='font-[family-name:var(--font-heading)] text-xl font-bold mb-2'>
												{phase.title}
											</h3>
											<p className='text-[#757575] text-sm mb-3'>
												{phase.description}
											</p>
											<span className='font-[family-name:var(--font-mono)] text-xs text-[#C0C0C0]'>
												{phase.duration}
											</span>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className='py-24 lg:py-32 bg-black text-white'>
					<div className='max-w-[1440px] mx-auto px-6 lg:px-12 text-center'>
						<motion.h2
							className='font-[family-name:var(--font-heading)] text-4xl lg:text-6xl font-bold mb-6'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							Готовы к результату?
						</motion.h2>
						<motion.p
							className='text-[#757575] text-lg mb-8 max-w-2xl mx-auto'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
						>
							Расскажите о вашем проекте — мы ответим в течение 2 часов
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
									Связаться с нами →
								</Button>
							</Link>
						</motion.div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
