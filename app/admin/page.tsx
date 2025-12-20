'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi'
import { Product } from '@/lib/store'
import { products as initialProducts } from '@/lib/products'

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    inStock: true,
  })

  useEffect(() => {
    // Load products from localStorage or use initial
    const saved = localStorage.getItem('admin-products')
    if (saved) {
      setProducts(JSON.parse(saved))
    } else {
      setProducts(initialProducts)
    }
  }, [])

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts)
    localStorage.setItem('admin-products', JSON.stringify(newProducts))
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData(product)
    setIsAdding(false)
  }

  const handleAdd = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      inStock: true,
    })
  }

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert('Заполните все обязательные поля')
      return
    }

    if (editingId) {
      // Update existing
      const updated = products.map((p) =>
        p.id === editingId ? { ...formData, id: editingId } as Product : p
      )
      saveProducts(updated)
      setEditingId(null)
    } else if (isAdding) {
      // Add new
      const newProduct: Product = {
        ...formData,
        id: Date.now().toString(),
      } as Product
      saveProducts([...products, newProduct])
      setIsAdding(false)
    }

    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      inStock: true,
    })
  }

  const handleDelete = (id: string) => {
    if (confirm('Удалить товар?')) {
      saveProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      inStock: true,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">Админ-панель</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="px-6 py-3 gradient-button text-white rounded-button font-semibold flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Добавить товар
          </motion.button>
        </div>

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background-card rounded-card shadow-card p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">
              {isAdding ? 'Добавить товар' : 'Редактировать товар'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Название *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Категория *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Цена (₽) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  URL изображения
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-button border-2 border-gray-200 focus:border-primary focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-text-primary">В наличии</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="px-6 py-2 gradient-button text-white rounded-button font-semibold flex items-center gap-2"
              >
                <FiSave className="w-4 h-4" />
                Сохранить
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-200 text-text-primary rounded-button font-semibold flex items-center gap-2"
              >
                <FiX className="w-4 h-4" />
                Отмена
              </button>
            </div>
          </motion.div>
        )}

        {/* Products List */}
        <div className="bg-background-card rounded-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Товар</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                    Категория
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Цена</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                    Наличие
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-primary">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{product.name}</p>
                          <p className="text-sm text-text-secondary line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-primary">{product.category}</td>
                    <td className="px-6 py-4 font-semibold text-primary">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.inStock
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.inStock ? 'В наличии' : 'Нет в наличии'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-primary/10 text-primary rounded transition-colors"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

