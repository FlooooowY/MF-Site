import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
	Star,
	Quote,
	ChevronLeft,
	ChevronRight,
	Car,
	Calendar,
} from 'lucide-react'
import './ReviewsSection.css'

const reviews = [
	{
		id: 1,
		name: 'Андрей Морозов',
		car: 'BMW 5 Series',
		date: '15 ноября 2025',
		rating: 5,
		text: 'Отличный сервис! Привёз машину на диагностику, выявили проблему с турбиной. Сделали всё быстро и качественно. Особенно понравились фотоотчёты в WhatsApp — видишь весь процесс работы. Рекомендую!',
		service: 'Ремонт турбины',
	},
	{
		id: 2,
		name: 'Елена Сидорова',
		car: 'Mercedes-Benz E-Class',
		date: '10 ноября 2025',
		rating: 5,
		text: 'Обслуживаюсь здесь уже 3 года. Ни разу не разочаровали. Мастера знают своё дело, цены адекватные, всегда есть запасные части в наличии. Персональный менеджер всегда на связи.',
		service: 'Плановое ТО',
	},
	{
		id: 3,
		name: 'Дмитрий Козлов',
		car: 'Audi A6',
		date: '5 ноября 2025',
		rating: 5,
		text: 'Проблема с АКПП решена за 2 дня! Думал, придётся менять всю коробку, но ребята разобрались и сделали точечный ремонт. Сэкономил приличную сумму. Гарантия 2 года — это вообще топ!',
		service: 'Ремонт АКПП',
	},
	{
		id: 4,
		name: 'Ирина Павлова',
		car: 'Volkswagen Tiguan',
		date: '28 октября 2025',
		rating: 4,
		text: 'Записалась онлайн, приехала — уже ждали. Диагностика быстрая, объяснили всё понятным языком. Единственное — немного долго ждала запчасть, но это скорее к поставщику вопрос.',
		service: 'Замена подвески',
	},
	{
		id: 5,
		name: 'Максим Волков',
		car: 'Porsche Cayenne',
		date: '20 октября 2025',
		rating: 5,
		text: 'Искал сервис для своего Порше, везде запрашивали космические цены. Здесь сделали качественно и по разумной цене. Мастера с опытом работы в официальных дилерских центрах — это чувствуется.',
		service: 'Комплексное ТО',
	},
]

const ReviewsSection = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(0)

	const visibleReviews = 3

	const nextReview = () => {
		setDirection(1)
		setCurrentIndex(prev => (prev + 1) % reviews.length)
	}

	const prevReview = () => {
		setDirection(-1)
		setCurrentIndex(prev => (prev - 1 + reviews.length) % reviews.length)
	}

	const getVisibleReviews = () => {
		const result = []
		for (let i = 0; i < visibleReviews; i++) {
			const index = (currentIndex + i) % reviews.length
			result.push(reviews[index])
		}
		return result
	}

	const slideVariants = {
		enter: direction => ({
			x: direction > 0 ? 300 : -300,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: direction => ({
			x: direction < 0 ? 300 : -300,
			opacity: 0,
		}),
	}

	return (
		<section className='reviews section' id='reviews' ref={ref}>
			<div className='container'>
				<motion.div
					className='section-title'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<h2>
						Отзывы <span className='text-gradient'>клиентов</span>
					</h2>
					<p>Что говорят о нас те, кто уже доверил нам свой автомобиль</p>
				</motion.div>

				{/* Overall Rating */}
				<motion.div
					className='reviews__rating'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<div className='rating-score'>
						<span className='score-value tech-text'>4.9</span>
						<div className='score-stars'>
							{[1, 2, 3, 4, 5].map(star => (
								<Star key={star} size={20} fill='currentColor' />
							))}
						</div>
						<span className='score-count'>на основе 1,247 отзывов</span>
					</div>
				</motion.div>

				{/* Reviews Slider */}
				<div className='reviews__slider'>
					<button
						className='slider-btn slider-btn--prev'
						onClick={prevReview}
						aria-label='Предыдущий отзыв'
					>
						<ChevronLeft size={24} />
					</button>

					<div className='reviews__grid'>
						<AnimatePresence mode='wait' custom={direction}>
							<motion.div
								key={currentIndex}
								className='reviews__cards'
								custom={direction}
								variants={slideVariants}
								initial='enter'
								animate='center'
								exit='exit'
								transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
							>
								{getVisibleReviews().map((review, i) => (
									<motion.div
										key={review.id}
										className='review-card'
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: i * 0.1 }}
									>
										<div className='review-card__header'>
											<div className='reviewer-avatar'>
												{review.name
													.split(' ')
													.map(n => n[0])
													.join('')}
											</div>
											<div className='reviewer-info'>
												<h4 className='reviewer-name'>{review.name}</h4>
												<div className='reviewer-car'>
													<Car size={14} />
													<span>{review.car}</span>
												</div>
											</div>
											<div className='review-rating'>
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														size={16}
														fill={i < review.rating ? 'currentColor' : 'none'}
														className={i < review.rating ? 'filled' : ''}
													/>
												))}
											</div>
										</div>

										<div className='review-card__content'>
											<Quote size={24} className='quote-icon' />
											<p>{review.text}</p>
										</div>

										<div className='review-card__footer'>
											<span className='review-service'>{review.service}</span>
											<span className='review-date'>
												<Calendar size={14} />
												{review.date}
											</span>
										</div>
									</motion.div>
								))}
							</motion.div>
						</AnimatePresence>
					</div>

					<button
						className='slider-btn slider-btn--next'
						onClick={nextReview}
						aria-label='Следующий отзыв'
					>
						<ChevronRight size={24} />
					</button>
				</div>

				{/* Dots */}
				<div className='reviews__dots'>
					{reviews.map((_, index) => (
						<button
							key={index}
							className={`dot ${currentIndex === index ? 'active' : ''}`}
							onClick={() => {
								setDirection(index > currentIndex ? 1 : -1)
								setCurrentIndex(index)
							}}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default ReviewsSection
