'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'

export default function Cart() {
	const {
		items,
		isCartOpen,
		closeCart,
		removeItem,
		updateQuantity,
		getTotalPrice,
		openCheckout,
		clearCart,
	} = useCartStore()

	const totalPrice = getTotalPrice()

	return (
		<AnimatePresence>
			{isCartOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={closeCart}
						className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
					/>

					{/* Cart Panel */}
					<motion.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'spring', damping: 25, stiffness: 200 }}
						className='fixed right-0 top-0 bottom-0 w-full max-w-md bg-coffee-dark border-l border-gold-primary/20 z-50 flex flex-col'
					>
						{/* Header */}
						<div className='flex items-center justify-between p-6 border-b border-cream/10'>
							<div className='flex items-center gap-3'>
								<ShoppingBag className='w-6 h-6 text-gold-primary' />
								<h2 className='font-playfair text-xl font-bold text-cream'>
									Корзина
								</h2>
								<span className='px-2 py-0.5 bg-gold-primary/20 text-gold-primary text-sm rounded-full'>
									{items.length}
								</span>
							</div>
							<button
								onClick={closeCart}
								className='p-2 text-cream/60 hover:text-cream transition-colors'
							>
								<X className='w-6 h-6' />
							</button>
						</div>

						{/* Cart Items */}
						<div className='flex-1 overflow-y-auto p-6'>
							{items.length === 0 ? (
								<div className='h-full flex flex-col items-center justify-center text-center'>
									<div className='w-24 h-24 bg-cream/5 rounded-full flex items-center justify-center mb-4'>
										<ShoppingBag className='w-10 h-10 text-cream/30' />
									</div>
									<h3 className='font-playfair text-lg text-cream mb-2'>
										Корзина пуста
									</h3>
									<p className='text-cream/50 text-sm mb-6'>
										Добавьте что-нибудь вкусное из нашего меню
									</p>
									<button
										onClick={closeCart}
										className='px-6 py-3 bg-gold-primary/20 text-gold-primary rounded-full hover:bg-gold-primary/30 transition-colors'
									>
										Перейти в меню
									</button>
								</div>
							) : (
								<div className='space-y-4'>
									{items.map(item => (
										<motion.div
											key={`${item.id}-${item.size}`}
											layout
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, x: -100 }}
											className='flex gap-4 p-4 bg-coffee-medium/30 rounded-xl border border-cream/5'
										>
											{/* Image */}
											<div className='relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0'>
												<Image
													src={item.image}
													alt={item.name}
													fill
													className='object-cover'
												/>
												<div className='absolute bottom-1 right-1 px-1.5 py-0.5 bg-coffee-dark/80 text-gold-primary text-xs font-semibold rounded'>
													{item.size}
												</div>
											</div>

											{/* Info */}
											<div className='flex-1 min-w-0'>
												<h4 className='font-semibold text-cream truncate'>
													{item.name}
												</h4>
												<p className='text-cream/50 text-sm truncate'>
													{item.description}
												</p>

												{/* Quantity controls */}
												<div className='flex items-center justify-between mt-3'>
													<div className='flex items-center gap-2'>
														<button
															onClick={() =>
																updateQuantity(
																	item.id,
																	item.size,
																	item.quantity - 1
																)
															}
															className='w-8 h-8 flex items-center justify-center bg-cream/10 rounded-lg text-cream hover:bg-cream/20 transition-colors'
														>
															<Minus className='w-4 h-4' />
														</button>
														<span className='w-8 text-center text-cream font-medium'>
															{item.quantity}
														</span>
														<button
															onClick={() =>
																updateQuantity(
																	item.id,
																	item.size,
																	item.quantity + 1
																)
															}
															className='w-8 h-8 flex items-center justify-center bg-cream/10 rounded-lg text-cream hover:bg-cream/20 transition-colors'
														>
															<Plus className='w-4 h-4' />
														</button>
													</div>

													<div className='flex items-center gap-3'>
														<span className='font-fraunces text-lg text-gold-primary'>
															₽{item.price * item.quantity}
														</span>
														<button
															onClick={() => removeItem(item.id, item.size)}
															className='p-1.5 text-cream/40 hover:text-terracotta transition-colors'
														>
															<Trash2 className='w-4 h-4' />
														</button>
													</div>
												</div>
											</div>
										</motion.div>
									))}

									{/* Clear cart */}
									<button
										onClick={clearCart}
										className='w-full py-3 text-cream/50 hover:text-terracotta text-sm transition-colors flex items-center justify-center gap-2'
									>
										<Trash2 className='w-4 h-4' />
										Очистить корзину
									</button>
								</div>
							)}
						</div>

						{/* Footer */}
						{items.length > 0 && (
							<div className='p-6 border-t border-cream/10 space-y-4'>
								{/* Total */}
								<div className='flex items-center justify-between'>
									<span className='text-cream/70'>Итого:</span>
									<span className='font-fraunces text-2xl text-gold-primary'>
										₽{totalPrice}
									</span>
								</div>

								{/* Checkout button */}
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={openCheckout}
									className='w-full btn-shine relative py-4 bg-terracotta text-cream font-semibold rounded-full shadow-button overflow-hidden flex items-center justify-center gap-2'
								>
									<span>Оформить заказ</span>
									<ArrowRight className='w-5 h-5' />
								</motion.button>

								<p className='text-center text-cream/40 text-xs'>
									Минимальный заказ от ₽300
								</p>
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
