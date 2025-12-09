import React, { useEffect, useRef } from 'react'

function Philosophy() {
	const sectionRef = useRef(null)

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
	}, [])

	return (
		<section className='section philosophy' id='philosophy' ref={sectionRef}>
			<div className='section-header reveal'>
				<p className='section-subtitle'>Наша история</p>
				<h2 className='section-title'>Философия вкуса</h2>
			</div>

			<div className='section-divider'>
				<span className='divider-icon'>🍴</span>
			</div>

			<div className='philosophy-grid'>
				<div className='philosophy-image reveal'>
					{/* Chef Image Placeholder */}
					<div
						style={{
							width: '100%',
							height: '600px',
							background: `
              linear-gradient(135deg, rgba(74, 0, 0, 0.3) 0%, rgba(212, 175, 55, 0.1) 100%),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800"><rect fill="%23F5F5DC"/><text x="300" y="400" text-anchor="middle" fill="%23800000" font-family="serif" font-size="24">Шеф-повар</text></svg>')
            `,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ChefSVG />
					</div>
				</div>

				<div className='philosophy-content reveal'>
					<h3>
						Искусство гастрономии <span className='text-gold'>от сердца</span>
					</h3>
					<p>
						AURELIO — это не просто ресторан, это место, где каждое блюдо
						рассказывает свою историю. Наш шеф-повар Алексей Морозов, обладатель
						звезды Мишлен, создает кулинарные шедевры, сочетая классические
						техники с инновационным подходом.
					</p>
					<p>
						Мы верим, что настоящая кухня — это эмоции, воспоминания и открытия.
						Каждый ингредиент тщательно отбирается у проверенных фермеров, а
						каждое блюдо готовится с любовью и уважением к традициям.
					</p>

					<div className='philosophy-features'>
						<div className='philosophy-feature'>
							<div className='philosophy-feature-icon'>
								<LeafIcon />
							</div>
							<div>
								<h4>Фермерские продукты</h4>
								<p>Только свежие ингредиенты от локальных производителей</p>
							</div>
						</div>

						<div className='philosophy-feature'>
							<div className='philosophy-feature-icon'>
								<StarIcon />
							</div>
							<div>
								<h4>Звезда Мишлен</h4>
								<p>Признание международного гастрономического сообщества</p>
							</div>
						</div>

						<div className='philosophy-feature'>
							<div className='philosophy-feature-icon'>
								<WineIcon />
							</div>
							<div>
								<h4>Винная коллекция</h4>
								<p>Более 300 позиций из лучших виноделен мира</p>
							</div>
						</div>

						<div className='philosophy-feature'>
							<div className='philosophy-feature-icon'>
								<HeartIcon />
							</div>
							<div>
								<h4>Атмосфера уюта</h4>
								<p>Интерьер, созданный для особых моментов</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function ChefSVG() {
	return (
		<svg
			width='200'
			height='300'
			viewBox='0 0 200 300'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			{/* Chef hat */}
			<ellipse
				cx='100'
				cy='50'
				rx='60'
				ry='30'
				fill='#F5F5DC'
				stroke='#D4AF37'
				strokeWidth='2'
			/>
			<rect
				x='50'
				y='50'
				width='100'
				height='40'
				fill='#F5F5DC'
				stroke='#D4AF37'
				strokeWidth='2'
			/>
			<ellipse
				cx='100'
				cy='90'
				rx='50'
				ry='10'
				fill='#F5F5DC'
				stroke='#D4AF37'
				strokeWidth='2'
			/>

			{/* Face */}
			<ellipse cx='100' cy='120' rx='35' ry='40' fill='#E8D4B8' />

			{/* Chef body */}
			<path
				d='M50 180 Q100 160 150 180 L160 280 H40 L50 180Z'
				fill='#FFFFFF'
				stroke='#D4AF37'
				strokeWidth='2'
			/>

			{/* Buttons */}
			<circle cx='100' cy='200' r='5' fill='#D4AF37' />
			<circle cx='100' cy='225' r='5' fill='#D4AF37' />
			<circle cx='100' cy='250' r='5' fill='#D4AF37' />

			{/* Arms with tools */}
			<path
				d='M50 180 Q30 200 35 240'
				stroke='#FFFFFF'
				strokeWidth='15'
				fill='none'
			/>
			<path
				d='M150 180 Q170 200 165 240'
				stroke='#FFFFFF'
				strokeWidth='15'
				fill='none'
			/>

			{/* Knife */}
			<rect x='160' y='230' width='5' height='30' fill='#888' />
			<rect x='158' y='260' width='9' height='15' rx='2' fill='#4A0000' />

			{/* Pan */}
			<ellipse cx='30' cy='245' rx='20' ry='8' fill='#333' />
			<rect x='45' y='240' width='25' height='5' fill='#333' />
		</svg>
	)
}

function LeafIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z' />
		</svg>
	)
}

function StarIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
		</svg>
	)
}

function WineIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M6 3v6c0 2.97 2.16 5.43 5 5.91V19H8v2h8v-2h-3v-4.09c2.84-.48 5-2.94 5-5.91V3H6zm10 5H8V5h8v3z' />
		</svg>
	)
}

function HeartIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
		</svg>
	)
}

export default Philosophy
