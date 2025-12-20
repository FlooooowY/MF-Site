'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiSend, FiCheck } from 'react-icons/fi'
import { useStore } from '@/lib/store'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useStore()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    comment: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          items: cart,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        clearCart()
        setTimeout(() => {
          router.push('/catalog')
        }, 3000)
      } else {
        alert('Ошибка при отправке заявки. Попробуйте позже.')
      }
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('Ошибка при отправке заявки. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen py-20 bg-background-light/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-primary mb-4">Корзина пуста</h2>
            <p className="text-lg text-text-secondary mb-8">
              Добавьте товары в корзину для оформления заказа
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/catalog')}
              className="px-8 py-4 gradient-button text-white rounded-button font-semibold"
            >
              Перейти в каталог
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen py-20 bg-background-light/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-background-card rounded-card shadow-card p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiCheck className="w-10 h-10 text-green-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-primary mb-4">Заявка отправлена!</h2>
            <p className="text-lg text-text-primary mb-8">
              Мы свяжемся с вами в ближайшее время для уточнения деталей заказа.
            </p>
            <p className="text-sm text-text-secondary">
              Перенаправление в каталог через несколько секунд...
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-background-light animated-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-text-primary hover:text-primary transition-colors mb-8"
        >
          <FiArrowLeft className="w-5 h-5" />
          Назад
        </button>

        <h1 className="text-4xl font-bold text-primary mb-8">Оформление заказа</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-background-card rounded-card shadow-card p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Компания *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="ООО «Ресторан»"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Комментарий
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Дополнительная информация о заказе..."
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                className="w-full py-4 gradient-button text-white rounded-button font-semibold hover:shadow-lg transition-all duration-300 ripple-effect disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Отправка...'
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    Отправить заявку
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background-card rounded-card shadow-card p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-6">Состав заказа</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary line-clamp-2">{item.name}</p>
                      <p className="text-xs text-text-secondary">
                        Количество: {item.quantity} шт.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-text-primary">Товаров:</span>
                  <span className="font-semibold">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} шт.
                  </span>
                </div>
                <div className="p-4 bg-accent/10 rounded-card border border-accent/20">
                  <p className="text-sm text-text-primary">
                    После оформления заявки наш менеджер свяжется с вами для уточнения деталей и расчета стоимости.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

