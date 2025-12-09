'use client'

import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export default function TelegramButton() {
	return (
		<motion.a
			href='https://t.me/aromacraft'
			target='_blank'
			rel='noopener noreferrer'
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ delay: 2, duration: 0.5, type: 'spring' }}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			className='fixed bottom-6 right-6 z-50'
		>
			{/* Pulse ring */}
			<motion.div
				className='absolute inset-0 bg-[#0088cc] rounded-full'
				animate={{
					scale: [1, 1.5],
					opacity: [0.5, 0],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					repeatDelay: 8,
				}}
			/>

			{/* Button */}
			<div className='relative w-14 h-14 bg-[#0088cc] hover:bg-[#0077b5] rounded-full shadow-lg flex items-center justify-center transition-colors'>
				<Send className='w-6 h-6 text-white' />
			</div>

			{/* Tooltip */}
			<motion.div
				initial={{ opacity: 0, x: 10 }}
				whileHover={{ opacity: 1, x: 0 }}
				className='absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-coffee-dark/90 backdrop-blur-sm text-cream text-sm rounded-lg whitespace-nowrap pointer-events-none'
			>
				Напишите нам в Telegram
				<div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-coffee-dark/90 rotate-45' />
			</motion.div>
		</motion.a>
	)
}
