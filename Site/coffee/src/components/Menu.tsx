'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Flame, Snowflake, Plus, Cake, Check } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/components/Toast'
import Image from 'next/image'

const categories = [
	{ id: 'all', name: 'Все', icon: null },
	{ id: 'hot', name: 'Горячие', icon: Flame },
	{ id: 'cold', name: 'Холодные', icon: Snowflake },
	{ id: 'dessert', name: 'Десерты', icon: Cake },
]

const menuItems = [
	{
		id: 1,
		name: 'Капучино',
		description: 'Эспрессо, молоко, бархатная пенка',
		price: 290,
		rating: 4.8,
		image:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%233E2723" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="%23D4AF37" opacity="0.3"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="24" fill="%23D4AF37" text-anchor="middle" dominant-baseline="middle"%3ECappuccino%3C/text%3E%3C/svg%3E',
		category: 'hot',
		isPopular: true,
	},
	{
		id: 2,
		name: 'Cold Brew',
		description: 'Холодное заваривание 12 часов',
		price: 350,
		rating: 5.0,
		image:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%232C1810" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="%2387CEEB" opacity="0.3"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="24" fill="%2387CEEB" text-anchor="middle" dominant-baseline="middle"%3ECold Brew%3C/text%3E%3C/svg%3E',
		category: 'cold',
		isPopular: true,
	},
	{
		id: 3,
		name: 'Flat White',
		description: 'Двойной эспрессо, микропена',
		price: 320,
		rating: 4.7,
		image:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%234A2C1C" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="%23F5E6D3" opacity="0.3"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="24" fill="%23F5E6D3" text-anchor="middle" dominant-baseline="middle"%3EFlat White%3C/text%3E%3C/svg%3E',
		category: 'hot',
		isPopular: false,
	},
	{
		id: 4,
		name: 'Раф Лаванда',
		description: 'Эспрессо, сливки, лавандовый сироп',
		price: 380,
		rating: 4.9,
		image:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%236B4C8A" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="%23E6E6FA" opacity="0.3"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="24" fill="%23E6E6FA" text-anchor="middle" dominant-baseline="middle"%3ERaf Lavender%3C/text%3E%3C/svg%3E',
		category: 'hot',
		isPopular: true,
	},
	{
		id: 5,
		name: 'Айс Латте',
		description: 'Эспрессо, молоко, лёд',
		price: 310,
		rating: 4.6,
		image:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%235D4E37" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="%23ADD8E6" opacity="0.3"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="24" fill="%23ADD8E6" text-anchor="middle" dominant-baseline="middle"%3EIce Latte%3C/text%3E%3C/svg%3E',
		category: 'cold',
		isPopular: false,
	},
	{
		id: 6,
		name: 'Эспрессо',
		description: 'Классический итальянский рецепт',
		price: 180,
		rating: 4.8,
		image:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%231A0F0A" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="%23D4AF37" opacity="0.3"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="24" fill="%23D4AF37" text-anchor="middle" dominant-baseline="middle"%3EEspresso%3C/text%3E%3C/svg%3E',
		category: 'hot',
		isPopular: false,
	},
	{
		id: 7,
		name: 'Тирамису',
		description: 'Классический итальянский десерт с маскарпоне',
		price: 420,
		rating: 4.9,
		image:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%238B4513" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="%23F5DEB3" opacity="0.3"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="24" fill="%23F5DEB3" text-anchor="middle" dominant-baseline="middle"%3ETiramisu%3C/text%3E%3C/svg%3E',
		category: 'dessert',
		isPopular: true,
	},
	{
		id: 8,
		name: 'Круассан',
		description: 'Свежий французский круассан с маслом',
		price: 180,
		rating: 4.7,
		image:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23D2691E" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="%23FFE4B5" opacity="0.3"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="24" fill="%23FFE4B5" text-anchor="middle" dominant-baseline="middle"%3ECroissant%3C/text%3E%3C/svg%3E',
		category: 'dessert',
		isPopular: true,
	},
	{
		id: 9,
		name: 'Чизкейк Нью-Йорк',
		description: 'Нежный сливочный чизкейк на песочной основе',
		price: 380,
		rating: 4.8,
		image:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23F4A460" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="%23FFF8DC" opacity="0.3"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="24" fill="%23FFF8DC" text-anchor="middle" dominant-baseline="middle"%3ECheesecake%3C/text%3E%3C/svg%3E',
		category: 'dessert',
		isPopular: false,
	},
	{
		id: 10,
		name: 'Фраппучино',
		description: 'Кофейный коктейль со льдом и взбитыми сливками',
		price: 390,
		rating: 4.7,
		image:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23CD853F" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="%23F0E68C" opacity="0.3"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="24" fill="%23F0E68C" text-anchor="middle" dominant-baseline="middle"%3EFrappuccino%3C/text%3E%3C/svg%3E',
		category: 'cold',
		isPopular: false,
	},
]

interface MenuCardProps {
	item: (typeof menuItems)[0]
	index: number
}

// Коэффициенты цен для размеров
const sizePriceMultiplier: Record<string, number> = {
	S: 0.85,
	M: 1,
	L: 1.2,
}

function MenuCard({ item, index }: MenuCardProps) {
	const [rotateX, setRotateX] = useState(0)
	const [rotateY, setRotateY] = useState(0)
	const [isHovered, setIsHovered] = useState(false)
	const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M')
	const [isAdded, setIsAdded] = useState(false)

	const { addItem } = useCartStore()
	const { showToast } = useToast()

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2
		setRotateY((e.clientX - centerX) / 15)
		setRotateX(-(e.clientY - centerY) / 15)
	}

	const handleMouseLeave = () => {
		setRotateX(0)
		setRotateY(0)
		setIsHovered(false)
	}

	const handleAddToCart = () => {
		addItem({
			id: item.id,
			name: item.name,
			description: item.description,
			price: item.price,
			image: item.image,
			size: selectedSize,
		})

		// Показываем toast и анимацию добавления
		showToast(`${item.name} (${selectedSize}) добавлен в корзину`, 'cart')
		setIsAdded(true)
		setTimeout(() => setIsAdded(false), 1500)
	}

	const currentPrice = Math.round(
		item.price * sizePriceMultiplier[selectedSize]
	)

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={handleMouseLeave}
			style={{
				transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
				transition: 'transform 0.1s ease-out',
			}}
			className='group relative bg-coffee-dark/60 backdrop-blur-sm border border-cream/10 rounded-2xl overflow-hidden hover:border-gold-primary/50 transition-all duration-500'
		>
			{/* Image container */}
			<div className='relative h-56 overflow-hidden'>
				<Image
					src={item.image}
					alt={item.name}
					fill
					className='object-cover transition-transform duration-700 group-hover:scale-110'
				/>

				{/* Steam effect */}
				<div
					className={`absolute inset-0 transition-opacity duration-500 ${
						isHovered ? 'opacity-100' : 'opacity-0'
					}`}
				>
					{[...Array(6)].map((_, i) => (
						<motion.div
							key={i}
							className='absolute bottom-0 w-2 h-2 bg-white/40 rounded-full blur-sm'
							style={{ left: `${20 + i * 12}%` }}
							animate={
								isHovered
									? {
											y: [-10, -60],
											opacity: [0, 0.8, 0],
											scale: [0.5, 1.5],
									  }
									: {}
							}
							transition={{
								duration: 2,
								repeat: Infinity,
								delay: i * 0.2,
								ease: 'easeOut',
							}}
						/>
					))}
				</div>

				{/* Popular badge */}
				{item.isPopular && (
					<div className='absolute top-3 left-3 flex items-center gap-1 px-3 py-1 bg-terracotta text-white text-xs font-semibold rounded-full'>
						<Flame className='w-3 h-3' />
						Хит
					</div>
				)}

				{/* Added to cart indicator */}
				<AnimatePresence>
					{isAdded && (
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							className='absolute inset-0 bg-green-500/90 flex items-center justify-center'
						>
							<div className='text-white font-semibold flex items-center gap-2'>
								<Check className='w-6 h-6' />
								Добавлено!
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Overlay gradient */}
				<div className='absolute inset-0 bg-gradient-to-t from-coffee-dark via-transparent to-transparent' />
			</div>

			{/* Content */}
			<div className='p-5'>
				{/* Title & Rating */}
				<div className='flex items-start justify-between mb-2'>
					<h3 className='font-playfair text-xl font-semibold text-cream'>
						{item.name}
					</h3>
					<div className='flex items-center gap-1 text-gold-primary'>
						<Star className='w-4 h-4 fill-current' />
						<span className='text-sm font-medium'>{item.rating}</span>
					</div>
				</div>

				{/* Description */}
				<p className='text-cream/60 text-sm mb-4'>{item.description}</p>

				{/* Size selector */}
				<div className='flex items-center gap-3 mb-4'>
					{(['S', 'M', 'L'] as const).map(size => (
						<button
							key={size}
							onClick={() => setSelectedSize(size)}
							className={`w-8 h-8 rounded-full border text-sm font-medium transition-all ${
								selectedSize === size
									? 'border-gold-primary bg-gold-primary/20 text-gold-primary'
									: 'border-cream/30 text-cream/60 hover:border-cream/50'
							}`}
						>
							{size}
						</button>
					))}
				</div>

				{/* Price & Add button */}
				<div className='flex items-center justify-between'>
					<div className='font-fraunces text-2xl font-bold text-gold-primary'>
						₽{currentPrice}
					</div>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleAddToCart}
						disabled={isAdded}
						className='flex items-center gap-2 px-4 py-2 bg-terracotta hover:bg-terracotta-hover text-white text-sm font-semibold rounded-full transition-colors disabled:bg-green-500'
					>
						{isAdded ? (
							<Check className='w-4 h-4' />
						) : (
							<>
								<Plus className='w-4 h-4' />В корзину
							</>
						)}
					</motion.button>
				</div>
			</div>

			{/* Glow effect on hover */}
			<div
				className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
					isHovered ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<div className='absolute inset-0 shadow-gold-glow' />
			</div>
		</motion.div>
	)
}

export default function Menu() {
	const [activeCategory, setActiveCategory] = useState('all')
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	const filteredItems =
		activeCategory === 'all'
			? menuItems
			: menuItems.filter(item => item.category === activeCategory)

	return (
		<section id='menu' ref={ref} className='py-24 md:py-32 relative'>
			{/* Background beans */}
			<div className='absolute top-20 right-10 opacity-5'>
				<motion.svg
					animate={{ rotate: 360 }}
					transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
					width='200'
					height='200'
					viewBox='0 0 100 100'
					className='fill-gold-primary'
				>
					<ellipse cx='50' cy='50' rx='40' ry='25' />
				</motion.svg>
			</div>

			<div className='container mx-auto px-4'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className='text-center mb-12'
				>
					<span className='inline-block text-gold-primary font-medium tracking-wider uppercase mb-4'>
						Откройте вкус
					</span>
					<h2 className='font-playfair text-section-mobile md:text-section font-bold mb-6'>
						<span className='heading-foam'>Наше меню</span>
					</h2>
				</motion.div>

				{/* Category Tabs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='flex justify-center gap-4 mb-12'
				>
					{categories.map(cat => (
						<button
							key={cat.id}
							onClick={() => setActiveCategory(cat.id)}
							className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
								activeCategory === cat.id
									? 'bg-gold-primary text-coffee-dark'
									: 'bg-coffee-dark/50 text-cream/70 hover:text-cream border border-cream/20 hover:border-cream/40'
							}`}
						>
							{cat.icon && <cat.icon className='w-4 h-4' />}
							{cat.name}
						</button>
					))}
				</motion.div>

				{/* Menu Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
					{filteredItems.map((item, index) => (
						<MenuCard key={item.id} item={item} index={index} />
					))}
				</div>

				{/* View all button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-center mt-12'
				>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setActiveCategory('all')}
						className='px-8 py-4 border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-coffee-dark font-semibold rounded-full transition-all duration-300'
					>
						Смотреть всё меню
					</motion.button>
				</motion.div>
			</div>
		</section>
	)
}
