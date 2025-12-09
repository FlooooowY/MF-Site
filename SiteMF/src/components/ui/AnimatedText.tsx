'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedHeadingProps {
	children: ReactNode
	className?: string
	tag?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function AnimatedHeading({
	children,
	className = '',
	tag: Tag = 'h2',
}: AnimatedHeadingProps) {
	return (
		<div className='overflow-hidden'>
			<motion.div
				initial={{ y: '100%' }}
				whileInView={{ y: 0 }}
				viewport={{ once: true, margin: '-50px' }}
				transition={{
					duration: 0.8,
					ease: [0.19, 1, 0.22, 1],
				}}
			>
				<Tag className={`font-bold ${className}`}>{children}</Tag>
			</motion.div>
		</div>
	)
}

interface AnimatedTextProps {
	text: string
	className?: string
	delay?: number
}

export function AnimatedText({
	text,
	className = '',
	delay = 0,
}: AnimatedTextProps) {
	const words = text.split(' ')

	return (
		<motion.span className={`inline-block ${className}`}>
			{words.map((word, i) => (
				<span key={i} className='inline-block overflow-hidden mr-[0.25em]'>
					<motion.span
						className='inline-block'
						initial={{ y: '100%' }}
						whileInView={{ y: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.5,
							delay: delay + i * 0.05,
							ease: [0.19, 1, 0.22, 1],
						}}
					>
						{word}
					</motion.span>
				</span>
			))}
		</motion.span>
	)
}

interface AnimatedCounterProps {
	value: number
	duration?: number
	prefix?: string
	suffix?: string
	className?: string
}

export function AnimatedCounter({
	value,
	duration = 2,
	prefix = '',
	suffix = '',
	className = '',
}: AnimatedCounterProps) {
	return (
		<motion.span
			className={`font-mono tabular-nums ${className}`}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
		>
			{prefix}
			<motion.span
				initial={{ opacity: 1 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
			>
				{value.toLocaleString('ru-RU')}
			</motion.span>
			{suffix}
		</motion.span>
	)
}
