'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
	SlidersHorizontal,
	Grid,
	List,
	ChevronDown,
	X,
	ArrowUpDown,
	Check,
	Home,
} from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { products, categories } from '@/data/products'

const sortOptions = [
	{ value: 'popular', label: 'По популярности' },
	{ value: 'price-asc', label: 'Сначала дешевле' },
	{ value: 'price-desc', label: 'Сначала дороже' },
	{ value: 'rating', label: 'По рейтингу' },
]

export default function CategoryPage() {
	const params = useParams()
	const categoryId = params.category as string
	const category = categories.find(c => c.id === categoryId)

	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
	const [sortBy, setSortBy] = useState('popular')
	const [isSortOpen, setIsSortOpen] = useState(false)

	const categoryProducts = useMemo(() => {
		let result = products.filter(p => p.category === categoryId)

		switch (sortBy) {
			case 'price-asc':
				result.sort((a, b) => a.price - b.price)
				break
			case 'price-desc':
				result.sort((a, b) => b.price - a.price)
				break
			case 'rating':
				result.sort((a, b) => b.rating - a.rating)
				break
		}

		return result
	}, [categoryId, sortBy])

	if (!category) {
		return (
			<div className='min-h-screen pt-32 pb-20'>
				<div className='container mx-auto px-6 text-center py-20'>
					<h1 className='text-2xl font-semibold mb-4'>Категория не найдена</h1>
					<Link href='/catalog' className='btn-glow'>
						Вернуться в каталог
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen pt-32 pb-20'>
			<div className='container mx-auto px-6'>
				{/* Breadcrumbs */}
				<motion.nav
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='flex items-center gap-2 text-sm text-white/60 mb-8'
				>
					<Link
						href='/'
						className='flex items-center gap-1 hover:text-accent-blue transition-colors'
					>
						<Home size={14} />
						Главная
					</Link>
					<span>/</span>
					<Link
						href='/catalog'
						className='hover:text-accent-blue transition-colors'
					>
						Каталог
					</Link>
					<span>/</span>
					<span className='text-white'>{category.name}</span>
				</motion.nav>

				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-8'
				>
					<div className='flex items-center gap-4 mb-4'>
						<span className='text-5xl'>{category.icon}</span>
						<h1 className='font-clash text-display-md font-semibold'>
							{category.name}
						</h1>
					</div>
					<p className='text-white/60'>
						{categoryProducts.length} товаров в категории
					</p>
				</motion.div>

				{/* Toolbar */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className='flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10'
				>
					{/* Sort */}
					<div className='relative'>
						<button
							onClick={() => setIsSortOpen(!isSortOpen)}
							className='flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors'
						>
							<ArrowUpDown size={18} />
							<span className='hidden sm:inline'>
								{sortOptions.find(o => o.value === sortBy)?.label}
							</span>
							<ChevronDown
								size={16}
								className={`transition-transform ${
									isSortOpen ? 'rotate-180' : ''
								}`}
							/>
						</button>

						<AnimatePresence>
							{isSortOpen && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									className='absolute top-full left-0 mt-2 w-56 p-2 rounded-xl bg-primary-dark border border-white/10 shadow-xl z-10'
								>
									{sortOptions.map(option => (
										<button
											key={option.value}
											onClick={() => {
												setSortBy(option.value)
												setIsSortOpen(false)
											}}
											className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors text-left ${
												sortBy === option.value
													? 'bg-accent-blue/20 text-accent-blue'
													: 'hover:bg-white/5'
											}`}
										>
											{sortBy === option.value && <Check size={16} />}
											<span>{option.label}</span>
										</button>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* View Mode */}
					<div className='flex items-center gap-2 p-1 rounded-xl bg-white/5'>
						<button
							onClick={() => setViewMode('grid')}
							className={`p-2 rounded-lg transition-colors ${
								viewMode === 'grid'
									? 'bg-accent-blue text-white'
									: 'hover:bg-white/10'
							}`}
						>
							<Grid size={18} />
						</button>
						<button
							onClick={() => setViewMode('list')}
							className={`p-2 rounded-lg transition-colors ${
								viewMode === 'list'
									? 'bg-accent-blue text-white'
									: 'hover:bg-white/10'
							}`}
						>
							<List size={18} />
						</button>
					</div>
				</motion.div>

				{/* Products */}
				{categoryProducts.length > 0 ? (
					<motion.div
						layout
						className={`grid gap-6 ${
							viewMode === 'grid'
								? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
								: 'grid-cols-1'
						}`}
					>
						{categoryProducts.map((product, index) => (
							<ProductCard key={product.id} product={product} index={index} />
						))}
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='text-center py-20'
					>
						<div className='w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6'>
							<SlidersHorizontal size={40} className='text-white/30' />
						</div>
						<h3 className='text-xl font-semibold mb-2'>Товары не найдены</h3>
						<p className='text-white/60 mb-6'>
							В этой категории пока нет товаров
						</p>
						<Link href='/catalog'>
							<button className='btn-neon'>Вернуться в каталог</button>
						</Link>
					</motion.div>
				)}
			</div>
		</div>
	)
}
