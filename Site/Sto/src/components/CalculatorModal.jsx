import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	X,
	Calculator,
	Car,
	Wrench,
	Check,
	TrendingDown,
	Shield,
} from 'lucide-react'
import './CalculatorModal.css'

const carBrands = {
	Audi: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8'],
	BMW: [
		'1 Series',
		'3 Series',
		'5 Series',
		'7 Series',
		'X1',
		'X3',
		'X5',
		'X6',
		'X7',
	],
	'Mercedes-Benz': [
		'A-Class',
		'C-Class',
		'E-Class',
		'S-Class',
		'GLA',
		'GLC',
		'GLE',
		'GLS',
	],
	Volkswagen: [
		'Golf',
		'Passat',
		'Tiguan',
		'Touareg',
		'Polo',
		'Jetta',
		'Arteon',
	],
	Toyota: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Prado', 'Highlander'],
	Lexus: ['ES', 'GS', 'IS', 'LS', 'NX', 'RX', 'LX', 'GX'],
	Porsche: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
	'Land Rover': [
		'Range Rover',
		'Range Rover Sport',
		'Discovery',
		'Defender',
		'Evoque',
	],
}

const services = [
	{
		id: 'oil-change',
		name: 'Замена масла',
		basePrice: 2500,
		dealerPrice: 5500,
		description: 'Замена масла и фильтра',
	},
	{
		id: 'brake-pads',
		name: 'Замена тормозных колодок',
		basePrice: 4500,
		dealerPrice: 12000,
		description: 'Передние или задние',
	},
	{
		id: 'diagnostics',
		name: 'Компьютерная диагностика',
		basePrice: 2500,
		dealerPrice: 4500,
		description: 'Полная диагностика систем',
	},
	{
		id: 'suspension',
		name: 'Ремонт подвески',
		basePrice: 8000,
		dealerPrice: 25000,
		description: 'Замена амортизаторов/рычагов',
	},
	{
		id: 'timing-belt',
		name: 'Замена ремня ГРМ',
		basePrice: 15000,
		dealerPrice: 35000,
		description: 'С роликами и помпой',
	},
	{
		id: 'clutch',
		name: 'Замена сцепления',
		basePrice: 18000,
		dealerPrice: 45000,
		description: 'Комплект сцепления',
	},
	{
		id: 'ac-service',
		name: 'Обслуживание кондиционера',
		basePrice: 3500,
		dealerPrice: 8000,
		description: 'Заправка и диагностика',
	},
	{
		id: 'engine-repair',
		name: 'Капитальный ремонт ДВС',
		basePrice: 80000,
		dealerPrice: 180000,
		description: 'Полный перебор двигателя',
	},
]

const brandMultipliers = {
	Audi: 1.2,
	BMW: 1.3,
	'Mercedes-Benz': 1.4,
	Volkswagen: 1.0,
	Toyota: 0.9,
	Lexus: 1.3,
	Porsche: 1.8,
	'Land Rover': 1.5,
}

const CalculatorModal = ({ onClose }) => {
	const [selectedBrand, setSelectedBrand] = useState('')
	const [selectedModel, setSelectedModel] = useState('')
	const [selectedService, setSelectedService] = useState(null)
	const [animatedPrice, setAnimatedPrice] = useState(0)
	const [animatedSavings, setAnimatedSavings] = useState(0)
	const priceRef = useRef(null)

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])

	const calculatePrice = () => {
		if (!selectedService || !selectedBrand)
			return { price: 0, dealerPrice: 0, savings: 0 }

		const service = services.find(s => s.id === selectedService)
		const multiplier = brandMultipliers[selectedBrand] || 1

		const price = Math.round(service.basePrice * multiplier)
		const dealerPrice = Math.round(service.dealerPrice * multiplier)
		const savings = dealerPrice - price

		return { price, dealerPrice, savings }
	}

	const { price, dealerPrice, savings } = calculatePrice()

	// Animate price changes
	useEffect(() => {
		const duration = 800
		const startPrice = animatedPrice
		const startSavings = animatedSavings
		const startTime = performance.now()

		const animate = currentTime => {
			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / duration, 1)
			const easeProgress = 1 - Math.pow(1 - progress, 3)

			setAnimatedPrice(
				Math.round(startPrice + (price - startPrice) * easeProgress)
			)
			setAnimatedSavings(
				Math.round(startSavings + (savings - startSavings) * easeProgress)
			)

			if (progress < 1) {
				requestAnimationFrame(animate)
			}
		}

		requestAnimationFrame(animate)
	}, [price, savings])

	const formatPrice = value => {
		return value.toLocaleString('ru-RU')
	}

	const savingsPercent =
		dealerPrice > 0 ? Math.round((savings / dealerPrice) * 100) : 0

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
					className='calculator-modal'
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 20 }}
					transition={{ type: 'spring', damping: 25, stiffness: 300 }}
					onClick={e => e.stopPropagation()}
				>
					<button className='modal-close' onClick={onClose}>
						<X size={24} />
					</button>

					<div className='calculator-header'>
						<div className='calculator-icon'>
							<Calculator size={28} />
						</div>
						<div>
							<h2>Калькулятор стоимости</h2>
							<p>Рассчитайте стоимость ремонта онлайн</p>
						</div>
					</div>

					<div className='calculator-body'>
						<div className='calculator-form'>
							{/* Brand Select */}
							<div className='form-group'>
								<label className='form-label'>
									<Car size={16} />
									Марка автомобиля
								</label>
								<select
									className='form-select'
									value={selectedBrand}
									onChange={e => {
										setSelectedBrand(e.target.value)
										setSelectedModel('')
									}}
								>
									<option value=''>Выберите марку</option>
									{Object.keys(carBrands).map(brand => (
										<option key={brand} value={brand}>
											{brand}
										</option>
									))}
								</select>
							</div>

							{/* Model Select */}
							<div className='form-group'>
								<label className='form-label'>Модель</label>
								<select
									className='form-select'
									value={selectedModel}
									onChange={e => setSelectedModel(e.target.value)}
									disabled={!selectedBrand}
								>
									<option value=''>Выберите модель</option>
									{selectedBrand &&
										carBrands[selectedBrand]?.map(model => (
											<option key={model} value={model}>
												{model}
											</option>
										))}
								</select>
							</div>

							{/* Service Select */}
							<div className='form-group'>
								<label className='form-label'>
									<Wrench size={16} />
									Тип услуги
								</label>
								<div className='service-list'>
									{services.map(service => (
										<button
											key={service.id}
											className={`service-item ${
												selectedService === service.id ? 'selected' : ''
											}`}
											onClick={() => setSelectedService(service.id)}
										>
											<div className='service-info'>
												<span className='service-name'>{service.name}</span>
												<span className='service-desc'>
													{service.description}
												</span>
											</div>
											{selectedService === service.id && (
												<Check size={20} className='service-check' />
											)}
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Results */}
						<div className='calculator-results'>
							<div className='result-card main-price' ref={priceRef}>
								<span className='result-label'>Стоимость у нас</span>
								<div className='result-value'>
									<span className='price-amount tech-text'>
										{formatPrice(animatedPrice)}
									</span>
									<span className='price-currency'>₽</span>
								</div>
								{selectedService && (
									<div className='price-breakdown'>
										<span>Запчасти + Работа</span>
									</div>
								)}
							</div>

							{selectedService && selectedBrand && (
								<>
									<div className='result-card dealer-price'>
										<span className='result-label'>У официального дилера</span>
										<div className='result-value crossed'>
											<span className='price-amount tech-text'>
												{formatPrice(dealerPrice)}
											</span>
											<span className='price-currency'>₽</span>
										</div>
									</div>

									<motion.div
										className='result-card savings'
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 }}
									>
										<div className='savings-icon'>
											<TrendingDown size={24} />
										</div>
										<div className='savings-info'>
											<span className='result-label'>Ваша экономия</span>
											<div className='result-value'>
												<span className='price-amount tech-text'>
													{formatPrice(animatedSavings)}
												</span>
												<span className='price-currency'>₽</span>
											</div>
										</div>
										<div className='savings-percent'>-{savingsPercent}%</div>
									</motion.div>

									<div className='guarantee-badge'>
										<Shield size={20} />
										<span>Гарантия 2 года на все работы</span>
									</div>
								</>
							)}

							{selectedService && selectedBrand && (
								<motion.button
									className='btn btn-secondary btn-lg calculator-cta'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3 }}
									onClick={() => {
										onClose()
										// Would open booking modal with pre-filled data
									}}
								>
									Записаться на ремонт
								</motion.button>
							)}

							{!selectedService && (
								<div className='calculator-placeholder'>
									<Calculator size={48} />
									<p>Выберите услугу для расчёта стоимости</p>
								</div>
							)}
						</div>
					</div>

					<div className='calculator-footer'>
						<p>* Окончательная стоимость определяется после диагностики</p>
						<p>* Цены указаны с учётом оригинальных запчастей</p>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}

export default CalculatorModal
