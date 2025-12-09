'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
	Search,
	ShoppingCart,
	Heart,
	User,
	Menu,
	X,
	ChevronDown,
	Mic,
	BarChart2,
	Phone,
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { categories } from '@/data/products'
import CartSidebar from './CartSidebar'
import SearchModal from './SearchModal'

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isCatalogOpen, setIsCatalogOpen] = useState(false)
	const {
		getCartCount,
		favorites,
		comparison,
		isCartOpen,
		setCartOpen,
		isSearchOpen,
		setSearchOpen,
		isMobileMenuOpen,
		setMobileMenuOpen,
	} = useStore()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? 'bg-primary-dark/95 backdrop-blur-xl shadow-lg shadow-black/20'
						: 'bg-transparent'
				}`}
			>
				{/* Top Bar */}
				<div className='hidden lg:block border-b border-white/10'>
					<div className='container mx-auto px-6 py-2'>
						<div className='flex items-center justify-between text-sm text-white/60'>
							<div className='flex items-center gap-6'>
								<Link
									href='/delivery'
									className='hover:text-accent-blue transition-colors'
								>
									Доставка
								</Link>
								<Link
									href='/stores'
									className='hover:text-accent-blue transition-colors'
								>
									Магазины
								</Link>
								<Link
									href='/service'
									className='hover:text-accent-blue transition-colors'
								>
									Сервис
								</Link>
							</div>
							<div className='flex items-center gap-6'>
								<a
									href='tel:88005553535'
									className='flex items-center gap-2 hover:text-accent-blue transition-colors'
								>
									<Phone size={14} />8 800 555-35-35
								</a>
								<span>Ежедневно с 9:00 до 21:00</span>
							</div>
						</div>
					</div>
				</div>

				{/* Main Header */}
				<div className='container mx-auto px-4 lg:px-6 py-4'>
					<div className='flex items-center justify-between gap-4'>
						{/* Logo */}
						<Link href='/' className='flex items-center gap-3 group'>
							<div className='relative'>
								<div className='w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-2xl font-bold group-hover:shadow-glow transition-shadow'>
									T
								</div>
								<div className='absolute -inset-1 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple opacity-0 group-hover:opacity-30 blur-lg transition-opacity' />
							</div>
							<div className='hidden sm:block'>
								<div className='font-clash font-semibold text-xl tracking-tight'>
									TECHNO
								</div>
								<div className='text-[10px] text-white/50 tracking-widest uppercase'>
									megastore
								</div>
							</div>
						</Link>

						{/* Catalog Button */}
						<button
							onClick={() => setIsCatalogOpen(!isCatalogOpen)}
							className='hidden lg:flex items-center gap-2 btn-glow px-5 py-3'
						>
							<Menu size={20} />
							<span>Каталог</span>
							<ChevronDown
								size={16}
								className={`transition-transform ${
									isCatalogOpen ? 'rotate-180' : ''
								}`}
							/>
						</button>

						{/* Search */}
						<div className='flex-1 max-w-2xl hidden md:block'>
							<div
								onClick={() => setSearchOpen(true)}
								className='relative cursor-pointer group'
							>
								<input
									type='text'
									placeholder='Найти среди 50 000+ товаров...'
									className='input-search pr-24 cursor-pointer'
									readOnly
								/>
								<div className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2'>
									<button className='p-2 hover:bg-accent-blue/20 rounded-lg transition-colors'>
										<Mic size={18} className='text-white/50' />
									</button>
									<div className='w-px h-6 bg-white/20' />
									<Search size={20} className='text-accent-blue' />
								</div>
							</div>
						</div>

						{/* Actions */}
						<div className='flex items-center gap-2 lg:gap-4'>
							{/* Mobile Search */}
							<button
								onClick={() => setSearchOpen(true)}
								className='md:hidden p-3 hover:bg-white/10 rounded-xl transition-colors'
							>
								<Search size={22} />
							</button>

							{/* Comparison */}
							<Link
								href='/compare'
								className='hidden sm:flex relative p-3 hover:bg-white/10 rounded-xl transition-colors group'
							>
								<BarChart2
									size={22}
									className='group-hover:text-accent-blue transition-colors'
								/>
								{comparison.length > 0 && (
									<span className='absolute -top-1 -right-1 w-5 h-5 bg-accent-purple rounded-full text-xs flex items-center justify-center font-semibold'>
										{comparison.length}
									</span>
								)}
							</Link>

							{/* Favorites */}
							<Link
								href='/favorites'
								className='hidden sm:flex relative p-3 hover:bg-white/10 rounded-xl transition-colors group'
							>
								<Heart
									size={22}
									className='group-hover:text-accent-blue transition-colors'
								/>
								{favorites.length > 0 && (
									<span className='absolute -top-1 -right-1 w-5 h-5 bg-accent-purple rounded-full text-xs flex items-center justify-center font-semibold'>
										{favorites.length}
									</span>
								)}
							</Link>

							{/* Cart */}
							<button
								onClick={() => setCartOpen(true)}
								className='relative p-3 hover:bg-white/10 rounded-xl transition-colors group'
							>
								<ShoppingCart
									size={22}
									className='group-hover:text-accent-blue transition-colors'
								/>
								{getCartCount() > 0 && (
									<motion.span
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										className='absolute -top-1 -right-1 w-5 h-5 bg-accent-blue rounded-full text-xs flex items-center justify-center font-semibold'
									>
										{getCartCount()}
									</motion.span>
								)}
							</button>

							{/* Profile */}
							<Link
								href='/profile'
								className='hidden sm:flex p-3 hover:bg-white/10 rounded-xl transition-colors group'
							>
								<User
									size={22}
									className='group-hover:text-accent-blue transition-colors'
								/>
							</Link>

							{/* Mobile Menu */}
							<button
								onClick={() => setMobileMenuOpen(true)}
								className='lg:hidden p-3 hover:bg-white/10 rounded-xl transition-colors'
							>
								<Menu size={22} />
							</button>
						</div>
					</div>
				</div>

				{/* Catalog Dropdown */}
				<AnimatePresence>
					{isCatalogOpen && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className='absolute top-full left-0 right-0 bg-primary-dark/98 backdrop-blur-xl border-t border-white/10 shadow-2xl'
						>
							<div className='container mx-auto px-6 py-8'>
								<div className='grid grid-cols-5 gap-6'>
									{categories.map(category => (
										<Link
											key={category.id}
											href={`/catalog/${category.id}`}
											onClick={() => setIsCatalogOpen(false)}
											className='group p-4 rounded-2xl hover:bg-white/5 transition-all'
										>
											<div className='category-icon mb-4 group-hover:scale-110 transition-transform'>
												<span className='text-3xl'>{category.icon}</span>
											</div>
											<div className='font-medium mb-1 group-hover:text-accent-blue transition-colors'>
												{category.name}
											</div>
											<div className='text-sm text-white/50'>
												{category.count} товаров
											</div>
										</Link>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</header>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 lg:hidden'
					>
						<div
							className='absolute inset-0 bg-black/60 backdrop-blur-sm'
							onClick={() => setMobileMenuOpen(false)}
						/>
						<motion.div
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'tween', duration: 0.3 }}
							className='absolute right-0 top-0 bottom-0 w-80 bg-primary-dark border-l border-white/10'
						>
							<div className='p-6'>
								<div className='flex items-center justify-between mb-8'>
									<span className='text-xl font-semibold'>Меню</span>
									<button
										onClick={() => setMobileMenuOpen(false)}
										className='p-2 hover:bg-white/10 rounded-lg transition-colors'
									>
										<X size={24} />
									</button>
								</div>

								<nav className='space-y-2'>
									{categories.map(category => (
										<Link
											key={category.id}
											href={`/catalog/${category.id}`}
											onClick={() => setMobileMenuOpen(false)}
											className='flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors'
										>
											<span className='text-2xl'>{category.icon}</span>
											<span>{category.name}</span>
										</Link>
									))}
								</nav>

								<div className='mt-8 pt-8 border-t border-white/10 space-y-4'>
									<Link
										href='/profile'
										className='flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors'
									>
										<User size={20} />
										<span>Личный кабинет</span>
									</Link>
									<Link
										href='/favorites'
										className='flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors'
									>
										<Heart size={20} />
										<span>Избранное ({favorites.length})</span>
									</Link>
									<Link
										href='/compare'
										className='flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors'
									>
										<BarChart2 size={20} />
										<span>Сравнение ({comparison.length})</span>
									</Link>
								</div>

								<div className='mt-8 pt-8 border-t border-white/10'>
									<a
										href='tel:88005553535'
										className='flex items-center gap-3 text-accent-blue'
									>
										<Phone size={20} />8 800 555-35-35
									</a>
									<p className='text-sm text-white/50 mt-2'>
										Ежедневно с 9:00 до 21:00
									</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Cart Sidebar */}
			<CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

			{/* Search Modal */}
			<SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
		</>
	)
}
