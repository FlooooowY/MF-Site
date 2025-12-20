'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
	Cpu,
	HardDrive,
	MemoryStick,
	Monitor,
	Fan,
	Box,
	Zap,
	Check,
	AlertTriangle,
	ShoppingCart,
	ChevronDown,
	X,
	RotateCcw,
} from 'lucide-react'
import { useStore } from '@/store/useStore'

interface Component {
	id: string
	name: string
	price: number
	image: string
	specs: string
	power?: number
	compatibility?: string[]
}

interface Category {
	id: string
	name: string
	icon: React.ReactNode
	required: boolean
	components: Component[]
}

const pcComponents: Category[] = [
	{
		id: 'cpu',
		name: 'Процессор',
		icon: <Cpu size={24} />,
		required: true,
		components: [
			{
				id: 'cpu-1',
				name: 'Intel Core i9-14900K',
				price: 52990,
				image:
					'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200',
				specs: '24 ядра, 6.0 ГГц',
				power: 125,
				compatibility: ['LGA1700'],
			},
			{
				id: 'cpu-2',
				name: 'Intel Core i7-14700K',
				price: 37990,
				image:
					'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200',
				specs: '20 ядер, 5.6 ГГц',
				power: 125,
				compatibility: ['LGA1700'],
			},
			{
				id: 'cpu-3',
				name: 'AMD Ryzen 9 7950X',
				price: 49990,
				image:
					'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200',
				specs: '16 ядер, 5.7 ГГц',
				power: 170,
				compatibility: ['AM5'],
			},
			{
				id: 'cpu-4',
				name: 'AMD Ryzen 7 7800X3D',
				price: 39990,
				image:
					'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200',
				specs: '8 ядер, 5.0 ГГц, 3D V-Cache',
				power: 120,
				compatibility: ['AM5'],
			},
		],
	},
	{
		id: 'gpu',
		name: 'Видеокарта',
		icon: <Monitor size={24} />,
		required: true,
		components: [
			{
				id: 'gpu-1',
				name: 'NVIDIA RTX 4090',
				price: 189990,
				image:
					'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200',
				specs: '24 ГБ GDDR6X',
				power: 450,
			},
			{
				id: 'gpu-2',
				name: 'NVIDIA RTX 4080 Super',
				price: 119990,
				image:
					'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200',
				specs: '16 ГБ GDDR6X',
				power: 320,
			},
			{
				id: 'gpu-3',
				name: 'NVIDIA RTX 4070 Ti Super',
				price: 79990,
				image:
					'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200',
				specs: '16 ГБ GDDR6X',
				power: 285,
			},
			{
				id: 'gpu-4',
				name: 'AMD RX 7900 XTX',
				price: 99990,
				image:
					'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200',
				specs: '24 ГБ GDDR6',
				power: 355,
			},
		],
	},
	{
		id: 'motherboard',
		name: 'Материнская плата',
		icon: <Box size={24} />,
		required: true,
		components: [
			{
				id: 'mb-1',
				name: 'ASUS ROG Maximus Z790',
				price: 59990,
				image:
					'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200',
				specs: 'Z790, DDR5',
				compatibility: ['LGA1700'],
			},
			{
				id: 'mb-2',
				name: 'MSI MEG Z790 ACE',
				price: 49990,
				image:
					'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200',
				specs: 'Z790, DDR5',
				compatibility: ['LGA1700'],
			},
			{
				id: 'mb-3',
				name: 'ASUS ROG Crosshair X670E',
				price: 54990,
				image:
					'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200',
				specs: 'X670E, DDR5',
				compatibility: ['AM5'],
			},
			{
				id: 'mb-4',
				name: 'Gigabyte X670E AORUS Master',
				price: 44990,
				image:
					'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200',
				specs: 'X670E, DDR5',
				compatibility: ['AM5'],
			},
		],
	},
	{
		id: 'ram',
		name: 'Оперативная память',
		icon: <MemoryStick size={24} />,
		required: true,
		components: [
			{
				id: 'ram-1',
				name: 'G.Skill Trident Z5 64GB',
				price: 24990,
				image:
					'https://images.unsplash.com/photo-1562976540-1502c2145186?w=200',
				specs: 'DDR5-6000, 2x32GB',
			},
			{
				id: 'ram-2',
				name: 'Corsair Dominator 32GB',
				price: 14990,
				image:
					'https://images.unsplash.com/photo-1562976540-1502c2145186?w=200',
				specs: 'DDR5-6400, 2x16GB',
			},
			{
				id: 'ram-3',
				name: 'Kingston Fury Beast 32GB',
				price: 11990,
				image:
					'https://images.unsplash.com/photo-1562976540-1502c2145186?w=200',
				specs: 'DDR5-5600, 2x16GB',
			},
		],
	},
	{
		id: 'storage',
		name: 'Накопитель',
		icon: <HardDrive size={24} />,
		required: true,
		components: [
			{
				id: 'ssd-1',
				name: 'Samsung 990 Pro 2TB',
				price: 19990,
				image:
					'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200',
				specs: 'NVMe, 7450 МБ/с',
			},
			{
				id: 'ssd-2',
				name: 'WD Black SN850X 2TB',
				price: 17990,
				image:
					'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200',
				specs: 'NVMe, 7300 МБ/с',
			},
			{
				id: 'ssd-3',
				name: 'Kingston KC3000 1TB',
				price: 9990,
				image:
					'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200',
				specs: 'NVMe, 7000 МБ/с',
			},
		],
	},
	{
		id: 'psu',
		name: 'Блок питания',
		icon: <Zap size={24} />,
		required: true,
		components: [
			{
				id: 'psu-1',
				name: 'Corsair RM1000x',
				price: 19990,
				image:
					'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200',
				specs: '1000 Вт, 80+ Gold',
				power: 1000,
			},
			{
				id: 'psu-2',
				name: 'Seasonic Prime TX-850',
				price: 24990,
				image:
					'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200',
				specs: '850 Вт, 80+ Titanium',
				power: 850,
			},
			{
				id: 'psu-3',
				name: 'be quiet! Dark Power 750',
				price: 14990,
				image:
					'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200',
				specs: '750 Вт, 80+ Platinum',
				power: 750,
			},
		],
	},
	{
		id: 'cooling',
		name: 'Охлаждение',
		icon: <Fan size={24} />,
		required: false,
		components: [
			{
				id: 'cool-1',
				name: 'NZXT Kraken Z73',
				price: 29990,
				image:
					'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200',
				specs: '360 мм AIO',
			},
			{
				id: 'cool-2',
				name: 'Noctua NH-D15',
				price: 11990,
				image:
					'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200',
				specs: 'Башенный кулер',
			},
			{
				id: 'cool-3',
				name: 'Arctic Liquid Freezer II',
				price: 9990,
				image:
					'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200',
				specs: '280 мм AIO',
			},
		],
	},
]

export default function ConfiguratorPage() {
	const [selectedComponents, setSelectedComponents] = useState<
		Record<string, Component>
	>({})
	const [expandedCategory, setExpandedCategory] = useState<string | null>('cpu')
	const { addToCart, setCartOpen } = useStore()

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
	}

	const totalPrice = useMemo(() => {
		return Object.values(selectedComponents).reduce(
			(sum, comp) => sum + comp.price,
			0
		)
	}, [selectedComponents])

	const totalPower = useMemo(() => {
		return Object.values(selectedComponents).reduce(
			(sum, comp) => sum + (comp.power || 0),
			0
		)
	}, [selectedComponents])

	const psuPower = selectedComponents.psu?.power || 0

	const compatibility = useMemo(() => {
		const cpu = selectedComponents.cpu
		const motherboard = selectedComponents.motherboard

		if (cpu && motherboard) {
			const cpuSocket = cpu.compatibility?.[0]
			const mbSocket = motherboard.compatibility?.[0]
			if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
				return {
					valid: false,
					message: `Несовместимость: ${cpu.name} (${cpuSocket}) и ${motherboard.name} (${mbSocket})`,
				}
			}
		}

		if (psuPower > 0 && totalPower > psuPower * 0.8) {
			return {
				valid: false,
				message: `Мощности БП может не хватить: требуется ~${totalPower} Вт, рекомендуется БП от ${Math.ceil(
					totalPower * 1.2
				)} Вт`,
			}
		}

		return { valid: true, message: 'Все компоненты совместимы' }
	}, [selectedComponents, totalPower, psuPower])

	const requiredCount = pcComponents.filter(c => c.required).length
	const selectedRequiredCount = pcComponents.filter(
		c => c.required && selectedComponents[c.id]
	).length
	const isComplete = selectedRequiredCount === requiredCount

	const selectComponent = (categoryId: string, component: Component) => {
		setSelectedComponents(prev => ({
			...prev,
			[categoryId]: component,
		}))
	}

	const removeComponent = (categoryId: string) => {
		setSelectedComponents(prev => {
			const next = { ...prev }
			delete next[categoryId]
			return next
		})
	}

	const resetConfig = () => {
		setSelectedComponents({})
	}

	const addConfigToCart = () => {
		Object.values(selectedComponents).forEach(component => {
			addToCart({
				id: component.id,
				name: component.name,
				category: 'components',
				price: component.price,
				image: component.image,
				rating: 4.8,
				reviewsCount: 100,
				inStock: true,
			})
		})
		setCartOpen(true)
	}

	return (
		<div className='min-h-screen pt-32 pb-20'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-center mb-12'
				>
					<h1 className='font-clash text-display-md font-semibold mb-4'>
						Конфигуратор ПК
					</h1>
					<p className='text-white/60 max-w-2xl mx-auto'>
						Соберите компьютер своей мечты. Мы проверим совместимость всех
						компонентов.
					</p>
				</motion.div>

				<div className='grid lg:grid-cols-3 gap-8'>
					{/* Components Selection */}
					<div className='lg:col-span-2 space-y-4'>
						{pcComponents.map((category, index) => (
							<motion.div
								key={category.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.05 }}
								className='rounded-2xl bg-white/5 border border-white/10 overflow-hidden'
							>
								{/* Category Header */}
								<button
									onClick={() =>
										setExpandedCategory(
											expandedCategory === category.id ? null : category.id
										)
									}
									className='w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors'
								>
									<div className='flex items-center gap-4'>
										<div
											className={`p-3 rounded-xl ${
												selectedComponents[category.id]
													? 'bg-green-500/20 text-green-400'
													: 'bg-accent-blue/20 text-accent-blue'
											}`}
										>
											{category.icon}
										</div>
										<div className='text-left'>
											<div className='flex items-center gap-2'>
												<span className='font-medium'>{category.name}</span>
												{category.required && (
													<span className='text-xs text-red-400'>*</span>
												)}
											</div>
											{selectedComponents[category.id] ? (
												<div className='text-sm text-white/60'>
													{selectedComponents[category.id].name}
												</div>
											) : (
												<div className='text-sm text-white/40'>Не выбрано</div>
											)}
										</div>
									</div>
									<div className='flex items-center gap-4'>
										{selectedComponents[category.id] && (
											<div className='text-right'>
												<div className='price-tag'>
													{formatPrice(selectedComponents[category.id].price)}
												</div>
												<button
													onClick={e => {
														e.stopPropagation()
														removeComponent(category.id)
													}}
													className='text-xs text-red-400 hover:underline'
												>
													Удалить
												</button>
											</div>
										)}
										<ChevronDown
											size={20}
											className={`text-white/50 transition-transform ${
												expandedCategory === category.id ? 'rotate-180' : ''
											}`}
										/>
									</div>
								</button>

								{/* Components List */}
								<AnimatePresence>
									{expandedCategory === category.id && (
										<motion.div
											initial={{ height: 0 }}
											animate={{ height: 'auto' }}
											exit={{ height: 0 }}
											className='overflow-hidden'
										>
											<div className='p-4 pt-0 grid gap-3'>
												{category.components.map(component => (
													<button
														key={component.id}
														onClick={() =>
															selectComponent(category.id, component)
														}
														className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
															selectedComponents[category.id]?.id ===
															component.id
																? 'border-accent-blue bg-accent-blue/10'
																: 'border-white/10 hover:border-white/30 hover:bg-white/5'
														}`}
													>
														<div className='relative w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0'>
															<Image
																src={component.image}
																alt={component.name}
																fill
																className='object-cover'
															/>
														</div>
														<div className='flex-1 min-w-0'>
															<div className='font-medium mb-1'>
																{component.name}
															</div>
															<div className='text-sm text-white/50'>
																{component.specs}
															</div>
															{component.power && (
																<div className='text-xs text-white/40 mt-1'>
																	TDP: {component.power} Вт
																</div>
															)}
														</div>
														<div className='text-right flex-shrink-0'>
															<div className='price-tag'>
																{formatPrice(component.price)}
															</div>
															{selectedComponents[category.id]?.id ===
																component.id && (
																<Check
																	size={16}
																	className='text-accent-blue ml-auto mt-1'
																/>
															)}
														</div>
													</button>
												))}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						))}
					</div>

					{/* Summary */}
					<div className='lg:col-span-1'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className='sticky top-32 p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10'
						>
							<h2 className='text-xl font-semibold mb-6'>Ваша сборка</h2>

							{/* Progress */}
							<div className='mb-6'>
								<div className='flex justify-between text-sm mb-2'>
									<span className='text-white/60'>Прогресс</span>
									<span>
										{selectedRequiredCount}/{requiredCount} обязательных
									</span>
								</div>
								<div className='progress-bar'>
									<div
										className='progress-bar-fill'
										style={{
											width: `${
												(selectedRequiredCount / requiredCount) * 100
											}%`,
										}}
									/>
								</div>
							</div>

							{/* Compatibility */}
							<div
								className={`mb-6 p-4 rounded-xl ${
									compatibility.valid
										? 'bg-green-500/10 border border-green-500/30'
										: 'bg-yellow-500/10 border border-yellow-500/30'
								}`}
							>
								<div className='flex items-start gap-3'>
									{compatibility.valid ? (
										<Check
											size={20}
											className='text-green-400 flex-shrink-0 mt-0.5'
										/>
									) : (
										<AlertTriangle
											size={20}
											className='text-yellow-400 flex-shrink-0 mt-0.5'
										/>
									)}
									<span
										className={`text-sm ${
											compatibility.valid ? 'text-green-400' : 'text-yellow-400'
										}`}
									>
										{compatibility.message}
									</span>
								</div>
							</div>

							{/* Power Consumption */}
							{totalPower > 0 && (
								<div className='mb-6 p-4 rounded-xl bg-white/5'>
									<div className='flex items-center justify-between text-sm'>
										<span className='text-white/60'>Энергопотребление</span>
										<span className='font-medium'>~{totalPower} Вт</span>
									</div>
								</div>
							)}

							{/* Selected Components */}
							<div className='space-y-3 mb-6'>
								{Object.entries(selectedComponents).map(
									([categoryId, component]) => (
										<div
											key={categoryId}
											className='flex items-center justify-between text-sm'
										>
											<span className='text-white/60 truncate mr-2'>
												{component.name}
											</span>
											<span className='flex-shrink-0'>
												{formatPrice(component.price)}
											</span>
										</div>
									)
								)}
							</div>

							{/* Total */}
							<div className='flex justify-between items-end py-4 border-t border-white/10 mb-6'>
								<span className='text-lg'>Итого:</span>
								<span className='price-tag text-3xl font-bold'>
									{formatPrice(totalPrice)}
								</span>
							</div>

							{/* Actions */}
							<button
								onClick={addConfigToCart}
								disabled={!isComplete || !compatibility.valid}
								className='btn-glow w-full flex items-center justify-center gap-2 py-4 mb-3 disabled:opacity-50 disabled:cursor-not-allowed'
							>
								<ShoppingCart size={18} />
								Добавить в корзину
							</button>

							<button
								onClick={resetConfig}
								className='w-full flex items-center justify-center gap-2 py-3 text-white/60 hover:text-white transition-colors'
							>
								<RotateCcw size={16} />
								Сбросить конфигурацию
							</button>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	)
}
