'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
	Heart,
	ShoppingCart,
	BarChart2,
	Share2,
	Star,
	Check,
	Truck,
	Shield,
	RotateCcw,
	Minus,
	Plus,
	ChevronLeft,
	ChevronRight,
	Play,
	Maximize2,
} from 'lucide-react'
import { products } from '@/data/products'
import { useStore } from '@/store/useStore'
import ProductCard from '@/components/product/ProductCard'

export default function ProductPage() {
	const params = useParams()
	const product = products.find(p => p.id === params.id)
	const [selectedImage, setSelectedImage] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [activeTab, setActiveTab] = useState('specs')
	const [rotation, setRotation] = useState(0)
	const [isRotating, setIsRotating] = useState(false)

	const {
		addToCart,
		toggleFavorite,
		isFavorite,
		addToComparison,
		addToRecentlyViewed,
		setCartOpen,
	} = useStore()

	useEffect(() => {
		if (product) {
			addToRecentlyViewed(product)
		}
	}, [product, addToRecentlyViewed])

	// 360 rotation effect
	useEffect(() => {
		let interval: NodeJS.Timeout
		if (isRotating) {
			interval = setInterval(() => {
				setRotation(prev => (prev + 1) % 360)
			}, 30)
		}
		return () => clearInterval(interval)
	}, [isRotating])

	if (!product) {
		return (
			<div className='min-h-screen pt-32 pb-20 flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-semibold mb-4'>Товар не найден</h1>
					<Link href='/catalog' className='btn-glow'>
						Вернуться в каталог
					</Link>
				</div>
			</div>
		)
	}

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
	}

	const images = product.images || [product.image]
	const relatedProducts = products
		.filter(p => p.category === product.category && p.id !== product.id)
		.slice(0, 4)

	const handleAddToCart = () => {
		for (let i = 0; i < quantity; i++) {
			addToCart(product)
		}
		setCartOpen(true)
	}

	return (
		<div className='min-h-screen pt-32 pb-20'>
			<div className='container mx-auto px-6'>
				{/* Breadcrumbs */}
				<motion.nav
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='flex items-center gap-2 text-sm text-white/60 mb-8'
				>
					<Link href='/' className='hover:text-accent-blue transition-colors'>
						Главная
					</Link>
					<span>/</span>
					<Link
						href='/catalog'
						className='hover:text-accent-blue transition-colors'
					>
						Каталог
					</Link>
					<span>/</span>
					<span className='text-white'>{product.name}</span>
				</motion.nav>

				{/* Product Section */}
				<div className='grid lg:grid-cols-2 gap-12 mb-20'>
					{/* Images */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className='space-y-4'
					>
						{/* Main Image */}
						<div className='relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10'>
							{/* Badge */}
							{product.badge && (
								<div
									className={`absolute top-6 left-6 z-10 badge badge-${product.badge}`}
								>
									{product.badge === 'sale' && `−${product.discount}%`}
									{product.badge === 'new' && 'Новинка'}
									{product.badge === 'hit' && 'Хит'}
								</div>
							)}

							{/* Image with 360 rotation */}
							<motion.div
								className='relative w-full h-full'
								style={{ transform: `rotateY(${rotation}deg)` }}
							>
								<Image
									src={images[selectedImage]}
									alt={product.name}
									fill
									className='object-contain p-8'
									priority
								/>
							</motion.div>

							{/* Controls */}
							<div className='absolute bottom-6 right-6 flex gap-2'>
								<button
									onClick={() => setIsRotating(!isRotating)}
									className={`p-3 rounded-xl backdrop-blur-md transition-all ${
										isRotating
											? 'bg-accent-blue text-white'
											: 'bg-black/30 hover:bg-accent-blue/30'
									}`}
								>
									<RotateCcw size={20} />
								</button>
								<button className='p-3 rounded-xl bg-black/30 backdrop-blur-md hover:bg-accent-blue/30 transition-all'>
									<Maximize2 size={20} />
								</button>
								<button className='p-3 rounded-xl bg-black/30 backdrop-blur-md hover:bg-accent-blue/30 transition-all'>
									<Play size={20} />
								</button>
							</div>

							{/* Navigation Arrows */}
							{images.length > 1 && (
								<>
									<button
										onClick={() =>
											setSelectedImage(
												prev => (prev - 1 + images.length) % images.length
											)
										}
										className='absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-black/30 backdrop-blur-md hover:bg-accent-blue/30 transition-all'
									>
										<ChevronLeft size={20} />
									</button>
									<button
										onClick={() =>
											setSelectedImage(prev => (prev + 1) % images.length)
										}
										className='absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-black/30 backdrop-blur-md hover:bg-accent-blue/30 transition-all'
									>
										<ChevronRight size={20} />
									</button>
								</>
							)}
						</div>

						{/* Thumbnails */}
						{images.length > 1 && (
							<div className='flex gap-3'>
								{images.map((image, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
											selectedImage === index
												? 'border-accent-blue shadow-glow'
												: 'border-white/10 hover:border-white/30'
										}`}
									>
										<Image src={image} alt='' fill className='object-cover' />
									</button>
								))}
							</div>
						)}
					</motion.div>

					{/* Info */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						className='space-y-6'
					>
						{/* Rating */}
						<div className='flex items-center gap-4'>
							<div className='flex items-center gap-2'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={18}
										className={
											i < Math.round(product.rating)
												? 'text-yellow-400 fill-yellow-400'
												: 'text-white/20'
										}
									/>
								))}
								<span className='font-medium ml-1'>{product.rating}</span>
							</div>
							<span className='text-white/50'>
								({product.reviewsCount} отзывов)
							</span>
						</div>

						{/* Name */}
						<h1 className='font-clash text-display-sm font-semibold'>
							{product.name}
						</h1>

						{/* Price */}
						<div className='flex items-end gap-4'>
							<div className='price-tag text-4xl font-bold'>
								{formatPrice(product.price)}
							</div>
							{product.oldPrice && (
								<div className='price-old text-xl mb-1'>
									{formatPrice(product.oldPrice)}
								</div>
							)}
							{product.discount && (
								<div className='badge badge-sale'>−{product.discount}%</div>
							)}
						</div>

						{/* Stock Status */}
						<div className='flex items-center gap-3'>
							<div
								className={`w-3 h-3 rounded-full ${
									product.inStock ? 'bg-green-400' : 'bg-red-400'
								}`}
							/>
							<span
								className={product.inStock ? 'text-green-400' : 'text-red-400'}
							>
								{product.inStock ? 'В наличии' : 'Нет в наличии'}
							</span>
						</div>

						{/* Quick Info */}
						{product.description && (
							<p className='text-white/70 leading-relaxed'>
								{product.description}
							</p>
						)}

						{/* Quantity & Add to Cart */}
						<div className='flex flex-wrap gap-4'>
							<div className='quantity-selector'>
								<button
									onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
									className='quantity-btn'
								>
									<Minus size={18} />
								</button>
								<span className='font-medium w-12 text-center text-lg'>
									{quantity}
								</span>
								<button
									onClick={() => setQuantity(prev => prev + 1)}
									className='quantity-btn'
								>
									<Plus size={18} />
								</button>
							</div>

							<button
								onClick={handleAddToCart}
								disabled={!product.inStock}
								className='btn-glow flex-1 flex items-center justify-center gap-3 py-4 disabled:opacity-50 disabled:cursor-not-allowed'
							>
								<ShoppingCart size={20} />В корзину
							</button>
						</div>

						{/* Buy Now */}
						<button className='btn-neon w-full py-4'>Купить в 1 клик</button>

						{/* Actions */}
						<div className='flex gap-4'>
							<button
								onClick={() => toggleFavorite(product)}
								className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
									isFavorite(product.id)
										? 'bg-red-500/20 text-red-400 border border-red-400/30'
										: 'bg-white/5 hover:bg-white/10 border border-white/10'
								}`}
							>
								<Heart
									size={20}
									fill={isFavorite(product.id) ? 'currentColor' : 'none'}
								/>
								<span className='hidden sm:inline'>В избранное</span>
							</button>
							<button
								onClick={() => addToComparison(product)}
								className='flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all'
							>
								<BarChart2 size={20} />
								<span className='hidden sm:inline'>Сравнить</span>
							</button>
							<button className='flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all'>
								<Share2 size={20} />
								<span className='hidden sm:inline'>Поделиться</span>
							</button>
						</div>

						{/* Benefits */}
						<div className='grid grid-cols-2 gap-4 pt-6 border-t border-white/10'>
							<div className='flex items-center gap-3'>
								<div className='p-3 rounded-xl bg-accent-blue/20'>
									<Truck className='text-accent-blue' size={20} />
								</div>
								<div>
									<div className='font-medium'>Бесплатная доставка</div>
									<div className='text-sm text-white/50'>
										При заказе от 5000 ₽
									</div>
								</div>
							</div>
							<div className='flex items-center gap-3'>
								<div className='p-3 rounded-xl bg-accent-purple/20'>
									<Shield className='text-accent-purple' size={20} />
								</div>
								<div>
									<div className='font-medium'>Гарантия</div>
									<div className='text-sm text-white/50'>Официальная 1 год</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Tabs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-20'
				>
					{/* Tab Buttons */}
					<div className='flex gap-2 mb-8 overflow-x-auto pb-2'>
						{[
							{ id: 'specs', label: 'Характеристики' },
							{ id: 'description', label: 'Описание' },
							{ id: 'reviews', label: `Отзывы (${product.reviewsCount})` },
						].map(tab => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`tab-button whitespace-nowrap ${
									activeTab === tab.id ? 'active' : ''
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>

					{/* Tab Content */}
					<AnimatePresence mode='wait'>
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className='p-8 rounded-3xl bg-white/5 border border-white/10'
						>
							{activeTab === 'specs' && product.specs && (
								<div className='grid md:grid-cols-2 gap-6'>
									{Object.entries(product.specs).map(([key, value]) => (
										<div
											key={key}
											className='flex justify-between py-3 border-b border-white/10'
										>
											<span className='text-white/60'>{key}</span>
											<span className='font-medium'>{value}</span>
										</div>
									))}
								</div>
							)}

							{activeTab === 'description' && (
								<div className='prose prose-invert max-w-none'>
									<p className='text-white/80 leading-relaxed'>
										{product.description}
									</p>
									<p className='text-white/80 leading-relaxed mt-4'>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation
										ullamco laboris nisi ut aliquip ex ea commodo consequat.
									</p>
								</div>
							)}

							{activeTab === 'reviews' && (
								<div className='space-y-6'>
									<div className='flex items-center gap-6 pb-6 border-b border-white/10'>
										<div className='text-center'>
											<div className='text-5xl font-bold font-clash text-accent-blue'>
												{product.rating}
											</div>
											<div className='flex items-center gap-1 mt-2'>
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														size={16}
														className={
															i < Math.round(product.rating)
																? 'text-yellow-400 fill-yellow-400'
																: 'text-white/20'
														}
													/>
												))}
											</div>
											<div className='text-sm text-white/50 mt-1'>
												{product.reviewsCount} отзывов
											</div>
										</div>
										<div className='flex-1'>
											{[5, 4, 3, 2, 1].map(stars => (
												<div
													key={stars}
													className='flex items-center gap-3 mb-2'
												>
													<span className='text-sm w-12'>{stars} ★</span>
													<div className='flex-1 h-2 bg-white/10 rounded-full overflow-hidden'>
														<div
															className='h-full bg-yellow-400 rounded-full'
															style={{
																width: `${
																	stars === 5 ? 70 : stars === 4 ? 20 : 10
																}%`,
															}}
														/>
													</div>
												</div>
											))}
										</div>
									</div>

									<button className='btn-neon'>Написать отзыв</button>
								</div>
							)}
						</motion.div>
					</AnimatePresence>
				</motion.div>

				{/* Related Products */}
				{relatedProducts.length > 0 && (
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<h2 className='font-clash text-2xl font-semibold mb-8'>
							Похожие товары
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
							{relatedProducts.map((product, index) => (
								<ProductCard key={product.id} product={product} index={index} />
							))}
						</div>
					</motion.section>
				)}
			</div>
		</div>
	)
}
