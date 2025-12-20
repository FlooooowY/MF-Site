'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
	User,
	Phone,
	Mail,
	MapPin,
	CreditCard,
	Truck,
	Check,
	ChevronRight,
	ShoppingBag,
} from 'lucide-react'
import { useStore } from '@/store/useStore'

const steps = [
	{ id: 1, name: 'Контакты', icon: User },
	{ id: 2, name: 'Доставка', icon: Truck },
	{ id: 3, name: 'Оплата', icon: CreditCard },
]

export default function CheckoutPage() {
	const [currentStep, setCurrentStep] = useState(1)
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		deliveryType: 'courier',
		address: '',
		city: 'Москва',
		paymentMethod: 'card',
	})

	const { cart, getCartTotal, clearCart } = useStore()

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
	}

	const deliveryFee = getCartTotal() >= 5000 ? 0 : 299
	const total = getCartTotal() + deliveryFee

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = () => {
		if (currentStep < 3) {
			setCurrentStep(prev => prev + 1)
		} else {
			// Submit order
			alert('Заказ успешно оформлен!')
			clearCart()
		}
	}

	if (cart.length === 0) {
		return (
			<div className='min-h-screen pt-32 pb-20'>
				<div className='container mx-auto px-6'>
					<div className='max-w-lg mx-auto text-center py-20'>
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							className='w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8'
						>
							<ShoppingBag size={60} className='text-white/30' />
						</motion.div>
						<h1 className='font-clash text-3xl font-semibold mb-4'>
							Корзина пуста
						</h1>
						<p className='text-white/60 mb-8'>
							Добавьте товары для оформления заказа
						</p>
						<Link href='/catalog'>
							<button className='btn-glow'>Перейти в каталог</button>
						</Link>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen pt-32 pb-20'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-8'
				>
					<h1 className='font-clash text-display-md font-semibold mb-4'>
						Оформление заказа
					</h1>
				</motion.div>

				{/* Progress Steps */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className='flex items-center justify-center gap-4 mb-12'
				>
					{steps.map((step, index) => (
						<div key={step.id} className='flex items-center'>
							<button
								onClick={() => step.id < currentStep && setCurrentStep(step.id)}
								className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all ${
									step.id === currentStep
										? 'bg-accent-blue text-white'
										: step.id < currentStep
										? 'bg-green-500/20 text-green-400'
										: 'bg-white/5 text-white/40'
								}`}
							>
								{step.id < currentStep ? (
									<Check size={20} />
								) : (
									<step.icon size={20} />
								)}
								<span className='hidden sm:inline font-medium'>
									{step.name}
								</span>
							</button>
							{index < steps.length - 1 && (
								<ChevronRight size={20} className='mx-2 text-white/30' />
							)}
						</div>
					))}
				</motion.div>

				<div className='grid lg:grid-cols-3 gap-8'>
					{/* Form */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
						className='lg:col-span-2'
					>
						<div className='p-8 rounded-3xl bg-white/5 border border-white/10'>
							{/* Step 1: Contacts */}
							{currentStep === 1 && (
								<div className='space-y-6'>
									<h2 className='text-xl font-semibold mb-6'>
										Контактные данные
									</h2>

									<div>
										<label className='block text-sm text-white/60 mb-2'>
											Имя и фамилия
										</label>
										<div className='relative'>
											<User
												size={20}
												className='absolute left-4 top-1/2 -translate-y-1/2 text-white/40'
											/>
											<input
												type='text'
												name='name'
												value={formData.name}
												onChange={handleInputChange}
												placeholder='Иван Иванов'
												className='input-search pl-12'
											/>
										</div>
									</div>

									<div>
										<label className='block text-sm text-white/60 mb-2'>
											Телефон
										</label>
										<div className='relative'>
											<Phone
												size={20}
												className='absolute left-4 top-1/2 -translate-y-1/2 text-white/40'
											/>
											<input
												type='tel'
												name='phone'
												value={formData.phone}
												onChange={handleInputChange}
												placeholder='+7 (999) 123-45-67'
												className='input-search pl-12'
											/>
										</div>
									</div>

									<div>
										<label className='block text-sm text-white/60 mb-2'>
											Email
										</label>
										<div className='relative'>
											<Mail
												size={20}
												className='absolute left-4 top-1/2 -translate-y-1/2 text-white/40'
											/>
											<input
												type='email'
												name='email'
												value={formData.email}
												onChange={handleInputChange}
												placeholder='email@example.com'
												className='input-search pl-12'
											/>
										</div>
									</div>
								</div>
							)}

							{/* Step 2: Delivery */}
							{currentStep === 2 && (
								<div className='space-y-6'>
									<h2 className='text-xl font-semibold mb-6'>
										Способ доставки
									</h2>

									<div className='space-y-3'>
										{[
											{
												id: 'courier',
												name: 'Курьером',
												desc: 'Доставка до двери',
												price: deliveryFee,
											},
											{
												id: 'pickup',
												name: 'Самовывоз',
												desc: 'Из магазина или ПВЗ',
												price: 0,
											},
										].map(option => (
											<label
												key={option.id}
												className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
													formData.deliveryType === option.id
														? 'border-accent-blue bg-accent-blue/10'
														: 'border-white/10 hover:border-white/30'
												}`}
											>
												<input
													type='radio'
													name='deliveryType'
													value={option.id}
													checked={formData.deliveryType === option.id}
													onChange={handleInputChange}
													className='sr-only'
												/>
												<div
													className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
														formData.deliveryType === option.id
															? 'border-accent-blue'
															: 'border-white/30'
													}`}
												>
													{formData.deliveryType === option.id && (
														<div className='w-2.5 h-2.5 rounded-full bg-accent-blue' />
													)}
												</div>
												<div className='flex-1'>
													<div className='font-medium'>{option.name}</div>
													<div className='text-sm text-white/50'>
														{option.desc}
													</div>
												</div>
												<div
													className={option.price === 0 ? 'text-green-400' : ''}
												>
													{option.price === 0
														? 'Бесплатно'
														: formatPrice(option.price)}
												</div>
											</label>
										))}
									</div>

									{formData.deliveryType === 'courier' && (
										<div>
											<label className='block text-sm text-white/60 mb-2'>
												Адрес доставки
											</label>
											<div className='relative'>
												<MapPin
													size={20}
													className='absolute left-4 top-1/2 -translate-y-1/2 text-white/40'
												/>
												<input
													type='text'
													name='address'
													value={formData.address}
													onChange={handleInputChange}
													placeholder='ул. Примерная, д. 1, кв. 1'
													className='input-search pl-12'
												/>
											</div>
										</div>
									)}
								</div>
							)}

							{/* Step 3: Payment */}
							{currentStep === 3 && (
								<div className='space-y-6'>
									<h2 className='text-xl font-semibold mb-6'>Способ оплаты</h2>

									<div className='space-y-3'>
										{[
											{
												id: 'card',
												name: 'Банковская карта',
												desc: 'Visa, Mastercard, МИР',
											},
											{
												id: 'sbp',
												name: 'СБП',
												desc: 'Система быстрых платежей',
											},
											{ id: 'cash', name: 'Наличными', desc: 'При получении' },
										].map(option => (
											<label
												key={option.id}
												className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
													formData.paymentMethod === option.id
														? 'border-accent-blue bg-accent-blue/10'
														: 'border-white/10 hover:border-white/30'
												}`}
											>
												<input
													type='radio'
													name='paymentMethod'
													value={option.id}
													checked={formData.paymentMethod === option.id}
													onChange={handleInputChange}
													className='sr-only'
												/>
												<div
													className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
														formData.paymentMethod === option.id
															? 'border-accent-blue'
															: 'border-white/30'
													}`}
												>
													{formData.paymentMethod === option.id && (
														<div className='w-2.5 h-2.5 rounded-full bg-accent-blue' />
													)}
												</div>
												<div className='flex-1'>
													<div className='font-medium'>{option.name}</div>
													<div className='text-sm text-white/50'>
														{option.desc}
													</div>
												</div>
											</label>
										))}
									</div>
								</div>
							)}

							{/* Navigation */}
							<div className='flex justify-between mt-8 pt-6 border-t border-white/10'>
								{currentStep > 1 ? (
									<button
										onClick={() => setCurrentStep(prev => prev - 1)}
										className='btn-neon'
									>
										Назад
									</button>
								) : (
									<Link href='/cart'>
										<button className='btn-neon'>Вернуться в корзину</button>
									</Link>
								)}
								<button onClick={handleSubmit} className='btn-glow'>
									{currentStep === 3 ? 'Оформить заказ' : 'Продолжить'}
								</button>
							</div>
						</div>
					</motion.div>

					{/* Order Summary */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
						className='lg:col-span-1'
					>
						<div className='sticky top-32 p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10'>
							<h2 className='text-xl font-semibold mb-6'>Ваш заказ</h2>

							{/* Items */}
							<div className='space-y-4 mb-6 max-h-60 overflow-y-auto'>
								{cart.map(item => (
									<div
										key={item.product.id}
										className='flex items-center gap-3'
									>
										<div className='relative w-14 h-14 rounded-lg overflow-hidden bg-white/10 flex-shrink-0'>
											<Image
												src={item.product.image}
												alt={item.product.name}
												fill
												className='object-cover'
											/>
										</div>
										<div className='flex-1 min-w-0'>
											<div className='text-sm line-clamp-2'>
												{item.product.name}
											</div>
											<div className='text-xs text-white/50'>
												× {item.quantity}
											</div>
										</div>
										<div className='text-sm font-medium'>
											{formatPrice(item.product.price * item.quantity)}
										</div>
									</div>
								))}
							</div>

							{/* Summary */}
							<div className='space-y-3 py-4 border-t border-white/10'>
								<div className='flex justify-between text-sm'>
									<span className='text-white/60'>Товары ({cart.length})</span>
									<span>{formatPrice(getCartTotal())}</span>
								</div>
								<div className='flex justify-between text-sm'>
									<span className='text-white/60'>Доставка</span>
									<span className={deliveryFee === 0 ? 'text-green-400' : ''}>
										{deliveryFee === 0 ? 'Бесплатно' : formatPrice(deliveryFee)}
									</span>
								</div>
							</div>

							{/* Total */}
							<div className='flex justify-between items-end py-4 border-t border-white/10'>
								<span className='text-lg'>Итого:</span>
								<span className='price-tag text-2xl font-bold'>
									{formatPrice(total)}
								</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
