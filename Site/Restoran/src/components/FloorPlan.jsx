import React, { useState, useRef, useEffect } from 'react'

const tables = [
	{ id: 1, x: 15, y: 20, seats: 2, zone: 'Зал у окна', status: 'available' },
	{ id: 2, x: 35, y: 20, seats: 4, zone: 'Зал у окна', status: 'available' },
	{
		id: 3,
		x: 55,
		y: 20,
		seats: 4,
		zone: 'Центральный зал',
		status: 'reserved',
	},
	{
		id: 4,
		x: 75,
		y: 20,
		seats: 2,
		zone: 'Центральный зал',
		status: 'available',
	},
	{ id: 5, x: 15, y: 45, seats: 6, zone: 'VIP-зона', status: 'available' },
	{
		id: 6,
		x: 35,
		y: 45,
		seats: 4,
		zone: 'Центральный зал',
		status: 'occupied',
	},
	{
		id: 7,
		x: 55,
		y: 45,
		seats: 4,
		zone: 'Центральный зал',
		status: 'available',
	},
	{ id: 8, x: 75, y: 45, seats: 8, zone: 'Банкетный зал', status: 'available' },
	{ id: 9, x: 15, y: 70, seats: 2, zone: 'Бар', status: 'available' },
	{ id: 10, x: 35, y: 70, seats: 2, zone: 'Бар', status: 'reserved' },
	{ id: 11, x: 55, y: 70, seats: 4, zone: 'Терраса', status: 'available' },
	{ id: 12, x: 75, y: 70, seats: 6, zone: 'Терраса', status: 'available' },
]

const zones = [
	{ name: 'Зал у окна', description: 'Панорамный вид на город', icon: '🌆' },
	{
		name: 'Центральный зал',
		description: 'Классическая атмосфера',
		icon: '✨',
	},
	{ name: 'VIP-зона', description: 'Приватность и комфорт', icon: '👑' },
	{ name: 'Банкетный зал', description: 'Для больших компаний', icon: '🎉' },
	{ name: 'Бар', description: 'Коктейли и легкие закуски', icon: '🍸' },
	{ name: 'Терраса', description: 'Свежий воздух и природа', icon: '🌿' },
]

function FloorPlan({ onBookingClick }) {
	const [selectedTable, setSelectedTable] = useState(null)
	const [hoveredTable, setHoveredTable] = useState(null)
	const [rotation, setRotation] = useState({ x: 20, y: 0 })
	const [zoom, setZoom] = useState(1)
	const containerRef = useRef(null)

	const handleTableClick = table => {
		if (table.status === 'available') {
			setSelectedTable(table)
		}
	}

	const getStatusColor = status => {
		switch (status) {
			case 'available':
				return '#2E8B57'
			case 'reserved':
				return '#D4AF37'
			case 'occupied':
				return '#800000'
			default:
				return '#888'
		}
	}

	const getStatusText = status => {
		switch (status) {
			case 'available':
				return 'Свободен'
			case 'reserved':
				return 'Забронирован'
			case 'occupied':
				return 'Занят'
			default:
				return ''
		}
	}

	return (
		<section className='section floor-plan-section' id='floor-plan'>
			<div className='section-header'>
				<p className='section-subtitle'>Интерьер</p>
				<h2 className='section-title'>Схема зала</h2>
			</div>

			<div className='section-divider'>
				<span className='divider-icon'>🪑</span>
			</div>

			<div className='floor-plan-container'>
				<div className='floor-plan-3d' ref={containerRef}>
					{/* 3D Floor Plan SVG */}
					<svg
						viewBox='0 0 100 100'
						style={{
							width: '100%',
							height: '100%',
							transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
							transition: 'transform 0.3s ease',
						}}
					>
						{/* Floor */}
						<defs>
							<pattern
								id='floorPattern'
								patternUnits='userSpaceOnUse'
								width='10'
								height='10'
							>
								<rect width='10' height='10' fill='#2C2C2C' />
								<rect width='5' height='5' fill='#333' />
								<rect x='5' y='5' width='5' height='5' fill='#333' />
							</pattern>
							<linearGradient
								id='wallGradient'
								x1='0%'
								y1='0%'
								x2='0%'
								y2='100%'
							>
								<stop offset='0%' stopColor='#4A0000' />
								<stop offset='100%' stopColor='#2C2C2C' />
							</linearGradient>
							<filter id='glow'>
								<feGaussianBlur stdDeviation='1' result='coloredBlur' />
								<feMerge>
									<feMergeNode in='coloredBlur' />
									<feMergeNode in='SourceGraphic' />
								</feMerge>
							</filter>
						</defs>

						{/* Background floor */}
						<rect
							x='5'
							y='5'
							width='90'
							height='90'
							fill='url(#floorPattern)'
							rx='2'
						/>

						{/* Walls */}
						<path
							d='M5 5 L5 95 L95 95 L95 5 Z'
							fill='none'
							stroke='#4A0000'
							strokeWidth='2'
						/>

						{/* Zone indicators */}
						<rect
							x='8'
							y='8'
							width='25'
							height='30'
							fill='rgba(212, 175, 55, 0.1)'
							stroke='#D4AF37'
							strokeWidth='0.5'
							strokeDasharray='2'
						/>
						<rect
							x='68'
							y='58'
							width='25'
							height='35'
							fill='rgba(46, 139, 87, 0.1)'
							stroke='#2E8B57'
							strokeWidth='0.5'
							strokeDasharray='2'
						/>

						{/* Tables */}
						{tables.map(table => (
							<g
								key={table.id}
								transform={`translate(${table.x}, ${table.y})`}
								onClick={() => handleTableClick(table)}
								onMouseEnter={() => setHoveredTable(table)}
								onMouseLeave={() => setHoveredTable(null)}
								style={{
									cursor: table.status === 'available' ? 'pointer' : 'default',
								}}
							>
								{/* Table shadow */}
								<ellipse
									cx='5'
									cy='7'
									rx={table.seats > 4 ? 8 : table.seats > 2 ? 6 : 4}
									ry={table.seats > 4 ? 4 : table.seats > 2 ? 3 : 2}
									fill='rgba(0,0,0,0.3)'
								/>

								{/* Table */}
								<ellipse
									cx='5'
									cy='5'
									rx={table.seats > 4 ? 8 : table.seats > 2 ? 6 : 4}
									ry={table.seats > 4 ? 4 : table.seats > 2 ? 3 : 2}
									fill={getStatusColor(table.status)}
									stroke={
										selectedTable?.id === table.id
											? '#D4AF37'
											: 'rgba(255,255,255,0.3)'
									}
									strokeWidth={selectedTable?.id === table.id ? 1 : 0.5}
									filter={
										hoveredTable?.id === table.id ||
										selectedTable?.id === table.id
											? 'url(#glow)'
											: ''
									}
									style={{
										transition: 'all 0.3s ease',
										transform:
											hoveredTable?.id === table.id ? 'scale(1.1)' : 'scale(1)',
										transformOrigin: 'center',
									}}
								/>

								{/* Table number */}
								<text
									x='5'
									y='6'
									textAnchor='middle'
									fill='white'
									fontSize='3'
									fontFamily='var(--font-menu)'
								>
									{table.id}
								</text>

								{/* Chairs */}
								{[...Array(table.seats)].map((_, i) => {
									const angle = (i / table.seats) * Math.PI * 2
									const radius = table.seats > 4 ? 10 : table.seats > 2 ? 8 : 6
									const cx = 5 + Math.cos(angle) * radius
									const cy = 5 + Math.sin(angle) * radius * 0.5
									return (
										<circle
											key={i}
											cx={cx}
											cy={cy}
											r='1.5'
											fill='#4A0000'
											stroke='#D4AF37'
											strokeWidth='0.3'
										/>
									)
								})}
							</g>
						))}

						{/* Decorative elements */}
						{/* Bar area */}
						<rect x='8' y='65' width='25' height='8' fill='#4A0000' rx='1' />
						<text x='20' y='70' textAnchor='middle' fill='#D4AF37' fontSize='3'>
							БАР
						</text>

						{/* Entrance */}
						<rect x='45' y='92' width='10' height='3' fill='#2E8B57' />
						<text x='50' y='99' textAnchor='middle' fill='#D4AF37' fontSize='2'>
							ВХОД
						</text>
					</svg>

					{/* Controls */}
					<div className='floor-plan-controls'>
						<button onClick={() => setRotation(r => ({ ...r, y: r.y - 15 }))}>
							←
						</button>
						<button onClick={() => setRotation(r => ({ ...r, y: r.y + 15 }))}>
							→
						</button>
						<button onClick={() => setZoom(z => Math.min(z + 0.2, 2))}>
							+
						</button>
						<button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}>
							−
						</button>
						<button
							onClick={() => {
								setRotation({ x: 20, y: 0 })
								setZoom(1)
							}}
						>
							⟳
						</button>
					</div>

					{/* Legend */}
					<div
						style={{
							position: 'absolute',
							top: '20px',
							left: '20px',
							background: 'rgba(0,0,0,0.7)',
							padding: '15px',
							borderRadius: '8px',
							color: 'white',
							fontSize: '12px',
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								marginBottom: '8px',
							}}
						>
							<span
								style={{
									width: '12px',
									height: '12px',
									borderRadius: '50%',
									background: '#2E8B57',
								}}
							></span>
							<span>Свободен</span>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								marginBottom: '8px',
							}}
						>
							<span
								style={{
									width: '12px',
									height: '12px',
									borderRadius: '50%',
									background: '#D4AF37',
								}}
							></span>
							<span>Забронирован</span>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							<span
								style={{
									width: '12px',
									height: '12px',
									borderRadius: '50%',
									background: '#800000',
								}}
							></span>
							<span>Занят</span>
						</div>
					</div>
				</div>

				<div className='booking-panel'>
					<h3>Выберите столик</h3>

					{selectedTable ? (
						<div>
							<div
								style={{
									background: 'var(--beige-light)',
									padding: '20px',
									borderRadius: '12px',
									marginBottom: '20px',
								}}
							>
								<h4
									style={{
										marginBottom: '10px',
										color: 'var(--burgundy-deep)',
									}}
								>
									Столик №{selectedTable.id}
								</h4>
								<p style={{ margin: '5px 0', color: 'var(--charcoal-light)' }}>
									<strong>Зона:</strong> {selectedTable.zone}
								</p>
								<p style={{ margin: '5px 0', color: 'var(--charcoal-light)' }}>
									<strong>Мест:</strong> {selectedTable.seats}
								</p>
								<p style={{ margin: '5px 0' }}>
									<span
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											gap: '6px',
											padding: '4px 12px',
											background: getStatusColor(selectedTable.status),
											color: 'white',
											borderRadius: '20px',
											fontSize: '14px',
										}}
									>
										{getStatusText(selectedTable.status)}
									</span>
								</p>
							</div>

							<button
								className='btn btn-primary'
								style={{ width: '100%' }}
								onClick={onBookingClick}
							>
								Забронировать этот столик
							</button>
						</div>
					) : (
						<div>
							<p
								style={{ color: 'var(--charcoal-light)', marginBottom: '20px' }}
							>
								Нажмите на свободный столик на схеме, чтобы выбрать его для
								бронирования
							</p>

							<h4 style={{ marginBottom: '15px' }}>Зоны ресторана</h4>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '10px',
								}}
							>
								{zones.map((zone, i) => (
									<div
										key={i}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '12px',
											padding: '12px',
											background: 'var(--beige-light)',
											borderRadius: '8px',
										}}
									>
										<span style={{ fontSize: '24px' }}>{zone.icon}</span>
										<div>
											<strong style={{ display: 'block', fontSize: '14px' }}>
												{zone.name}
											</strong>
											<span
												style={{
													fontSize: '12px',
													color: 'var(--charcoal-light)',
												}}
											>
												{zone.description}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{hoveredTable && !selectedTable && (
						<div
							style={{
								position: 'absolute',
								bottom: '20px',
								left: '20px',
								right: '20px',
								background: 'var(--burgundy-gradient)',
								color: 'white',
								padding: '15px',
								borderRadius: '8px',
								animation: 'fadeInUp 0.3s ease',
							}}
						>
							<strong>Столик №{hoveredTable.id}</strong>
							<p style={{ margin: '5px 0 0', fontSize: '14px', opacity: 0.8 }}>
								{hoveredTable.zone} • {hoveredTable.seats} мест
							</p>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default FloorPlan
