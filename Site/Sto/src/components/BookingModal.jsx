import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	X,
	Calendar,
	Car,
	Upload,
	Check,
	ChevronRight,
	ChevronLeft,
	Clock,
	Phone,
	User,
} from 'lucide-react'
import './BookingModal.css'

const carBrands = [
	'Audi',
	'BMW',
	'Mercedes-Benz',
	'Volkswagen',
	'Toyota',
	'Honda',
	'Nissan',
	'Mazda',
	'Hyundai',
	'Kia',
	'Ford',
	'Chevrolet',
	'Skoda',
	'Renault',
	'Peugeot',
	'Citroen',
	'Volvo',
	'Lexus',
	'Infiniti',
	'Porsche',
	'Land Rover',
	'Jaguar',
	'Mini',
	'Mitsubishi',
]

const serviceTypes = [
	{ id: 'diagnostics', name: 'Диагностика', icon: '🔍' },
	{ id: 'engine', name: 'Ремонт двигателя', icon: '⚙️' },
	{ id: 'transmission', name: 'Ремонт КПП', icon: '🔧' },
	{ id: 'suspension', name: 'Ходовая часть', icon: '🛞' },
	{ id: 'brakes', name: 'Тормозная система', icon: '🛑' },
	{ id: 'electrical', name: 'Электрика', icon: '⚡' },
	{ id: 'maintenance', name: 'ТО', icon: '📋' },
	{ id: 'body', name: 'Кузовной ремонт', icon: '🚗' },
]

const timeSlots = [
	'09:00',
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

const BookingModal = ({ onClose }) => {
	const [step, setStep] = useState(1)
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		carBrand: '',
		carModel: '',
		carYear: '',
		service: '',
		description: '',
		date: '',
		time: '',
		files: [],
	})
	const [filteredBrands, setFilteredBrands] = useState([])
	const [showBrandDropdown, setShowBrandDropdown] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))

		if (name === 'carBrand') {
			const filtered = carBrands.filter(brand =>
				brand.toLowerCase().includes(value.toLowerCase())
			)
			setFilteredBrands(filtered)
			setShowBrandDropdown(value.length > 0)
		}
	}

	const selectBrand = brand => {
		setFormData(prev => ({ ...prev, carBrand: brand }))
		setShowBrandDropdown(false)
	}

	const selectService = serviceId => {
		setFormData(prev => ({ ...prev, service: serviceId }))
	}

	const handleFileUpload = e => {
		const files = Array.from(e.target.files)
		setFormData(prev => ({
			...prev,
			files: [...prev.files, ...files].slice(0, 5),
		}))
	}

	const removeFile = index => {
		setFormData(prev => ({
			...prev,
			files: prev.files.filter((_, i) => i !== index),
		}))
	}

	const nextStep = () => {
		if (step < 3) setStep(step + 1)
	}

	const prevStep = () => {
		if (step > 1) setStep(step - 1)
	}

	const handleSubmit = async () => {
		setIsSubmitting(true)
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500))
		setIsSubmitting(false)
		setIsSuccess(true)
	}

	const canProceed = () => {
		switch (step) {
			case 1:
				return formData.name && formData.phone && formData.carBrand
			case 2:
				return formData.service
			case 3:
				return formData.date && formData.time
			default:
				return false
		}
	}

	// Generate dates for next 14 days
	const availableDates = Array.from({ length: 14 }, (_, i) => {
		const date = new Date()
		date.setDate(date.getDate() + i)
		return date
	})

	const formatDate = date => {
		const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
		const months = [
			'янв',
			'фев',
			'мар',
			'апр',
			'май',
			'июн',
			'июл',
			'авг',
			'сен',
			'окт',
			'ноя',
			'дек',
		]
		return {
			day: days[date.getDay()],
			date: date.getDate(),
			month: months[date.getMonth()],
			full: date.toISOString().split('T')[0],
		}
	}

	return (
		<AnimatePresence>
			<motion.div
				className='modal-overlay'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
			>
				<motion.div
					className='booking-modal'
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 20 }}
					transition={{ type: 'spring', damping: 25, stiffness: 300 }}
					onClick={e => e.stopPropagation()}
				>
					<button className='modal-close' onClick={onClose}>
						<X size={24} />
					</button>

					{!isSuccess ? (
						<>
							{/* Progress Bar */}
							<div className='booking-progress'>
								<div className='progress-steps'>
									{[1, 2, 3].map(num => (
										<div
											key={num}
											className={`progress-step ${
												step >= num ? 'active' : ''
											} ${step === num ? 'current' : ''}`}
										>
											<div className='step-number'>
												{step > num ? <Check size={16} /> : num}
											</div>
											<span className='step-label'>
												{num === 1
													? 'Автомобиль'
													: num === 2
													? 'Услуга'
													: 'Время'}
											</span>
										</div>
									))}
								</div>
								<div className='progress-bar'>
									<div
										className='progress-fill'
										style={{ width: `${((step - 1) / 2) * 100}%` }}
									/>
								</div>
							</div>

							{/* Step Content */}
							<div className='booking-content'>
								<AnimatePresence mode='wait'>
									{step === 1 && (
										<motion.div
											key='step1'
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											className='booking-step'
										>
											<h2>Информация об автомобиле</h2>
											<p>Заполните данные о себе и вашем автомобиле</p>

											<div className='form-row'>
												<div className='form-group'>
													<label className='form-label'>
														<User size={16} />
														Ваше имя *
													</label>
													<input
														type='text'
														name='name'
														value={formData.name}
														onChange={handleInputChange}
														className='form-input'
														placeholder='Александр'
													/>
												</div>

												<div className='form-group'>
													<label className='form-label'>
														<Phone size={16} />
														Телефон *
													</label>
													<input
														type='tel'
														name='phone'
														value={formData.phone}
														onChange={handleInputChange}
														className='form-input'
														placeholder='+7 (999) 123-45-67'
													/>
												</div>
											</div>

											<div className='form-group brand-input-group'>
												<label className='form-label'>
													<Car size={16} />
													Марка автомобиля *
												</label>
												<input
													type='text'
													name='carBrand'
													value={formData.carBrand}
													onChange={handleInputChange}
													onFocus={() =>
														formData.carBrand && setShowBrandDropdown(true)
													}
													className='form-input'
													placeholder='Начните вводить марку...'
													autoComplete='off'
												/>
												{showBrandDropdown && filteredBrands.length > 0 && (
													<div className='brand-dropdown'>
														{filteredBrands.map(brand => (
															<button
																key={brand}
																className='brand-option'
																onClick={() => selectBrand(brand)}
															>
																{brand}
															</button>
														))}
													</div>
												)}
											</div>

											<div className='form-row'>
												<div className='form-group'>
													<label className='form-label'>Модель</label>
													<input
														type='text'
														name='carModel'
														value={formData.carModel}
														onChange={handleInputChange}
														className='form-input'
														placeholder='5 Series'
													/>
												</div>

												<div className='form-group'>
													<label className='form-label'>Год выпуска</label>
													<input
														type='text'
														name='carYear'
														value={formData.carYear}
														onChange={handleInputChange}
														className='form-input'
														placeholder='2020'
													/>
												</div>
											</div>
										</motion.div>
									)}

									{step === 2 && (
										<motion.div
											key='step2'
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											className='booking-step'
										>
											<h2>Выберите услугу</h2>
											<p>Укажите тип необходимого обслуживания</p>

											<div className='service-grid'>
												{serviceTypes.map(service => (
													<button
														key={service.id}
														className={`service-option ${
															formData.service === service.id ? 'selected' : ''
														}`}
														onClick={() => selectService(service.id)}
													>
														<span className='service-icon'>{service.icon}</span>
														<span className='service-name'>{service.name}</span>
														{formData.service === service.id && (
															<Check size={20} className='service-check' />
														)}
													</button>
												))}
											</div>

											<div className='form-group'>
												<label className='form-label'>Опишите проблему</label>
												<textarea
													name='description'
													value={formData.description}
													onChange={handleInputChange}
													className='form-textarea'
													placeholder='Опишите симптомы или проблему, которую вы заметили...'
													rows={3}
												/>
											</div>

											<div className='form-group'>
												<label className='form-label'>
													<Upload size={16} />
													Прикрепить фото/видео (до 5 файлов)
												</label>
												<div className='file-upload'>
													<input
														type='file'
														multiple
														accept='image/*,video/*'
														onChange={handleFileUpload}
														id='file-input'
														className='file-input'
													/>
													<label
														htmlFor='file-input'
														className='file-upload-label'
													>
														<Upload size={24} />
														<span>Перетащите файлы или нажмите для выбора</span>
													</label>
												</div>
												{formData.files.length > 0 && (
													<div className='file-list'>
														{formData.files.map((file, index) => (
															<div key={index} className='file-item'>
																<span>{file.name}</span>
																<button onClick={() => removeFile(index)}>
																	<X size={16} />
																</button>
															</div>
														))}
													</div>
												)}
											</div>
										</motion.div>
									)}

									{step === 3 && (
										<motion.div
											key='step3'
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											className='booking-step'
										>
											<h2>Выберите дату и время</h2>
											<p>Укажите удобное время для визита</p>

											<div className='date-picker'>
												<label className='form-label'>
													<Calendar size={16} />
													Выберите дату
												</label>
												<div className='date-grid'>
													{availableDates.map(date => {
														const formatted = formatDate(date)
														return (
															<button
																key={formatted.full}
																className={`date-option ${
																	formData.date === formatted.full
																		? 'selected'
																		: ''
																}`}
																onClick={() =>
																	setFormData(prev => ({
																		...prev,
																		date: formatted.full,
																	}))
																}
															>
																<span className='date-day'>
																	{formatted.day}
																</span>
																<span className='date-num'>
																	{formatted.date}
																</span>
																<span className='date-month'>
																	{formatted.month}
																</span>
															</button>
														)
													})}
												</div>
											</div>

											<div className='time-picker'>
												<label className='form-label'>
													<Clock size={16} />
													Выберите время
												</label>
												<div className='time-grid'>
													{timeSlots.map(time => (
														<button
															key={time}
															className={`time-option ${
																formData.time === time ? 'selected' : ''
															}`}
															onClick={() =>
																setFormData(prev => ({ ...prev, time }))
															}
														>
															{time}
														</button>
													))}
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							{/* Navigation */}
							<div className='booking-footer'>
								{step > 1 && (
									<button className='btn btn-ghost' onClick={prevStep}>
										<ChevronLeft size={20} />
										Назад
									</button>
								)}
								<div className='footer-spacer' />
								{step < 3 ? (
									<button
										className='btn btn-primary'
										onClick={nextStep}
										disabled={!canProceed()}
									>
										Далее
										<ChevronRight size={20} />
									</button>
								) : (
									<button
										className='btn btn-secondary'
										onClick={handleSubmit}
										disabled={!canProceed() || isSubmitting}
									>
										{isSubmitting ? 'Отправка...' : 'Записаться'}
									</button>
								)}
							</div>
						</>
					) : (
						<motion.div
							className='booking-success'
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
						>
							<div className='success-icon'>
								<Check size={48} />
							</div>
							<h2>Заявка отправлена!</h2>
							<p>
								Спасибо за обращение! Наш менеджер свяжется с вами в течение 15
								минут для подтверждения записи.
							</p>
							<div className='success-details'>
								<div className='detail-item'>
									<Calendar size={20} />
									<span>
										{formData.date} в {formData.time}
									</span>
								</div>
								<div className='detail-item'>
									<Car size={20} />
									<span>
										{formData.carBrand} {formData.carModel}
									</span>
								</div>
							</div>
							<button className='btn btn-primary' onClick={onClose}>
								Закрыть
							</button>
						</motion.div>
					)}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}

export default BookingModal
