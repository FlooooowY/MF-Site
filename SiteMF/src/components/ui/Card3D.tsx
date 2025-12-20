'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface Card3DProps {
	children: ReactNode
	className?: string
	intensity?: number
	onClick?: () => void
}

export function Card3D({
	children,
	className = '',
	intensity = 8,
	onClick,
}: Card3DProps) {
	const ref = useRef<HTMLDivElement>(null)

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
	const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

	const rotateX = useTransform(
		mouseYSpring,
		[-0.5, 0.5],
		[`${intensity}deg`, `-${intensity}deg`]
	)
	const rotateY = useTransform(
		mouseXSpring,
		[-0.5, 0.5],
		[`-${intensity}deg`, `${intensity}deg`]
	)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return

		const rect = ref.current.getBoundingClientRect()
		const mouseX = e.clientX - rect.left
		const mouseY = e.clientY - rect.top

		x.set(mouseX / rect.width - 0.5)
		y.set(mouseY / rect.height - 0.5)
	}

	const handleMouseLeave = () => {
		x.set(0)
		y.set(0)
	}

	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onClick={onClick}
			style={{
				rotateX,
				rotateY,
				transformStyle: 'preserve-3d',
			}}
			className={`
				relative bg-white border border-neutral-200
				transition-shadow duration-500
				hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]
				${className}
			`}
		>
			<div style={{ transform: 'translateZ(20px)' }}>{children}</div>
		</motion.div>
	)
}
