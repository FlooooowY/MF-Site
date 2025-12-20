<template>
	<div class="product-page">
		<div class="container">
			<!-- Breadcrumb -->
			<nav class="breadcrumb">
				<router-link to="/">Главная</router-link>
				<span>/</span>
				<router-link :to="`/catalog/${product.category}`">{{
					categoryName
				}}</router-link>
				<span>/</span>
				<span>{{ product.name }}</span>
			</nav>

			<div class="product-layout">
				<!-- Gallery -->
				<div class="product-gallery">
					<div class="gallery-main">
						<img :src="activeImage" :alt="product.name" class="main-image" />
						<div class="gallery-badge" v-if="product.badge">
							{{ product.badge }}
						</div>
					</div>
					<div class="gallery-thumbs">
						<button
							v-for="(img, index) in product.gallery"
							:key="index"
							class="thumb"
							:class="{ active: activeImageIndex === index }"
							@click="activeImageIndex = index"
						>
							<img :src="img" :alt="`${product.name} - фото ${index + 1}`" />
						</button>
					</div>
				</div>

				<!-- Info -->
				<div class="product-info">
					<div class="product-header">
						<span class="product-category">{{ categoryName }}</span>
						<h1>{{ product.name }}</h1>

						<div class="product-rating">
							<div class="stars">
								<span
									v-for="i in 5"
									:key="i"
									class="star"
									:class="{ filled: i <= product.rating }"
									>★</span
								>
							</div>
							<span class="rating-value">{{ product.rating }}</span>
							<span class="reviews-link">{{ product.reviews }} отзывов</span>
						</div>
					</div>

					<p class="product-description">{{ product.description }}</p>

					<!-- Options -->
					<div class="product-options">
						<!-- Size -->
						<div class="option-group">
							<label class="option-label">Размер:</label>
							<div class="size-options">
								<button
									v-for="size in product.sizes"
									:key="size.id"
									class="size-btn"
									:class="{ active: selectedSize === size.id }"
									@click="selectedSize = size.id"
								>
									<span class="size-weight">{{ size.weight }}</span>
									<span class="size-servings">~{{ size.servings }} порций</span>
								</button>
							</div>
						</div>

						<!-- Filling -->
						<div class="option-group">
							<label class="option-label">Начинка:</label>
							<div class="filling-options">
								<button
									v-for="filling in product.fillings"
									:key="filling.id"
									class="filling-btn"
									:class="{ active: selectedFilling === filling.id }"
									@click="selectedFilling = filling.id"
								>
									<span class="filling-emoji">{{ filling.emoji }}</span>
									<span class="filling-name">{{ filling.name }}</span>
								</button>
							</div>
						</div>
					</div>

					<!-- Price & Actions -->
					<div class="product-actions">
						<div class="price-block">
							<span v-if="product.oldPrice" class="price-old"
								>{{ formatPrice(product.oldPrice) }} ₽</span
							>
							<span class="price-current text-elegant"
								>{{ formatPrice(currentPrice) }} ₽</span
							>
						</div>

						<div class="quantity-block">
							<button class="qty-btn" @click="quantity > 1 && quantity--">
								−
							</button>
							<span class="qty-value">{{ quantity }}</span>
							<button class="qty-btn" @click="quantity++">+</button>
						</div>

						<button class="btn-gold add-to-cart" @click="handleAddToCart">
							<svg
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
							В корзину
						</button>
					</div>

					<!-- Tabs -->
					<div class="product-tabs">
						<div class="tabs-header">
							<button
								v-for="tab in tabs"
								:key="tab.id"
								class="tab-btn"
								:class="{ active: activeTab === tab.id }"
								@click="activeTab = tab.id"
							>
								{{ tab.name }}
							</button>
						</div>

						<div class="tabs-content">
							<!-- Composition -->
							<div v-show="activeTab === 'composition'" class="tab-panel">
								<h4>Состав:</h4>
								<p>{{ product.composition }}</p>

								<h4>Пищевая ценность (на 100г):</h4>
								<div class="nutrition-grid">
									<div class="nutrition-item">
										<span class="nutrition-value">{{
											product.nutrition?.calories
										}}</span>
										<span class="nutrition-label">ккал</span>
									</div>
									<div class="nutrition-item">
										<span class="nutrition-value"
											>{{ product.nutrition?.protein }}г</span
										>
										<span class="nutrition-label">белки</span>
									</div>
									<div class="nutrition-item">
										<span class="nutrition-value"
											>{{ product.nutrition?.fat }}г</span
										>
										<span class="nutrition-label">жиры</span>
									</div>
									<div class="nutrition-item">
										<span class="nutrition-value"
											>{{ product.nutrition?.carbs }}г</span
										>
										<span class="nutrition-label">углеводы</span>
									</div>
								</div>
							</div>

							<!-- Allergens -->
							<div v-show="activeTab === 'allergens'" class="tab-panel">
								<h4>⚠️ Содержит аллергены:</h4>
								<div class="allergens-list">
									<span
										v-for="allergen in product.allergens"
										:key="allergen"
										class="allergen-tag"
									>
										{{ allergen }}
									</span>
								</div>
								<p class="allergen-note">
									Если у вас есть аллергия, пожалуйста, сообщите об этом при
									заказе.
								</p>
							</div>

							<!-- Delivery -->
							<div v-show="activeTab === 'delivery'" class="tab-panel">
								<div class="delivery-options">
									<div class="delivery-option">
										<span class="delivery-icon">🚗</span>
										<div class="delivery-info">
											<h4>Доставка</h4>
											<p>По Москве — от 500 ₽</p>
											<p>Бесплатно при заказе от 3000 ₽</p>
										</div>
									</div>
									<div class="delivery-option">
										<span class="delivery-icon">🏪</span>
										<div class="delivery-info">
											<h4>Самовывоз</h4>
											<p>Бесплатно</p>
											<p>г. Москва, ул. Сладкая, д. 1</p>
										</div>
									</div>
								</div>
								<p class="delivery-note">
									⏰ Минимальный срок изготовления: 3 дня
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Related Products -->
			<section class="related-products">
				<h2>Вам также понравится</h2>
				<div class="related-grid">
					<ProductCard
						v-for="related in relatedProducts"
						:key="related.id"
						:product="related"
					/>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/cards/ProductCard.vue'

const route = useRoute()
const cart = inject('cart')
const showNotification = inject('showNotification')

const activeImageIndex = ref(0)
const selectedSize = ref('medium')
const selectedFilling = ref('strawberry')
const quantity = ref(1)
const activeTab = ref('composition')

const tabs = [
	{ id: 'composition', name: 'Состав' },
	{ id: 'allergens', name: 'Аллергены' },
	{ id: 'delivery', name: 'Доставка' },
]

// Demo product data
const product = ref({
	id: route.params.id || 1,
	name: 'Клубничное облако',
	category: 'cakes',
	price: 3500,
	oldPrice: 4200,
	badge: 'Хит',
	rating: 4.9,
	reviews: 124,
	description:
		'Нежнейший торт с воздушным клубничным муссом и свежими ягодами. Идеальное сочетание лёгкого бисквита и кремовой начинки создаёт неповторимый вкус, который запомнится надолго.',
	gallery: [
		'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop',
		'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=600&fit=crop',
		'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&h=600&fit=crop',
		'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop',
	],
	sizes: [
		{ id: 'small', weight: '1 кг', servings: 6, priceMultiplier: 0.7 },
		{ id: 'medium', weight: '1.5 кг', servings: 10, priceMultiplier: 1 },
		{ id: 'large', weight: '2 кг', servings: 14, priceMultiplier: 1.35 },
	],
	fillings: [
		{ id: 'strawberry', name: 'Клубника', emoji: '🍓' },
		{ id: 'raspberry', name: 'Малина', emoji: '🫐' },
		{ id: 'vanilla', name: 'Ваниль', emoji: '🍦' },
	],
	composition:
		'Бисквит (мука пшеничная, яйца, сахар), клубничный мусс (сливки, клубника, сахар, желатин), крем-чиз (сливочный сыр, сливки, сахарная пудра), свежая клубника, белый шоколад.',
	nutrition: { calories: 285, protein: 4, fat: 15, carbs: 35 },
	allergens: ['Глютен', 'Молоко', 'Яйца'],
	weight: '1.5 кг',
})

const categoryName = computed(() => {
	const categories = {
		cakes: 'Торты',
		cupcakes: 'Капкейки',
		pastries: 'Пирожные',
		macarons: 'Макаронс',
	}
	return categories[product.value.category] || 'Десерты'
})

const activeImage = computed(() => {
	return product.value.gallery[activeImageIndex.value]
})

const currentPrice = computed(() => {
	const size = product.value.sizes.find(s => s.id === selectedSize.value)
	return Math.round(product.value.price * (size?.priceMultiplier || 1))
})

const relatedProducts = ref([
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
		description: 'Три вида шоколада',
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
		description: 'Кофейный бисквит',
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
		description: 'Ванильный бисквит с малиной',
	},
])

function formatPrice(price) {
	return new Intl.NumberFormat('ru-RU').format(price)
}

function handleAddToCart() {
	const size = product.value.sizes.find(s => s.id === selectedSize.value)
	const filling = product.value.fillings.find(
		f => f.id === selectedFilling.value
	)

	cart.addToCart({
		id: product.value.id,
		name: product.value.name,
		price: currentPrice.value,
		image: product.value.gallery[0],
		options: {
			size: size?.weight,
			filling: filling?.name,
		},
		quantity: quantity.value,
	})

	showNotification('Добавлено в корзину!', 'success')
}
</script>

<style scoped>
.product-page {
	padding: 120px 0 var(--space-4xl);
}

/* Breadcrumb */
.breadcrumb {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	margin-bottom: var(--space-xl);
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

.breadcrumb a {
	color: var(--color-chocolate-light);
	text-decoration: none;
	transition: color var(--transition-base);
}

.breadcrumb a:hover {
	color: var(--color-gold);
}

/* Layout */
.product-layout {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-3xl);
	margin-bottom: var(--space-4xl);
}

/* Gallery */
.product-gallery {
	position: sticky;
	top: 100px;
}

.gallery-main {
	position: relative;
	aspect-ratio: 1;
	border-radius: var(--radius-xl);
	overflow: hidden;
	margin-bottom: var(--space-md);
	box-shadow: var(--shadow-lg);
}

.main-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.gallery-badge {
	position: absolute;
	top: var(--space-lg);
	left: var(--space-lg);
	padding: var(--space-sm) var(--space-md);
	background: linear-gradient(
		135deg,
		var(--color-gold) 0%,
		var(--color-gold-dark) 100%
	);
	color: white;
	font-weight: 700;
	font-size: var(--text-sm);
	border-radius: var(--radius-full);
}

.gallery-thumbs {
	display: flex;
	gap: var(--space-sm);
}

.thumb {
	width: 80px;
	height: 80px;
	border-radius: var(--radius-md);
	overflow: hidden;
	border: 3px solid transparent;
	cursor: pointer;
	transition: all var(--transition-base);
	padding: 0;
	background: none;
}

.thumb:hover,
.thumb.active {
	border-color: var(--color-gold);
}

.thumb img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

/* Info */
.product-info {
	padding-top: var(--space-md);
}

.product-category {
	font-size: var(--text-sm);
	text-transform: uppercase;
	letter-spacing: 1px;
	color: var(--color-gold);
	font-weight: 600;
}

.product-header h1 {
	font-size: var(--text-4xl);
	margin: var(--space-sm) 0 var(--space-md);
}

.product-rating {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	margin-bottom: var(--space-xl);
}

.stars {
	display: flex;
}

.star {
	font-size: 18px;
	color: var(--color-cream-dark);
}

.star.filled {
	color: var(--color-gold);
}

.rating-value {
	font-weight: 700;
}

.reviews-link {
	color: var(--color-chocolate-light);
	font-size: var(--text-sm);
}

.product-description {
	font-size: var(--text-lg);
	line-height: 1.8;
	color: var(--color-chocolate-light);
	margin-bottom: var(--space-xl);
}

/* Options */
.product-options {
	margin-bottom: var(--space-xl);
}

.option-group {
	margin-bottom: var(--space-lg);
}

.option-label {
	display: block;
	font-weight: 600;
	margin-bottom: var(--space-sm);
}

.size-options {
	display: flex;
	gap: var(--space-sm);
}

.size-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--space-md);
	background: var(--bg-secondary);
	border: 2px solid transparent;
	border-radius: var(--radius-md);
	cursor: pointer;
	transition: all var(--transition-base);
	min-width: 100px;
}

.size-btn:hover {
	background: var(--color-cream);
}

.size-btn.active {
	border-color: var(--color-gold);
	background: var(--color-cream);
}

.size-weight {
	font-weight: 700;
}

.size-servings {
	font-size: var(--text-xs);
	color: var(--color-chocolate-light);
}

.filling-options {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-sm);
}

.filling-btn {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-sm) var(--space-md);
	background: var(--bg-secondary);
	border: 2px solid transparent;
	border-radius: var(--radius-full);
	cursor: pointer;
	transition: all var(--transition-base);
}

.filling-btn:hover {
	background: var(--color-cream);
}

.filling-btn.active {
	border-color: var(--color-gold);
	background: var(--color-cream);
}

.filling-emoji {
	font-size: 1.2rem;
}

/* Actions */
.product-actions {
	display: flex;
	align-items: center;
	gap: var(--space-lg);
	padding: var(--space-xl);
	background: var(--color-primary-gradient);
	border-radius: var(--radius-xl);
	margin-bottom: var(--space-xl);
}

.price-block {
	display: flex;
	flex-direction: column;
}

.price-old {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	text-decoration: line-through;
}

.price-current {
	font-size: var(--text-3xl);
	color: var(--color-chocolate);
}

.quantity-block {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	background: var(--bg-card);
	border-radius: var(--radius-full);
	padding: var(--space-xs);
}

.qty-btn {
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--bg-secondary);
	border: none;
	border-radius: var(--radius-full);
	cursor: pointer;
	font-size: 18px;
	font-weight: 600;
	transition: all var(--transition-fast);
}

.qty-btn:hover {
	background: var(--color-cream);
}

.qty-value {
	min-width: 30px;
	text-align: center;
	font-weight: 700;
}

.add-to-cart {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--space-sm);
}

/* Tabs */
.product-tabs {
	background: var(--bg-card);
	border-radius: var(--radius-xl);
	overflow: hidden;
	box-shadow: var(--shadow-sm);
}

.tabs-header {
	display: flex;
	border-bottom: 1px solid var(--color-cream-dark);
}

.tab-btn {
	flex: 1;
	padding: var(--space-md);
	background: none;
	border: none;
	font-weight: 600;
	cursor: pointer;
	color: var(--color-chocolate-light);
	transition: all var(--transition-base);
	border-bottom: 3px solid transparent;
}

.tab-btn:hover {
	color: var(--color-chocolate);
}

.tab-btn.active {
	color: var(--color-gold);
	border-bottom-color: var(--color-gold);
}

.tab-panel {
	padding: var(--space-xl);
}

.tab-panel h4 {
	font-family: var(--font-body);
	font-weight: 700;
	margin-bottom: var(--space-md);
}

.nutrition-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: var(--space-md);
	margin-top: var(--space-md);
}

.nutrition-item {
	text-align: center;
	padding: var(--space-md);
	background: var(--bg-secondary);
	border-radius: var(--radius-md);
}

.nutrition-value {
	display: block;
	font-family: var(--font-elegant);
	font-size: var(--text-xl);
	font-weight: 700;
	color: var(--color-chocolate);
}

.nutrition-label {
	font-size: var(--text-xs);
	color: var(--color-chocolate-light);
}

.allergens-list {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-sm);
	margin-bottom: var(--space-md);
}

.allergen-tag {
	padding: var(--space-xs) var(--space-md);
	background: var(--color-error);
	color: white;
	font-size: var(--text-sm);
	font-weight: 500;
	border-radius: var(--radius-full);
}

.allergen-note {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

.delivery-options {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: var(--space-lg);
	margin-bottom: var(--space-lg);
}

.delivery-option {
	display: flex;
	gap: var(--space-md);
	padding: var(--space-lg);
	background: var(--bg-secondary);
	border-radius: var(--radius-lg);
}

.delivery-icon {
	font-size: 2rem;
}

.delivery-info h4 {
	margin-bottom: var(--space-xs);
}

.delivery-info p {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin: 0;
}

.delivery-note {
	padding: var(--space-md);
	background: var(--color-cream);
	border-radius: var(--radius-md);
	font-size: var(--text-sm);
	margin: 0;
}

/* Related */
.related-products h2 {
	text-align: center;
	margin-bottom: var(--space-2xl);
}

.related-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: var(--space-xl);
}

@media (max-width: 992px) {
	.product-layout {
		grid-template-columns: 1fr;
	}

	.product-gallery {
		position: static;
	}
}

@media (max-width: 576px) {
	.product-page {
		padding: 100px 0 var(--space-2xl);
	}

	.product-actions {
		flex-direction: column;
		text-align: center;
	}

	.nutrition-grid {
		grid-template-columns: repeat(2, 1fr);
	}

	.delivery-options {
		grid-template-columns: 1fr;
	}
}
</style>
