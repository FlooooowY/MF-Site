'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LogoProps {
	className?: string
	animate?: boolean
}

export default function Logo({ className, animate = false }: LogoProps) {
	const pathVariants = {
		hidden: {
			pathLength: 0,
			fillOpacity: 0,
		},
		visible: {
			pathLength: 1,
			fillOpacity: 1,
			transition: {
				pathLength: { duration: 2, ease: 'easeInOut' },
				fillOpacity: { duration: 0.5, delay: 1.8 },
			},
		},
	}

	return (
		<svg
			viewBox='0 0 200 60'
			className={cn('fill-royal-gold', className)}
			xmlns='http://www.w3.org/2000/svg'
		>
			{/* Triangle Symbol */}
			<motion.path
				d='M30 5 L55 50 L5 50 Z'
				stroke='#D4AF37'
				strokeWidth='2'
				fill='none'
				initial={animate ? 'hidden' : 'visible'}
				animate='visible'
				variants={pathVariants}
			/>
			<motion.path
				d='M30 15 L45 45 L15 45 Z'
				stroke='#D4AF37'
				strokeWidth='1'
				fill='none'
				initial={animate ? 'hidden' : 'visible'}
				animate='visible'
				variants={pathVariants}
			/>
			{/* Eye in triangle */}
			<motion.circle
				cx='30'
				cy='35'
				r='5'
				stroke='#D4AF37'
				strokeWidth='1.5'
				fill='none'
				initial={animate ? { scale: 0 } : { scale: 1 }}
				animate={{ scale: 1 }}
				transition={{ delay: 2, duration: 0.3 }}
			/>
			<motion.circle
				cx='30'
				cy='35'
				r='2'
				fill='#D4AF37'
				initial={animate ? { scale: 0 } : { scale: 1 }}
				animate={{ scale: 1 }}
				transition={{ delay: 2.2, duration: 0.2 }}
			/>

			{/* Text: BROTHERHOOD */}
			<motion.text
				x='70'
				y='38'
				className='font-cormorant font-bold'
				style={{ fontSize: '22px', letterSpacing: '0.1em' }}
				fill='#D4AF37'
				initial={animate ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 2.5, duration: 0.5 }}
			>
				BROTHERHOOD
			</motion.text>

			{/* Decorative lines */}
			<motion.line
				x1='70'
				y1='45'
				x2='195'
				y2='45'
				stroke='#D4AF37'
				strokeWidth='1'
				initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
				animate={{ pathLength: 1 }}
				transition={{ delay: 2.8, duration: 0.4 }}
			/>
		</svg>
	)
}

