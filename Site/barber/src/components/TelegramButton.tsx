'use client'

import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

interface TelegramButtonProps {
	href?: string
}

export default function TelegramButton({
	href = 'https://t.me/brotherhood',
}: TelegramButtonProps) {
	return (
		<motion.a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className='fixed bottom-24 right-6 z-40 md:bottom-6 group'
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ delay: 2, duration: 0.3, type: 'spring' }}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			{/* Outer Ring Animation */}
			<motion.div
				className='absolute inset-0 rounded-full'
				style={{
					border: '2px solid rgba(212, 175, 55, 0.5)',
				}}
				animate={{
					scale: [1, 1.3, 1],
					opacity: [0.5, 0, 0.5],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
			/>

			{/* Button */}
			<div className='relative w-14 h-14 rounded-full bg-[#0088cc] flex items-center justify-center shadow-lg border-2 border-royal-gold transition-all duration-300 group-hover:shadow-gold group-hover:bg-[#0099dd]'>
				<Send className='w-6 h-6 text-white' />
			</div>

			{/* Tooltip */}
			<motion.div
				className='absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-obsidian/90 backdrop-blur-sm border border-royal-gold/20 rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'
				initial={{ x: 10 }}
				whileHover={{ x: 0 }}
			>
				<p className='font-montserrat text-sm text-ivory'>Напишите нам</p>
				<p className='font-roboto-mono text-xs text-smoke'>в Telegram</p>
				{/* Arrow */}
				<div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-full'>
					<div
						className='w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-obsidian/90'
						style={{ borderLeftColor: 'rgba(13, 12, 26, 0.9)' }}
					/>
				</div>
			</motion.div>
		</motion.a>
	)
}
