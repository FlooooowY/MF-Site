'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, ChevronDown } from 'lucide-react'
import Logo from './Logo'

export default function Hero() {
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(true)
	}, [])

	return (
		<section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
			{/* Video Background */}
			<div className='absolute inset-0 z-0'>
				<video
					autoPlay
					loop
					muted
					playsInline
					className='absolute inset-0 w-full h-full object-cover'
					style={{
						filter: 'brightness(0.4) contrast(1.2) saturate(0.8)',
					}}
					poster='https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop'
				>
					<source
						src='https://cdn.coverr.co/videos/coverr-barber-styling-hair-1573/1080p.mp4'
						type='video/mp4'
					/>
				</video>
				{/* Gradient Overlay */}
				<div
					className='absolute inset-0'
					style={{
						background:
							'linear-gradient(180deg, rgba(45,43,85,0.7) 0%, rgba(26,24,53,0.85) 50%, rgba(13,12,26,0.95) 100%)',
					}}
				/>
				{/* Velvet Texture */}
				<div
					className='absolute inset-0 opacity-5'
					style={{
						backgroundImage: `
              radial-gradient(ellipse at 20% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(45, 43, 85, 0.5) 0%, transparent 50%)
            `,
					}}
				/>
			</div>

			{/* Content */}
			<div className='relative z-10 container-custom text-center'>
				{/* Animated Logo */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className='flex justify-center mb-8'
				>
					<Logo className='h-24 md:h-32 w-auto' animate={isLoaded} />
				</motion.div>

				{/* Decorative Line */}
				<motion.div
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.8, delay: 2.5 }}
					className='w-32 h-0.5 mx-auto mb-8'
					style={{
						background:
							'linear-gradient(90deg, transparent, #D4AF37, transparent)',
					}}
				/>

				{/* Tagline */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 2.8 }}
					className='font-montserrat text-lg md:text-xl text-smoke tracking-widest mb-12'
				>
					Где традиции встречают стиль
				</motion.p>

				{/* CTA Button */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 3.2 }}
				>
					<motion.a
						href='#booking'
						className='inline-block btn-primary text-base md:text-lg px-10 py-4 md:px-14 md:py-5 shimmer-effect'
						whileHover={{
							scale: 1.05,
							boxShadow: '0 15px 35px rgba(212, 175, 55, 0.5)',
						}}
						whileTap={{ scale: 0.98 }}
					>
						<span className='relative z-10 flex items-center gap-2'>
							<span>★</span>
							<span>Записаться</span>
							<span>★</span>
						</span>
					</motion.a>
				</motion.div>

				{/* Bottom Info */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 3.8 }}
					className='absolute bottom-12 left-0 right-0'
				>
					<div className='container-custom'>
						{/* Divider */}
						<div className='divider-gold mb-8' />

						{/* Info Row */}
						<div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-ivory/70'>
							<div className='flex items-center gap-2'>
								<Clock className='w-5 h-5 text-royal-gold' />
								<span className='font-roboto-mono text-sm'>10:00 — 22:00</span>
							</div>
							<div className='flex items-center gap-2'>
								<MapPin className='w-5 h-5 text-royal-gold' />
								<span className='font-roboto-mono text-sm'>
									Москва, Тверская 15
								</span>
							</div>
						</div>

						{/* Scroll Indicator */}
						<motion.div
							className='mt-8 flex justify-center'
							animate={{ y: [0, 10, 0] }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<ChevronDown className='w-6 h-6 text-royal-gold/50' />
						</motion.div>
					</div>
				</motion.div>
			</div>

			{/* Decorative Corner Elements */}
			<div className='absolute top-32 left-8 w-16 h-16 border-l-2 border-t-2 border-royal-gold/20 hidden lg:block' />
			<div className='absolute top-32 right-8 w-16 h-16 border-r-2 border-t-2 border-royal-gold/20 hidden lg:block' />
			<div className='absolute bottom-32 left-8 w-16 h-16 border-l-2 border-b-2 border-royal-gold/20 hidden lg:block' />
			<div className='absolute bottom-32 right-8 w-16 h-16 border-r-2 border-b-2 border-royal-gold/20 hidden lg:block' />
		</section>
	)
}

