'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface BeforeAfterSliderProps {
	beforeImage: string
	afterImage: string
	beforeLabel?: string
	afterLabel?: string
}

export default function BeforeAfterSlider({
	beforeImage,
	afterImage,
	beforeLabel = 'До',
	afterLabel = 'После',
}: BeforeAfterSliderProps) {
	const [sliderPosition, setSliderPosition] = useState(50)
	const [isDragging, setIsDragging] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const handleMove = useCallback((clientX: number) => {
		if (!containerRef.current) return

		const rect = containerRef.current.getBoundingClientRect()
		const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
		const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
		setSliderPosition(percent)
	}, [])

	const handleMouseDown = () => {
		setIsDragging(true)
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging) return
			handleMove(e.clientX)
		},
		[isDragging, handleMove]
	)

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			handleMove(e.touches[0].clientX)
		},
		[handleMove]
	)

	return (
		<div
			ref={containerRef}
			className='relative w-full aspect-square rounded-lg overflow-hidden cursor-ew-resize select-none'
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleMouseUp}
		>
			{/* After Image (Background) */}
			<div className='absolute inset-0'>
				<Image
					src={afterImage}
					alt='After'
					fill
					className='object-cover'
					draggable={false}
				/>
				{/* After Label */}
				<div className='absolute bottom-4 right-4 bg-obsidian/80 backdrop-blur-sm px-3 py-1 rounded'>
					<span className='font-roboto-mono text-xs text-emerald'>
						{afterLabel}
					</span>
				</div>
			</div>

			{/* Before Image (Clipped) */}
			<div
				className='absolute inset-0 overflow-hidden'
				style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
			>
				<Image
					src={beforeImage}
					alt='Before'
					fill
					className='object-cover'
					draggable={false}
				/>
				{/* Before Label */}
				<div className='absolute bottom-4 left-4 bg-obsidian/80 backdrop-blur-sm px-3 py-1 rounded'>
					<span className='font-roboto-mono text-xs text-smoke'>
						{beforeLabel}
					</span>
				</div>
			</div>

			{/* Slider Handle */}
			<motion.div
				className='absolute top-0 bottom-0 w-1 bg-royal-gold cursor-ew-resize z-10'
				style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
				onMouseDown={handleMouseDown}
				onTouchStart={handleMouseDown}
				whileHover={{ scale: 1.2 }}
			>
				{/* Handle Circle */}
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
					<motion.div
						className='w-10 h-10 rounded-full bg-royal-gold flex items-center justify-center shadow-gold'
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
					>
						<div className='flex items-center gap-1'>
							<svg
								width='6'
								height='10'
								viewBox='0 0 6 10'
								fill='none'
								className='rotate-180'
							>
								<path
									d='M5 1L1 5L5 9'
									stroke='#0D0C1A'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							<svg width='6' height='10' viewBox='0 0 6 10' fill='none'>
								<path
									d='M5 1L1 5L5 9'
									stroke='#0D0C1A'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
					</motion.div>
				</div>

				{/* Glow Effect */}
				<div
					className='absolute top-0 bottom-0 w-6 -left-2.5'
					style={{
						background:
							'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
					}}
				/>
			</motion.div>

			{/* Border Glow on Hover */}
			<div className='absolute inset-0 border-2 border-transparent hover:border-royal-gold/30 rounded-lg transition-colors duration-300 pointer-events-none' />
		</div>
	)
}
