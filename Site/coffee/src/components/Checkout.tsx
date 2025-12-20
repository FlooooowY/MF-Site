'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	X,
	MapPin,
	Clock,
	CreditCard,
	Smartphone,
	Banknote,
	ArrowRight,
	ArrowLeft,
	ShoppingBag,
	Truck,
	Store,
	CheckCircle2,
	ExternalLink,
} from 'lucide-react'
import { useCartStore, CartItem } from '@/store/cartStore'

// Генерация доступных слотов времени
const generateTimeSlots = () => {
	const slots: string[] = []
	const now = new Date()
	const currentHour = now.getHours()
	const currentMinute = now.getMinutes()

	// Кофейня работает с 8:00 до 22:00
	for (let hour = 8; hour <= 21; hour++) {
		for (const minute of [0, 30]) {
			// Пропускаем прошедшее время + 30 минут на приготовление
			if (
				hour < currentHour ||
				(hour === currentHour && minute <= currentMinute + 30)
			) {
				continue
			}
			const time = `${hour.toString().padStart(2, '0')}:${minute
				.toString()
				.padStart(2, '0')}`
			slots.push(time)
		}
	}

	return slots.length > 0 ? slots : ['Завтра с 8:00']
}

const paymentMethods = [
	{
		id: 'card',
		name: 'Картой',
		icon: CreditCard,
		description: 'Visa, MC, Mir',
	},
	{ id: 'sbp', name: 'СБП', icon: Smartphone, description: 'Быстрый платёж' },
	{
		id: 'cash',
		name: 'Наличные',
		icon: Banknote,
		description: 'При получении',
	},
]

export default function Checkout() {
	const {
		items,
		isCheckoutOpen,
		closeCheckout,
		deliveryInfo,
		setDeliveryInfo,
		getTotalPrice,
		clearCart,
		openCart,
	} = useCartStore()

	const [step, setStep] = useState(1)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [address, setAddress] = useState('')
	const [phone, setPhone] = useState('')
	const [comment, setComment] = useState('')
	const [selectedTime, setSelectedTime] = useState('')

	const totalPrice = getTotalPrice()
	const timeSlots = generateTimeSlots()

	const handlePickupSubmit = async () => {
		if (!selectedTime || !deliveryInfo.paymentMethod) return

		setIsSubmitting(true)
		// Имитация отправки заказа
		await new Promise(resolve => setTimeout(resolve, 1500))

		setIsSuccess(true)
		setTimeout(() => {
			clearCart()
			closeCheckout()
			setIsSuccess(false)
			setStep(1)
		}, 3000)
	}

	const handleDeliverySubmit = () => {
		if (!address || !phone) return

		// Формируем данные для сервиса доставки
		const deliveryData = {
			items: items.map(item => ({
				name: item.name,
				size: item.size,
				quantity: item.quantity,
				price: item.price,
			})),
			address,
			phone,
			comment,
			total: totalPrice,
		}

		// Кодируем данные для URL
		const encodedData = encodeURIComponent(JSON.stringify(deliveryData))

		// Здесь можно настроить URL реального сервиса доставки
		// Например: Яндекс.Еда, Delivery Club, собственный сервис
		const deliveryServiceUrl = `https://delivery-service.example.com/order?data=${encodedData}`

		// Для демо — показываем alert с данными
		alert(
			`Перенаправление на сервис доставки...\n\nАдрес: ${address}\nТелефон: ${phone}\nСумма: ₽${totalPrice}\n\nВ реальном приложении откроется страница сервиса доставки с предзаполненными данными.`
		)

		// В реальном приложении:
		// window.open(deliveryServiceUrl, '_blank')

		clearCart()
		closeCheckout()
		setStep(1)
	}

	const goBack = () => {
		if (step === 1) {
			closeCheckout()
			openCart()
		} else {
			setStep(step - 1)
		}
	}

	return (
		<AnimatePresence>
			{isCheckoutOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={closeCheckout}
						className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
					/>

					{/* Checkout Panel */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ type: 'spring', damping: 25, stiffness: 200 }}
						className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-full md:max-w-lg bg-coffee-dark border border-gold-primary/20 rounded-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden shadow-2xl'
					>
						{/* Success State */}
						<AnimatePresence>
							{isSuccess && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className='absolute inset-0 bg-coffee-dark z-10 flex flex-col items-center justify-center p-8'
								>
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: 'spring', delay: 0.2 }}
									>
										<CheckCircle2 className='w-20 h-20 text-green-500 mb-6' />
									</motion.div>
									<h3 className='font-playfair text-2xl text-cream mb-2'>
										Заказ оформлен!
									</h3>
									<p className='text-cream/60 text-center'>
										Ожидайте ваш заказ к {selectedTime}
									</p>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Header */}
						<div className='flex items-center justify-between p-6 border-b border-cream/10'>
							<button
								onClick={goBack}
								className='p-2 text-cream/60 hover:text-cream transition-colors'
							>
								<ArrowLeft className='w-5 h-5' />
							</button>
							<h2 className='font-playfair text-xl font-bold text-cream'>
								Оформление заказа
							</h2>
							<button
								onClick={closeCheckout}
								className='p-2 text-cream/60 hover:text-cream transition-colors'
							>
								<X className='w-5 h-5' />
							</button>
						</div>

						{/* Progress */}
						<div className='px-6 py-4 border-b border-cream/10'>
							<div className='flex items-center gap-2'>
								<div
									className={`flex-1 h-1 rounded-full ${
										step >= 1 ? 'bg-gold-primary' : 'bg-cream/20'
									}`}
								/>
								<div
									className={`flex-1 h-1 rounded-full ${
										step >= 2 ? 'bg-gold-primary' : 'bg-cream/20'
									}`}
								/>
							</div>
						</div>

						{/* Content */}
						<div className='flex-1 overflow-y-auto p-6'>
							<AnimatePresence mode='wait'>
								{/* Step 1: Choose delivery type */}
								{step === 1 && (
									<motion.div
										key='step1'
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										className='space-y-4'
									>
										<h3 className='font-semibold text-cream mb-4'>
											Способ получения
										</h3>

										{/* Pickup Option */}
										<button
											onClick={() => {
												setDeliveryInfo({ type: 'pickup' })
												setStep(2)
											}}
											className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-start gap-4 ${
												deliveryInfo.type === 'pickup'
													? 'border-gold-primary bg-gold-primary/10'
													: 'border-cream/20 hover:border-cream/40'
											}`}
										>
											<div className='w-12 h-12 bg-gold-primary/20 rounded-xl flex items-center justify-center flex-shrink-0'>
												<Store className='w-6 h-6 text-gold-primary' />
											</div>
											<div>
												<div className='font-semibold text-cream'>
													Самовывоз
												</div>
												<div className='text-cream/60 text-sm'>
													Заберите заказ в кофейне
												</div>
												<div className='text-gold-primary text-sm mt-1'>
													Бесплатно • от 15 минут
												</div>
											</div>
										</button>

										{/* Delivery Option */}
										<button
											onClick={() => {
												setDeliveryInfo({ type: 'delivery' })
												setStep(2)
											}}
											className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-start gap-4 ${
												deliveryInfo.type === 'delivery'
													? 'border-gold-primary bg-gold-primary/10'
													: 'border-cream/20 hover:border-cream/40'
											}`}
										>
											<div className='w-12 h-12 bg-terracotta/20 rounded-xl flex items-center justify-center flex-shrink-0'>
												<Truck className='w-6 h-6 text-terracotta' />
											</div>
											<div>
												<div className='font-semibold text-cream'>Доставка</div>
												<div className='text-cream/60 text-sm'>
													Привезём по вашему адресу
												</div>
												<div className='text-terracotta text-sm mt-1'>
													Через сервис доставки
												</div>
											</div>
										</button>

										{/* Order Summary */}
										<div className='mt-6 p-4 bg-coffee-medium/30 rounded-xl'>
											<div className='flex items-center justify-between mb-3'>
												<span className='text-cream/70'>Ваш заказ:</span>
												<span className='text-cream/50 text-sm'>
													{items.length} позиц.
												</span>
											</div>
											<div className='space-y-2 max-h-32 overflow-y-auto'>
												{items.map(item => (
													<div
														key={`${item.id}-${item.size}`}
														className='flex items-center justify-between text-sm'
													>
														<span className='text-cream/80'>
															{item.name} ({item.size}) x{item.quantity}
														</span>
														<span className='text-cream/60'>
															₽{item.price * item.quantity}
														</span>
													</div>
												))}
											</div>
											<div className='mt-3 pt-3 border-t border-cream/10 flex items-center justify-between'>
												<span className='font-semibold text-cream'>Итого:</span>
												<span className='font-fraunces text-xl text-gold-primary'>
													₽{totalPrice}
												</span>
											</div>
										</div>
									</motion.div>
								)}

								{/* Step 2: Pickup Details */}
								{step === 2 && deliveryInfo.type === 'pickup' && (
									<motion.div
										key='step2-pickup'
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										className='space-y-6'
									>
										{/* Pickup Address */}
										<div className='p-4 bg-gold-primary/10 rounded-xl border border-gold-primary/30'>
											<div className='flex items-start gap-3'>
												<MapPin className='w-5 h-5 text-gold-primary flex-shrink-0 mt-0.5' />
												<div>
													<div className='font-semibold text-cream'>
														AROMA CRAFT COFFEE
													</div>
													<div className='text-cream/70 text-sm'>
														ул. Кофейная, 42
													</div>
													<div className='text-cream/50 text-xs mt-1'>
														Центральный район
													</div>
												</div>
											</div>
										</div>

										{/* Time Selection */}
										<div>
											<label className='flex items-center gap-2 text-cream font-medium mb-3'>
												<Clock className='w-4 h-4 text-gold-primary' />К какому
												времени?
											</label>
											<div className='grid grid-cols-4 gap-2'>
												{timeSlots.slice(0, 8).map(time => (
													<button
														key={time}
														onClick={() => setSelectedTime(time)}
														className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
															selectedTime === time
																? 'bg-gold-primary text-coffee-dark'
																: 'bg-cream/10 text-cream/70 hover:bg-cream/20'
														}`}
													>
														{time}
													</button>
												))}
											</div>
											{timeSlots.length > 8 && (
												<select
													value={selectedTime}
													onChange={e => setSelectedTime(e.target.value)}
													className='mt-2 w-full p-3 bg-cream/10 border border-cream/20 rounded-lg text-cream focus:border-gold-primary focus:outline-none'
												>
													<option value=''>Другое время...</option>
													{timeSlots.slice(8).map(time => (
														<option key={time} value={time}>
															{time}
														</option>
													))}
												</select>
											)}
										</div>

										{/* Payment Method */}
										<div>
											<label className='flex items-center gap-2 text-cream font-medium mb-3'>
												<CreditCard className='w-4 h-4 text-gold-primary' />
												Способ оплаты
											</label>
											<div className='space-y-2'>
												{paymentMethods.map(method => (
													<button
														key={method.id}
														onClick={() =>
															setDeliveryInfo({
																paymentMethod: method.id as
																	| 'card'
																	| 'sbp'
																	| 'cash',
															})
														}
														className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
															deliveryInfo.paymentMethod === method.id
																? 'border-gold-primary bg-gold-primary/10'
																: 'border-cream/20 hover:border-cream/40'
														}`}
													>
														<method.icon
															className={`w-5 h-5 ${
																deliveryInfo.paymentMethod === method.id
																	? 'text-gold-primary'
																	: 'text-cream/60'
															}`}
														/>
														<div className='text-left'>
															<div
																className={`font-medium ${
																	deliveryInfo.paymentMethod === method.id
																		? 'text-cream'
																		: 'text-cream/80'
																}`}
															>
																{method.name}
															</div>
															<div className='text-xs text-cream/50'>
																{method.description}
															</div>
														</div>
													</button>
												))}
											</div>
										</div>
									</motion.div>
								)}

								{/* Step 2: Delivery Details */}
								{step === 2 && deliveryInfo.type === 'delivery' && (
									<motion.div
										key='step2-delivery'
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										className='space-y-4'
									>
										<div className='p-4 bg-terracotta/10 rounded-xl border border-terracotta/30'>
											<div className='flex items-start gap-3'>
												<Truck className='w-5 h-5 text-terracotta flex-shrink-0 mt-0.5' />
												<div>
													<div className='font-semibold text-cream'>
														Доставка через партнёра
													</div>
													<div className='text-cream/70 text-sm'>
														После заполнения данных вы будете перенаправлены на
														сервис доставки
													</div>
												</div>
											</div>
										</div>

										{/* Address */}
										<div>
											<label className='flex items-center gap-2 text-cream font-medium mb-2'>
												<MapPin className='w-4 h-4 text-gold-primary' />
												Адрес доставки
											</label>
											<input
												type='text'
												value={address}
												onChange={e => setAddress(e.target.value)}
												placeholder='Улица, дом, квартира'
												className='w-full p-3 bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder:text-cream/40 focus:border-gold-primary focus:outline-none'
											/>
										</div>

										{/* Phone */}
										<div>
											<label className='flex items-center gap-2 text-cream font-medium mb-2'>
												<Smartphone className='w-4 h-4 text-gold-primary' />
												Телефон
											</label>
											<input
												type='tel'
												value={phone}
												onChange={e => setPhone(e.target.value)}
												placeholder='+7 (999) 123-45-67'
												className='w-full p-3 bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder:text-cream/40 focus:border-gold-primary focus:outline-none'
											/>
										</div>

										{/* Comment */}
										<div>
											<label className='text-cream font-medium mb-2 block'>
												Комментарий к заказу
											</label>
											<textarea
												value={comment}
												onChange={e => setComment(e.target.value)}
												placeholder='Код домофона, этаж и т.д.'
												rows={2}
												className='w-full p-3 bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder:text-cream/40 focus:border-gold-primary focus:outline-none resize-none'
											/>
										</div>

										{/* Order Summary Mini */}
										<div className='p-3 bg-coffee-medium/30 rounded-lg'>
											<div className='flex items-center justify-between'>
												<span className='text-cream/70'>
													Сумма заказа ({items.length} поз.):
												</span>
												<span className='font-fraunces text-lg text-gold-primary'>
													₽{totalPrice}
												</span>
											</div>
											<div className='text-cream/50 text-xs mt-1'>
												+ стоимость доставки рассчитается на сервисе
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Footer */}
						{step === 2 && (
							<div className='p-6 border-t border-cream/10'>
								{deliveryInfo.type === 'pickup' ? (
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={handlePickupSubmit}
										disabled={!selectedTime || isSubmitting}
										className='w-full btn-shine relative py-4 bg-terracotta text-cream font-semibold rounded-full shadow-button overflow-hidden flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
									>
										{isSubmitting ? (
											<>
												<div className='w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin' />
												<span>Оформляем...</span>
											</>
										) : (
											<>
												<ShoppingBag className='w-5 h-5' />
												<span>Оформить заказ • ₽{totalPrice}</span>
											</>
										)}
									</motion.button>
								) : (
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={handleDeliverySubmit}
										disabled={!address || !phone}
										className='w-full btn-shine relative py-4 bg-terracotta text-cream font-semibold rounded-full shadow-button overflow-hidden flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
									>
										<span>Перейти к доставке</span>
										<ExternalLink className='w-5 h-5' />
									</motion.button>
								)}
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
