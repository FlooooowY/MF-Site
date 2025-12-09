'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
	X,
	ShoppingCart,
	Star,
	BarChart2,
	ArrowRight,
	Check,
	Minus,
} from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function ComparePage() {
	const {
		comparison,
		removeFromComparison,
		clearComparison,
		addToCart,
		setCartOpen,
	} = useStore()

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
	}

	// Collect all unique spec keys from all products
	const allSpecKeys = [
		...new Set(comparison.flatMap(product => Object.keys(product.specs || {}))),
	]

	const handleAddToCart = (product: (typeof comparison)[0]) => {
		addToCart(product)
		setCartOpen(true)
	}

	if (comparison.length === 0) {
		return (
			<div className='min-h-screen pt-32 pb-20'>
				<div className='container mx-auto px-6'>
					<div className='max-w-lg mx-auto text-center py-20'>
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							className='w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8'
						>
							<BarChart2 size={60} className='text-white/30' />
						</motion.div>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className='font-clash text-3xl font-semibold mb-4'
						>
							Список сравнения пуст
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className='text-white/60 mb-8'
						>
							Добавьте товары для сравнения из каталога
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
					className='flex flex-wrap items-center justify-between gap-4 mb-8'
				>
					<div>
						<h1 className='font-clash text-display-md font-semibold mb-2'>
							Сравнение товаров
						</h1>
						<p className='text-white/60'>{comparison.length} из 4 товаров</p>
					</div>
					<button
						onClick={clearComparison}
						className='flex items-center gap-2 px-4 py-2 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors'
					>
						<X size={18} />
						Очистить список
					</button>
				</motion.div>

				{/* Comparison Table */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className='overflow-x-auto'
				>
					<div className='min-w-[800px]'>
						{/* Products Row */}
						<div
							className='grid gap-4 mb-6'
							style={{
								gridTemplateColumns: `repeat(${comparison.length}, 1fr)`,
							}}
						>
							<AnimatePresence mode='popLayout'>
								{comparison.map((product, index) => (
									<motion.div
										key={product.id}
										layout
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										transition={{ delay: index * 0.1 }}
										className='relative p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10'
									>
										{/* Remove Button */}
										<button
											onClick={() => removeFromComparison(product.id)}
											className='absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-red-400/20 hover:text-red-400 transition-colors'
										>
											<X size={16} />
										</button>

										{/* Image */}
										<Link href={`/product/${product.id}`}>
											<div className='relative aspect-square rounded-2xl overflow-hidden bg-white/10 mb-4'>
												<Image
													src={product.image}
													alt={product.name}
													fill
													className='object-cover'
												/>
											</div>
										</Link>

										{/* Name */}
										<Link href={`/product/${product.id}`}>
											<h3 className='font-medium text-lg mb-2 hover:text-accent-blue transition-colors line-clamp-2'>
												{product.name}
											</h3>
										</Link>

										{/* Rating */}
										<div className='flex items-center gap-2 mb-4'>
											<Star
												size={16}
												className='text-yellow-400 fill-yellow-400'
											/>
											<span className='font-medium'>{product.rating}</span>
											<span className='text-white/50 text-sm'>
												({product.reviewsCount})
											</span>
										</div>

										{/* Price */}
										<div className='mb-4'>
											<div className='price-tag text-xl'>
												{formatPrice(product.price)}
											</div>
											{product.oldPrice && (
												<div className='price-old text-sm'>
													{formatPrice(product.oldPrice)}
												</div>
											)}
										</div>

										{/* Add to Cart */}
										<button
											onClick={() => handleAddToCart(product)}
											className='btn-glow w-full flex items-center justify-center gap-2 py-3'
										>
											<ShoppingCart size={18} />В корзину
										</button>
									</motion.div>
								))}
							</AnimatePresence>
						</div>

						{/* Specs Table */}
						<div className='rounded-3xl bg-white/5 border border-white/10 overflow-hidden'>
							{/* General Info */}
							<div className='p-4 bg-accent-blue/10 border-b border-white/10'>
								<h3 className='font-semibold'>Основные характеристики</h3>
							</div>

							{allSpecKeys.map((specKey, index) => (
								<div
									key={specKey}
									className={`grid gap-4 p-4 ${
										index % 2 === 0 ? 'bg-white/[0.02]' : ''
									} border-b border-white/5`}
									style={{
										gridTemplateColumns: `200px repeat(${comparison.length}, 1fr)`,
									}}
								>
									<div className='text-white/60 font-medium'>{specKey}</div>
									{comparison.map(product => {
										const value = product.specs?.[specKey]
										// Check if this product has the best value (simplified logic)
										const values = comparison
											.map(p => p.specs?.[specKey])
											.filter(Boolean)
										const isBest = values.length > 1 && value === values[0]

										return (
											<div
												key={product.id}
												className={`flex items-center gap-2 ${
													isBest ? 'text-green-400' : ''
												}`}
											>
												{value || <Minus size={16} className='text-white/30' />}
												{isBest && <Check size={16} />}
											</div>
										)
									})}
								</div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Add More */}
				{comparison.length < 4 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className='mt-8 text-center'
					>
						<Link href='/catalog'>
							<button className='btn-neon'>
								Добавить товары для сравнения
							</button>
						</Link>
					</motion.div>
				)}
			</div>
		</div>
	)
}
