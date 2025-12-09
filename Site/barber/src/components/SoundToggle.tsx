'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { soundManager } from '@/lib/sounds'

export default function SoundToggle() {
	const [isEnabled, setIsEnabled] = useState(true)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		setIsEnabled(soundManager?.isEnabled() ?? true)
	}, [])

	const toggleSound = () => {
		const newValue = !isEnabled
		setIsEnabled(newValue)
		soundManager?.setEnabled(newValue)
	}

	if (!mounted) return null

	return (
		<motion.button
			onClick={toggleSound}
			className='fixed top-24 right-6 z-40 w-10 h-10 rounded-full glass-card flex items-center justify-center text-ivory/70 hover:text-royal-gold transition-colors'
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ delay: 2.5, duration: 0.3 }}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			aria-label={isEnabled ? 'Отключить звук' : 'Включить звук'}
		>
			{isEnabled ? (
				<Volume2 className='w-5 h-5' />
			) : (
				<VolumeX className='w-5 h-5' />
			)}
		</motion.button>
	)
}
