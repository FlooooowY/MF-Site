import React, { useState, useEffect, useRef } from 'react'

const menuData = {
	appetizers: [
		{
			id: 1,
			name: 'Тартар из тунца',
			description: 'Свежий тунец с авокадо, соусом понзу и икрой тобико',
			price: '1 890 ₽',
			weight: '180 г',
			isHot: false,
			image: null,
			tags: ['Рыба', 'Без глютена'],
		},
		{
			id: 2,
			name: 'Карпаччо из мраморной говядины',
			description:
				'Тонко нарезанная говядина с рукколой, пармезаном и трюфельным маслом',
			price: '1 650 ₽',
			weight: '150 г',
			isHot: false,
			image: null,
			tags: ['Мясо', 'Без глютена'],
		},
		{
			id: 3,
			name: 'Том Ям с морепродуктами',
			description: 'Острый тайский суп с креветками, мидиями и кальмарами',
			price: '890 ₽',
			weight: '350 мл',
			isHot: true,
			image: null,
			tags: ['Морепродукты', 'Острое'],
		},
		{
			id: 4,
			name: 'Брускетта с прошутто',
			description: 'Хрустящий хлеб с пармской ветчиной, инжиром и козьим сыром',
			price: '750 ₽',
			weight: '160 г',
			isHot: false,
			image: null,
			tags: ['Мясо'],
		},
	],
	main: [
		{
			id: 5,
			name: 'Филе миньон',
			description:
				'Нежнейшая вырезка на гриле с соусом из красного вина и овощами гриль',
			price: '3 890 ₽',
			weight: '250 г',
			isHot: true,
			image: null,
			tags: ['Мясо', 'Без глютена'],
		},
		{
			id: 6,
			name: 'Лобстер термидор',
			description: 'Целый лобстер, запечённый в сливочном соусе с пармезаном',
			price: '5 900 ₽',
			weight: '450 г',
			isHot: true,
			image: null,
			tags: ['Морепродукты'],
		},
		{
			id: 7,
			name: 'Ризотто с белыми грибами',
			description: 'Кремовое ризотто с белыми грибами и трюфельным маслом',
			price: '1 450 ₽',
			weight: '320 г',
			isHot: true,
			image: null,
			tags: ['Вегетарианское'],
		},
		{
			id: 8,
			name: 'Утиная грудка су-вид',
			description: 'Утиная грудка с вишнёвым соусом и пюре из сельдерея',
			price: '2 450 ₽',
			weight: '280 г',
			isHot: true,
			image: null,
			tags: ['Мясо', 'Без глютена'],
		},
	],
	desserts: [
		{
			id: 9,
			name: 'Тирамису классический',
			description: 'Традиционный итальянский десерт с маскарпоне и кофе',
			price: '650 ₽',
			weight: '180 г',
			isHot: false,
			image: null,
			tags: ['Десерт'],
		},
		{
			id: 10,
			name: 'Крем-брюле',
			description: 'Нежный ванильный крем с хрустящей карамельной корочкой',
			price: '550 ₽',
			weight: '150 г',
			isHot: false,
			image: null,
			tags: ['Десерт', 'Без глютена'],
		},
		{
			id: 11,
			name: 'Шоколадный фондан',
			description: 'Тёплый шоколадный кекс с жидкой начинкой и мороженым',
			price: '750 ₽',
			weight: '200 г',
			isHot: true,
			image: null,
			tags: ['Десерт'],
		},
		{
			id: 12,
			name: 'Сорбет из маракуйи',
			description: 'Освежающий сорбет с тропическим вкусом и мятой',
			price: '450 ₽',
			weight: '120 г',
			isHot: false,
			image: null,
			tags: ['Десерт', 'Веганское'],
		},
	],
}

const categories = [
	{ id: 'all', name: 'Все блюда' },
	{ id: 'appetizers', name: 'Закуски' },
	{ id: 'main', name: 'Основные блюда' },
	{ id: 'desserts', name: 'Десерты' },
]

function Menu() {
	const [activeCategory, setActiveCategory] = useState('all')
	const [displayedItems, setDisplayedItems] = useState([])
	const sectionRef = useRef(null)

	useEffect(() => {
		if (activeCategory === 'all') {
			setDisplayedItems([
				...menuData.appetizers,
				...menuData.main,
				...menuData.desserts,
			])
		} else {
			setDisplayedItems(menuData[activeCategory] || [])
		}
	}, [activeCategory])

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
	}, [displayedItems])

	return (
		<section className='section menu-section' id='menu' ref={sectionRef}>
			<div className='section-header reveal'>
				<p className='section-subtitle'>Гастрономия</p>
				<h2 className='section-title'>Наше меню</h2>
			</div>

			<div className='section-divider'>
				<span className='divider-icon'>🍽️</span>
			</div>

			<div className='menu-categories'>
				{categories.map(cat => (
					<button
						key={cat.id}
						className={`menu-category-btn ${
							activeCategory === cat.id ? 'active' : ''
						}`}
						onClick={() => setActiveCategory(cat.id)}
					>
						{cat.name}
					</button>
				))}
			</div>

			<div className='menu-grid'>
				{displayedItems.map((item, index) => (
					<MenuCard key={item.id} item={item} index={index} />
				))}
			</div>
		</section>
	)
}

function MenuCard({ item, index }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className='menu-card reveal'
			style={{ animationDelay: `${index * 0.1}s` }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className='menu-card-inner'>
				<div className='menu-card-image'>
					{/* Placeholder image with gradient */}
					<div
						style={{
							width: '100%',
							height: '100%',
							background: `
              linear-gradient(135deg, 
                rgba(128, 0, 0, 0.7) 0%, 
                rgba(74, 0, 0, 0.8) 50%,
                rgba(212, 175, 55, 0.3) 100%
              )
            `,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<DishIcon />
					</div>

					{/* Steam effect for hot dishes */}
					{item.isHot && (
						<div className='menu-card-steam'>
							<div className='steam-line'></div>
							<div className='steam-line'></div>
							<div className='steam-line'></div>
						</div>
					)}

					{/* Aroma effect */}
					<div className='menu-card-aroma'>
						<div className='aroma-wave'></div>
						<div className='aroma-wave'></div>
						<div className='aroma-wave'></div>
					</div>
				</div>

				<div className='menu-card-content'>
					<span className='menu-card-category'>{item.tags[0]}</span>
					<h3 className='menu-card-title'>{item.name}</h3>
					<p className='menu-card-description'>{item.description}</p>

					<div
						className='menu-card-tags'
						style={{
							display: 'flex',
							gap: '8px',
							marginBottom: '16px',
							flexWrap: 'wrap',
						}}
					>
						{item.tags.slice(1).map((tag, i) => (
							<span
								key={i}
								style={{
									padding: '4px 8px',
									background: 'var(--beige)',
									borderRadius: '4px',
									fontSize: '0.75rem',
									color: 'var(--charcoal-light)',
								}}
							>
								{tag}
							</span>
						))}
					</div>

					<div className='menu-card-footer'>
						<span className='menu-card-price'>{item.price}</span>
						<span className='menu-card-weight'>{item.weight}</span>
					</div>
				</div>
			</div>

			{/* Book open effect overlay */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
					pointerEvents: 'none',
					opacity: isHovered ? 1 : 0,
					transition: 'opacity 0.3s ease',
				}}
			/>
		</div>
	)
}

function DishIcon() {
	return (
		<svg
			width='120'
			height='120'
			viewBox='0 0 120 120'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			{/* Plate */}
			<ellipse
				cx='60'
				cy='70'
				rx='50'
				ry='20'
				fill='#F5F5DC'
				stroke='#D4AF37'
				strokeWidth='2'
			/>
			<ellipse
				cx='60'
				cy='65'
				rx='40'
				ry='15'
				fill='#FDF8F0'
				stroke='#D4AF37'
				strokeWidth='1'
			/>

			{/* Food on plate */}
			<ellipse cx='60' cy='60' rx='25' ry='10' fill='#8B4513' />
			<ellipse cx='60' cy='58' rx='20' ry='8' fill='#A0522D' />

			{/* Garnish */}
			<circle cx='45' cy='55' r='5' fill='#2E8B57' />
			<circle cx='75' cy='55' r='5' fill='#2E8B57' />
			<circle cx='60' cy='50' r='3' fill='#D4AF37' />

			{/* Fork */}
			<g transform='translate(15, 30) rotate(-30)'>
				<rect x='0' y='0' width='3' height='40' fill='#D4AF37' />
				<rect x='-2' y='0' width='2' height='15' fill='#D4AF37' />
				<rect x='3' y='0' width='2' height='15' fill='#D4AF37' />
			</g>

			{/* Knife */}
			<g transform='translate(100, 30) rotate(30)'>
				<rect x='0' y='0' width='4' height='40' fill='#D4AF37' />
				<path d='M0 0 L4 0 L4 15 L0 20 Z' fill='#D4AF37' />
			</g>
		</svg>
	)
}

export default Menu
