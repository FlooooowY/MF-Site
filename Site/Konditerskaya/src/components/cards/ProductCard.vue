<template>
	<article
		class="product-card"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<!-- Image Container -->
		<div class="card__image">
			<img :src="product.image" :alt="product.name" loading="lazy" />

			<!-- Badge -->
			<span
				v-if="product.badge"
				class="card__badge"
				:class="`card__badge--${badgeClass}`"
			>
				{{ product.badge }}
			</span>

			<!-- Quick View Overlay -->
			<div class="card__overlay">
				<button class="quick-view-btn" @click="$emit('quick-view', product)">
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
						<circle cx="12" cy="12" r="3" />
					</svg>
					Быстрый просмотр
				</button>
			</div>

			<!-- Inner Layer Animation (filling shown on hover) -->
			<div class="card__inner-layer" :class="{ active: isHovered }">
				<div class="inner-content">
					<span class="inner-icon">🍰</span>
					<span class="inner-text">Нежная начинка</span>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="card__content">
			<span class="card__category">{{ product.category }}</span>

			<h3 class="card__title">
				<router-link :to="`/product/${product.id}`">{{
					product.name
				}}</router-link>
			</h3>

			<p class="card__description">{{ product.description }}</p>

			<!-- Rating -->
			<div class="card__rating">
				<div class="stars">
					<span
						v-for="i in 5"
						:key="i"
						class="star"
						:class="{ filled: i <= Math.floor(product.rating) }"
						>★</span
					>
				</div>
				<span class="rating-value">{{ product.rating }}</span>
				<span class="reviews-count">({{ product.reviews }} отзывов)</span>
			</div>

			<!-- Weight -->
			<div class="card__weight">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
					<line x1="3" y1="6" x2="21" y2="6" />
				</svg>
				{{ product.weight }}
			</div>

			<!-- Price & Action -->
			<div class="card__footer">
				<div class="card__price">
					<span v-if="product.oldPrice" class="price-old"
						>{{ formatPrice(product.oldPrice) }} ₽</span
					>
					<span class="price-current text-elegant"
						>{{ formatPrice(product.price) }} ₽</span
					>
				</div>

				<button
					class="card__add-btn"
					@click="handleAddToCart"
					:class="{ added: isAdded }"
				>
					<span class="btn-icon">
						<svg
							v-if="!isAdded"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<circle cx="9" cy="21" r="1" />
							<circle cx="20" cy="21" r="1" />
							<path
								d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
							/>
						</svg>
						<svg
							v-else
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<polyline points="20 6 9 17 4 12" />
						</svg>
					</span>
					<span class="btn-text">{{
						isAdded ? 'Добавлено' : 'В корзину'
					}}</span>
				</button>
			</div>
		</div>

		<!-- Decorative elements -->
		<div class="card__decor">
			<span class="decor-sparkle decor-sparkle--1">✨</span>
			<span class="decor-sparkle decor-sparkle--2">✨</span>
		</div>
	</article>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	product: {
		type: Object,
		required: true,
	},
})

const emit = defineEmits(['add-to-cart', 'quick-view'])

const isHovered = ref(false)
const isAdded = ref(false)

const badgeClass = computed(() => {
	const badge = props.product.badge?.toLowerCase()
	if (badge === 'хит') return 'hit'
	if (badge === 'новинка') return 'new'
	if (badge === 'премиум') return 'premium'
	return 'default'
})

function formatPrice(price) {
	return new Intl.NumberFormat('ru-RU').format(price)
}

function handleAddToCart() {
	if (isAdded.value) return

	isAdded.value = true
	emit('add-to-cart', props.product)

	setTimeout(() => {
		isAdded.value = false
	}, 2000)
}
</script>

<style scoped>
.product-card {
	position: relative;
	width: 300px;
	background: var(--bg-card);
	border-radius: var(--radius-lg);
	overflow: hidden;
	box-shadow: var(--shadow-md);
	transition: all var(--transition-base);
}

.product-card:hover {
	transform: translateY(-8px);
	box-shadow: var(--shadow-xl);
}

/* Image */
.card__image {
	position: relative;
	aspect-ratio: 1;
	overflow: hidden;
}

.card__image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.6s ease;
}

.product-card:hover .card__image img {
	transform: scale(1.1);
}

/* Badge */
.card__badge {
	position: absolute;
	top: var(--space-md);
	left: var(--space-md);
	padding: var(--space-xs) var(--space-sm);
	font-size: var(--text-xs);
	font-weight: 700;
	text-transform: uppercase;
	border-radius: var(--radius-full);
	z-index: 2;
}

.card__badge--hit {
	background: linear-gradient(
		135deg,
		var(--color-gold) 0%,
		var(--color-gold-dark) 100%
	);
	color: white;
}

.card__badge--new {
	background: var(--color-primary-gradient);
	color: var(--color-chocolate);
}

.card__badge--premium {
	background: var(--color-chocolate);
	color: var(--color-cream);
}

/* Overlay */
.card__overlay {
	position: absolute;
	inset: 0;
	background: rgba(74, 44, 42, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity var(--transition-base);
}

.product-card:hover .card__overlay {
	opacity: 1;
}

.quick-view-btn {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-sm) var(--space-lg);
	background: var(--bg-card);
	border: none;
	border-radius: var(--radius-full);
	font-weight: 600;
	color: var(--color-chocolate);
	cursor: pointer;
	transform: translateY(20px);
	opacity: 0;
	transition: all var(--transition-base);
}

.product-card:hover .quick-view-btn {
	transform: translateY(0);
	opacity: 1;
}

.quick-view-btn:hover {
	background: var(--color-primary-gradient);
}

/* Inner layer (filling preview) */
.card__inner-layer {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 0;
	background: linear-gradient(
		180deg,
		transparent 0%,
		rgba(255, 209, 220, 0.95) 100%
	);
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding-bottom: var(--space-md);
	transition: height 0.4s ease;
	pointer-events: none;
}

.card__inner-layer.active {
	height: 40%;
}

.inner-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-xs);
	opacity: 0;
	transform: translateY(20px);
	transition: all 0.3s ease 0.1s;
}

.card__inner-layer.active .inner-content {
	opacity: 1;
	transform: translateY(0);
}

.inner-icon {
	font-size: 2rem;
}

.inner-text {
	font-size: var(--text-sm);
	font-weight: 600;
	color: var(--color-chocolate);
}

/* Content */
.card__content {
	padding: var(--space-lg);
}

.card__category {
	font-size: var(--text-xs);
	text-transform: uppercase;
	letter-spacing: 1px;
	color: var(--color-gold);
	font-weight: 600;
}

.card__title {
	font-family: var(--font-body);
	font-weight: 700;
	font-size: var(--text-lg);
	margin: var(--space-xs) 0 var(--space-sm);
}

.card__title a {
	color: var(--color-chocolate);
	text-decoration: none;
	transition: color var(--transition-base);
}

.card__title a:hover {
	color: var(--color-gold);
}

.card__description {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin: 0 0 var(--space-md);
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

/* Rating */
.card__rating {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	margin-bottom: var(--space-sm);
}

.stars {
	display: flex;
}

.star {
	color: var(--color-cream-dark);
	font-size: 14px;
}

.star.filled {
	color: var(--color-gold);
}

.rating-value {
	font-weight: 700;
	font-size: var(--text-sm);
}

.reviews-count {
	font-size: var(--text-xs);
	color: var(--color-chocolate-light);
}

/* Weight */
.card__weight {
	display: flex;
	align-items: center;
	gap: var(--space-xs);
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin-bottom: var(--space-md);
}

/* Footer */
.card__footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--space-md);
}

.card__price {
	display: flex;
	flex-direction: column;
}

.price-old {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	text-decoration: line-through;
}

.price-current {
	font-size: var(--text-xl);
	color: var(--color-gold-dark);
}

/* Add Button */
.card__add-btn {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-sm) var(--space-md);
	background: var(--color-primary-gradient);
	border: none;
	border-radius: var(--radius-full);
	font-weight: 600;
	font-size: var(--text-sm);
	color: var(--color-chocolate);
	cursor: pointer;
	transition: all var(--transition-base);
	overflow: hidden;
}

.card__add-btn:hover {
	transform: scale(1.05);
	box-shadow: var(--shadow-md);
}

.card__add-btn.added {
	background: var(--color-success);
	color: white;
}

.btn-icon {
	display: flex;
	transition: transform var(--transition-base);
}

.card__add-btn:hover .btn-icon {
	transform: scale(1.2);
}

/* Decorative sparkles */
.card__decor {
	position: absolute;
	top: 0;
	right: 0;
	pointer-events: none;
}

.decor-sparkle {
	position: absolute;
	font-size: 1rem;
	opacity: 0;
	transition: all var(--transition-base);
}

.decor-sparkle--1 {
	top: var(--space-md);
	right: var(--space-md);
}

.decor-sparkle--2 {
	top: var(--space-xl);
	right: var(--space-xl);
}

.product-card:hover .decor-sparkle {
	opacity: 1;
	animation: sparkle 1s ease-in-out infinite;
}

.decor-sparkle--2 {
	animation-delay: 0.5s;
}

@keyframes sparkle {
	0%,
	100% {
		transform: scale(1) rotate(0deg);
	}
	50% {
		transform: scale(1.2) rotate(180deg);
	}
}

@media (max-width: 576px) {
	.product-card {
		width: 260px;
	}

	.card__content {
		padding: var(--space-md);
	}

	.btn-text {
		display: none;
	}

	.card__add-btn {
		padding: var(--space-sm);
	}
}
</style>
