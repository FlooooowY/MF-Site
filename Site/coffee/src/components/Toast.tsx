'use client'

import {
	useState,
	useEffect,
	createContext,
	useContext,
	ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ShoppingBag } from 'lucide-react'

interface Toast {
	id: string
	message: string
	type: 'success' | 'error' | 'cart'
}

interface ToastContextType {
	showToast: (message: string, type?: 'success' | 'error' | 'cart') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([])

	const showToast = (
		message: string,
		type: 'success' | 'error' | 'cart' = 'success'
	) => {
		const id = Math.random().toString(36).substr(2, 9)
		setToasts(prev => [...prev, { id, message, type }])
	}

	const removeToast = (id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id))
	}

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div className='fixed top-20 right-4 z-50 space-y-2'>
				<AnimatePresence>
					{toasts.map(toast => (
						<ToastItem
							key={toast.id}
							toast={toast}
							onRemove={() => removeToast(toast.id)}
						/>
					))}
				</AnimatePresence>
			</div>
		</ToastContext.Provider>
	)
}

function ToastItem({
	toast,
	onRemove,
}: {
	toast: Toast
	onRemove: () => void
}) {
	useEffect(() => {
		const timer = setTimeout(onRemove, 3000)
		return () => clearTimeout(timer)
	}, [onRemove])

	const icons = {
		success: <Check className='w-5 h-5 text-green-500' />,
		error: <X className='w-5 h-5 text-red-500' />,
		cart: <ShoppingBag className='w-5 h-5 text-gold-primary' />,
	}

	const bgColors = {
		success: 'bg-green-500/10 border-green-500/30',
		error: 'bg-red-500/10 border-red-500/30',
		cart: 'bg-gold-primary/10 border-gold-primary/30',
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: 100, scale: 0.8 }}
			animate={{ opacity: 1, x: 0, scale: 1 }}
			exit={{ opacity: 0, x: 100, scale: 0.8 }}
			className={`flex items-center gap-3 px-4 py-3 bg-coffee-dark/95 backdrop-blur-sm border rounded-xl shadow-lg min-w-[280px] ${
				bgColors[toast.type]
			}`}
		>
			{icons[toast.type]}
			<span className='text-cream text-sm flex-1'>{toast.message}</span>
			<button
				onClick={onRemove}
				className='text-cream/40 hover:text-cream transition-colors'
			>
				<X className='w-4 h-4' />
			</button>
		</motion.div>
	)
}
