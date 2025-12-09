import React, { useEffect, useRef } from 'react'

const reviews = [
	{
		id: 1,
		name: 'Александра М.',
		date: '15 ноября 2024',
		rating: 5,
		text: 'Невероятный вечер! Филе миньон буквально таяло во рту, а обслуживание было на высшем уровне. Обязательно вернёмся на годовщину!',
		dish: 'Филе миньон',
		avatar: null,
	},
	{
		id: 2,
		name: 'Дмитрий К.',
		date: '8 ноября 2024',
		rating: 5,
		text: 'Лучший ресторан для делового ужина. VIP-зона обеспечила приватность, а винная карта приятно удивила разнообразием.',
		dish: 'Лобстер термидор',
		avatar: null,
	},
	{
		id: 3,
		name: 'Елена В.',
		date: '1 ноября 2024',
		rating: 5,
		text: 'Тирамису — лучший из всех, что я пробовала! Атмосфера романтичная, свечи на столах создают особое настроение.',
		dish: 'Тирамису классический',
		avatar: null,
	},
]

function Reviews() {
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
		<section className='section reviews-section' id='reviews' ref={sectionRef}>
			<div className='section-header reveal'>
				<p className='section-subtitle'>Впечатления</p>
				<h2 className='section-title'>Отзывы гостей</h2>
			</div>

			<div className='section-divider'>
				<span className='divider-icon'>💬</span>
			</div>

			<div className='reviews-grid'>
				{reviews.map((review, index) => (
					<div
						key={review.id}
						className='review-card reveal'
						style={{ animationDelay: `${index * 0.15}s` }}
					>
						<div className='review-header'>
							<div
								style={{
									width: '60px',
									height: '60px',
									borderRadius: '50%',
									background: 'var(--burgundy-gradient)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: 'var(--gold)',
									fontFamily: 'var(--font-display)',
									fontSize: '1.5rem',
									border: '3px solid var(--gold)',
								}}
							>
								{review.name.charAt(0)}
							</div>
							<div className='review-author'>
								<h4>{review.name}</h4>
								<span className='review-date'>{review.date}</span>
							</div>
						</div>

						<div className='review-stars'>
							{[...Array(5)].map((_, i) => (
								<span key={i} style={{ opacity: i < review.rating ? 1 : 0.3 }}>
									★
								</span>
							))}
						</div>

						<p className='review-text'>"{review.text}"</p>

						<div className='review-dish'>
							<div
								style={{
									width: '80px',
									height: '80px',
									borderRadius: '8px',
									background: 'var(--burgundy-gradient)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<DishIcon />
							</div>
							<div>
								<span
									style={{
										fontSize: '0.75rem',
										color: 'var(--gold)',
										textTransform: 'uppercase',
										letterSpacing: '0.1em',
									}}
								>
									Заказанное блюдо
								</span>
								<p className='review-dish-name'>{review.dish}</p>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Rating summary */}
			<div
				className='reveal'
				style={{
					marginTop: '60px',
					textAlign: 'center',
				}}
			>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: '30px',
						background: 'var(--white)',
						padding: '30px 50px',
						borderRadius: '16px',
						boxShadow: 'var(--shadow-soft)',
					}}
				>
					<div>
						<div
							style={{
								fontSize: '3rem',
								fontFamily: 'var(--font-display)',
								color: 'var(--burgundy-deep)',
							}}
						>
							4.9
						</div>
						<div style={{ color: 'var(--gold)', fontSize: '1.25rem' }}>
							★★★★★
						</div>
					</div>
					<div
						style={{
							textAlign: 'left',
							paddingLeft: '30px',
							borderLeft: '2px solid var(--beige-dark)',
						}}
					>
						<div
							style={{
								fontSize: '1.5rem',
								fontWeight: '600',
								color: 'var(--charcoal)',
							}}
						>
							500+ отзывов
						</div>
						<div style={{ color: 'var(--charcoal-light)' }}>
							на Яндекс.Картах и Google
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function DishIcon() {
	return (
		<svg
			width='40'
			height='40'
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle cx='20' cy='22' r='14' fill='#F5F5DC' opacity='0.2' />
			<circle cx='20' cy='22' r='10' fill='#F5F5DC' opacity='0.3' />
			<ellipse cx='20' cy='20' rx='6' ry='3' fill='#D4AF37' opacity='0.5' />
		</svg>
	)
}

export default Reviews
