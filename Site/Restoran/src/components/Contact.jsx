import React, { useEffect, useRef } from 'react'

function Contact() {
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
		<section className='section contact-section' id='contact' ref={sectionRef}>
			<div className='section-header reveal'>
				<p className='section-subtitle'>Добро пожаловать</p>
				<h2 className='section-title'>Контакты</h2>
			</div>

			<div className='section-divider'>
				<span className='divider-icon'>📍</span>
			</div>

			<div className='contact-grid'>
				<div className='contact-info reveal'>
					<div className='contact-item'>
						<div className='contact-icon'>
							<LocationIcon />
						</div>
						<div>
							<h4>Адрес</h4>
							<p>г. Москва, ул. Тверская, д. 1</p>
							<p
								style={{ fontSize: '0.875rem', color: 'var(--charcoal-light)' }}
							>
								5 минут от м. Охотный ряд
							</p>
						</div>
					</div>

					<div className='contact-item'>
						<div className='contact-icon'>
							<PhoneIcon />
						</div>
						<div>
							<h4>Телефон</h4>
							<a href='tel:+74951234567'>+7 (495) 123-45-67</a>
							<p
								style={{ fontSize: '0.875rem', color: 'var(--charcoal-light)' }}
							>
								Бронирование столиков
							</p>
						</div>
					</div>

					<div className='contact-item'>
						<div className='contact-icon'>
							<ClockIcon />
						</div>
						<div>
							<h4>Время работы</h4>
							<p>Пн-Чт: 12:00 - 00:00</p>
							<p>Пт-Вс: 12:00 - 02:00</p>
						</div>
					</div>

					<div className='contact-item'>
						<div className='contact-icon'>
							<EmailIcon />
						</div>
						<div>
							<h4>Email</h4>
							<a href='mailto:info@aurelio.ru'>info@aurelio.ru</a>
							<p
								style={{ fontSize: '0.875rem', color: 'var(--charcoal-light)' }}
							>
								Для корпоративных мероприятий
							</p>
						</div>
					</div>

					{/* Social Links */}
					<div
						style={{
							display: 'flex',
							gap: '15px',
							marginTop: '20px',
						}}
					>
						<a
							href='#'
							style={{
								width: '50px',
								height: '50px',
								borderRadius: '50%',
								background: 'var(--burgundy-gradient)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'var(--gold)',
								transition: 'transform 0.3s ease',
							}}
						>
							<TelegramIcon />
						</a>
						<a
							href='#'
							style={{
								width: '50px',
								height: '50px',
								borderRadius: '50%',
								background: 'var(--burgundy-gradient)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'var(--gold)',
								transition: 'transform 0.3s ease',
							}}
						>
							<InstagramIcon />
						</a>
						<a
							href='#'
							style={{
								width: '50px',
								height: '50px',
								borderRadius: '50%',
								background: 'var(--burgundy-gradient)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'var(--gold)',
								transition: 'transform 0.3s ease',
							}}
						>
							<VKIcon />
						</a>
					</div>
				</div>

				<div className='contact-map reveal'>
					{/* Map placeholder with decorative styling */}
					<div
						style={{
							width: '100%',
							height: '100%',
							minHeight: '400px',
							background: 'linear-gradient(135deg, #2C2C2C 0%, #1a1a1a 100%)',
							borderRadius: '16px',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Decorative map pattern */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								opacity: 0.1,
								backgroundImage: `
                linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)
              `,
								backgroundSize: '50px 50px',
							}}
						/>

						{/* Location pin */}
						<div
							style={{
								width: '80px',
								height: '80px',
								background: 'var(--burgundy-gradient)',
								borderRadius: '50% 50% 50% 0',
								transform: 'rotate(-45deg)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '0 10px 30px rgba(128, 0, 0, 0.5)',
								marginBottom: '20px',
							}}
						>
							<div
								style={{
									transform: 'rotate(45deg)',
									color: 'var(--gold)',
									fontSize: '1.5rem',
								}}
							>
								<LocationIcon />
							</div>
						</div>

						<h4
							style={{
								fontFamily: 'var(--font-display)',
								fontSize: '1.5rem',
								color: 'var(--gold)',
								marginBottom: '10px',
							}}
						>
							AURELIO
						</h4>

						<p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
							ул. Тверская, д. 1, Москва
						</p>

						<a
							href='https://yandex.ru/maps'
							target='_blank'
							rel='noopener noreferrer'
							style={{
								padding: '12px 24px',
								background: 'var(--gold)',
								color: 'var(--burgundy-dark)',
								borderRadius: '8px',
								fontFamily: 'var(--font-menu)',
								fontWeight: '600',
								textDecoration: 'none',
								transition: 'transform 0.3s ease',
							}}
						>
							Открыть в Яндекс.Картах
						</a>

						{/* Decorative circles */}
						<div
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: '200px',
								height: '200px',
								border: '1px solid rgba(212, 175, 55, 0.2)',
								borderRadius: '50%',
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: '300px',
								height: '300px',
								border: '1px solid rgba(212, 175, 55, 0.1)',
								borderRadius: '50%',
								pointerEvents: 'none',
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

function LocationIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
		</svg>
	)
}

function PhoneIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z' />
		</svg>
	)
}

function ClockIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' />
		</svg>
	)
}

function EmailIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
		</svg>
	)
}

function TelegramIcon() {
	return (
		<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z' />
		</svg>
	)
}

function InstagramIcon() {
	return (
		<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
		</svg>
	)
}

function VKIcon() {
	return (
		<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.55 4 8.042c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.18-3.61 2.18-3.61.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z' />
		</svg>
	)
}

export default Contact
