import React, { useState } from 'react'

const timeSlots = [
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
	'16:30',
	'17:00',
	'17:30',
	'18:00',
	'18:30',
	'19:00',
	'19:30',
	'20:00',
	'20:30',
	'21:00',
	'21:30',
	'22:00',
	'22:30',
	'23:00',
]

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function BookingModal({ isOpen, onClose }) {
	const [step, setStep] = useState(1)
	const [bookingData, setBookingData] = useState({
		date: '',
		time: '',
		guests: 2,
		name: '',
		phone: '',
		email: '',
		comment: '',
		tableId: null,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isConfirmed, setIsConfirmed] = useState(false)

	const handleInputChange = (field, value) => {
		setBookingData(prev => ({ ...prev, [field]: value }))
	}

	const nextStep = () => {
		if (step < 4) setStep(step + 1)
	}

	const prevStep = () => {
		if (step > 1) setStep(step - 1)
	}

	const handleSubmit = () => {
		setIsSubmitting(true)
		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false)
			setIsConfirmed(true)
		}, 2000)
	}

	const handleClose = () => {
		setStep(1)
		setIsConfirmed(false)
		setBookingData({
			date: '',
			time: '',
			guests: 2,
			name: '',
			phone: '',
			email: '',
			comment: '',
			tableId: null,
		})
		onClose()
	}

	const generateCalendarDays = () => {
		const today = new Date()
		const days = []
		for (let i = 0; i < 21; i++) {
			const date = new Date(today)
			date.setDate(today.getDate() + i)
			days.push(date)
		}
		return days
	}

	const formatDate = date => {
		return date.toISOString().split('T')[0]
	}

	const formatDisplayDate = date => {
		return date.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'short',
			weekday: 'short',
		})
	}

	if (!isOpen) return null

	return (
		<div className='modal-overlay active' onClick={handleClose}>
			<div className='modal' onClick={e => e.stopPropagation()}>
				<div className='modal-header'>
					<h3
						style={{
							fontFamily: 'var(--font-display)',
							color: 'var(--burgundy-deep)',
						}}
					>
						{isConfirmed
							? 'Бронирование подтверждено!'
							: 'Забронировать столик'}
					</h3>
					<button className='modal-close' onClick={handleClose}>
						×
					</button>
				</div>

				<div className='modal-body'>
					{isConfirmed ? (
						<ConfirmationScreen bookingData={bookingData} />
					) : (
						<>
							{/* Progress Steps */}
							<div className='booking-steps'>
								{[1, 2, 3, 4].map(s => (
									<div
										key={s}
										className={`booking-step ${step === s ? 'active' : ''} ${
											step > s ? 'completed' : ''
										}`}
									>
										<div className='booking-step-number'>
											{step > s ? '✓' : s}
										</div>
										<span style={{ fontSize: '0.875rem' }}>
											{s === 1 && 'Дата и время'}
											{s === 2 && 'Гости'}
											{s === 3 && 'Контакты'}
											{s === 4 && 'Подтверждение'}
										</span>
									</div>
								))}
							</div>

							{/* Step 1: Date & Time */}
							{step === 1 && (
								<div style={{ animation: 'fadeInUp 0.3s ease' }}>
									<h4 style={{ marginBottom: '20px' }}>Выберите дату</h4>
									<div
										style={{
											display: 'grid',
											gridTemplateColumns: 'repeat(7, 1fr)',
											gap: '8px',
											marginBottom: '30px',
										}}
									>
										{generateCalendarDays().map((date, i) => (
											<button
												key={i}
												onClick={() =>
													handleInputChange('date', formatDate(date))
												}
												style={{
													padding: '12px 8px',
													background:
														bookingData.date === formatDate(date)
															? 'var(--burgundy-gradient)'
															: 'var(--beige-light)',
													color:
														bookingData.date === formatDate(date)
															? 'var(--gold)'
															: 'var(--charcoal)',
													border: 'none',
													borderRadius: '8px',
													cursor: 'pointer',
													textAlign: 'center',
													fontSize: '0.75rem',
													fontFamily: 'var(--font-menu)',
													transition: 'all 0.2s ease',
												}}
											>
												<div style={{ fontWeight: '600' }}>
													{date.getDate()}
												</div>
												<div style={{ opacity: 0.7, fontSize: '0.65rem' }}>
													{date.toLocaleDateString('ru-RU', {
														weekday: 'short',
													})}
												</div>
											</button>
										))}
									</div>

									<h4 style={{ marginBottom: '15px' }}>Выберите время</h4>
									<div
										className='time-slots'
										style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
									>
										{timeSlots.map(time => (
											<button
												key={time}
												className={`time-slot ${
													bookingData.time === time ? 'selected' : ''
												}`}
												onClick={() => handleInputChange('time', time)}
											>
												{time}
											</button>
										))}
									</div>
								</div>
							)}

							{/* Step 2: Guests */}
							{step === 2 && (
								<div style={{ animation: 'fadeInUp 0.3s ease' }}>
									<h4 style={{ marginBottom: '20px' }}>Количество гостей</h4>
									<div
										style={{
											display: 'flex',
											gap: '10px',
											flexWrap: 'wrap',
											marginBottom: '30px',
										}}
									>
										{guestOptions.map(num => (
											<button
												key={num}
												onClick={() => handleInputChange('guests', num)}
												style={{
													width: '60px',
													height: '60px',
													borderRadius: '50%',
													background:
														bookingData.guests === num
															? 'var(--burgundy-gradient)'
															: 'var(--beige-light)',
													color:
														bookingData.guests === num
															? 'var(--gold)'
															: 'var(--charcoal)',
													border: 'none',
													cursor: 'pointer',
													fontSize: '1.25rem',
													fontFamily: 'var(--font-menu)',
													fontWeight: '600',
													transition: 'all 0.2s ease',
												}}
											>
												{num}
											</button>
										))}
									</div>

									<div
										style={{
											background: 'var(--beige-light)',
											padding: '20px',
											borderRadius: '12px',
										}}
									>
										<h5
											style={{
												marginBottom: '10px',
												color: 'var(--burgundy-deep)',
											}}
										>
											Особые пожелания
										</h5>
										<textarea
											placeholder='Укажите, если нужен детский стул, есть аллергии или особые предпочтения по столику...'
											value={bookingData.comment}
											onChange={e =>
												handleInputChange('comment', e.target.value)
											}
											style={{
												width: '100%',
												minHeight: '100px',
												padding: '12px',
												border: '2px solid transparent',
												borderRadius: '8px',
												fontFamily: 'var(--font-body)',
												fontSize: '1rem',
												resize: 'vertical',
												background: 'var(--white)',
											}}
										/>
									</div>
								</div>
							)}

							{/* Step 3: Contact Info */}
							{step === 3 && (
								<div style={{ animation: 'fadeInUp 0.3s ease' }}>
									<h4 style={{ marginBottom: '20px' }}>
										Контактная информация
									</h4>

									<div className='form-group'>
										<label className='form-label'>Ваше имя *</label>
										<input
											type='text'
											className='form-input'
											placeholder='Александр'
											value={bookingData.name}
											onChange={e => handleInputChange('name', e.target.value)}
										/>
									</div>

									<div className='form-group'>
										<label className='form-label'>Телефон *</label>
										<input
											type='tel'
											className='form-input'
											placeholder='+7 (___) ___-__-__'
											value={bookingData.phone}
											onChange={e => handleInputChange('phone', e.target.value)}
										/>
									</div>

									<div className='form-group'>
										<label className='form-label'>Email</label>
										<input
											type='email'
											className='form-input'
											placeholder='example@email.com'
											value={bookingData.email}
											onChange={e => handleInputChange('email', e.target.value)}
										/>
										<span
											style={{
												fontSize: '0.75rem',
												color: 'var(--charcoal-light)',
											}}
										>
											На email придёт подтверждение брони
										</span>
									</div>
								</div>
							)}

							{/* Step 4: Confirmation */}
							{step === 4 && (
								<div style={{ animation: 'fadeInUp 0.3s ease' }}>
									<h4 style={{ marginBottom: '20px' }}>Проверьте данные</h4>

									<div
										style={{
											background: 'var(--beige-light)',
											padding: '25px',
											borderRadius: '12px',
											marginBottom: '20px',
										}}
									>
										<div style={{ display: 'grid', gap: '15px' }}>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}
											>
												<span style={{ color: 'var(--charcoal-light)' }}>
													Дата:
												</span>
												<strong>
													{bookingData.date
														? new Date(bookingData.date).toLocaleDateString(
																'ru-RU',
																{
																	day: 'numeric',
																	month: 'long',
																	year: 'numeric',
																}
														  )
														: '—'}
												</strong>
											</div>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}
											>
												<span style={{ color: 'var(--charcoal-light)' }}>
													Время:
												</span>
												<strong>{bookingData.time || '—'}</strong>
											</div>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}
											>
												<span style={{ color: 'var(--charcoal-light)' }}>
													Гостей:
												</span>
												<strong>{bookingData.guests}</strong>
											</div>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}
											>
												<span style={{ color: 'var(--charcoal-light)' }}>
													Имя:
												</span>
												<strong>{bookingData.name || '—'}</strong>
											</div>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}
											>
												<span style={{ color: 'var(--charcoal-light)' }}>
													Телефон:
												</span>
												<strong>{bookingData.phone || '—'}</strong>
											</div>
											{bookingData.comment && (
												<div>
													<span
														style={{
															color: 'var(--charcoal-light)',
															display: 'block',
															marginBottom: '5px',
														}}
													>
														Пожелания:
													</span>
													<p style={{ margin: 0, fontStyle: 'italic' }}>
														{bookingData.comment}
													</p>
												</div>
											)}
										</div>
									</div>

									<p
										style={{
											fontSize: '0.875rem',
											color: 'var(--charcoal-light)',
											textAlign: 'center',
											marginBottom: '10px',
										}}
									>
										Нажимая "Подтвердить", вы соглашаетесь с условиями
										бронирования
									</p>
								</div>
							)}

							{/* Navigation Buttons */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginTop: '30px',
									paddingTop: '20px',
									borderTop: '1px solid var(--beige-dark)',
								}}
							>
								{step > 1 ? (
									<button className='btn btn-outline' onClick={prevStep}>
										← Назад
									</button>
								) : (
									<div />
								)}

								{step < 4 ? (
									<button
										className='btn btn-primary'
										onClick={nextStep}
										disabled={
											(step === 1 &&
												(!bookingData.date || !bookingData.time)) ||
											(step === 3 && (!bookingData.name || !bookingData.phone))
										}
										style={{
											opacity:
												(step === 1 &&
													(!bookingData.date || !bookingData.time)) ||
												(step === 3 &&
													(!bookingData.name || !bookingData.phone))
													? 0.5
													: 1,
										}}
									>
										Далее →
									</button>
								) : (
									<button
										className='btn btn-gold'
										onClick={handleSubmit}
										disabled={isSubmitting}
										style={{ minWidth: '180px' }}
									>
										{isSubmitting ? (
											<span
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '10px',
												}}
											>
												<LoadingSpinner />
												Бронируем...
											</span>
										) : (
											'Подтвердить бронь'
										)}
									</button>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

function ConfirmationScreen({ bookingData }) {
	return (
		<div className='booking-confirmation'>
			<div className='confirmation-stamp'>
				<svg
					viewBox='0 0 150 150'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<circle
						cx='75'
						cy='75'
						r='70'
						stroke='#2E8B57'
						strokeWidth='4'
						fill='none'
					/>
					<circle
						cx='75'
						cy='75'
						r='60'
						stroke='#2E8B57'
						strokeWidth='2'
						fill='none'
					/>
					<path
						d='M45 75 L65 95 L105 55'
						stroke='#2E8B57'
						strokeWidth='8'
						strokeLinecap='round'
						strokeLinejoin='round'
						fill='none'
					/>
					<text
						x='75'
						y='125'
						textAnchor='middle'
						fill='#2E8B57'
						fontSize='10'
						fontFamily='var(--font-menu)'
						fontWeight='600'
					>
						ПОДТВЕРЖДЕНО
					</text>
				</svg>
			</div>

			<h3
				style={{
					fontFamily: 'var(--font-display)',
					color: 'var(--burgundy-deep)',
					fontSize: '1.75rem',
					marginBottom: '10px',
				}}
			>
				Ждём вас в AURELIO!
			</h3>

			<p style={{ color: 'var(--charcoal-light)', marginBottom: '30px' }}>
				Подтверждение отправлено на ваш телефон и email
			</p>

			<div
				style={{
					background: 'var(--beige-light)',
					padding: '25px',
					borderRadius: '12px',
					textAlign: 'left',
					maxWidth: '400px',
					margin: '0 auto',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '15px',
						marginBottom: '15px',
					}}
				>
					<div
						style={{
							width: '50px',
							height: '50px',
							borderRadius: '50%',
							background: 'var(--burgundy-gradient)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'var(--gold)',
						}}
					>
						📅
					</div>
					<div>
						<strong style={{ display: 'block' }}>
							{bookingData.date &&
								new Date(bookingData.date).toLocaleDateString('ru-RU', {
									day: 'numeric',
									month: 'long',
									weekday: 'long',
								})}
						</strong>
						<span style={{ color: 'var(--charcoal-light)' }}>
							в {bookingData.time}
						</span>
					</div>
				</div>

				<div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
					<div
						style={{
							width: '50px',
							height: '50px',
							borderRadius: '50%',
							background: 'var(--burgundy-gradient)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'var(--gold)',
						}}
					>
						👥
					</div>
					<div>
						<strong style={{ display: 'block' }}>
							{bookingData.guests} гостей
						</strong>
						<span style={{ color: 'var(--charcoal-light)' }}>
							на имя {bookingData.name}
						</span>
					</div>
				</div>
			</div>

			<p
				style={{
					marginTop: '30px',
					fontSize: '0.875rem',
					color: 'var(--charcoal-light)',
				}}
			>
				Номер брони:{' '}
				<strong style={{ color: 'var(--burgundy-deep)' }}>
					#{Math.random().toString(36).substring(2, 8).toUpperCase()}
				</strong>
			</p>
		</div>
	)
}

function LoadingSpinner() {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			style={{ animation: 'spin 1s linear infinite' }}
		>
			<circle
				cx='10'
				cy='10'
				r='8'
				stroke='currentColor'
				strokeWidth='2'
				fill='none'
				strokeLinecap='round'
				strokeDasharray='40'
				strokeDashoffset='10'
			/>
			<style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
		</svg>
	)
}

export default BookingModal
