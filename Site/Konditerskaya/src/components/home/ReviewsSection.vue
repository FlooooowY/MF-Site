<template>
	<section class="reviews section">
		<div class="container">
			<div class="section-title">
				<h2>Отзывы наших гостей</h2>
				<p>Истории счастливых моментов</p>
			</div>

			<div class="reviews__slider" ref="sliderRef">
				<button
					class="slider-btn slider-btn--prev"
					@click="prevSlide"
					aria-label="Предыдущий отзыв"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>

				<div class="reviews__track">
					<TransitionGroup name="review">
						<div
							v-for="(review, index) in visibleReviews"
							:key="review.id"
							class="review-card"
							:class="{ 'review-card--center': index === 1 }"
						>
							<div class="review-card__header">
								<div class="review-card__avatar">
									<img :src="review.avatar" :alt="review.name" />
								</div>
								<div class="review-card__info">
									<h4 class="review-card__name">{{ review.name }}</h4>
									<span class="review-card__date">{{ review.date }}</span>
								</div>
								<div class="review-card__rating">
									<span
										v-for="i in 5"
										:key="i"
										class="star"
										:class="{ filled: i <= review.rating }"
										>★</span
									>
								</div>
							</div>

							<p class="review-card__text">{{ review.text }}</p>

							<div class="review-card__occasion">
								<span class="occasion-icon">{{ review.occasionIcon }}</span>
								<span class="occasion-text">{{ review.occasion }}</span>
							</div>

							<div v-if="review.image" class="review-card__image">
								<img :src="review.image" :alt="review.occasion" />
							</div>
						</div>
					</TransitionGroup>
				</div>

				<button
					class="slider-btn slider-btn--next"
					@click="nextSlide"
					aria-label="Следующий отзыв"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</button>
			</div>

			<!-- Dots -->
			<div class="reviews__dots">
				<button
					v-for="(_, index) in reviews"
					:key="index"
					class="dot"
					:class="{ active: currentIndex === index }"
					@click="goToSlide(index)"
					:aria-label="`Отзыв ${index + 1}`"
				></button>
			</div>

			<!-- Stats -->
			<div class="reviews__stats">
				<div class="stat-item">
					<span class="stat-icon">⭐</span>
					<span class="stat-value">4.9</span>
					<span class="stat-label">Средний рейтинг</span>
				</div>
				<div class="stat-item">
					<span class="stat-icon">💬</span>
					<span class="stat-value">2,847</span>
					<span class="stat-label">Отзывов</span>
				</div>
				<div class="stat-item">
					<span class="stat-icon">❤️</span>
					<span class="stat-value">98%</span>
					<span class="stat-label">Рекомендуют нас</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentIndex = ref(0)
const autoplayInterval = ref(null)

const reviews = ref([
	{
		id: 1,
		name: 'Анна Петрова',
		avatar: 'https://i.pravatar.cc/100?img=1',
		date: '15 ноября 2024',
		rating: 5,
		text: 'Заказывали торт на юбилей мамы — это было волшебно! Вкус невероятный, а оформление превзошло все ожидания. Гости были в восторге!',
		occasion: 'День рождения',
		occasionIcon: '🎂',
		image:
			'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=300&h=200&fit=crop',
	},
	{
		id: 2,
		name: 'Михаил Сидоров',
		avatar: 'https://i.pravatar.cc/100?img=3',
		date: '10 ноября 2024',
		rating: 5,
		text: 'Свадебный торт был просто произведением искусства. Три яруса, живые цветы, нежнейший крем — идеально для нашего особенного дня!',
		occasion: 'Свадьба',
		occasionIcon: '💒',
		image:
			'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=300&h=200&fit=crop',
	},
	{
		id: 3,
		name: 'Елена Козлова',
		avatar: 'https://i.pravatar.cc/100?img=5',
		date: '5 ноября 2024',
		rating: 5,
		text: 'Детский торт с единорогом! Дочка была счастлива до слёз. Торт не только красивый, но и очень вкусный — натуральные ингредиенты чувствуются.',
		occasion: 'Детский праздник',
		occasionIcon: '🎈',
		image:
			'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=200&fit=crop',
	},
	{
		id: 4,
		name: 'Ольга Новикова',
		avatar: 'https://i.pravatar.cc/100?img=9',
		date: '1 ноября 2024',
		rating: 5,
		text: 'Капкейки на корпоратив — отдельный вид искусства! Каждый с уникальным дизайном, а вкусы разные. Коллеги были в восторге!',
		occasion: 'Корпоратив',
		occasionIcon: '🏢',
		image:
			'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=300&h=200&fit=crop',
	},
	{
		id: 5,
		name: 'Дмитрий Волков',
		avatar: 'https://i.pravatar.cc/100?img=12',
		date: '28 октября 2024',
		rating: 5,
		text: 'Заказывал торт-сюрприз для жены. Доставили точно вовремя, упаковка идеальная. Торт был восхитительным — фисташка с малиной!',
		occasion: 'Годовщина',
		occasionIcon: '💑',
		image:
			'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop',
	},
])

const visibleReviews = computed(() => {
	const result = []
	for (let i = -1; i <= 1; i++) {
		const index =
			(currentIndex.value + i + reviews.value.length) % reviews.value.length
		result.push(reviews.value[index])
	}
	return result
})

function nextSlide() {
	currentIndex.value = (currentIndex.value + 1) % reviews.value.length
}

function prevSlide() {
	currentIndex.value =
		(currentIndex.value - 1 + reviews.value.length) % reviews.value.length
}

function goToSlide(index) {
	currentIndex.value = index
}

function startAutoplay() {
	autoplayInterval.value = setInterval(nextSlide, 5000)
}

function stopAutoplay() {
	if (autoplayInterval.value) {
		clearInterval(autoplayInterval.value)
	}
}

onMounted(() => {
	startAutoplay()
})

onUnmounted(() => {
	stopAutoplay()
})
</script>

<style scoped>
.reviews {
	background: var(--bg-secondary);
	position: relative;
	overflow: hidden;
}

.reviews__slider {
	position: relative;
	display: flex;
	align-items: center;
	gap: var(--space-lg);
	margin-bottom: var(--space-xl);
}

.slider-btn {
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	background: var(--bg-card);
	border: none;
	border-radius: var(--radius-full);
	cursor: pointer;
	color: var(--color-chocolate);
	box-shadow: var(--shadow-md);
	transition: all var(--transition-base);
	z-index: 10;
}

.slider-btn:hover {
	background: var(--color-primary-gradient);
	transform: scale(1.1);
}

.reviews__track {
	flex: 1;
	display: flex;
	gap: var(--space-lg);
	justify-content: center;
	overflow: hidden;
}

.review-card {
	flex: 0 0 calc(33.333% - var(--space-lg));
	max-width: 380px;
	padding: var(--space-xl);
	background: var(--bg-card);
	border-radius: var(--radius-xl);
	box-shadow: var(--shadow-md);
	transition: all var(--transition-base);
	opacity: 0.7;
	transform: scale(0.9);
}

.review-card--center {
	opacity: 1;
	transform: scale(1);
	box-shadow: var(--shadow-xl);
}

.review-card__header {
	display: flex;
	align-items: center;
	gap: var(--space-md);
	margin-bottom: var(--space-lg);
}

.review-card__avatar {
	width: 50px;
	height: 50px;
	border-radius: var(--radius-full);
	overflow: hidden;
	border: 3px solid var(--color-primary-start);
}

.review-card__avatar img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.review-card__info {
	flex: 1;
}

.review-card__name {
	font-family: var(--font-body);
	font-weight: 700;
	font-size: var(--text-base);
	margin: 0;
}

.review-card__date {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

.review-card__rating {
	display: flex;
}

.star {
	font-size: 14px;
	color: var(--color-cream-dark);
}

.star.filled {
	color: var(--color-gold);
}

.review-card__text {
	font-size: var(--text-base);
	line-height: 1.7;
	color: var(--color-chocolate);
	margin-bottom: var(--space-md);
}

.review-card__occasion {
	display: inline-flex;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-xs) var(--space-sm);
	background: var(--color-primary-gradient);
	border-radius: var(--radius-full);
	font-size: var(--text-sm);
	margin-bottom: var(--space-md);
}

.occasion-icon {
	font-size: 1rem;
}

.occasion-text {
	font-weight: 500;
	color: var(--color-chocolate);
}

.review-card__image {
	border-radius: var(--radius-md);
	overflow: hidden;
	aspect-ratio: 3/2;
}

.review-card__image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform var(--transition-base);
}

.review-card:hover .review-card__image img {
	transform: scale(1.05);
}

/* Dots */
.reviews__dots {
	display: flex;
	justify-content: center;
	gap: var(--space-sm);
	margin-bottom: var(--space-2xl);
}

.dot {
	width: 10px;
	height: 10px;
	background: var(--color-cream-dark);
	border: none;
	border-radius: var(--radius-full);
	cursor: pointer;
	transition: all var(--transition-base);
}

.dot.active {
	width: 30px;
	background: var(--color-gold);
}

.dot:hover {
	background: var(--color-primary-end);
}

/* Stats */
.reviews__stats {
	display: flex;
	justify-content: center;
	gap: var(--space-3xl);
	padding: var(--space-xl);
	background: var(--bg-card);
	border-radius: var(--radius-xl);
	box-shadow: var(--shadow-lg);
	max-width: 700px;
	margin: 0 auto;
}

.stat-item {
	text-align: center;
}

.stat-icon {
	display: block;
	font-size: 2rem;
	margin-bottom: var(--space-sm);
}

.stat-value {
	display: block;
	font-family: var(--font-elegant);
	font-size: var(--text-2xl);
	font-weight: 700;
	color: var(--color-chocolate);
}

.stat-label {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

/* Transitions */
.review-enter-active,
.review-leave-active {
	transition: all 0.5s ease;
}

.review-enter-from {
	opacity: 0;
	transform: translateX(100px) scale(0.8);
}

.review-leave-to {
	opacity: 0;
	transform: translateX(-100px) scale(0.8);
}

@media (max-width: 992px) {
	.reviews__track {
		flex-wrap: nowrap;
	}

	.review-card {
		flex: 0 0 80%;
		max-width: none;
	}

	.review-card:not(.review-card--center) {
		display: none;
	}

	.review-card--center {
		flex: 0 0 100%;
	}
}

@media (max-width: 576px) {
	.slider-btn {
		width: 40px;
		height: 40px;
	}

	.reviews__stats {
		flex-direction: column;
		gap: var(--space-lg);
	}
}
</style>
