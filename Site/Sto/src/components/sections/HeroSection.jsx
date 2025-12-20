import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
	Calendar,
	Calculator,
	ChevronDown,
	Play,
	Shield,
	Clock,
	Award,
	Users,
} from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter'
import './HeroSection.css'

const stats = [
	{ value: 15, suffix: '+', label: 'Лет опыта', icon: Award },
	{ value: 50000, suffix: '+', label: 'Клиентов', icon: Users },
	{ value: 99, suffix: '%', label: 'Довольных', icon: Shield },
	{ value: 24, suffix: '/7', label: 'Поддержка', icon: Clock },
]

const HeroSection = ({ onBookingClick, onCalculatorClick }) => {
	const videoRef = useRef(null)
	const [isVideoLoaded, setIsVideoLoaded] = useState(false)

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 0.7
		}
	}, [])

	const scrollToContent = () => {
		window.scrollTo({
			top: window.innerHeight,
			behavior: 'smooth',
		})
	}

	return (
		<section className='hero'>
			{/* Video Background */}
			<div className='hero__video-wrapper'>
				<div className='hero__video-overlay' />
				<video
					ref={videoRef}
					className={`hero__video ${isVideoLoaded ? 'loaded' : ''}`}
					autoPlay
					muted
					loop
					playsInline
					onLoadedData={() => setIsVideoLoaded(true)}
					poster='/images/hero-poster.jpg'
				>
					<source
						src='https://assets.mixkit.co/videos/preview/mixkit-mechanic-checking-the-engine-of-a-car-in-an-auto-42436-large.mp4'
						type='video/mp4'
					/>
				</video>

				{/* Animated grid background as fallback */}
				<div className='hero__grid-bg'>
					{[...Array(20)].map((_, i) => (
						<div
							key={i}
							className='grid-line'
							style={{ animationDelay: `${i * 0.1}s` }}
						/>
					))}
				</div>
			</div>

			{/* Content */}
			<div className='hero__content container'>
				<motion.div
					className='hero__text'
					initial={{ opacity: 0, y: 60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
				>
					<motion.div
						className='hero__badge'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<Shield size={16} />
						<span>Официальная гарантия 2 года</span>
					</motion.div>

					<h1 className='hero__title'>
						<span className='title-line'>Профессиональный</span>
						<span className='title-line title-accent'>Автосервис</span>
						<span className='title-line'>Нового Поколения</span>
					</h1>

					<motion.p
						className='hero__subtitle'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.6 }}
					>
						Диагностика • Ремонт • Техобслуживание • Кузовные работы
					</motion.p>

					<motion.div
						className='hero__actions'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.5 }}
					>
						<button
							className='btn btn-secondary btn-lg btn-pulse hero__cta'
							onClick={onBookingClick}
						>
							<Calendar size={22} />
							Записаться на диагностику
						</button>

						<button
							className='btn btn-outline btn-lg'
							onClick={onCalculatorClick}
						>
							<Calculator size={22} />
							Рассчитать стоимость
						</button>
					</motion.div>

					<motion.div
						className='hero__trust'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.5 }}
					>
						<div className='trust-item'>
							<Play size={16} />
							<span>Прозрачный процесс ремонта</span>
						</div>
						<div className='trust-item'>
							<Shield size={16} />
							<span>Оригинальные запчасти</span>
						</div>
					</motion.div>
				</motion.div>

				{/* Stats */}
				<motion.div
					className='hero__stats'
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.6 }}
				>
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							className='stat-card'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
							whileHover={{ scale: 1.05, y: -5 }}
						>
							<stat.icon className='stat-icon' size={24} />
							<div className='stat-value'>
								<AnimatedCounter
									end={stat.value}
									duration={2000}
									delay={1500 + index * 200}
								/>
								<span className='stat-suffix'>{stat.suffix}</span>
							</div>
							<span className='stat-label'>{stat.label}</span>
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* Scroll Indicator */}
			<motion.button
				className='hero__scroll'
				onClick={scrollToContent}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5 }}
				aria-label='Прокрутить вниз'
			>
				<span>Узнать больше</span>
				<ChevronDown className='scroll-icon' size={24} />
			</motion.button>

			{/* Decorative Elements */}
			<div className='hero__decor'>
				<div className='decor-circle decor-circle--1' />
				<div className='decor-circle decor-circle--2' />
				<div className='decor-line decor-line--1' />
				<div className='decor-line decor-line--2' />
			</div>
		</section>
	)
}

export default HeroSection
