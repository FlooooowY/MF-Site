'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import ProductCard from '../product/ProductCard'
import { products, categories } from '@/data/products'

export default function PopularProductsSection() {
	const [activeCategory, setActiveCategory] = useState('all')

	const filteredProducts =
		activeCategory === 'all'
			? products
			: products.filter(p => p.category === activeCategory)

	const displayCategories = [
		{ id: 'all', name: 'Все товары' },
		...categories.slice(0, 5),
	]

	return (
		<section className='py-20 relative overflow-hidden'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<div className='flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12'>
					<div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='flex items-center gap-3 mb-4'
						>
							<div className='p-2 rounded-xl bg-accent-blue/20'>
								<TrendingUp className='text-accent-blue' size={24} />
							</div>
							<span className='text-accent-blue font-medium'>Популярное</span>
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className='font-clash text-display-sm font-semibold'
						>
							Хиты продаж
						</motion.h2>
					</div>

					{/* Category Tabs */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'
					>
						{displayCategories.map(category => (
							<button
								key={category.id}
								onClick={() => setActiveCategory(category.id)}
								className={`tab-button whitespace-nowrap ${
									activeCategory === category.id ? 'active' : ''
								}`}
							>
								{category.name}
							</button>
						))}
					</motion.div>
				</div>

				{/* Products Grid */}
				<motion.div
					layout
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
				>
					{filteredProducts.slice(0, 8).map((product, index) => (
						<ProductCard key={product.id} product={product} index={index} />
					))}
				</motion.div>

				{/* View All */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mt-12'
				>
					<button className='btn-glow px-8 py-4'>Смотреть все товары</button>
				</motion.div>
			</div>
		</section>
	)
}
