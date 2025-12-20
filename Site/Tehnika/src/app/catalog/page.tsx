'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	SlidersHorizontal,
	Grid,
	List,
	ChevronDown,
	X,
	ArrowUpDown,
	Check,
} from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { products, categories } from '@/data/products'

const sortOptions = [
	{ value: 'popular', label: 'По популярности' },
	{ value: 'price-asc', label: 'Сначала дешевле' },
	{ value: 'price-desc', label: 'Сначала дороже' },
	{ value: 'rating', label: 'По рейтингу' },
	{ value: 'new', label: 'Новинки' },
]

const priceRanges = [
	{ min: 0, max: 10000, label: 'До 10 000 ₽' },
	{ min: 10000, max: 50000, label: '10 000 — 50 000 ₽' },
	{ min: 50000, max: 100000, label: '50 000 — 100 000 ₽' },
	{ min: 100000, max: Infinity, label: 'От 100 000 ₽' },
]

export default function CatalogPage() {
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
	const [sortBy, setSortBy] = useState('popular')
	const [isSortOpen, setIsSortOpen] = useState(false)
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [selectedPriceRange, setSelectedPriceRange] = useState<{
		min: number
		max: number
	} | null>(null)
	const [inStockOnly, setInStockOnly] = useState(false)

	const filteredProducts = useMemo(() => {
		let result = [...products]

		// Filter by category
		if (selectedCategories.length > 0) {
			result = result.filter(p => selectedCategories.includes(p.category))
		}

		// Filter by price
		if (selectedPriceRange) {
			result = result.filter(
				p =>
					p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
			)
		}

		// Filter by stock
		if (inStockOnly) {
			result = result.filter(p => p.inStock)
		}

		// Sort
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
			case 'new':
				result.sort(
					(a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0)
				)
				break
		}

		return result
	}, [selectedCategories, selectedPriceRange, inStockOnly, sortBy])

	const toggleCategory = (categoryId: string) => {
		setSelectedCategories(prev =>
			prev.includes(categoryId)
				? prev.filter(c => c !== categoryId)
				: [...prev, categoryId]
		)
	}

	const clearFilters = () => {
		setSelectedCategories([])
		setSelectedPriceRange(null)
		setInStockOnly(false)
	}

	const activeFiltersCount =
		selectedCategories.length +
		(selectedPriceRange ? 1 : 0) +
		(inStockOnly ? 1 : 0)

	return (
		<div className='min-h-screen pt-32 pb-20'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<div className='mb-8'>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='font-clash text-display-md font-semibold mb-4'
					>
						Каталог товаров
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className='text-white/60'
					>
						{filteredProducts.length} товаров
					</motion.p>
				</div>

				<div className='flex gap-8'>
					{/* Desktop Filters Sidebar */}
					<motion.aside
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className='hidden lg:block w-72 flex-shrink-0'
					>
						<div className='filter-sidebar rounded-3xl p-6 sticky top-32'>
							<div className='flex items-center justify-between mb-6'>
								<h2 className='font-semibold text-lg'>Фильтры</h2>
								{activeFiltersCount > 0 && (
									<button
										onClick={clearFilters}
										className='text-sm text-accent-blue hover:underline'
									>
										Сбросить
									</button>
								)}
							</div>

							{/* Categories */}
							<div className='mb-6'>
								<h3 className='font-medium mb-4'>Категории</h3>
								<div className='space-y-2'>
									{categories.map(category => (
										<label
											key={category.id}
											className='flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors'
										>
											<div
												className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
													selectedCategories.includes(category.id)
														? 'bg-accent-blue border-accent-blue'
														: 'border-white/30'
												}`}
											>
												{selectedCategories.includes(category.id) && (
													<Check size={14} />
												)}
											</div>
											<span className='flex-1'>{category.name}</span>
											<span className='text-sm text-white/50'>
												{category.count}
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Price Range */}
							<div className='mb-6'>
								<h3 className='font-medium mb-4'>Цена</h3>
								<div className='space-y-2'>
									{priceRanges.map((range, index) => (
										<label
											key={index}
											className='flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors'
										>
											<div
												className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
													selectedPriceRange?.min === range.min
														? 'bg-accent-blue border-accent-blue'
														: 'border-white/30'
												}`}
											>
												{selectedPriceRange?.min === range.min && (
													<div className='w-2 h-2 rounded-full bg-white' />
												)}
											</div>
											<span>{range.label}</span>
										</label>
									))}
								</div>
							</div>

							{/* In Stock */}
							<div>
								<label className='flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors'>
									<div
										className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
											inStockOnly
												? 'bg-accent-blue border-accent-blue'
												: 'border-white/30'
										}`}
										onClick={() => setInStockOnly(!inStockOnly)}
									>
										{inStockOnly && <Check size={14} />}
									</div>
									<span>Только в наличии</span>
								</label>
							</div>
						</div>
					</motion.aside>

					{/* Main Content */}
					<div className='flex-1'>
						{/* Toolbar */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className='flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10'
						>
							{/* Mobile Filter Button */}
							<button
								onClick={() => setIsFilterOpen(true)}
								className='lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors'
							>
								<SlidersHorizontal size={18} />
								<span>Фильтры</span>
								{activeFiltersCount > 0 && (
									<span className='w-5 h-5 rounded-full bg-accent-blue text-xs flex items-center justify-center'>
										{activeFiltersCount}
									</span>
								)}
							</button>

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

						{/* Active Filters Tags */}
						{activeFiltersCount > 0 && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className='flex flex-wrap gap-2 mb-6'
							>
								{selectedCategories.map(categoryId => {
									const category = categories.find(c => c.id === categoryId)
									return (
										<button
											key={categoryId}
											onClick={() => toggleCategory(categoryId)}
											className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/20 text-accent-blue text-sm hover:bg-accent-blue/30 transition-colors'
										>
											{category?.name}
											<X size={14} />
										</button>
									)
								})}
								{selectedPriceRange && (
									<button
										onClick={() => setSelectedPriceRange(null)}
										className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/20 text-accent-blue text-sm hover:bg-accent-blue/30 transition-colors'
									>
										{
											priceRanges.find(r => r.min === selectedPriceRange.min)
												?.label
										}
										<X size={14} />
									</button>
								)}
								{inStockOnly && (
									<button
										onClick={() => setInStockOnly(false)}
										className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/20 text-accent-blue text-sm hover:bg-accent-blue/30 transition-colors'
									>
										В наличии
										<X size={14} />
									</button>
								)}
								<button
									onClick={clearFilters}
									className='px-3 py-1.5 rounded-full text-sm text-white/60 hover:text-white transition-colors'
								>
									Сбросить все
								</button>
							</motion.div>
						)}

						{/* Products Grid */}
						<motion.div
							layout
							className={`grid gap-6 ${
								viewMode === 'grid'
									? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
									: 'grid-cols-1'
							}`}
						>
							<AnimatePresence mode='popLayout'>
								{filteredProducts.map((product, index) => (
									<ProductCard
										key={product.id}
										product={product}
										index={index}
									/>
								))}
							</AnimatePresence>
						</motion.div>

						{/* Empty State */}
						{filteredProducts.length === 0 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className='text-center py-20'
							>
								<div className='w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6'>
									<SlidersHorizontal size={40} className='text-white/30' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>
									Ничего не найдено
								</h3>
								<p className='text-white/60 mb-6'>
									Попробуйте изменить параметры фильтрации
								</p>
								<button onClick={clearFilters} className='btn-neon'>
									Сбросить фильтры
								</button>
							</motion.div>
						)}
					</div>
				</div>
			</div>

			{/* Mobile Filter Modal */}
			<AnimatePresence>
				{isFilterOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 lg:hidden'
					>
						<div
							className='absolute inset-0 bg-black/60 backdrop-blur-sm'
							onClick={() => setIsFilterOpen(false)}
						/>
						<motion.div
							initial={{ x: '-100%' }}
							animate={{ x: 0 }}
							exit={{ x: '-100%' }}
							transition={{ type: 'tween' }}
							className='absolute left-0 top-0 bottom-0 w-80 bg-primary-dark border-r border-white/10 overflow-y-auto'
						>
							<div className='p-6'>
								<div className='flex items-center justify-between mb-6'>
									<h2 className='text-xl font-semibold'>Фильтры</h2>
									<button
										onClick={() => setIsFilterOpen(false)}
										className='p-2 hover:bg-white/10 rounded-lg transition-colors'
									>
										<X size={24} />
									</button>
								</div>

								{/* Categories */}
								<div className='mb-6'>
									<h3 className='font-medium mb-4'>Категории</h3>
									<div className='space-y-2'>
										{categories.map(category => (
											<label
												key={category.id}
												className='flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors'
											>
												<div
													className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
														selectedCategories.includes(category.id)
															? 'bg-accent-blue border-accent-blue'
															: 'border-white/30'
													}`}
													onClick={() => toggleCategory(category.id)}
												>
													{selectedCategories.includes(category.id) && (
														<Check size={14} />
													)}
												</div>
												<span className='flex-1'>{category.name}</span>
											</label>
										))}
									</div>
								</div>

								{/* Price */}
								<div className='mb-6'>
									<h3 className='font-medium mb-4'>Цена</h3>
									<div className='space-y-2'>
										{priceRanges.map((range, index) => (
											<label
												key={index}
												className='flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors'
												onClick={() => setSelectedPriceRange(range)}
											>
												<div
													className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
														selectedPriceRange?.min === range.min
															? 'bg-accent-blue border-accent-blue'
															: 'border-white/30'
													}`}
												>
													{selectedPriceRange?.min === range.min && (
														<div className='w-2 h-2 rounded-full bg-white' />
													)}
												</div>
												<span>{range.label}</span>
											</label>
										))}
									</div>
								</div>

								{/* Apply Button */}
								<button
									onClick={() => setIsFilterOpen(false)}
									className='btn-glow w-full py-4'
								>
									Показать {filteredProducts.length} товаров
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
