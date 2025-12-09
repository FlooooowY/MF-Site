import React, { useState, useEffect, useRef } from 'react'

const wines = [
	{
		id: 1,
		name: 'Château Margaux 2015',
		origin: 'Бордо, Франция',
		type: 'red',
		grape: 'Каберне Совиньон',
		description:
			'Элегантное вино с нотами чёрной смородины, фиалки и дуба. Долгое бархатистое послевкусие.',
		price: '45 000 ₽',
		pairing: ['Стейк', 'Ягнёнок', 'Твёрдые сыры'],
	},
	{
		id: 2,
		name: 'Dom Pérignon 2012',
		origin: 'Шампань, Франция',
		type: 'sparkling',
		grape: 'Шардоне, Пино Нуар',
		description:
			'Изысканное шампанское с нотами цитрусовых, белых цветов и бриоши.',
		price: '35 000 ₽',
		pairing: ['Устрицы', 'Икра', 'Морепродукты'],
	},
	{
		id: 3,
		name: 'Tignanello 2018',
		origin: 'Тоскана, Италия',
		type: 'red',
		grape: 'Санджовезе',
		description:
			'Культовое супертосканское вино с нотами вишни, специй и ванили.',
		price: '28 000 ₽',
		pairing: ['Паста', 'Телятина', 'Грибы'],
	},
	{
		id: 4,
		name: 'Cloudy Bay 2022',
		origin: 'Мальборо, Новая Зеландия',
		type: 'white',
		grape: 'Совиньон Блан',
		description:
			'Свежее вино с яркими нотами маракуйи, грейпфрута и свежескошенной травы.',
		price: '6 500 ₽',
		pairing: ['Рыба', 'Салаты', 'Козий сыр'],
	},
	{
		id: 5,
		name: 'Barolo Riserva 2016',
		origin: 'Пьемонт, Италия',
		type: 'red',
		grape: 'Неббиоло',
		description: 'Мощное вино с нотами розы, смолы, трюфеля и сушёных фруктов.',
		price: '22 000 ₽',
		pairing: ['Трюфели', 'Дичь', 'Выдержанные сыры'],
	},
	{
		id: 6,
		name: 'Riesling Spätlese 2021',
		origin: 'Мозель, Германия',
		type: 'white',
		grape: 'Рислинг',
		description:
			'Полусладкое вино с нотами персика, мёда и минеральными оттенками.',
		price: '8 500 ₽',
		pairing: ['Фуа-гра', 'Азиатская кухня', 'Фрукты'],
	},
]

const filters = [
	{ id: 'all', name: 'Все вина' },
	{ id: 'red', name: 'Красные' },
	{ id: 'white', name: 'Белые' },
	{ id: 'sparkling', name: 'Игристые' },
]

function WineCard() {
	const [activeFilter, setActiveFilter] = useState('all')
	const [displayedWines, setDisplayedWines] = useState(wines)
	const [hoveredWine, setHoveredWine] = useState(null)
	const sectionRef = useRef(null)

	useEffect(() => {
		if (activeFilter === 'all') {
			setDisplayedWines(wines)
		} else {
			setDisplayedWines(wines.filter(w => w.type === activeFilter))
		}
	}, [activeFilter])

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible')
					}
				})
			},
			{ threshold: 0.1 }
		)

		const elements = sectionRef.current?.querySelectorAll('.reveal')
		elements?.forEach(el => observer.observe(el))

		return () => observer.disconnect()
	}, [displayedWines])

	return (
		<section className='section wine-section' id='wine' ref={sectionRef}>
			<div className='section-header reveal'>
				<p className='section-subtitle' style={{ color: 'var(--gold)' }}>
					Сомелье рекомендует
				</p>
				<h2 className='section-title'>Винная карта</h2>
			</div>

			<div
				className='section-divider'
				style={{ '--gold': 'rgba(255,255,255,0.3)' }}
			>
				<span className='divider-icon'>🍷</span>
			</div>

			<div className='wine-filters'>
				{filters.map(filter => (
					<button
						key={filter.id}
						className={`wine-filter-btn ${
							activeFilter === filter.id ? 'active' : ''
						}`}
						onClick={() => setActiveFilter(filter.id)}
					>
						{filter.name}
					</button>
				))}
			</div>

			<div className='wine-grid'>
				{displayedWines.map((wine, index) => (
					<div
						key={wine.id}
						className='wine-card reveal'
						style={{ animationDelay: `${index * 0.1}s` }}
						onMouseEnter={() => setHoveredWine(wine.id)}
						onMouseLeave={() => setHoveredWine(null)}
					>
						<div className='wine-card-image'>
							<WineBottle type={wine.type} />

							{/* Pour animation */}
							<div
								className='wine-pour'
								style={{
									height: hoveredWine === wine.id ? '100px' : '0',
									opacity: hoveredWine === wine.id ? 0.8 : 0,
									background:
										wine.type === 'white'
											? 'linear-gradient(to bottom, #F5E6C8, #E8D4A8)'
											: wine.type === 'sparkling'
											? 'linear-gradient(to bottom, #FFE4B5, #F5DEB3)'
											: 'linear-gradient(to bottom, #722F37, #8B0000)',
								}}
							/>
						</div>

						<h3 className='wine-card-name'>{wine.name}</h3>
						<p className='wine-card-origin'>
							{wine.origin} • {wine.grape}
						</p>
						<p className='wine-card-description'>{wine.description}</p>

						{/* Pairing suggestions */}
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: '6px',
								marginBottom: '15px',
							}}
						>
							{wine.pairing.map((item, i) => (
								<span
									key={i}
									style={{
										padding: '4px 10px',
										background: 'rgba(212, 175, 55, 0.2)',
										borderRadius: '20px',
										fontSize: '0.75rem',
										color: 'var(--gold)',
									}}
								>
									{item}
								</span>
							))}
						</div>

						<div className='wine-card-footer'>
							<span className='wine-card-price'>{wine.price}</span>
							<button
								style={{
									padding: '8px 16px',
									background: 'transparent',
									border: '1px solid var(--gold)',
									borderRadius: '20px',
									color: 'var(--gold)',
									fontFamily: 'var(--font-menu)',
									fontSize: '0.875rem',
									cursor: 'pointer',
									transition: 'all 0.3s ease',
								}}
							>
								В заказ
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Sommelier recommendation */}
			<div
				className='reveal'
				style={{
					marginTop: '60px',
					background: 'rgba(255, 255, 255, 0.05)',
					borderRadius: '20px',
					padding: '40px',
					maxWidth: '800px',
					margin: '60px auto 0',
					border: '1px solid rgba(212, 175, 55, 0.2)',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px' }}>
					<div
						style={{
							width: '80px',
							height: '80px',
							borderRadius: '50%',
							background: 'var(--gold-gradient)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexShrink: 0,
						}}
					>
						<span style={{ fontSize: '2rem' }}>🍇</span>
					</div>
					<div>
						<h4
							style={{
								color: 'var(--gold)',
								fontFamily: 'var(--font-display)',
								fontSize: '1.5rem',
								marginBottom: '10px',
							}}
						>
							Рекомендация сомелье
						</h4>
						<p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7' }}>
							"Для идеального ужина я рекомендую начать с бокала Cloudy Bay к
							морепродуктам, затем перейти к Tignanello с основным блюдом из
							телятины, и завершить вечер бокалом Dom Pérignon с десертом. Эта
							комбинация создаст незабываемое гастрономическое путешествие."
						</p>
						<p
							style={{
								color: 'var(--gold)',
								fontFamily: 'var(--font-menu)',
								marginTop: '15px',
								fontStyle: 'italic',
							}}
						>
							— Марко Росси, главный сомелье AURELIO
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

function WineBottle({ type }) {
	const getColor = () => {
		switch (type) {
			case 'white':
				return '#E8D4A8'
			case 'sparkling':
				return '#F5DEB3'
			default:
				return '#722F37'
		}
	}

	return (
		<svg
			width='80'
			height='200'
			viewBox='0 0 80 200'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			{/* Cork */}
			<rect x='32' y='5' width='16' height='20' fill='#8B7355' rx='2' />

			{/* Neck */}
			<rect x='34' y='25' width='12' height='40' fill='#1a1a1a' />

			{/* Capsule */}
			<rect
				x='32'
				y='20'
				width='16'
				height='15'
				fill={getColor()}
				opacity='0.8'
			/>

			{/* Body */}
			<path
				d='M34 65 L30 85 L30 180 Q30 190 40 190 Q50 190 50 180 L50 85 L46 65 Z'
				fill='#1a1a1a'
			/>

			{/* Wine level */}
			<path
				d='M31 95 L31 175 Q31 185 40 185 Q49 185 49 175 L49 95 Q40 100 31 95 Z'
				fill={getColor()}
				opacity='0.8'
			/>

			{/* Label */}
			<rect x='33' y='110' width='14' height='40' fill='#F5F5DC' rx='1' />
			<rect x='35' y='120' width='10' height='2' fill='#4A0000' />
			<rect x='35' y='125' width='10' height='1' fill='#888' />
			<rect x='35' y='128' width='10' height='1' fill='#888' />
			<rect x='35' y='131' width='10' height='1' fill='#888' />

			{/* Highlight */}
			<path
				d='M33 90 Q35 85 33 70'
				stroke='rgba(255,255,255,0.2)'
				strokeWidth='2'
				fill='none'
			/>
		</svg>
	)
}

export default WineCard
