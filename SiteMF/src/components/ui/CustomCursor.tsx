'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Particle {
	id: number
	x: number
	y: number
	life: number
}

export function CustomCursor() {
	const [isVisible, setIsVisible] = useState(false)
	const [isHovering, setIsHovering] = useState(false)
	const [particles, setParticles] = useState<Particle[]>([])
	const [particleId, setParticleId] = useState(0)

	const cursorX = useMotionValue(-100)
	const cursorY = useMotionValue(-100)

	const springConfig = { damping: 25, stiffness: 400 }
	const cursorXSpring = useSpring(cursorX, springConfig)
	const cursorYSpring = useSpring(cursorY, springConfig)

	const addParticle = useCallback(
		(x: number, y: number) => {
			const newParticle: Particle = {
				id: particleId,
				x,
				y,
				life: 1,
			}
			setParticleId(prev => prev + 1)
			setParticles(prev => [...prev.slice(-15), newParticle])
		},
		[particleId]
	)

	useEffect(() => {
		// Check if device supports fine pointer (mouse)
		const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
		if (isTouchDevice) return

		setIsVisible(true)
		document.body.classList.add('custom-cursor-active')

		let lastX = 0
		let lastY = 0
		let frameCount = 0

		const moveCursor = (e: MouseEvent) => {
			cursorX.set(e.clientX)
			cursorY.set(e.clientY)

			// Add particle trail every few frames
			frameCount++
			const distance = Math.sqrt(
				Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
			)

			if (distance > 20 && frameCount % 3 === 0) {
				addParticle(e.clientX, e.clientY)
				lastX = e.clientX
				lastY = e.clientY
			}
		}

		const handleMouseEnter = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			if (
				target.matches(
					'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
				)
			) {
				setIsHovering(true)
			}
		}

		const handleMouseLeave = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			if (
				target.matches(
					'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
				)
			) {
				setIsHovering(false)
			}
		}

		window.addEventListener('mousemove', moveCursor)
		document.addEventListener('mouseenter', handleMouseEnter, true)
		document.addEventListener('mouseleave', handleMouseLeave, true)

		return () => {
			window.removeEventListener('mousemove', moveCursor)
			document.removeEventListener('mouseenter', handleMouseEnter, true)
			document.removeEventListener('mouseleave', handleMouseLeave, true)
			document.body.classList.remove('custom-cursor-active')
		}
	}, [cursorX, cursorY, addParticle])

	// Remove old particles
	useEffect(() => {
		const interval = setInterval(() => {
			setParticles(prev =>
				prev.map(p => ({ ...p, life: p.life - 0.1 })).filter(p => p.life > 0)
			)
		}, 50)

		return () => clearInterval(interval)
	}, [])

	if (!isVisible) return null

	return (
		<>
			{/* Main cursor */}
			<motion.div
				className='fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference'
				style={{
					x: cursorXSpring,
					y: cursorYSpring,
				}}
			>
				<motion.div
					className='relative -translate-x-1/2 -translate-y-1/2'
					animate={{
						width: isHovering ? 48 : 12,
						height: isHovering ? 48 : 12,
						borderRadius: '50%',
					}}
					transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
				>
					<div className='w-full h-full bg-white rounded-full' />
				</motion.div>
			</motion.div>

			{/* Cursor ring */}
			<motion.div
				className='fixed top-0 left-0 pointer-events-none z-[9998]'
				style={{
					x: cursorXSpring,
					y: cursorYSpring,
				}}
			>
				<motion.div
					className='relative -translate-x-1/2 -translate-y-1/2 border border-black/30 rounded-full'
					animate={{
						width: isHovering ? 64 : 32,
						height: isHovering ? 64 : 32,
						opacity: isHovering ? 0.5 : 0.3,
					}}
					transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
				/>
			</motion.div>

			{/* Particle trail */}
			{particles.map(particle => (
				<motion.div
					key={particle.id}
					className='fixed pointer-events-none z-[9997]'
					initial={{
						x: particle.x,
						y: particle.y,
						scale: 1,
						opacity: 0.5,
					}}
					animate={{
						scale: 0,
						opacity: 0,
					}}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					style={{
						left: -4,
						top: -4,
					}}
				>
					<div className='w-2 h-2 bg-[#757575] rounded-full' />
				</motion.div>
			))}
		</>
	)
}
