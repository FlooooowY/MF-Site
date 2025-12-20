import React, { useState, useEffect, useRef } from 'react'

const galleryItems = [
	{ id: 1, title: 'Интерьер зала', category: 'interior', size: 'large' },
	{ id: 2, title: 'Терраса', category: 'interior', size: 'small' },
	{ id: 3, title: 'VIP-зона', category: 'interior', size: 'small' },
	{ id: 4, title: 'Фирменное блюдо', category: 'food', size: 'small' },
	{ id: 5, title: 'Десерты', category: 'food', size: 'small' },
	{ id: 6, title: 'Бар', category: 'interior', size: 'small' },
]

const colors = [
	'linear-gradient(135deg, #800000 0%, #4A0000 100%)',
	'linear-gradient(135deg, #2E8B57 0%, #1F5F3D 100%)',
	'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
	'linear-gradient(135deg, #4A0000 0%, #2C2C2C 100%)',
	'linear-gradient(135deg, #8B4513 0%, #5D2E0D 100%)',
	'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
]

function Gallery() {
	const [selectedImage, setSelectedImage] = useState(null)
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
		<section className='section gallery-section' id='gallery' ref={sectionRef}>
			<div className='section-header reveal'>
				<p className='section-subtitle' style={{ color: 'var(--gold)' }}>
					Атмосфера
				</p>
				<h2 className='section-title' style={{ color: 'var(--white)' }}>
					Галерея
				</h2>
			</div>

			<div
				className='section-divider'
				style={{ '--gold': 'rgba(255,255,255,0.3)' }}
			>
				<span className='divider-icon'>📷</span>
			</div>

			<div className='gallery-grid'>
				{galleryItems.map((item, index) => (
					<div
						key={item.id}
						className={`gallery-item reveal ${
							item.size === 'large' ? 'large' : ''
						}`}
						style={{ animationDelay: `${index * 0.1}s` }}
						onClick={() => setSelectedImage(item)}
					>
						{/* Placeholder image */}
						<div
							style={{
								width: '100%',
								height: '100%',
								background: colors[index % colors.length],
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							<GalleryIcon type={item.category} />

							{/* Animated overlay pattern */}
							<div
								style={{
									position: 'absolute',
									inset: 0,
									backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)
                `,
									opacity: 0.8,
								}}
							/>
						</div>

						<div className='gallery-item-caption'>
							<h4
								style={{
									fontFamily: 'var(--font-display)',
									fontSize: '1.25rem',
									marginBottom: '4px',
								}}
							>
								{item.title}
							</h4>
							<p
								style={{
									fontSize: '0.875rem',
									opacity: 0.7,
									textTransform: 'uppercase',
									letterSpacing: '0.1em',
								}}
							>
								{item.category === 'interior' ? 'Интерьер' : 'Кухня'}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Lightbox Modal */}
			{selectedImage && (
				<div
					className='modal-overlay active'
					onClick={() => setSelectedImage(null)}
				>
					<div
						className='modal'
						style={{
							maxWidth: '900px',
							background: 'transparent',
							boxShadow: 'none',
						}}
						onClick={e => e.stopPropagation()}
					>
						<div
							style={{
								width: '100%',
								height: '500px',
								background:
									colors[
										galleryItems.findIndex(i => i.id === selectedImage.id) %
											colors.length
									],
								borderRadius: '16px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
							}}
						>
							<GalleryIcon type={selectedImage.category} large />

							<button
								onClick={() => setSelectedImage(null)}
								style={{
									position: 'absolute',
									top: '20px',
									right: '20px',
									width: '50px',
									height: '50px',
									borderRadius: '50%',
									background: 'rgba(0,0,0,0.5)',
									color: 'white',
									border: 'none',
									cursor: 'pointer',
									fontSize: '24px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								×
							</button>
						</div>

						<div
							style={{
								textAlign: 'center',
								padding: '20px',
								color: 'white',
							}}
						>
							<h3
								style={{
									fontFamily: 'var(--font-display)',
									fontSize: '1.5rem',
									marginBottom: '8px',
								}}
							>
								{selectedImage.title}
							</h3>
							<p style={{ opacity: 0.7 }}>
								{selectedImage.category === 'interior'
									? 'Изысканный интерьер AURELIO'
									: 'Кулинарные шедевры от шеф-повара'}
							</p>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

function GalleryIcon({ type, large = false }) {
	const size = large ? 150 : 80

	if (type === 'food') {
		return (
			<svg
				width={size}
				height={size}
				viewBox='0 0 100 100'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<circle cx='50' cy='55' r='35' fill='#F5F5DC' opacity='0.9' />
				<circle cx='50' cy='55' r='28' fill='#FDF8F0' />
				<ellipse cx='50' cy='50' rx='20' ry='10' fill='#8B4513' />
				<ellipse cx='50' cy='48' rx='15' ry='7' fill='#A0522D' />
				<circle cx='42' cy='45' r='4' fill='#2E8B57' />
				<circle cx='58' cy='45' r='4' fill='#2E8B57' />
				<circle cx='50' cy='42' r='2' fill='#D4AF37' />

				{/* Steam */}
				<path
					d='M40 30 Q42 25 40 20'
					stroke='rgba(255,255,255,0.5)'
					strokeWidth='2'
					fill='none'
				/>
				<path
					d='M50 28 Q52 22 50 16'
					stroke='rgba(255,255,255,0.5)'
					strokeWidth='2'
					fill='none'
				/>
				<path
					d='M60 30 Q58 25 60 20'
					stroke='rgba(255,255,255,0.5)'
					strokeWidth='2'
					fill='none'
				/>
			</svg>
		)
	}

	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 100 100'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			{/* Chandelier */}
			<line x1='50' y1='5' x2='50' y2='25' stroke='#D4AF37' strokeWidth='2' />
			<circle cx='50' cy='30' r='8' fill='#D4AF37' opacity='0.3' />
			<circle cx='50' cy='30' r='5' fill='#D4AF37' />

			{/* Light rays */}
			<line
				x1='50'
				y1='38'
				x2='35'
				y2='55'
				stroke='#D4AF37'
				strokeWidth='1'
				opacity='0.5'
			/>
			<line
				x1='50'
				y1='38'
				x2='65'
				y2='55'
				stroke='#D4AF37'
				strokeWidth='1'
				opacity='0.5'
			/>
			<line
				x1='50'
				y1='38'
				x2='50'
				y2='60'
				stroke='#D4AF37'
				strokeWidth='1'
				opacity='0.5'
			/>

			{/* Table */}
			<ellipse cx='50' cy='75' rx='30' ry='8' fill='#4A0000' />
			<rect x='45' y='75' width='10' height='15' fill='#4A0000' />

			{/* Chairs */}
			<ellipse cx='25' cy='70' rx='8' ry='4' fill='#800000' />
			<ellipse cx='75' cy='70' rx='8' ry='4' fill='#800000' />

			{/* Candle on table */}
			<rect x='48' y='65' width='4' height='10' fill='#F5F5DC' />
			<ellipse cx='50' cy='62' rx='3' ry='5' fill='#FF9900' opacity='0.8' />
		</svg>
	)
}

export default Gallery
