'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'

interface FormData {
	name: string
	email: string
	phone: string
	service: string
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
		service: '',
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
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		if (errors[name as keyof FormData]) {
			setErrors(prev => ({ ...prev, [name]: undefined }))
		}
	}

	const inputStyles = `
		w-full px-4 py-3 bg-white
		border border-neutral-200 focus:border-black
		text-black placeholder-neutral-400
		outline-none transition-colors
		text-base
	`

	if (isSubmitted) {
		return (
			<motion.div
				className='text-center py-12'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
			>
				<div className='w-16 h-16 mx-auto mb-6 bg-black rounded-full flex items-center justify-center'>
					<svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
					</svg>
				</div>
				<h3 className='text-2xl font-bold text-black mb-4'>Заявка отправлена!</h3>
				<p className='text-neutral-600 mb-8'>
					Мы свяжемся с вами в течение 2 часов.
				</p>
				<Button variant='secondary' onClick={() => setIsSubmitted(false)}>
					Отправить ещё
				</Button>
			</motion.div>
		)
	}

	return (
		<form className='space-y-4' onSubmit={handleSubmit}>
			{/* Name */}
			<div>
				<label className='block mb-2 text-sm text-neutral-600'>Имя *</label>
				<input
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
					className={`${inputStyles} ${errors.name ? 'border-red-500' : ''}`}
					placeholder='Как к вам обращаться?'
				/>
				{errors.name && <p className='mt-1 text-red-500 text-xs'>{errors.name}</p>}
			</div>

			{/* Email */}
			<div>
				<label className='block mb-2 text-sm text-neutral-600'>Email *</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					className={`${inputStyles} ${errors.email ? 'border-red-500' : ''}`}
					placeholder='email@company.com'
				/>
				{errors.email && <p className='mt-1 text-red-500 text-xs'>{errors.email}</p>}
			</div>

			{/* Phone */}
			<div>
				<label className='block mb-2 text-sm text-neutral-600'>Телефон *</label>
				<input
					type='tel'
					name='phone'
					value={formData.phone}
					onChange={handleChange}
					className={`${inputStyles} ${errors.phone ? 'border-red-500' : ''}`}
					placeholder='+7 (___) ___-__-__'
				/>
				{errors.phone && <p className='mt-1 text-red-500 text-xs'>{errors.phone}</p>}
			</div>

			{/* Service */}
			<div>
				<label className='block mb-2 text-sm text-neutral-600'>Услуга</label>
				<select
					name='service'
					value={formData.service}
					onChange={handleChange}
					className={`${inputStyles} cursor-pointer`}
				>
					{services.map(s => (
						<option key={s.value} value={s.value}>{s.label}</option>
					))}
				</select>
			</div>

			{/* Message - only for full variant */}
			{variant === 'full' && (
				<div>
					<label className='block mb-2 text-sm text-neutral-600'>Сообщение</label>
					<textarea
						name='message'
						value={formData.message}
						onChange={handleChange}
						className={`${inputStyles} min-h-[120px] resize-none`}
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
				className='w-full'
			>
				{isSubmitting ? 'Отправка...' : 'Отправить заявку'}
			</Button>

			<p className='text-xs text-neutral-500'>
				Нажимая кнопку, вы соглашаетесь с{' '}
				<a href='/privacy' className='underline hover:text-black'>
					политикой конфиденциальности
				</a>
			</p>
		</form>
	)
}
