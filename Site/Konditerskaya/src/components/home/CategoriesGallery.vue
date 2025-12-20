<template>
	<section class="categories section">
		<div class="container">
			<div class="section-title">
				<h2>Наш ассортимент</h2>
				<p>Выберите категорию и найдите идеальный десерт</p>
			</div>

			<div class="categories__grid">
				<router-link
					v-for="category in categories"
					:key="category.id"
					:to="`/catalog/${category.slug}`"
					class="category-card"
					:style="{ '--accent-color': category.color }"
				>
					<div class="category-card__image">
						<img :src="category.image" :alt="category.name" />
						<div class="category-card__overlay"></div>
					</div>

					<div class="category-card__content">
						<span class="category-card__icon">{{ category.icon }}</span>
						<h3 class="category-card__title">{{ category.name }}</h3>
						<p class="category-card__count">{{ category.count }} изделий</p>

						<span class="category-card__arrow">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<line x1="5" y1="12" x2="19" y2="12" />
								<polyline points="12 5 19 12 12 19" />
							</svg>
						</span>
					</div>

					<!-- Floating decorations -->
					<div class="category-card__decor">
						<span class="decor-item">{{ category.icon }}</span>
					</div>
				</router-link>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
	{
		id: 1,
		name: 'Торты',
		slug: 'cakes',
		icon: '🎂',
		count: 48,
		color: '#FFD1DC',
		image:
			'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
	},
	{
		id: 2,
		name: 'Капкейки',
		slug: 'cupcakes',
		icon: '🧁',
		count: 24,
		color: '#FFB6C1',
		image:
			'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&h=400&fit=crop',
	},
	{
		id: 3,
		name: 'Пирожные',
		slug: 'pastries',
		icon: '🍰',
		count: 32,
		color: '#FFF8E1',
		image:
			'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&h=400&fit=crop',
	},
	{
		id: 4,
		name: 'Макаронс',
		slug: 'macarons',
		icon: '🍪',
		count: 18,
		color: '#D4AF37',
		image:
			'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&h=400&fit=crop',
	},
])
</script>

<style scoped>
.categories {
	background: var(--bg-primary);
}

.categories__grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: var(--space-xl);
}

.category-card {
	position: relative;
	display: block;
	border-radius: var(--radius-xl);
	overflow: hidden;
	text-decoration: none;
	aspect-ratio: 16/10;
	box-shadow: var(--shadow-lg);
	transition: all var(--transition-base);
}

.category-card:hover {
	transform: translateY(-10px) scale(1.02);
	box-shadow: var(--shadow-xl);
}

.category-card__image {
	position: absolute;
	inset: 0;
}

.category-card__image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.6s ease;
}

.category-card:hover .category-card__image img {
	transform: scale(1.1);
}

.category-card__overlay {
	position: absolute;
	inset: 0;
	background: linear-gradient(
		135deg,
		rgba(74, 44, 42, 0.7) 0%,
		rgba(74, 44, 42, 0.4) 100%
	);
	transition: background var(--transition-base);
}

.category-card:hover .category-card__overlay {
	background: linear-gradient(
		135deg,
		rgba(74, 44, 42, 0.8) 0%,
		rgba(74, 44, 42, 0.5) 100%
	);
}

.category-card__content {
	position: relative;
	z-index: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: var(--space-xl);
	color: white;
}

.category-card__icon {
	font-size: 3rem;
	margin-bottom: var(--space-md);
	display: block;
	transition: transform var(--transition-bounce);
}

.category-card:hover .category-card__icon {
	transform: scale(1.2) rotate(-10deg);
}

.category-card__title {
	font-family: var(--font-body);
	font-weight: 700;
	font-size: var(--text-2xl);
	margin: 0 0 var(--space-xs);
	color: white;
}

.category-card__count {
	font-size: var(--text-sm);
	opacity: 0.8;
	margin: 0;
}

.category-card__arrow {
	position: absolute;
	top: var(--space-xl);
	right: var(--space-xl);
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--accent-color, var(--color-primary-start));
	border-radius: var(--radius-full);
	color: var(--color-chocolate);
	opacity: 0;
	transform: translateX(-20px);
	transition: all var(--transition-base);
}

.category-card:hover .category-card__arrow {
	opacity: 1;
	transform: translateX(0);
}

.category-card__decor {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	pointer-events: none;
}

.decor-item {
	font-size: 8rem;
	opacity: 0.1;
	transition: all 0.6s ease;
}

.category-card:hover .decor-item {
	opacity: 0.2;
	transform: scale(1.2) rotate(10deg);
}

@media (max-width: 768px) {
	.categories__grid {
		grid-template-columns: 1fr;
	}

	.category-card {
		aspect-ratio: 16/9;
	}
}

@media (max-width: 576px) {
	.category-card__content {
		padding: var(--space-lg);
	}

	.category-card__icon {
		font-size: 2rem;
	}

	.category-card__title {
		font-size: var(--text-xl);
	}
}
</style>
