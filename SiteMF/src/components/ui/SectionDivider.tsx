'use client'

import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface SectionDividerProps {
	variant?: 'dots' | 'line' | 'symbols'
}

export function SectionDivider({ variant = 'symbols' }: SectionDividerProps) {
	const scrollProgress = useScrollProgress()

	if (variant === 'dots') {
		return (
			<div className='flex items-center justify-center gap-4 py-16'>
				{[0, 1, 2].map(i => (
					<motion.div
						key={i}
						className='w-2 h-2 bg-[#E0E0E0] rounded-full'
						animate={{
							scale: [1, 1.5, 1],
							opacity: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							delay: i * 0.2,
						}}
					/>
				))}
			</div>
		)
	}

	if (variant === 'line') {
		return (
			<div className='flex items-center justify-center py-32 lg:py-40'>
				<div className='w-full max-w-7xl px-6 lg:px-8'>
					<motion.div
						className='h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/10 to-transparent'
						initial={{ width: 0, opacity: 0 }}
						whileInView={{ width: '100%', opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
					/>
				</div>
			</div>
		)
	}

	// Digital symbols variant
	const symbols = ['◈', '◇', '○', '◇', '◈']

	return (
		<div className='flex items-center justify-center gap-6 py-16'>
			{symbols.map((symbol, i) => (
				<motion.span
					key={i}
					className='text-[#C0C0C0] text-xl font-light'
					style={{
						transform: `rotate(${scrollProgress * 360 + i * 72}deg)`,
					}}
					animate={{
						opacity: [0.3, 0.8, 0.3],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						delay: i * 0.3,
					}}
				>
					{symbol}
				</motion.span>
			))}
		</div>
	)
}
