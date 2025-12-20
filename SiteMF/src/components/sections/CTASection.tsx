'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { ContactForm } from '@/components/ui/ContactForm'

export function CTASection() {
	const [ref, isInView] = useInView<HTMLDivElement>({
		threshold: 0.2,
		triggerOnce: true,
	})

	return (
		<section className='py-24 lg:py-32' ref={ref}>
			<div className='max-w-[1440px] mx-auto px-6 lg:px-12'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center'>
					{/* Left side - Content */}
					<div>
						<motion.span
							className='inline-block font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#757575] mb-4'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6 }}
						>
							НАЧАТЬ ПРОЕКТ
						</motion.span>

						<div className='overflow-hidden mb-6'>
							<motion.h2
								className='font-[family-name:var(--font-heading)] text-4xl lg:text-5xl font-bold'
								initial={{ y: '100%' }}
								animate={isInView ? { y: 0 } : {}}
								transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
							>
								Готовы обсудить ваш проект?
							</motion.h2>
						</div>

						<motion.p
							className='text-[#757575] text-lg mb-8 leading-relaxed'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							Оставьте заявку, и мы свяжемся с вами в течение 2 часов.
							Бесплатная консультация и оценка проекта.
						</motion.p>

						{/* Benefits */}
						<motion.div
							className='space-y-4'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							{[
								'Ответ в течение 2 часов',
								'Бесплатная оценка проекта',
								'Фиксированная цена',
								'Гарантия результата',
							].map((benefit, i) => (
								<div key={i} className='flex items-center gap-3'>
									<div className='w-5 h-5 bg-black flex items-center justify-center'>
										<svg
											className='w-3 h-3 text-white'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
									</div>
									<span className='text-sm'>{benefit}</span>
								</div>
							))}
						</motion.div>

						{/* Contact info */}
						<motion.div
							className='mt-12 pt-8 border-t border-[#E0E0E0]'
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<p className='font-[family-name:var(--font-mono)] text-xs text-[#757575] mb-2'>
								Или напишите напрямую:
							</p>
							<div className='flex flex-wrap gap-6'>
								<a
									href='tel:+79282323520'
									className='font-[family-name:var(--font-heading)] text-lg font-bold hover:text-[#757575] transition-colors'
								>
									+7 928 232 35 20
								</a>
								<a
									href='mailto:hello@mf.digital'
									className='font-[family-name:var(--font-heading)] text-lg font-bold hover:text-[#757575] transition-colors'
								>
									hello@mf.digital
								</a>
							</div>
						</motion.div>
					</div>

					{/* Right side - Form */}
					<motion.div
						className='bg-[#FAFAFA] p-8 lg:p-12'
						initial={{ opacity: 0, x: 40 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<ContactForm variant='compact' />
					</motion.div>
				</div>
			</div>
		</section>
	)
}
