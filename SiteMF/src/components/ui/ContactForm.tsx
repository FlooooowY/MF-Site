'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'

interface FormData {
	name: string
	email: string
	phone: string
	service: string[]
	message: string
}

interface ContactFormProps {
	variant?: 'full' | 'compact'
}

const services = [
	{ value: '', label: 'Выберите услугу' },
	{ value: 'web', label: 'Веб-разработка' },
	{ value: 'ai', label: 'ИИ-автоматизация' },
	{ value: 'bots', label: 'Telegram-боты' },
	{ value: 'software', label: 'Custom ПО' },
]

export function ContactForm({ variant = 'full' }: ContactFormProps) {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		service: [],
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [errors, setErrors] = useState<Partial<FormData>>({})

	const validate = () => {
		const newErrors: Partial<FormData> = {}
		if (!formData.name.trim()) newErrors.name = 'Введите имя'
		if (!formData.email.trim()) {
			newErrors.email = 'Введите email'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Некорректный email'
		}
		if (!formData.phone.trim()) newErrors.phone = 'Введите телефон'
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validate()) return

		setIsSubmitting(true)
		await new Promise(resolve => setTimeout(resolve, 1500))
		setIsSubmitting(false)
		setIsSubmitted(true)
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target
		
		if (type === 'checkbox' && name === 'service') {
			const checked = (e.target as HTMLInputElement).checked
			setFormData(prev => {
				if (checked) {
					return { ...prev, service: [...prev.service, value] }
				} else {
					return { ...prev, service: prev.service.filter(s => s !== value) }
				}
			})
		} else {
			setFormData(prev => ({ ...prev, [name]: value }))
		}
		
		if (errors[name as keyof FormData]) {
			setErrors(prev => ({ ...prev, [name]: undefined }))
		}
	}

	const inputStyles = `
		w-full px-5 py-4 bg-[var(--background)]
		border border-[var(--foreground)]/10 focus:border-[var(--foreground)]/30
		text-[var(--foreground)] placeholder-[var(--color-medium-gray)]
		outline-none transition-colors
		text-base
	`

	if (isSubmitted) {
		return (
			<motion.div
				className='text-center py-16'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
			>
				<div className='w-20 h-20 mx-auto mb-8 border-2 border-[var(--foreground)]/10 rounded-full flex items-center justify-center'>
					<svg className='w-10 h-10 text-[var(--foreground)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
					</svg>
				</div>
				<h3 className='text-3xl font-bold text-[var(--foreground)] mb-4 tracking-tight'>Заявка отправлена!</h3>
				<p className='text-[var(--color-medium-gray)] mb-10 text-lg'>
					Мы свяжемся с вами в течение 2 часов.
				</p>
				<Button variant='secondary' onClick={() => setIsSubmitted(false)}>
					Отправить ещё
				</Button>
			</motion.div>
		)
	}

	return (
		<form className='space-y-8' onSubmit={handleSubmit}>
			{/* Name */}
			<div>
				<label className='block mb-3 text-sm text-[var(--color-medium-gray)] uppercase tracking-wider'>Имя *</label>
				<input
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
					className={`${inputStyles} ${errors.name ? 'border-red-500' : ''}`}
					placeholder='Как к вам обращаться?'
				/>
				{errors.name && <p className='mt-2 text-red-500 text-xs'>{errors.name}</p>}
			</div>

			{/* Email */}
			<div>
				<label className='block mb-3 text-sm text-[var(--color-medium-gray)] uppercase tracking-wider'>Email *</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					className={`${inputStyles} ${errors.email ? 'border-red-500' : ''}`}
					placeholder='email@company.com'
				/>
				{errors.email && <p className='mt-2 text-red-500 text-xs'>{errors.email}</p>}
			</div>

			{/* Phone */}
			<div>
				<label className='block mb-3 text-sm text-[var(--color-medium-gray)] uppercase tracking-wider'>Телефон *</label>
				<input
					type='tel'
					name='phone'
					value={formData.phone}
					onChange={handleChange}
					className={`${inputStyles} ${errors.phone ? 'border-red-500' : ''}`}
					placeholder='+7 (___) ___-__-__'
				/>
				{errors.phone && <p className='mt-2 text-red-500 text-xs'>{errors.phone}</p>}
			</div>

			{/* Service */}
			<div>
				<label className='block mb-3 text-sm text-[var(--color-medium-gray)] uppercase tracking-wider'>Услуги</label>
				<div className='space-y-3'>
					{services.filter(s => s.value !== '').map(s => (
						<label
							key={s.value}
							className='flex items-center gap-3 cursor-pointer group'
						>
							<input
								type='checkbox'
								name='service'
								value={s.value}
								checked={formData.service.includes(s.value)}
								onChange={handleChange}
								className='w-5 h-5 border border-[var(--foreground)]/20 rounded cursor-pointer focus:ring-2 focus:ring-[var(--foreground)]/20 focus:outline-none transition-colors'
							/>
							<span className='text-[var(--foreground)] group-hover:text-[var(--foreground)]/80 transition-colors'>
								{s.label}
							</span>
						</label>
					))}
				</div>
			</div>

			{/* Message - only for full variant */}
			{variant === 'full' && (
				<div>
					<label className='block mb-3 text-sm text-[var(--color-medium-gray)] uppercase tracking-wider'>Сообщение</label>
					<textarea
						name='message'
						value={formData.message}
						onChange={handleChange}
						className={`${inputStyles} min-h-[140px] resize-none`}
						placeholder='Расскажите о вашем проекте...'
					/>
				</div>
			)}

			{/* Submit */}
			<Button
				type='submit'
				variant='primary'
				size='lg'
				loading={isSubmitting}
				className='w-full mt-8'
			>
				{isSubmitting ? 'Отправка...' : 'Отправить заявку'}
			</Button>

			<p className='text-xs text-[var(--color-medium-gray)] text-center'>
				Нажимая кнопку, вы соглашаетесь с{' '}
				<a href='/privacy' className='underline hover:text-[var(--foreground)]'>
					политикой конфиденциальности
				</a>
			</p>
		</form>
	)
}
