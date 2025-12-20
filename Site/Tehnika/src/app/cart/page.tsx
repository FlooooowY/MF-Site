'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
	Minus,
	Plus,
	Trash2,
	ShoppingBag,
	ArrowRight,
	Truck,
	Shield,
	CreditCard,
	MapPin,
	Check,
} from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function CartPage() {
	const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
		useStore()

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
	}

	const deliveryFee = getCartTotal() >= 5000 ? 0 : 299
	const total = getCartTotal() + deliveryFee

	const progressToFreeDelivery = Math.min(100, (getCartTotal() / 5000) * 100)
	const remainingForFreeDelivery = Math.max(0, 5000 - getCartTotal())

	if (cart.length === 0) {
		return (
			<div className='min-h-screen pt-32 pb-20'>
				<div className='container mx-auto px-6'>
					<div className='max-w-lg mx-auto text-center py-20'>
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							className='w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8'
						>
							<ShoppingBag size={60} className='text-white/30' />
						</motion.div>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className='font-clash text-3xl font-semibold mb-4'
						>
							Корзина пуста
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className='text-white/60 mb-8'
						>
							Добавьте товары из каталога, чтобы оформить заказ
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
							Корзина
						</h1>
						<p className='text-white/60'>
							{cart.length}{' '}
							{cart.length === 1
								? 'товар'
								: cart.length < 5
								? 'товара'
								: 'товаров'}
						</p>
					</div>
					<button
						onClick={clearCart}
						className='flex items-center gap-2 px-4 py-2 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors'
					>
						<Trash2 size={18} />
						Очистить корзину
					</button>
				</motion.div>

				{/* Free Delivery Progress */}
				{remainingForFreeDelivery > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className='mb-8 p-6 rounded-2xl bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 border border-white/10'
					>
						<div className='flex items-center gap-3 mb-3'>
							<Truck className='text-accent-blue' size={20} />
							<span>
								До бесплатной доставки осталось{' '}
								<strong>{formatPrice(remainingForFreeDelivery)}</strong>
							</span>
						</div>
						<div className='progress-bar'>
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: `${progressToFreeDelivery}%` }}
								transition={{ duration: 0.5 }}
								className='progress-bar-fill'
							/>
						</div>
					</motion.div>
				)}

				<div className='grid lg:grid-cols-3 gap-8'>
					{/* Cart Items */}
					<div className='lg:col-span-2 space-y-4'>
						<AnimatePresence mode='popLayout'>
							{cart.map((item, index) => (
								<motion.div
									key={item.product.id}
									layout
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, x: -100 }}
									transition={{ delay: index * 0.05 }}
									className='flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-accent-blue/30 transition-all'
								>
									{/* Image */}
									<Link
										href={`/product/${item.product.id}`}
										className='flex-shrink-0'
									>
										<div className='relative w-32 h-32 rounded-2xl overflow-hidden bg-white/10'>
											<Image
												src={item.product.image}
												alt={item.product.name}
												fill
												className='object-cover'
											/>
										</div>
									</Link>

									{/* Info */}
									<div className='flex-1 min-w-0'>
										<Link href={`/product/${item.product.id}`}>
											<h3 className='font-medium text-lg mb-2 hover:text-accent-blue transition-colors line-clamp-2'>
												{item.product.name}
											</h3>
										</Link>

										{/* Stock */}
										<div className='flex items-center gap-2 mb-4'>
											<div
												className={`w-2 h-2 rounded-full ${
													item.product.inStock ? 'bg-green-400' : 'bg-red-400'
												}`}
											/>
											<span
												className={`text-sm ${
													item.product.inStock
														? 'text-green-400'
														: 'text-red-400'
												}`}
											>
												{item.product.inStock ? 'В наличии' : 'Нет в наличии'}
											</span>
										</div>

										{/* Actions */}
										<div className='flex flex-wrap items-center gap-4'>
											<div className='quantity-selector'>
												<button
													onClick={() =>
														updateQuantity(item.product.id, item.quantity - 1)
													}
													className='quantity-btn'
												>
													<Minus size={16} />
												</button>
												<span className='font-medium w-8 text-center'>
													{item.quantity}
												</span>
												<button
													onClick={() =>
														updateQuantity(item.product.id, item.quantity + 1)
													}
													className='quantity-btn'
												>
													<Plus size={16} />
												</button>
											</div>

											<button
												onClick={() => removeFromCart(item.product.id)}
												className='p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors'
											>
												<Trash2 size={18} />
											</button>
										</div>
									</div>

									{/* Price */}
									<div className='text-right flex-shrink-0'>
										<div className='price-tag text-xl'>
											{formatPrice(item.product.price * item.quantity)}
										</div>
										{item.quantity > 1 && (
											<div className='text-sm text-white/50 mt-1'>
												{formatPrice(item.product.price)} × {item.quantity}
											</div>
										)}
										{item.product.oldPrice && (
											<div className='price-old text-sm mt-1'>
												{formatPrice(item.product.oldPrice * item.quantity)}
											</div>
										)}
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>

					{/* Order Summary */}
					<div className='lg:col-span-1'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className='sticky top-32 p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10'
						>
							<h2 className='text-xl font-semibold mb-6'>Итого</h2>

							{/* Promo Code */}
							<div className='mb-6'>
								<div className='flex gap-2'>
									<input
										type='text'
										placeholder='Промокод'
										className='input-search flex-1 py-3'
									/>
									<button className='btn-neon px-4 py-3 text-sm'>OK</button>
								</div>
							</div>

							{/* Summary */}
							<div className='space-y-4 mb-6'>
								<div className='flex justify-between'>
									<span className='text-white/60'>Товары ({cart.length})</span>
									<span>{formatPrice(getCartTotal())}</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-white/60'>Доставка</span>
									<span className={deliveryFee === 0 ? 'text-green-400' : ''}>
										{deliveryFee === 0 ? 'Бесплатно' : formatPrice(deliveryFee)}
									</span>
								</div>
								{cart.some(item => item.product.oldPrice) && (
									<div className='flex justify-between text-green-400'>
										<span>Скидка</span>
										<span>
											−
											{formatPrice(
												cart.reduce(
													(acc, item) =>
														acc +
														((item.product.oldPrice || item.product.price) -
															item.product.price) *
															item.quantity,
													0
												)
											)}
										</span>
									</div>
								)}
							</div>

							{/* Total */}
							<div className='flex justify-between items-end py-4 border-t border-white/10 mb-6'>
								<span className='text-lg'>К оплате:</span>
								<span className='price-tag text-3xl font-bold'>
									{formatPrice(total)}
								</span>
							</div>

							{/* Checkout Button */}
							<Link href='/checkout'>
								<button className='btn-glow w-full flex items-center justify-center gap-2 py-4 mb-4'>
									Оформить заказ
									<ArrowRight size={18} />
								</button>
							</Link>

							{/* Benefits */}
							<div className='space-y-3 pt-4 border-t border-white/10'>
								<div className='flex items-center gap-3 text-sm text-white/60'>
									<Check size={16} className='text-green-400' />
									Безопасная оплата
								</div>
								<div className='flex items-center gap-3 text-sm text-white/60'>
									<Check size={16} className='text-green-400' />
									Возврат в течение 30 дней
								</div>
								<div className='flex items-center gap-3 text-sm text-white/60'>
									<Check size={16} className='text-green-400' />
									Официальная гарантия
								</div>
							</div>

							{/* Payment Methods */}
							<div className='mt-6 pt-4 border-t border-white/10'>
								<div className='text-sm text-white/50 mb-3'>Мы принимаем:</div>
								<div className='flex gap-2'>
									{['VISA', 'MC', 'MIR', 'SBP'].map(card => (
										<div
											key={card}
											className='px-3 py-1.5 rounded bg-white/10 text-xs font-medium'
										>
											{card}
										</div>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	)
}
