'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { categories } from '@/data/products'

export default function CategoriesSection() {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	}

	return (
		<section className='py-20 relative overflow-hidden'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<div className='text-center mb-12'>
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='inline-block px-4 py-2 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-medium mb-4'
					>
						Каталог товаров
					</motion.span>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='font-clash text-display-sm font-semibold mb-4'
					>
						Выберите категорию
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className='text-white/60 max-w-2xl mx-auto'
					>
						Более 50 000 товаров в 10 категориях. Найдите именно то, что вам
						нужно.
					</motion.p>
				</div>

				{/* Categories Grid */}
				<motion.div
					variants={container}
					initial='hidden'
					whileInView='show'
					viewport={{ once: true }}
					className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'
				>
					{categories.map(category => (
						<motion.div key={category.id} variants={item}>
							<Link href={`/catalog/${category.id}`}>
								<div className='group relative p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-accent-blue/50 transition-all duration-300 overflow-hidden'>
									{/* Background Glow */}
									<div className='absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-purple/0 group-hover:from-accent-blue/10 group-hover:to-accent-purple/10 transition-all duration-300' />

									{/* Icon */}
									<div className='relative'>
										<div className='category-icon mx-auto mb-4'>
											<span className='text-4xl group-hover:scale-110 transition-transform inline-block'>
												{category.icon}
											</span>
										</div>

										{/* Name */}
										<h3 className='text-center font-medium mb-2 group-hover:text-accent-blue transition-colors'>
											{category.name}
										</h3>

										{/* Count */}
										<p className='text-center text-sm text-white/50'>
											{category.count} товаров
										</p>
									</div>

									{/* Hover Arrow */}
									<div className='absolute bottom-4 right-4 w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0'>
										<svg
											className='w-4 h-4 text-accent-blue'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 5l7 7-7 7'
											/>
										</svg>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
