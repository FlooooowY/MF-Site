'use client'

import { motion } from 'framer-motion'
import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	children: ReactNode
	icon?: ReactNode
	loading?: boolean
}

export function Button({
	variant = 'primary',
	size = 'md',
	children,
	icon,
	loading,
	className = '',
	disabled,
	...props
}: ButtonProps) {
	const baseStyles = `
		relative inline-flex items-center justify-center gap-2
		font-semibold uppercase tracking-wider
		transition-all duration-300
		disabled:opacity-50 disabled:cursor-not-allowed
	`

	const variants = {
		primary: `
			bg-[var(--foreground)] text-[var(--background)]
			hover:opacity-80
			hover:shadow-lg hover:-translate-y-0.5
		`,
		secondary: `
			bg-transparent text-[var(--foreground)]
			border-2 border-[var(--foreground)]
			hover:bg-[var(--foreground)] hover:text-[var(--background)]
		`,
		ghost: `
			bg-transparent text-[var(--foreground)]
			hover:bg-[var(--foreground)]/5
		`,
	}

	const sizes = {
		sm: 'px-6 py-3 text-xs',
		md: 'px-8 py-4 text-sm',
		lg: 'px-12 py-5 text-base',
	}

	return (
		<motion.button
			whileHover={{ scale: disabled ? 1 : 1.02 }}
			whileTap={{ scale: disabled ? 1 : 0.98 }}
			className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? (
				<motion.span
					className='w-5 h-5 border-2 border-current border-t-transparent rounded-full'
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
				/>
			) : icon ? (
				<span className='text-lg'>{icon}</span>
			) : null}
			{children}
		</motion.button>
	)
}
