<template>
	<section class="popular section">
		<div class="container">
			<div class="section-title">
				<h2>Наши хиты</h2>
				<p>Самые любимые десерты наших гостей</p>
			</div>

			<div class="popular__carousel" ref="carouselRef">
				<button
					class="carousel-btn carousel-btn--prev"
					@click="scroll(-1)"
					:disabled="!canScrollLeft"
					aria-label="Предыдущий"
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

				<div class="carousel-track" ref="trackRef" @scroll="checkScroll">
					<ProductCard
						v-for="product in popularProducts"
						:key="product.id"
						:product="product"
						@add-to-cart="handleAddToCart"
					/>
				</div>

				<button
					class="carousel-btn carousel-btn--next"
					@click="scroll(1)"
					:disabled="!canScrollRight"
					aria-label="Следующий"
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

			<div class="popular__cta">
				<router-link to="/catalog" class="btn-secondary">
					Смотреть весь каталог
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
				</router-link>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import ProductCard from '../cards/ProductCard.vue'

const cart = inject('cart')
const showNotification = inject('showNotification')

const trackRef = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const popularProducts = ref([
	{
		id: 1,
		name: 'Клубничное облако',
		category: 'Торты',
		price: 3500,
		oldPrice: 4200,
		image:
			'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop',
		rating: 4.9,
		reviews: 124,
		badge: 'Хит',
		weight: '1.5 кг',
		description: 'Нежный бисквит с клубничным муссом и свежими ягодами',
	},
	{
		id: 2,
		name: 'Шоколадный бархат',
		category: 'Торты',
		price: 4200,
		image:
			'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
		rating: 4.8,
		reviews: 98,
		badge: 'Новинка',
		weight: '2 кг',
		description: 'Три вида шоколада в одном торте',
	},
	{
		id: 3,
		name: 'Карамельный латте',
		category: 'Торты',
		price: 3800,
		image:
			'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400&h=400&fit=crop',
		rating: 4.7,
		reviews: 76,
		weight: '1.8 кг',
		description: 'Кофейный бисквит с карамельным кремом',
	},
	{
		id: 4,
		name: 'Малиновый рай',
		category: 'Торты',
		price: 3900,
		image:
			'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
		rating: 4.9,
		reviews: 112,
		badge: 'Хит',
		weight: '1.6 кг',
		description: 'Ванильный бисквит с малиновой начинкой',
	},
	{
		id: 5,
		name: 'Фисташковое наслаждение',
		category: 'Торты',
		price: 4500,
		image:
			'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop',
		rating: 4.8,
		reviews: 67,
		badge: 'Премиум',
		weight: '1.7 кг',
		description: 'Фисташковый мусс с вишнёвым конфи',
	},
	{
		id: 6,
		name: 'Тропический закат',
		category: 'Торты',
		price: 3600,
		image:
			'https://images.unsplash.com/photo-1557979619-445218f326b9?w=400&h=400&fit=crop',
		rating: 4.6,
		reviews: 54,
		weight: '1.5 кг',
		description: 'Манго, маракуйя и кокос',
	},
])

function scroll(direction) {
	const track = trackRef.value
	if (!track) return

	const cardWidth = track.querySelector('.product-card')?.offsetWidth || 300
	const gap = 24
	const scrollAmount = (cardWidth + gap) * direction

	track.scrollBy({ left: scrollAmount, behavior: 'smooth' })
}

function checkScroll() {
	const track = trackRef.value
	if (!track) return

	canScrollLeft.value = track.scrollLeft > 0
	canScrollRight.value =
		track.scrollLeft < track.scrollWidth - track.clientWidth - 10
}

function handleAddToCart(product) {
	cart.addToCart({
		id: product.id,
		name: product.name,
		price: product.price,
		image: product.image,
		quantity: 1,
	})
}

onMounted(() => {
	checkScroll()
})
</script>

<style scoped>
.popular {
	background: var(--bg-secondary);
	position: relative;
	overflow: hidden;
}

.popular::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 100px;
	background: linear-gradient(180deg, var(--bg-primary) 0%, transparent 100%);
	pointer-events: none;
}

.popular__carousel {
	position: relative;
	margin: 0 -var(--space-xl);
	padding: 0 var(--space-xl);
}

.carousel-track {
	display: flex;
	gap: var(--space-xl);
	overflow-x: auto;
	scroll-snap-type: x mandatory;
	scrollbar-width: none;
	-ms-overflow-style: none;
	padding: var(--space-lg) var(--space-sm);
	margin: calc(-1 * var(--space-lg)) calc(-1 * var(--space-sm));
}

.carousel-track::-webkit-scrollbar {
	display: none;
}

.carousel-track > * {
	scroll-snap-align: start;
	flex-shrink: 0;
}

.carousel-btn {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 10;
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
	box-shadow: var(--shadow-lg);
	transition: all var(--transition-base);
}

.carousel-btn:hover:not(:disabled) {
	background: var(--color-primary-gradient);
	transform: translateY(-50%) scale(1.1);
}

.carousel-btn:disabled {
	opacity: 0.3;
	cursor: not-allowed;
}

.carousel-btn--prev {
	left: var(--space-md);
}

.carousel-btn--next {
	right: var(--space-md);
}

.popular__cta {
	text-align: center;
	margin-top: var(--space-2xl);
}

.popular__cta .btn-secondary {
	display: inline-flex;
	align-items: center;
	gap: var(--space-sm);
}

@media (max-width: 768px) {
	.carousel-btn {
		display: none;
	}

	.carousel-track {
		padding-left: var(--space-md);
		padding-right: var(--space-md);
	}
}
</style>
