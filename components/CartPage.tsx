'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiPlus, FiMinus, FiTrash2, FiArrowRight } from 'react-icons/fi'
import { useStore } from '@/lib/store'

export default function CartPage() {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart, clearCart } = useStore()


  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-20 bg-background-light/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <FiShoppingCart className="w-24 h-24 text-text-secondary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-primary mb-4">Корзина пуста</h2>
            <p className="text-lg text-text-secondary mb-8">
              Добавьте товары из каталога, чтобы продолжить покупки
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/catalog')}
              className="px-8 py-4 gradient-button text-white rounded-button font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Перейти в каталог
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-background-light animated-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Корзина</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background-card rounded-card shadow-card p-6 flex gap-6"
              >
                <div
                  className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/products/${item.id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-primary mb-2 hover:text-accent transition-colors cursor-pointer"
                    onClick={() => router.push(`/products/${item.id}`)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border-2 border-primary rounded-button flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border-2 border-primary rounded-button flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Очистить корзину
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background-card rounded-card shadow-card p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-6">Заявка</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-text-primary">
                  <span>Товаров:</span>
                  <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
                </div>
                <div className="p-4 bg-accent/10 rounded-card border border-accent/20">
                  <p className="text-sm text-text-primary">
                    После оформления заявки наш менеджер свяжется с вами для уточнения деталей и расчета стоимости.
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/checkout')}
                className="w-full py-4 gradient-button text-white rounded-button font-semibold hover:shadow-lg transition-all duration-300 ripple-effect flex items-center justify-center gap-2"
              >
                Оформить заявку
                <FiArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

