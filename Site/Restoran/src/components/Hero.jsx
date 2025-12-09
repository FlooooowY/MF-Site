import React, { useEffect, useRef } from 'react'

function Hero({ onBookingClick }) {
	const heroRef = useRef(null)

	useEffect(() => {
		// Parallax effect on scroll
		const handleScroll = () => {
			if (heroRef.current) {
				const scrolled = window.scrollY
				const overlay = heroRef.current.querySelector('.hero-overlay')
				if (overlay) {
					overlay.style.transform = `translateY(${scrolled * 0.3}px)`
				}
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<section className='hero' id='hero' ref={heroRef}>
			{/* Video Background Placeholder - Using gradient as fallback */}
			<div
				className='hero-video-bg'
				style={{
					background: `
          linear-gradient(135deg, rgba(74, 0, 0, 0.9) 0%, rgba(128, 0, 0, 0.8) 100%),
          url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><rect fill="%234A0000"/></svg>')
        `,
					backgroundSize: 'cover',
				}}
			>
				{/* Animated background elements */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: `
            radial-gradient(ellipse at 20% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(212, 175, 55, 0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%, rgba(128, 0, 0, 0.3) 0%, transparent 60%)
          `,
						animation: 'pulse 8s ease-in-out infinite',
					}}
				></div>
			</div>

			<div className='hero-overlay'></div>

			<div className='hero-content'>
				<p className='hero-subtitle'>
					✦ Премиальный ресторан авторской кухни ✦
				</p>
				<h1 className='hero-title'>AURELIO</h1>
				<p className='hero-description'>
					Откройте для себя мир изысканных вкусов в атмосфере роскоши и уюта.
					Каждое блюдо — это произведение искусства от нашего шеф-повара.
				</p>

				<div className='hero-buttons'>
					<button className='btn btn-flame' onClick={onBookingClick}>
						<CandleIcon />
						Забронировать столик
					</button>
					<button
						className='btn btn-outline'
						style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
						onClick={() =>
							document
								.getElementById('menu')
								.scrollIntoView({ behavior: 'smooth' })
						}
					>
						Посмотреть меню
					</button>
				</div>
			</div>

			<div className='hero-scroll'>
				<div className='hero-scroll-icon'></div>
				<span
					style={{
						fontFamily: 'var(--font-menu)',
						fontSize: '0.75rem',
						letterSpacing: '0.2em',
					}}
				>
					ЛИСТАЙТЕ ВНИЗ
				</span>
			</div>

			{/* Decorative floating elements */}
			<FloatingElements />
		</section>
	)
}

function CandleIcon() {
	return (
		<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M12 2c-.5 0-1 .19-1.41.59-.4.41-.59.91-.59 1.41 0 1.1 1 2 2 2s2-.9 2-2c0-.5-.19-1-.59-1.41C13 2.19 12.5 2 12 2zm-2 6v14h4V8h-4z' />
		</svg>
	)
}

function FloatingElements() {
	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				overflow: 'hidden',
				pointerEvents: 'none',
			}}
		>
			{/* Golden particles */}
			{[...Array(20)].map((_, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						width: `${Math.random() * 4 + 2}px`,
						height: `${Math.random() * 4 + 2}px`,
						background: 'var(--gold)',
						borderRadius: '50%',
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						opacity: Math.random() * 0.5 + 0.2,
						animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
						animationDelay: `${Math.random() * 5}s`,
					}}
				/>
			))}
			<style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-30px) rotate(3deg); }
        }
      `}</style>
		</div>
	)
}

export default Hero
