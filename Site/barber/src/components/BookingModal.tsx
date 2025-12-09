'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Calendar, Clock, User, Phone, Scissors } from 'lucide-react'
import { masters, services } from '@/lib/data'
import Confetti from './Confetti'
import { useSound } from '@/lib/sounds'

interface BookingModalProps {
	isOpen: boolean
	onClose: () => void
}

const timeSlots = [
	'10:00',
	'11:00',
	'12:00',
	'13:00',
	'14:00',
	'15:00',
	'16:00',
	'17:00',
	'18:00',
	'19:00',
	'20:00',
]

const occupiedSlots = ['12:00', '15:00', '18:00']

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
	const [step, setStep] = useState(1)
	const [selectedMaster, setSelectedMaster] = useState<string | null>(null)
	const [selectedService, setSelectedService] = useState<string | null>(null)
	const [selectedDate, setSelectedDate] = useState<string | null>(null)
	const [selectedTime, setSelectedTime] = useState<string | null>(null)
	const [formData, setFormData] = useState({ name: '', phone: '' })
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [showConfetti, setShowConfetti] = useState(false)
	const { playTick, playSuccess, playSwoosh } = useSound()

	const handleSubmit = async () => {
		setIsSubmitting(true)
		playSwoosh()
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500))
		setIsSubmitting(false)
		setIsSuccess(true)
		setShowConfetti(true)
		playSuccess()
	}

	const resetForm = () => {
		setStep(1)
		setSelectedMaster(null)
		setSelectedService(null)
		setSelectedDate(null)
		setSelectedTime(null)
		setFormData({ name: '', phone: '' })
		setIsSuccess(false)
		setShowConfetti(false)
	}

	const handleClose = () => {
		resetForm()
		onClose()
	}

	const handleStepChange = (newStep: number) => {
		playTick()
		setStep(newStep)
	}

	// Generate dates for next 14 days
	const dates = Array.from({ length: 14 }, (_, i) => {
		const date = new Date()
		date.setDate(date.getDate() + i)
		return date
	})

	const selectedMasterData = masters.find(m => m.id === selectedMaster)
	const selectedServiceData = services.find(s => s.id === selectedService)

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex items-center justify-center p-4'
				>
					{/* Confetti */}
					<Confetti isActive={showConfetti} />

					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='absolute inset-0 bg-obsidian/90 backdrop-blur-sm'
						onClick={handleClose}
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.3 }}
						className='relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card'
					>
						{/* Close Button */}
						<button
							onClick={handleClose}
							className='absolute top-4 right-4 p-2 text-ivory/50 hover:text-royal-gold transition-colors z-10'
						>
							<X className='w-6 h-6' />
						</button>

						{/* Success State with Stamp Animation */}
						{isSuccess ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								className='p-8 md:p-12 text-center relative'
							>
								{/* Stamp Animation */}
								<motion.div
									className='relative w-32 h-32 mx-auto mb-6'
									initial={{ scale: 3, rotate: -15, opacity: 0 }}
									animate={{ scale: 1, rotate: 0, opacity: 1 }}
									transition={{
										type: 'spring',
										stiffness: 300,
										damping: 15,
										delay: 0.2,
									}}
								>
									<div className='absolute inset-0 rounded-full border-4 border-emerald flex items-center justify-center'>
										<div className='text-center'>
											<motion.svg
												className='w-12 h-12 mx-auto text-emerald'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='3'
												initial={{ pathLength: 0 }}
												animate={{ pathLength: 1 }}
												transition={{ delay: 0.5, duration: 0.5 }}
											>
												<motion.path
													d='M5 13l4 4L19 7'
													strokeLinecap='round'
													strokeLinejoin='round'
													initial={{ pathLength: 0 }}
													animate={{ pathLength: 1 }}
													transition={{ delay: 0.5, duration: 0.5 }}
												/>
											</motion.svg>
											<motion.p
												className='font-roboto-mono text-xs text-emerald mt-1'
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.8 }}
											>
												ПОДТВЕРЖДЕНО
											</motion.p>
										</div>
									</div>
									{/* Stamp shadow */}
									<motion.div
										className='absolute inset-0 rounded-full bg-emerald/20 -z-10'
										initial={{ scale: 1.2 }}
										animate={{ scale: 1 }}
										transition={{ delay: 0.2, duration: 0.3 }}
									/>
								</motion.div>

								<motion.h3
									className='font-cormorant text-3xl font-semibold text-ivory mb-4'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6 }}
								>
									Запись подтверждена!
								</motion.h3>
								<motion.p
									className='text-smoke mb-8'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.7 }}
								>
									Мы отправили подтверждение на ваш телефон. До встречи в
									BROTHERHOOD!
								</motion.p>

								<motion.div
									className='glass-card p-6 mb-8 text-left'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.8 }}
								>
									<div className='grid grid-cols-2 gap-4 text-sm'>
										<div>
											<p className='text-smoke mb-1'>Мастер</p>
											<p className='text-ivory font-medium'>
												{selectedMasterData?.name}
											</p>
										</div>
										<div>
											<p className='text-smoke mb-1'>Услуга</p>
											<p className='text-ivory font-medium'>
												{selectedServiceData?.name}
											</p>
										</div>
										<div>
											<p className='text-smoke mb-1'>Дата</p>
											<p className='text-ivory font-medium'>
												{selectedDate &&
													new Date(selectedDate).toLocaleDateString('ru-RU', {
														weekday: 'long',
														day: 'numeric',
														month: 'long',
													})}
											</p>
										</div>
										<div>
											<p className='text-smoke mb-1'>Время</p>
											<p className='text-ivory font-medium'>{selectedTime}</p>
										</div>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.9 }}
									className='flex gap-4 justify-center'
								>
									<button onClick={handleClose} className='btn-primary'>
										Закрыть
									</button>
									<a
										href='https://t.me/brotherhood'
										target='_blank'
										rel='noopener noreferrer'
										className='btn-secondary'
									>
										Открыть в Telegram
									</a>
								</motion.div>
							</motion.div>
						) : (
							<div className='p-6 md:p-8'>
								{/* Header */}
								<div className='mb-8'>
									<h2 className='font-cormorant text-2xl md:text-3xl font-semibold text-ivory mb-2'>
										Запись к мастеру
									</h2>
									<div className='divider-gold w-16' />
								</div>

								{/* Progress Steps */}
								<div className='flex items-center justify-between mb-8'>
									{[1, 2, 3, 4].map(s => (
										<div key={s} className='flex items-center'>
											<motion.div
												className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
													step >= s
														? 'bg-royal-gold text-obsidian'
														: 'bg-royal-gold/20 text-ivory/50'
												}`}
												whileHover={step >= s ? { scale: 1.1 } : {}}
											>
												{step > s ? '✓' : s}
											</motion.div>
											{s < 4 && (
												<motion.div
													className='h-0.5 mx-2 bg-royal-gold/20'
													style={{ width: '60px' }}
													initial={{ scaleX: 0 }}
													animate={{
														scaleX: step > s ? 1 : 0,
														backgroundColor:
															step > s
																? 'rgb(212, 175, 55)'
																: 'rgba(212, 175, 55, 0.2)',
													}}
													transition={{ duration: 0.3 }}
												/>
											)}
										</div>
									))}
								</div>

								{/* Step 1: Select Master */}
								{step === 1 && (
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
									>
										<h3 className='font-montserrat text-lg text-ivory mb-4 flex items-center gap-2'>
											<User className='w-5 h-5 text-royal-gold' />
											Выберите мастера
										</h3>
										<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
											{masters.map(master => (
												<motion.button
													key={master.id}
													onClick={() => {
														setSelectedMaster(master.id)
														playTick()
													}}
													className={`p-4 rounded-lg border transition-all text-left ${
														selectedMaster === master.id
															? 'border-royal-gold bg-royal-gold/10'
															: 'border-royal-gold/20 hover:border-royal-gold/40'
													}`}
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
												>
													<div className='relative w-full aspect-square mb-3 rounded overflow-hidden'>
														<Image
															src={master.image}
															alt={master.name}
															fill
															className='object-cover'
														/>
														{selectedMaster === master.id && (
															<motion.div
																className='absolute inset-0 bg-royal-gold/20 flex items-center justify-center'
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
															>
																<div className='w-8 h-8 rounded-full bg-royal-gold flex items-center justify-center'>
																	<span className='text-obsidian text-lg'>
																		✓
																	</span>
																</div>
															</motion.div>
														)}
													</div>
													<p className='font-cormorant text-lg font-semibold text-ivory'>
														{master.name}
													</p>
													<p className='text-royal-gold text-sm'>
														{master.role}
													</p>
												</motion.button>
											))}
										</div>
									</motion.div>
								)}

								{/* Step 2: Select Service */}
								{step === 2 && (
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
									>
										<h3 className='font-montserrat text-lg text-ivory mb-4 flex items-center gap-2'>
											<Scissors className='w-5 h-5 text-royal-gold' />
											Выберите услугу
										</h3>
										<div className='space-y-3'>
											{services.map(service => (
												<motion.button
													key={service.id}
													onClick={() => {
														setSelectedService(service.id)
														playTick()
													}}
													className={`w-full p-4 rounded-lg border transition-all text-left flex items-center justify-between ${
														selectedService === service.id
															? 'border-royal-gold bg-royal-gold/10'
															: 'border-royal-gold/20 hover:border-royal-gold/40'
													}`}
													whileHover={{ scale: 1.01 }}
													whileTap={{ scale: 0.99 }}
												>
													<div className='flex items-center gap-4'>
														{selectedService === service.id && (
															<motion.div
																initial={{ scale: 0 }}
																animate={{ scale: 1 }}
																className='w-6 h-6 rounded-full bg-royal-gold flex items-center justify-center flex-shrink-0'
															>
																<span className='text-obsidian text-sm'>✓</span>
															</motion.div>
														)}
														<div>
															<p className='font-montserrat font-medium text-ivory'>
																{service.name}
															</p>
															<p className='text-smoke text-sm'>
																{service.duration}
															</p>
														</div>
													</div>
													<p className='font-roboto-mono text-royal-gold font-semibold'>
														{service.price.toLocaleString()} ₽
													</p>
												</motion.button>
											))}
										</div>
									</motion.div>
								)}

								{/* Step 3: Select Date & Time */}
								{step === 3 && (
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
									>
										<h3 className='font-montserrat text-lg text-ivory mb-4 flex items-center gap-2'>
											<Calendar className='w-5 h-5 text-royal-gold' />
											Выберите дату
										</h3>
										<div className='flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar'>
											{dates.map((date, index) => {
												const dateStr = date.toISOString().split('T')[0]
												const isSelected = selectedDate === dateStr
												const isPast = index === 0
												return (
													<motion.button
														key={dateStr}
														onClick={() => {
															setSelectedDate(dateStr)
															playTick()
														}}
														className={`flex-shrink-0 w-16 py-3 rounded-lg border text-center transition-all relative ${
															isSelected
																? 'border-royal-gold bg-royal-gold/10'
																: 'border-royal-gold/20 hover:border-royal-gold/40'
														}`}
														whileHover={{ scale: 1.05 }}
														whileTap={{ scale: 0.95 }}
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ delay: index * 0.03 }}
													>
														{isPast && (
															<div className='absolute inset-0 flex items-center justify-center'>
																<div className='w-full h-0.5 bg-burgundy/50 rotate-45' />
															</div>
														)}
														<p className='text-xs text-smoke'>
															{date.toLocaleDateString('ru-RU', {
																weekday: 'short',
															})}
														</p>
														<p className='font-roboto-mono text-xl text-ivory'>
															{date.getDate()}
														</p>
													</motion.button>
												)
											})}
										</div>

										<h3 className='font-montserrat text-lg text-ivory mb-4 flex items-center gap-2'>
											<Clock className='w-5 h-5 text-royal-gold' />
											Выберите время
										</h3>
										<div className='grid grid-cols-4 md:grid-cols-6 gap-2'>
											{timeSlots.map((time, index) => {
												const isOccupied = occupiedSlots.includes(time)
												const isSelected = selectedTime === time
												return (
													<motion.button
														key={time}
														onClick={() => {
															if (!isOccupied) {
																setSelectedTime(time)
																playTick()
															}
														}}
														disabled={isOccupied}
														className={`py-2 rounded-lg border text-center transition-all ${
															isOccupied
																? 'border-burgundy/30 text-smoke/30 cursor-not-allowed line-through'
																: isSelected
																? 'border-royal-gold bg-royal-gold/10 text-ivory'
																: 'border-royal-gold/20 text-ivory hover:border-royal-gold/40'
														}`}
														whileHover={!isOccupied ? { scale: 1.05 } : {}}
														whileTap={!isOccupied ? { scale: 0.95 } : {}}
														initial={{ opacity: 0, scale: 0.8 }}
														animate={{ opacity: 1, scale: 1 }}
														transition={{ delay: index * 0.02 }}
													>
														<span className='font-roboto-mono text-sm'>
															{time}
														</span>
													</motion.button>
												)
											})}
										</div>
									</motion.div>
								)}

								{/* Step 4: Contact Info */}
								{step === 4 && (
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
									>
										<h3 className='font-montserrat text-lg text-ivory mb-4 flex items-center gap-2'>
											<Phone className='w-5 h-5 text-royal-gold' />
											Ваши контакты
										</h3>
										<div className='space-y-4'>
											<div>
												<label className='block text-sm text-smoke mb-2'>
													Имя
												</label>
												<input
													type='text'
													value={formData.name}
													onChange={e =>
														setFormData({ ...formData, name: e.target.value })
													}
													placeholder='Как к вам обращаться?'
													className='w-full px-4 py-3 bg-deep-indigo/50 border border-royal-gold/20 rounded-lg text-ivory placeholder:text-smoke/50 focus:border-royal-gold focus:outline-none transition-colors'
												/>
											</div>
											<div>
												<label className='block text-sm text-smoke mb-2'>
													Телефон
												</label>
												<input
													type='tel'
													value={formData.phone}
													onChange={e =>
														setFormData({ ...formData, phone: e.target.value })
													}
													placeholder='+7 (999) 000-00-00'
													className='w-full px-4 py-3 bg-deep-indigo/50 border border-royal-gold/20 rounded-lg text-ivory placeholder:text-smoke/50 focus:border-royal-gold focus:outline-none transition-colors'
												/>
											</div>
										</div>

										{/* Summary */}
										<motion.div
											className='mt-6 p-4 bg-royal-gold/5 rounded-lg border border-royal-gold/10'
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.2 }}
										>
											<h4 className='text-sm text-smoke mb-3'>Ваша запись:</h4>
											<div className='space-y-2 text-sm'>
												<p className='text-ivory'>
													<span className='text-smoke'>Мастер:</span>{' '}
													{selectedMasterData?.name}
												</p>
												<p className='text-ivory'>
													<span className='text-smoke'>Услуга:</span>{' '}
													{selectedServiceData?.name}
												</p>
												<p className='text-ivory'>
													<span className='text-smoke'>Дата:</span>{' '}
													{selectedDate &&
														new Date(selectedDate).toLocaleDateString('ru-RU', {
															weekday: 'long',
															day: 'numeric',
															month: 'long',
														})}
												</p>
												<p className='text-ivory'>
													<span className='text-smoke'>Время:</span>{' '}
													{selectedTime}
												</p>
												<p className='text-royal-gold font-semibold pt-2 border-t border-royal-gold/10'>
													Стоимость:{' '}
													{selectedServiceData?.price.toLocaleString()} ₽
												</p>
											</div>
										</motion.div>
									</motion.div>
								)}

								{/* Navigation Buttons */}
								<div className='flex gap-4 mt-8'>
									{step > 1 && (
										<motion.button
											onClick={() => handleStepChange(step - 1)}
											className='btn-secondary flex-1'
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											Назад
										</motion.button>
									)}
									{step < 4 ? (
										<motion.button
											onClick={() => handleStepChange(step + 1)}
											disabled={
												(step === 1 && !selectedMaster) ||
												(step === 2 && !selectedService) ||
												(step === 3 && (!selectedDate || !selectedTime))
											}
											className='btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed'
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											Далее
										</motion.button>
									) : (
										<motion.button
											onClick={handleSubmit}
											disabled={
												!formData.name || !formData.phone || isSubmitting
											}
											className='btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed'
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											{isSubmitting ? (
												<span className='flex items-center justify-center gap-2'>
													<motion.span
														animate={{ rotate: 360 }}
														transition={{
															duration: 1,
															repeat: Infinity,
															ease: 'linear',
														}}
														className='w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full'
													/>
													Обработка...
												</span>
											) : (
												'★ Подтвердить запись ★'
											)}
										</motion.button>
									)}
								</div>
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
