'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Clock } from 'lucide-react'
import ProductCard from '../product/ProductCard'
import { products } from '@/data/products'

export default function DealsSection() {
	const [timeLeft, setTimeLeft] = useState({
		hours: 23,
		minutes: 59,
		seconds: 59,
	})

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(prev => {
				if (prev.seconds > 0) {
					return { ...prev, seconds: prev.seconds - 1 }
				} else if (prev.minutes > 0) {
					return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
				} else if (prev.hours > 0) {
					return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
				}
				return { hours: 23, minutes: 59, seconds: 59 }
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	const saleProducts = products.filter(p => p.badge === 'sale' || p.discount)

	return (
		<section className='py-20 relative overflow-hidden'>
			{/* Background */}
			<div className='absolute inset-0 bg-gradient-to-b from-accent-purple/10 via-transparent to-transparent' />

			<div className='container mx-auto px-6 relative'>
				{/* Header */}
				<div className='flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12'>
					<div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='flex items-center gap-3 mb-4'
						>
							<div className='p-2 rounded-xl bg-accent-purple/20'>
								<Zap className='text-accent-purple' size={24} />
							</div>
							<span className='text-accent-purple font-medium'>
								Горячие скидки
							</span>
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className='font-clash text-display-sm font-semibold mb-4'
						>
							Акции и спецпредложения
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className='text-white/60 max-w-lg'
						>
							Успейте купить по сниженным ценам. Предложение ограничено!
						</motion.p>
					</div>

					{/* Timer */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className='flex items-center gap-4'
					>
						<div className='flex items-center gap-2 text-white/60 mr-4'>
							<Clock size={20} />
							<span>До конца акции:</span>
						</div>
						<div className='flex gap-3'>
							<div className='timer-digit'>
								<span>{String(timeLeft.hours).padStart(2, '0')}</span>
							</div>
							<span className='text-2xl text-accent-purple font-bold self-center'>
								:
							</span>
							<div className='timer-digit'>
								<span>{String(timeLeft.minutes).padStart(2, '0')}</span>
							</div>
							<span className='text-2xl text-accent-purple font-bold self-center'>
								:
							</span>
							<div className='timer-digit'>
								<span>{String(timeLeft.seconds).padStart(2, '0')}</span>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Products Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{saleProducts.slice(0, 4).map((product, index) => (
						<ProductCard key={product.id} product={product} index={index} />
					))}
				</div>

				{/* View All */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mt-12'
				>
					<button className='btn-neon px-8 py-4'>Все акции</button>
				</motion.div>
			</div>
		</section>
	)
}
