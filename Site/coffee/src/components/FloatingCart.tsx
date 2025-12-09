'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function FloatingCart() {
	const { getTotalItems, getTotalPrice, openCart } = useCartStore()
	const totalItems = getTotalItems()
	const totalPrice = getTotalPrice()

	return (
		<AnimatePresence>
			{totalItems > 0 && (
				<motion.button
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={openCart}
					className='fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-24 md:w-auto z-40 bg-terracotta text-cream rounded-full shadow-lg flex items-center justify-between md:justify-center gap-4 px-6 py-4'
				>
					<div className='flex items-center gap-3'>
						<div className='relative'>
							<ShoppingBag className='w-6 h-6' />
							<span className='absolute -top-2 -right-2 w-5 h-5 bg-gold-primary text-coffee-dark text-xs font-bold rounded-full flex items-center justify-center'>
								{totalItems}
							</span>
						</div>
						<span className='font-semibold'>Корзина</span>
					</div>

					<div className='flex items-center gap-2'>
						<span className='font-fraunces text-lg'>₽{totalPrice}</span>
						<motion.div
							animate={{ x: [0, 5, 0] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							→
						</motion.div>
					</div>
				</motion.button>
			)}
		</AnimatePresence>
	)
}
