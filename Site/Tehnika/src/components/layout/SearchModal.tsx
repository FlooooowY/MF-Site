'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Mic, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/products'

interface SearchModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
	const [query, setQuery] = useState('')
	const [isListening, setIsListening] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const popularSearches = [
		'iPhone 15',
		'MacBook Pro',
		'PlayStation 5',
		'AirPods',
		'Samsung Galaxy',
	]

	const recentSearches = ['Наушники Sony', 'Видеокарта RTX 4080', 'Apple Watch']

	const filteredProducts =
		query.length > 1
			? products
					.filter(
						p =>
							p.name.toLowerCase().includes(query.toLowerCase()) ||
							p.category.toLowerCase().includes(query.toLowerCase())
					)
					.slice(0, 5)
			: []

	useEffect(() => {
		if (isOpen && inputRef.current) {
			setTimeout(() => inputRef.current?.focus(), 100)
		}
	}, [isOpen])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onClose])

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
	}

	const startVoiceSearch = () => {
		if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
			setIsListening(true)
			const SpeechRecognition =
				(window as any).webkitSpeechRecognition ||
				(window as any).SpeechRecognition
			const recognition = new SpeechRecognition()
			recognition.lang = 'ru-RU'
			recognition.onresult = (event: any) => {
				const transcript = event.results[0][0].transcript
				setQuery(transcript)
				setIsListening(false)
			}
			recognition.onerror = () => setIsListening(false)
			recognition.onend = () => setIsListening(false)
			recognition.start()
		}
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-start justify-center pt-20 px-4'
				>
					{/* Backdrop */}
					<div
						className='absolute inset-0 bg-black/80 backdrop-blur-md'
						onClick={onClose}
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, y: -20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -20, scale: 0.95 }}
						transition={{ type: 'spring', duration: 0.5 }}
						className='relative w-full max-w-3xl bg-primary-dark border border-white/10 rounded-3xl shadow-2xl overflow-hidden'
					>
						{/* Search Input */}
						<div className='flex items-center gap-4 p-6 border-b border-white/10'>
							<Search size={24} className='text-accent-blue flex-shrink-0' />
							<input
								ref={inputRef}
								type='text'
								value={query}
								onChange={e => setQuery(e.target.value)}
								placeholder='Поиск товаров...'
								className='flex-1 bg-transparent text-xl outline-none placeholder:text-white/40'
							/>
							<button
								onClick={startVoiceSearch}
								className={`p-3 rounded-xl transition-all ${
									isListening
										? 'bg-accent-blue text-white animate-pulse'
										: 'hover:bg-white/10 text-white/50'
								}`}
							>
								<Mic size={20} />
							</button>
							<button
								onClick={onClose}
								className='p-3 hover:bg-white/10 rounded-xl transition-colors text-white/50'
							>
								<X size={20} />
							</button>
						</div>

						{/* Content */}
						<div className='max-h-[60vh] overflow-y-auto'>
							{filteredProducts.length > 0 ? (
								<div className='p-4'>
									<h3 className='text-sm text-white/50 mb-4 px-2'>Товары</h3>
									<div className='space-y-2'>
										{filteredProducts.map(product => (
											<Link
												key={product.id}
												href={`/product/${product.id}`}
												onClick={onClose}
												className='flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group'
											>
												<div className='relative w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0'>
													<Image
														src={product.image}
														alt={product.name}
														fill
														className='object-cover'
													/>
												</div>
												<div className='flex-1 min-w-0'>
													<h4 className='font-medium line-clamp-1 group-hover:text-accent-blue transition-colors'>
														{product.name}
													</h4>
													<p className='text-sm text-white/50'>
														{product.category}
													</p>
												</div>
												<div className='text-right'>
													<div className='price-tag'>
														{formatPrice(product.price)}
													</div>
													{product.oldPrice && (
														<div className='price-old text-sm'>
															{formatPrice(product.oldPrice)}
														</div>
													)}
												</div>
												<ArrowRight
													size={18}
													className='text-white/30 group-hover:text-accent-blue transition-colors'
												/>
											</Link>
										))}
									</div>
									<Link
										href={`/catalog?search=${query}`}
										onClick={onClose}
										className='flex items-center justify-center gap-2 mt-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-accent-blue'
									>
										Показать все результаты
										<ArrowRight size={18} />
									</Link>
								</div>
							) : (
								<div className='p-6 space-y-6'>
									{/* Popular */}
									<div>
										<h3 className='flex items-center gap-2 text-sm text-white/50 mb-3'>
											<TrendingUp size={16} />
											Популярные запросы
										</h3>
										<div className='flex flex-wrap gap-2'>
											{popularSearches.map(search => (
												<button
													key={search}
													onClick={() => setQuery(search)}
													className='px-4 py-2 rounded-full bg-white/5 hover:bg-accent-blue/20 hover:text-accent-blue border border-white/10 transition-all text-sm'
												>
													{search}
												</button>
											))}
										</div>
									</div>

									{/* Recent */}
									<div>
										<h3 className='flex items-center gap-2 text-sm text-white/50 mb-3'>
											<Clock size={16} />
											Недавние запросы
										</h3>
										<div className='space-y-1'>
											{recentSearches.map(search => (
												<button
													key={search}
													onClick={() => setQuery(search)}
													className='flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-colors text-left'
												>
													<Clock size={16} className='text-white/30' />
													<span>{search}</span>
												</button>
											))}
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Keyboard Shortcut Hint */}
						<div className='p-4 border-t border-white/10 flex items-center justify-center gap-4 text-sm text-white/40'>
							<span>
								Нажмите{' '}
								<kbd className='px-2 py-1 rounded bg-white/10 font-mono'>
									ESC
								</kbd>{' '}
								чтобы закрыть
							</span>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
