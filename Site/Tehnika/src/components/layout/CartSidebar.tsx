'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useStore } from '@/store/useStore'

interface CartSidebarProps {
	isOpen: boolean
	onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
	const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
		useStore()

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50'
				>
					{/* Backdrop */}
					<div
						className='absolute inset-0 bg-black/60 backdrop-blur-sm'
						onClick={onClose}
					/>

					{/* Sidebar */}
					<motion.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'tween', duration: 0.3 }}
						className='absolute right-0 top-0 bottom-0 w-full max-w-md bg-primary-dark border-l border-white/10 flex flex-col'
					>
						{/* Header */}
						<div className='flex items-center justify-between p-6 border-b border-white/10'>
							<div className='flex items-center gap-3'>
								<ShoppingBag className='text-accent-blue' size={24} />
								<h2 className='text-xl font-semibold'>Корзина</h2>
								<span className='text-white/50'>({cart.length})</span>
							</div>
							<button
								onClick={onClose}
								className='p-2 hover:bg-white/10 rounded-lg transition-colors'
							>
								<X size={24} />
							</button>
						</div>

						{/* Cart Items */}
						<div className='flex-1 overflow-y-auto p-6 space-y-4'>
							{cart.length === 0 ? (
								<div className='flex flex-col items-center justify-center h-full text-center'>
									<div className='w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4'>
										<ShoppingBag size={40} className='text-white/30' />
									</div>
									<h3 className='text-lg font-medium mb-2'>Корзина пуста</h3>
									<p className='text-white/50 mb-6'>
										Добавьте товары, чтобы оформить заказ
									</p>
									<button onClick={onClose} className='btn-glow'>
										Перейти к покупкам
									</button>
								</div>
							) : (
								<>
									{cart.map(item => (
										<motion.div
											key={item.product.id}
											layout
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, x: 100 }}
											className='flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10'
										>
											{/* Image */}
											<div className='relative w-20 h-20 rounded-xl overflow-hidden bg-white/10 flex-shrink-0'>
												<Image
													src={item.product.image}
													alt={item.product.name}
													fill
													className='object-cover'
												/>
											</div>

											{/* Info */}
											<div className='flex-1 min-w-0'>
												<h3 className='font-medium text-sm line-clamp-2 mb-2'>
													{item.product.name}
												</h3>
												<div className='flex items-center justify-between'>
													<div className='quantity-selector scale-90 origin-left'>
														<button
															onClick={() =>
																updateQuantity(
																	item.product.id,
																	item.quantity - 1
																)
															}
															className='quantity-btn'
														>
															<Minus size={14} />
														</button>
														<span className='font-medium w-8 text-center'>
															{item.quantity}
														</span>
														<button
															onClick={() =>
																updateQuantity(
																	item.product.id,
																	item.quantity + 1
																)
															}
															className='quantity-btn'
														>
															<Plus size={14} />
														</button>
													</div>
													<button
														onClick={() => removeFromCart(item.product.id)}
														className='p-2 hover:bg-red-500/20 rounded-lg transition-colors text-white/50 hover:text-red-400'
													>
														<Trash2 size={16} />
													</button>
												</div>
												<div className='mt-2'>
													<span className='price-tag text-lg'>
														{formatPrice(item.product.price * item.quantity)}
													</span>
												</div>
											</div>
										</motion.div>
									))}

									{/* Clear Cart */}
									<button
										onClick={clearCart}
										className='flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition-colors'
									>
										<Trash2 size={14} />
										Очистить корзину
									</button>
								</>
							)}
						</div>

						{/* Footer */}
						{cart.length > 0 && (
							<div className='p-6 border-t border-white/10 space-y-4'>
								{/* Promo Code */}
								<div className='flex gap-2'>
									<input
										type='text'
										placeholder='Промокод'
										className='input-search flex-1 py-3'
									/>
									<button className='btn-neon px-4 py-3 text-sm'>
										Применить
									</button>
								</div>

								{/* Total */}
								<div className='flex items-center justify-between py-4 border-t border-white/10'>
									<span className='text-lg'>Итого:</span>
									<span className='price-tag text-2xl'>
										{formatPrice(getCartTotal())}
									</span>
								</div>

								{/* Checkout */}
								<Link href='/checkout' onClick={onClose}>
									<button className='btn-glow w-full flex items-center justify-center gap-2 py-4'>
										Оформить заказ
										<ArrowRight size={18} />
									</button>
								</Link>

								<Link
									href='/cart'
									onClick={onClose}
									className='block text-center text-sm text-accent-blue hover:underline'
								>
									Перейти в корзину
								</Link>
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
