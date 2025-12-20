'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'
import ProductCard from './ProductCard'
import { products as initialProducts, categories } from '@/lib/products'
import { Product } from '@/lib/store'

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('Все категории')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>(initialProducts)

  useEffect(() => {
    // Load products from admin localStorage
    const saved = localStorage.getItem('admin-products')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed)
        }
      } catch (e) {
        console.error('Error loading products:', e)
      }
    }
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (selectedCategory !== 'Все категории') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [selectedCategory, searchQuery, products])

  return (
    <section className="py-20 bg-background-light animated-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Каталог оборудования
          </h2>
          <p className="text-lg text-text-primary max-w-2xl mx-auto">
            Профессиональное оборудование для ресторанов, кафе и столовых
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск по каталогу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-text-primary placeholder-text-secondary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white/80 text-text-primary hover:bg-white hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-text-secondary">Товары не найдены</p>
          </div>
        )}
      </div>
    </section>
  )
}

