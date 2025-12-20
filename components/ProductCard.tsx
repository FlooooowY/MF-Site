'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiCheck } from 'react-icons/fi'
import { Product } from '@/lib/store'
import { useStore } from '@/lib/store'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore()
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product)
    setTimeout(() => setIsAdding(false), 300)
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-background-card rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden relative group fade-in-up"
    >
      {/* In Stock Badge */}
      {product.inStock && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          className="absolute top-4 right-4 z-10 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
        >
          <FiCheck className="w-3 h-3" />
          В наличии
        </motion.div>
      )}

      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 overflow-hidden bg-gray-100 cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs text-text-secondary mb-2 uppercase tracking-wide">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-text-dark mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Button */}
        <div className="flex justify-end">
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            disabled={!product.inStock || isAdding}
            className={`w-full px-4 py-3 rounded-button font-medium transition-all duration-300 ripple-effect ${
              isHovered
                ? 'bg-primary text-white'
                : 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white'
            } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FiShoppingCart className="w-4 h-4 inline mr-2" />
            {isAdding ? 'Добавлено' : 'Запросить цену'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

