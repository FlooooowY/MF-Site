'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import ProductCard from '@/components/product/ProductCard'

export default function FavoritesPage() {
	const { favorites } = useStore()

	if (favorites.length === 0) {
		return (
			<div className='min-h-screen pt-32 pb-20'>
				<div className='container mx-auto px-6'>
					<div className='max-w-lg mx-auto text-center py-20'>
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							className='w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8'
						>
							<Heart size={60} className='text-white/30' />
						</motion.div>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className='font-clash text-3xl font-semibold mb-4'
						>
							Список избранного пуст
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className='text-white/60 mb-8'
						>
							Добавляйте понравившиеся товары, чтобы не потерять
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							<Link href='/catalog'>
								<button className='btn-glow flex items-center gap-2 mx-auto'>
									Перейти в каталог
									<ArrowRight size={18} />
								</button>
							</Link>
						</motion.div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen pt-32 pb-20'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-8'
				>
					<h1 className='font-clash text-display-md font-semibold mb-2'>
						Избранное
					</h1>
					<p className='text-white/60'>
						{favorites.length}{' '}
						{favorites.length === 1
							? 'товар'
							: favorites.length < 5
							? 'товара'
							: 'товаров'}
					</p>
				</motion.div>

				{/* Products Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{favorites.map((product, index) => (
						<ProductCard key={product.id} product={product} index={index} />
					))}
				</div>
			</div>
		</div>
	)
}
