'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiArrowLeft, FiCheck } from 'react-icons/fi'
import { useStore } from '@/lib/store'
import { products as initialProducts } from '@/lib/products'
import { Product } from '@/lib/store'
import Image from 'next/image'

interface ProductDetailsProps {
  productId: string
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const router = useRouter()
  const { addToCart } = useStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // Load products from localStorage or initial
    const saved = localStorage.getItem('admin-products')
    const allProducts = saved ? JSON.parse(saved) : initialProducts
    const found = allProducts.find((p: Product) => p.id === productId)
    setProduct(found || null)
  }, [productId])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-text-primary mb-4">Товар не найден</p>
          <button
            onClick={() => router.push('/catalog')}
            className="px-6 py-3 gradient-button text-white rounded-button font-semibold"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setTimeout(() => setIsAdding(false), 300)
  }

  return (
    <div className="py-12 bg-background-light animated-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-text-primary hover:text-primary transition-colors mb-8"
        >
          <FiArrowLeft className="w-5 h-5" />
          Назад
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative h-[500px] rounded-card overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-sm text-text-secondary mb-2 uppercase tracking-wide">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>
            <p className="text-lg text-text-primary mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-primary mb-4">Характеристики:</h2>
                <ul className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex items-center gap-2 text-text-primary">
                      <FiCheck className="w-4 h-4 text-accent flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock and Add to Cart */}
            <div className="mb-8 p-6 bg-gray-50 rounded-card">
              <div className="flex items-center justify-between mb-6">
                {product.inStock ? (
                  <span className="px-4 py-2 bg-secondary-light text-secondary-dark rounded-full text-sm font-semibold flex items-center gap-2">
                    <FiCheck className="w-4 h-4" />
                    В наличии
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    Нет в наличии
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              {product.inStock && (
                <div className="flex items-center gap-4 mb-6">
                  <label className="text-text-primary font-medium">Количество:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border-2 border-primary rounded-button flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-semibold text-primary">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border-2 border-primary rounded-button flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.95 }}
                disabled={!product.inStock || isAdding}
                className="w-full py-4 gradient-button text-white rounded-button font-semibold hover:shadow-lg transition-all duration-300 ripple-effect disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FiShoppingCart className="w-5 h-5" />
                {isAdding ? 'Добавлено' : 'Запросить цену'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

