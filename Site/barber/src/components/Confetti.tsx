'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiProps {
	isActive: boolean
	duration?: number
	particleCount?: number
}

interface Particle {
	id: number
	x: number
	y: number
	rotation: number
	color: string
	size: number
	delay: number
}

const colors = ['#D4AF37', '#F4E4BA', '#B8860B', '#FFD700', '#C5A028']

export default function Confetti({
	isActive,
	duration = 3000,
	particleCount = 50,
}: ConfettiProps) {
	const [particles, setParticles] = useState<Particle[]>([])
	const [show, setShow] = useState(false)

	useEffect(() => {
		if (isActive) {
			// Generate particles
			const newParticles: Particle[] = []
			for (let i = 0; i < particleCount; i++) {
				newParticles.push({
					id: i,
					x: Math.random() * 100,
					y: -10 - Math.random() * 20,
					rotation: Math.random() * 360,
					color: colors[Math.floor(Math.random() * colors.length)],
					size: 4 + Math.random() * 8,
					delay: Math.random() * 0.5,
				})
			}
			setParticles(newParticles)
			setShow(true)

			// Hide after duration
			const timer = setTimeout(() => {
				setShow(false)
			}, duration)

			return () => clearTimeout(timer)
		}
	}, [isActive, duration, particleCount])

	return (
		<AnimatePresence>
			{show && (
				<div className='fixed inset-0 pointer-events-none z-[60] overflow-hidden'>
					{particles.map(particle => (
						<motion.div
							key={particle.id}
							className='absolute'
							style={{
								left: `${particle.x}%`,
								top: `${particle.y}%`,
								width: particle.size,
								height: particle.size,
								backgroundColor: particle.color,
								borderRadius: Math.random() > 0.5 ? '50%' : '2px',
							}}
							initial={{
								y: 0,
								rotate: 0,
								opacity: 1,
							}}
							animate={{
								y: window.innerHeight + 100,
								rotate: particle.rotation + Math.random() * 720,
								opacity: [1, 1, 0],
							}}
							transition={{
								duration: 2 + Math.random(),
								delay: particle.delay,
								ease: [0.25, 0.1, 0.25, 1],
							}}
						/>
					))}
				</div>
			)}
		</AnimatePresence>
	)
}

// Star burst effect for ratings
export function StarBurst({ isActive }: { isActive: boolean }) {
	const [show, setShow] = useState(false)

	useEffect(() => {
		if (isActive) {
			setShow(true)
			const timer = setTimeout(() => setShow(false), 1000)
			return () => clearTimeout(timer)
		}
	}, [isActive])

	return (
		<AnimatePresence>
			{show && (
				<div className='absolute inset-0 pointer-events-none'>
					{[...Array(12)].map((_, i) => {
						const angle = (i * 30 * Math.PI) / 180
						return (
							<motion.div
								key={i}
								className='absolute w-1 h-1 bg-royal-gold rounded-full'
								style={{
									left: '50%',
									top: '50%',
								}}
								initial={{
									scale: 0,
									x: 0,
									y: 0,
									opacity: 1,
								}}
								animate={{
									scale: [0, 1, 0],
									x: Math.cos(angle) * 30,
									y: Math.sin(angle) * 30,
									opacity: [1, 1, 0],
								}}
								transition={{
									duration: 0.6,
									delay: i * 0.02,
									ease: 'easeOut',
								}}
							/>
						)
					})}
				</div>
			)}
		</AnimatePresence>
	)
}
