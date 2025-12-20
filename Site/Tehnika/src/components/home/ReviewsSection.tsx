'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { reviews } from '@/data/products'

export default function ReviewsSection() {
	return (
		<section className='py-20 relative overflow-hidden'>
			{/* Background Pattern */}
			<div className='absolute inset-0 opacity-5'>
				<div
					className='absolute inset-0'
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				/>
			</div>

			<div className='container mx-auto px-6 relative'>
				{/* Header */}
				<div className='text-center mb-12'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='flex items-center justify-center gap-3 mb-4'
					>
						<Quote className='text-accent-blue' size={24} />
						<span className='text-accent-blue font-medium'>
							Отзывы покупателей
						</span>
					</motion.div>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='font-clash text-display-sm font-semibold mb-4'
					>
						Что говорят наши клиенты
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className='text-white/60 max-w-2xl mx-auto'
					>
						Более 100 000 довольных клиентов доверяют нам свои покупки
					</motion.p>
				</div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='flex flex-wrap justify-center gap-8 mb-16'
				>
					<div className='text-center'>
						<div className='flex items-center justify-center gap-1 mb-2'>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={24}
									className='text-yellow-400 fill-yellow-400'
								/>
							))}
						</div>
						<div className='text-4xl font-bold font-clash mb-1'>4.9</div>
						<div className='text-white/50'>Средний рейтинг</div>
					</div>
					<div className='w-px bg-white/10' />
					<div className='text-center'>
						<div className='text-4xl font-bold font-clash mb-1 text-accent-blue'>
							100K+
						</div>
						<div className='text-white/50'>Отзывов</div>
					</div>
					<div className='w-px bg-white/10' />
					<div className='text-center'>
						<div className='text-4xl font-bold font-clash mb-1 text-green-400'>
							98%
						</div>
						<div className='text-white/50'>Рекомендуют</div>
					</div>
				</motion.div>

				{/* Reviews Grid */}
				<div className='grid md:grid-cols-3 gap-6'>
					{reviews.map((review, index) => (
						<motion.div
							key={review.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className='relative p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-accent-blue/30 transition-all group'
						>
							{/* Quote Icon */}
							<div className='absolute top-6 right-6 text-accent-blue/20'>
								<Quote size={40} />
							</div>

							{/* Rating */}
							<div className='flex gap-1 mb-4'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={16}
										className={
											i < review.rating
												? 'text-yellow-400 fill-yellow-400'
												: 'text-white/20'
										}
									/>
								))}
							</div>

							{/* Text */}
							<p className='text-white/80 mb-6 line-clamp-4'>
								&ldquo;{review.text}&rdquo;
							</p>

							{/* Author */}
							<div className='flex items-center gap-4'>
								<div className='relative w-12 h-12 rounded-full overflow-hidden'>
									<Image
										src={review.avatar}
										alt={review.author}
										fill
										className='object-cover'
									/>
								</div>
								<div>
									<div className='font-medium'>{review.author}</div>
									<div className='text-sm text-white/50'>{review.product}</div>
								</div>
							</div>

							{/* Date */}
							<div className='mt-4 pt-4 border-t border-white/10 text-sm text-white/40'>
								{review.date}
							</div>
						</motion.div>
					))}
				</div>

				{/* View All */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mt-12'
				>
					<button className='btn-neon px-8 py-4'>Все отзывы</button>
				</motion.div>
			</div>
		</section>
	)
}
