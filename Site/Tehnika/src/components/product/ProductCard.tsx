'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, BarChart2, Eye, Star } from 'lucide-react'
import { Product, useStore } from '@/store/useStore'

interface ProductCardProps {
	product: Product
	index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
	const [isHovered, setIsHovered] = useState(false)
	const cardRef = useRef<HTMLDivElement>(null)
	const {
		addToCart,
		toggleFavorite,
		isFavorite,
		addToComparison,
		setCartOpen,
	} = useStore()

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
	}

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		// Fly to cart animation
		if (cardRef.current) {
			const card = cardRef.current
			const cartIcon = document.querySelector('[data-cart-icon]')
			if (cartIcon) {
				const cardRect = card.getBoundingClientRect()
				const cartRect = cartIcon.getBoundingClientRect()

				const flyX = cartRect.left - cardRect.left
				const flyY = cartRect.top - cardRect.top

				card.style.setProperty('--fly-x', `${flyX}px`)
				card.style.setProperty('--fly-y', `${flyY}px`)
			}
		}

		addToCart(product)
		setCartOpen(true)
	}

	const handleToggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		toggleFavorite(product)
	}

	const handleAddToCompare = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		addToComparison(product)
	}

	return (
		<motion.div
			ref={cardRef}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className='group'
		>
			<Link href={`/product/${product.id}`}>
				<div className='product-card h-full flex flex-col'>
					{/* Image Container */}
					<div className='relative aspect-square overflow-hidden'>
						{/* Badge */}
						{product.badge && (
							<div
								className={`absolute top-4 left-4 z-10 badge badge-${product.badge}`}
							>
								{product.badge === 'sale' && `−${product.discount}%`}
								{product.badge === 'new' && 'Новинка'}
								{product.badge === 'hit' && 'Хит'}
							</div>
						)}

						{/* Quick Actions */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
							className='absolute top-4 right-4 z-10 flex flex-col gap-2'
						>
							<button
								onClick={handleToggleFavorite}
								className={`p-3 rounded-xl backdrop-blur-md transition-all ${
									isFavorite(product.id)
										? 'bg-red-500/20 text-red-400'
										: 'bg-black/30 text-white hover:bg-accent-blue/30 hover:text-accent-blue'
								}`}
							>
								<Heart
									size={18}
									fill={isFavorite(product.id) ? 'currentColor' : 'none'}
								/>
							</button>
							<button
								onClick={handleAddToCompare}
								className='p-3 rounded-xl bg-black/30 backdrop-blur-md text-white hover:bg-accent-blue/30 hover:text-accent-blue transition-all'
							>
								<BarChart2 size={18} />
							</button>
							<Link
								href={`/product/${product.id}`}
								className='p-3 rounded-xl bg-black/30 backdrop-blur-md text-white hover:bg-accent-blue/30 hover:text-accent-blue transition-all'
							>
								<Eye size={18} />
							</Link>
						</motion.div>

						{/* Image */}
						<motion.div
							animate={{ scale: isHovered ? 1.05 : 1 }}
							transition={{ duration: 0.4 }}
							className='relative w-full h-full'
						>
							<Image
								src={product.image}
								alt={product.name}
								fill
								className='object-cover'
								sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
							/>
						</motion.div>

						{/* Gradient Overlay */}
						<div className='absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
					</div>

					{/* Content */}
					<div className='flex flex-col flex-1 p-5'>
						{/* Rating */}
						<div className='flex items-center gap-2 mb-3'>
							<div className='flex items-center gap-1'>
								<Star size={14} className='text-yellow-400 fill-yellow-400' />
								<span className='text-sm font-medium'>{product.rating}</span>
							</div>
							<span className='text-sm text-white/50'>
								({product.reviewsCount} отзывов)
							</span>
						</div>

						{/* Name */}
						<h3 className='font-medium mb-3 line-clamp-2 group-hover:text-accent-blue transition-colors'>
							{product.name}
						</h3>

						{/* Spacer */}
						<div className='flex-1' />

						{/* Price & Actions */}
						<div className='flex items-end justify-between gap-4 mt-4'>
							<div>
								<div className='price-tag text-xl'>
									{formatPrice(product.price)}
								</div>
								{product.oldPrice && (
									<div className='price-old text-sm'>
										{formatPrice(product.oldPrice)}
									</div>
								)}
							</div>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleAddToCart}
								className='p-3 rounded-xl bg-accent-blue hover:bg-accent-blue/80 transition-colors'
							>
								<ShoppingCart size={20} />
							</motion.button>
						</div>

						{/* Stock Status */}
						<div className='mt-3 flex items-center gap-2'>
							<div
								className={`w-2 h-2 rounded-full ${
									product.inStock ? 'bg-green-400' : 'bg-red-400'
								}`}
							/>
							<span
								className={`text-sm ${
									product.inStock ? 'text-green-400' : 'text-red-400'
								}`}
							>
								{product.inStock ? 'В наличии' : 'Нет в наличии'}
							</span>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	)
}
