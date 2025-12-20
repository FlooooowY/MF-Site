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
		font-medium
		transition-all duration-200
		disabled:opacity-50 disabled:cursor-not-allowed
		rounded-md overflow-hidden
	`

	const variants = {
		primary: `
			bg-white text-black
			hover:bg-white hover:text-black
		`,
		secondary: `
			bg-white text-black
			hover:bg-white hover:text-black
		`,
		ghost: `
			bg-transparent text-white
			hover:bg-white/10
		`,
	}

	const sizes = {
		sm: 'px-6 py-2.5 text-sm',
		md: 'px-8 py-3 text-sm',
		lg: 'px-10 py-4 text-base',
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
