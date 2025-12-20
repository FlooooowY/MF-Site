'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
	Camera,
	X,
	ChevronLeft,
	ChevronRight,
	SlidersHorizontal,
} from 'lucide-react'
import { galleryItems } from '@/lib/data'
import BeforeAfterSlider from './BeforeAfterSlider'
import { useSound } from '@/lib/sounds'

const categories = [
	{ id: 'all', label: 'Все работы' },
	{ id: 'fade', label: 'Fade' },
	{ id: 'classic', label: 'Классика' },
	{ id: 'modern', label: 'Современные' },
	{ id: 'beard', label: 'Бороды' },
]

// Before/After pairs for showcase
const beforeAfterPairs = [
	{
		id: 'ba1',
		title: 'Классическая трансформация',
		before:
			'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop',
		after:
			'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop',
	},
	{
		id: 'ba2',
		title: 'Стильный Fade',
		before:
			'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop',
		after:
			'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop',
	},
]

export default function Gallery() {
	const [activeCategory, setActiveCategory] = useState('all')
	const [selectedImage, setSelectedImage] = useState<number | null>(null)
	const [showBeforeAfter, setShowBeforeAfter] = useState(false)
	const { playTick } = useSound()

	const filteredItems =
		activeCategory === 'all'
			? galleryItems
			: galleryItems.filter(item => item.category === activeCategory)

	const openLightbox = (index: number) => {
		playTick()
		setSelectedImage(index)
	}
	const closeLightbox = () => setSelectedImage(null)

	const goToPrev = () => {
		if (selectedImage !== null) {
			playTick()
			setSelectedImage(
				selectedImage === 0 ? filteredItems.length - 1 : selectedImage - 1
			)
		}
	}

	const goToNext = () => {
		if (selectedImage !== null) {
			playTick()
			setSelectedImage(
				selectedImage === filteredItems.length - 1 ? 0 : selectedImage + 1
			)
		}
	}

	// Keyboard navigation for lightbox
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (selectedImage === null) return
			if (e.key === 'ArrowLeft') goToPrev()
			if (e.key === 'ArrowRight') goToNext()
			if (e.key === 'Escape') closeLightbox()
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [selectedImage])

	return (
		<section
			id='gallery'
			className='py-24 md:py-32 velvet-bg relative'
			aria-labelledby='gallery-heading'
		>
			<div className='container-custom relative z-10'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-center mb-12 md:mb-16'
				>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<Camera className='w-6 h-6 text-royal-gold' aria-hidden='true' />
						<span className='font-roboto-mono text-royal-gold text-sm tracking-widest uppercase'>
							Портфолио
						</span>
					</div>
					<h2 id='gallery-heading' className='section-title mb-4'>
						Галерея работ
					</h2>
					<div className='divider-gold w-24 mx-auto mb-6' aria-hidden='true' />
					<p className='section-subtitle max-w-2xl mx-auto'>
						Каждая работа — произведение искусства. Вдохновитесь нашими лучшими
						творениями и найдите свой идеальный стиль.
					</p>
				</motion.div>

				{/* View Toggle */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className='flex justify-center mb-8'
				>
					<div className='inline-flex rounded-lg border border-royal-gold/30 overflow-hidden'>
						<button
							onClick={() => {
								setShowBeforeAfter(false)
								playTick()
							}}
							className={`px-4 py-2 text-sm font-medium transition-all ${
								!showBeforeAfter
									? 'bg-royal-gold text-obsidian'
									: 'text-ivory hover:bg-royal-gold/10'
							}`}
							aria-pressed={!showBeforeAfter}
						>
							Галерея
						</button>
						<button
							onClick={() => {
								setShowBeforeAfter(true)
								playTick()
							}}
							className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
								showBeforeAfter
									? 'bg-royal-gold text-obsidian'
									: 'text-ivory hover:bg-royal-gold/10'
							}`}
							aria-pressed={showBeforeAfter}
						>
							<SlidersHorizontal className='w-4 h-4' />
							До/После
						</button>
					</div>
				</motion.div>

				{/* Before/After View */}
				{showBeforeAfter ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='grid grid-cols-1 md:grid-cols-2 gap-8'
					>
						{beforeAfterPairs.map((pair, index) => (
							<motion.div
								key={pair.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.15 }}
								className='glass-card p-4'
							>
								<h3 className='font-cormorant text-xl font-semibold text-ivory mb-4 text-center'>
									{pair.title}
								</h3>
								<BeforeAfterSlider
									beforeImage={pair.before}
									afterImage={pair.after}
								/>
							</motion.div>
						))}
					</motion.div>
				) : (
					<>
						{/* Category Filters */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='flex flex-wrap justify-center gap-3 mb-12'
							role='tablist'
							aria-label='Фильтры галереи'
						>
							{categories.map(category => (
								<button
									key={category.id}
									onClick={() => {
										setActiveCategory(category.id)
										playTick()
									}}
									className={`px-5 py-2.5 rounded-full font-montserrat text-sm font-medium transition-all duration-300 focus-gold ${
										activeCategory === category.id
											? 'bg-royal-gold text-obsidian'
											: 'bg-transparent border border-royal-gold/30 text-ivory hover:border-royal-gold hover:text-royal-gold'
									}`}
									role='tab'
									aria-selected={activeCategory === category.id}
									aria-controls='gallery-grid'
								>
									{category.label}
								</button>
							))}
						</motion.div>

						{/* Gallery Grid */}
						<motion.div
							id='gallery-grid'
							layout
							className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'
							role='tabpanel'
						>
							<AnimatePresence mode='popLayout'>
								{filteredItems.map((item, index) => (
									<motion.div
										key={item.id}
										layout
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.8 }}
										transition={{ duration: 0.4 }}
										className='relative aspect-square rounded-lg overflow-hidden cursor-pointer group'
										onClick={() => openLightbox(index)}
										onKeyDown={e => e.key === 'Enter' && openLightbox(index)}
										tabIndex={0}
										role='button'
										aria-label={`Открыть ${item.title}`}
									>
										<Image
											src={item.image}
											alt={item.title}
											fill
											className='object-cover transition-transform duration-500 group-hover:scale-110'
											sizes='(max-width: 768px) 50vw, 33vw'
										/>
										{/* Overlay */}
										<div className='absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
											<div className='absolute bottom-0 left-0 right-0 p-4'>
												<h4 className='font-cormorant text-xl font-semibold text-ivory mb-1'>
													{item.title}
												</h4>
												<p className='text-royal-gold text-sm capitalize'>
													{item.category}
												</p>
											</div>
										</div>
										{/* Border Glow */}
										<div className='absolute inset-0 border-2 border-transparent group-hover:border-royal-gold/50 rounded-lg transition-colors duration-300' />
										{/* Focus indicator */}
										<div className='absolute inset-0 ring-2 ring-royal-gold ring-offset-2 ring-offset-obsidian opacity-0 focus-within:opacity-100 rounded-lg' />
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					</>
				)}

				{/* View All Button */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className='text-center mt-12'
				>
					<button className='btn-secondary focus-gold'>
						Смотреть все работы
					</button>
				</motion.div>
			</div>

			{/* Lightbox */}
			<AnimatePresence>
				{selectedImage !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-lg flex items-center justify-center p-4'
						onClick={closeLightbox}
						role='dialog'
						aria-modal='true'
						aria-label='Просмотр изображения'
					>
						{/* Close Button */}
						<button
							className='absolute top-6 right-6 p-2 text-ivory hover:text-royal-gold transition-colors focus-gold'
							onClick={closeLightbox}
							aria-label='Закрыть'
						>
							<X className='w-8 h-8' />
						</button>

						{/* Navigation */}
						<button
							className='absolute left-4 md:left-8 p-3 text-ivory hover:text-royal-gold transition-colors bg-obsidian/50 rounded-full focus-gold'
							onClick={e => {
								e.stopPropagation()
								goToPrev()
							}}
							aria-label='Предыдущее изображение'
						>
							<ChevronLeft className='w-8 h-8' />
						</button>
						<button
							className='absolute right-4 md:right-8 p-3 text-ivory hover:text-royal-gold transition-colors bg-obsidian/50 rounded-full focus-gold'
							onClick={e => {
								e.stopPropagation()
								goToNext()
							}}
							aria-label='Следующее изображение'
						>
							<ChevronRight className='w-8 h-8' />
						</button>

						{/* Image */}
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className='relative max-w-4xl max-h-[80vh] aspect-square'
							onClick={e => e.stopPropagation()}
						>
							<Image
								src={filteredItems[selectedImage].image}
								alt={filteredItems[selectedImage].title}
								fill
								className='object-contain rounded-lg'
								sizes='(max-width: 1024px) 90vw, 70vw'
								priority
							/>
							{/* Caption */}
							<div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-obsidian to-transparent'>
								<h3 className='font-cormorant text-2xl font-semibold text-ivory'>
									{filteredItems[selectedImage].title}
								</h3>
								<p className='text-royal-gold capitalize'>
									{filteredItems[selectedImage].category}
								</p>
							</div>
						</motion.div>

						{/* Counter */}
						<div className='absolute bottom-6 left-1/2 -translate-x-1/2 font-roboto-mono text-sm text-smoke'>
							{selectedImage + 1} / {filteredItems.length}
						</div>

						{/* Keyboard hint */}
						<div className='absolute bottom-6 right-6 text-smoke/50 text-xs hidden md:block'>
							← → для навигации • ESC для закрытия
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Decorative Elements */}
			<div
				className='absolute top-0 right-0 w-96 h-96 bg-royal-gold/5 rounded-full blur-3xl'
				aria-hidden='true'
			/>
			<div
				className='absolute bottom-0 left-0 w-64 h-64 bg-deep-indigo/30 rounded-full blur-3xl'
				aria-hidden='true'
			/>
		</section>
	)
}
