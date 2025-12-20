'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { contactInfo } from '@/lib/data'

export default function Contacts() {
	return (
		<section id='contacts' className='py-24 md:py-32 velvet-bg relative'>
			<div className='container-custom relative z-10'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-center mb-16'
				>
					<h2 className='section-title mb-4'>Контакты</h2>
					<div className='divider-gold w-24 mx-auto mb-6' />
					<p className='section-subtitle max-w-2xl mx-auto'>
						Ждём вас в нашем пространстве. Свяжитесь с нами любым удобным
						способом.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className='space-y-6'>
							{/* Address */}
							<div className='glass-card p-6 flex items-start gap-4'>
								<div className='w-12 h-12 rounded-lg bg-royal-gold/10 flex items-center justify-center flex-shrink-0'>
									<MapPin className='w-6 h-6 text-royal-gold' />
								</div>
								<div>
									<h4 className='font-montserrat font-semibold text-ivory mb-1'>
										Адрес
									</h4>
									<p className='text-smoke'>{contactInfo.address}</p>
									<a
										href='https://maps.google.com'
										target='_blank'
										rel='noopener noreferrer'
										className='text-royal-gold text-sm hover:underline mt-2 inline-block'
									>
										Открыть в картах →
									</a>
								</div>
							</div>

							{/* Phone */}
							<div className='glass-card p-6 flex items-start gap-4'>
								<div className='w-12 h-12 rounded-lg bg-royal-gold/10 flex items-center justify-center flex-shrink-0'>
									<Phone className='w-6 h-6 text-royal-gold' />
								</div>
								<div>
									<h4 className='font-montserrat font-semibold text-ivory mb-1'>
										Телефон
									</h4>
									<a
										href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
										className='text-smoke hover:text-royal-gold transition-colors font-roboto-mono'
									>
										{contactInfo.phone}
									</a>
								</div>
							</div>

							{/* Email */}
							<div className='glass-card p-6 flex items-start gap-4'>
								<div className='w-12 h-12 rounded-lg bg-royal-gold/10 flex items-center justify-center flex-shrink-0'>
									<Mail className='w-6 h-6 text-royal-gold' />
								</div>
								<div>
									<h4 className='font-montserrat font-semibold text-ivory mb-1'>
										Email
									</h4>
									<a
										href={`mailto:${contactInfo.email}`}
										className='text-smoke hover:text-royal-gold transition-colors'
									>
										{contactInfo.email}
									</a>
								</div>
							</div>

							{/* Working Hours */}
							<div className='glass-card p-6 flex items-start gap-4'>
								<div className='w-12 h-12 rounded-lg bg-royal-gold/10 flex items-center justify-center flex-shrink-0'>
									<Clock className='w-6 h-6 text-royal-gold' />
								</div>
								<div>
									<h4 className='font-montserrat font-semibold text-ivory mb-1'>
										Часы работы
									</h4>
									<p className='text-smoke'>
										Ежедневно:{' '}
										<span className='text-ivory font-roboto-mono'>
											{contactInfo.workingHours}
										</span>
									</p>
								</div>
							</div>

							{/* Social Links */}
							<div className='flex gap-4 mt-8'>
								<a
									href={contactInfo.social.telegram}
									target='_blank'
									rel='noopener noreferrer'
									className='w-12 h-12 rounded-lg bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-obsidian transition-all'
								>
									<Send className='w-5 h-5' />
								</a>
								<a
									href={contactInfo.social.instagram}
									target='_blank'
									rel='noopener noreferrer'
									className='w-12 h-12 rounded-lg bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-obsidian transition-all'
								>
									<svg
										className='w-5 h-5'
										viewBox='0 0 24 24'
										fill='currentColor'
									>
										<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
									</svg>
								</a>
								<a
									href={contactInfo.social.vk}
									target='_blank'
									rel='noopener noreferrer'
									className='w-12 h-12 rounded-lg bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-obsidian transition-all'
								>
									<svg
										className='w-5 h-5'
										viewBox='0 0 24 24'
										fill='currentColor'
									>
										<path d='M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.563c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.042-2.763-5.32-2.763-5.784 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.456 2.284 4.617 2.87 4.617.22 0 .322-.102.322-.661v-2.541c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.422c0 .373.17.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.745-.576.745z' />
									</svg>
								</a>
							</div>
						</div>
					</motion.div>

					{/* Map */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='relative'
					>
						<div className='glass-card p-2 h-full min-h-[400px]'>
							{/* Map Placeholder - Replace with actual map integration */}
							<div className='w-full h-full rounded-lg overflow-hidden relative bg-deep-indigo'>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.0970544847847!2d37.60419131593256!3d55.76374998055601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5c7cf4f4f5%3A0x9d5a19a0e0e0e0e0!2z0KLQstC10YDRgdC60LDRjyDRg9C7LiwgMTUsINCc0L7RgdC60LLQsA!5e0!3m2!1sru!2sru!4v1620000000000!5m2!1sru!2sru'
									width='100%'
									height='100%'
									style={{
										border: 0,
										filter: 'invert(90%) hue-rotate(180deg) contrast(0.9)',
									}}
									allowFullScreen
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
									className='absolute inset-0'
								/>
								{/* Map Overlay */}
								<div className='absolute inset-0 pointer-events-none border border-royal-gold/20 rounded-lg' />
							</div>
						</div>

						{/* Floating Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className='absolute -bottom-6 left-6 right-6 glass-card p-4 flex items-center justify-between'
						>
							<div>
								<p className='text-ivory font-semibold'>Ближайшее метро</p>
								<p className='text-smoke text-sm'>Тверская • 3 мин пешком</p>
							</div>
							<div className='w-10 h-10 rounded-full bg-royal-gold/10 flex items-center justify-center'>
								<span className='text-royal-gold font-bold'>М</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className='absolute top-0 left-0 w-64 h-64 bg-royal-gold/5 rounded-full blur-3xl' />
			<div className='absolute bottom-0 right-0 w-96 h-96 bg-deep-indigo/50 rounded-full blur-3xl' />
		</section>
	)
}

