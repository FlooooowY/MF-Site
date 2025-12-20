<template>
	<div class="catalog-page">
		<!-- Hero Banner -->
		<div class="catalog-hero">
			<div class="container">
				<h1>{{ categoryTitle }}</h1>
				<p>{{ categoryDescription }}</p>
			</div>
			<div class="hero-decor">
				<span class="decor-emoji">{{ categoryEmoji }}</span>
			</div>
		</div>

		<div class="container">
			<div class="catalog-layout">
				<!-- Sidebar Filters -->
				<aside class="catalog-sidebar">
					<div class="filter-section">
						<h3>Категории</h3>
						<div class="filter-options">
							<router-link
								v-for="cat in categories"
								:key="cat.slug"
								:to="`/catalog/${cat.slug}`"
								class="filter-link"
								:class="{ active: category === cat.slug }"
							>
								<span class="filter-icon">{{ cat.icon }}</span>
								<span class="filter-name">{{ cat.name }}</span>
								<span class="filter-count">{{ cat.count }}</span>
							</router-link>
						</div>
					</div>

					<div class="filter-section">
						<h3>Повод</h3>
						<div class="filter-options">
							<label
								v-for="occasion in occasions"
								:key="occasion.id"
								class="filter-checkbox"
							>
								<input
									type="checkbox"
									:value="occasion.id"
									v-model="selectedOccasions"
								/>
								<span class="checkbox-icon">{{ occasion.icon }}</span>
								<span class="checkbox-label">{{ occasion.name }}</span>
							</label>
						</div>
					</div>

					<div class="filter-section">
						<h3>Цена</h3>
						<div class="price-range">
							<input
								type="number"
								v-model.number="priceMin"
								placeholder="От"
								min="0"
							/>
							<span>—</span>
							<input
								type="number"
								v-model.number="priceMax"
								placeholder="До"
								min="0"
							/>
						</div>
					</div>

					<div class="filter-section">
						<h3>Начинка</h3>
						<div class="filter-options filter-options--scroll">
							<label
								v-for="filling in fillings"
								:key="filling.id"
								class="filter-checkbox"
							>
								<input
									type="checkbox"
									:value="filling.id"
									v-model="selectedFillings"
								/>
								<span class="checkbox-icon">{{ filling.icon }}</span>
								<span class="checkbox-label">{{ filling.name }}</span>
							</label>
						</div>
					</div>

					<button class="btn-secondary reset-filters" @click="resetFilters">
						Сбросить фильтры
					</button>
				</aside>

				<!-- Products Grid -->
				<main class="catalog-main">
					<!-- Sort & View -->
					<div class="catalog-toolbar">
						<div class="results-count">
							Найдено: <strong>{{ filteredProducts.length }}</strong> изделий
						</div>
						<div class="toolbar-actions">
							<select v-model="sortBy" class="sort-select">
								<option value="popular">По популярности</option>
								<option value="price-asc">Сначала дешевле</option>
								<option value="price-desc">Сначала дороже</option>
								<option value="new">Новинки</option>
							</select>
						</div>
					</div>

					<!-- Products -->
					<div class="products-grid">
						<ProductCard
							v-for="product in filteredProducts"
							:key="product.id"
							:product="product"
							@add-to-cart="addToCart"
						/>
					</div>

					<!-- Empty State -->
					<div v-if="filteredProducts.length === 0" class="empty-state">
						<span class="empty-icon">🔍</span>
						<h3>Ничего не найдено</h3>
						<p>Попробуйте изменить параметры поиска</p>
						<button class="btn-primary" @click="resetFilters">
							Сбросить фильтры
						</button>
					</div>

					<!-- Load More -->
					<div v-if="hasMore" class="load-more">
						<button class="btn-secondary" @click="loadMore">
							Показать ещё
						</button>
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/cards/ProductCard.vue'
import { inject } from 'vue'

const route = useRoute()
const cart = inject('cart')

const category = computed(() => route.params.category || 'cakes')

const categories = [
	{ slug: 'cakes', name: 'Торты', icon: '🎂', count: 48 },
	{ slug: 'cupcakes', name: 'Капкейки', icon: '🧁', count: 24 },
	{ slug: 'pastries', name: 'Пирожные', icon: '🍰', count: 32 },
	{ slug: 'macarons', name: 'Макаронс', icon: '🍪', count: 18 },
]

const occasions = [
	{ id: 'birthday', name: 'День рождения', icon: '🎂' },
	{ id: 'wedding', name: 'Свадьба', icon: '💒' },
	{ id: 'kids', name: 'Детский праздник', icon: '🎈' },
	{ id: 'corporate', name: 'Корпоратив', icon: '🏢' },
]

const fillings = [
	{ id: 'strawberry', name: 'Клубника', icon: '🍓' },
	{ id: 'chocolate', name: 'Шоколад', icon: '🍫' },
	{ id: 'vanilla', name: 'Ваниль', icon: '🍦' },
	{ id: 'caramel', name: 'Карамель', icon: '🍯' },
	{ id: 'pistachio', name: 'Фисташка', icon: '🥜' },
	{ id: 'raspberry', name: 'Малина', icon: '🫐' },
]

const selectedOccasions = ref([])
const selectedFillings = ref([])
const priceMin = ref(null)
const priceMax = ref(null)
const sortBy = ref('popular')
const displayCount = ref(12)
const hasMore = ref(true)

const allProducts = ref([
	{
		id: 1,
		name: 'Клубничное облако',
		category: 'cakes',
		price: 3500,
		oldPrice: 4200,
		image:
			'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop',
		rating: 4.9,
		reviews: 124,
		badge: 'Хит',
		weight: '1.5 кг',
		description: 'Нежный бисквит с клубничным муссом',
		occasions: ['birthday'],
		filling: 'strawberry',
	},
	{
		id: 2,
		name: 'Шоколадный бархат',
		category: 'cakes',
		price: 4200,
		image:
			'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
		rating: 4.8,
		reviews: 98,
		badge: 'Новинка',
		weight: '2 кг',
		description: 'Три вида шоколада',
		occasions: ['birthday', 'corporate'],
		filling: 'chocolate',
	},
	{
		id: 3,
		name: 'Карамельный латте',
		category: 'cakes',
		price: 3800,
		image:
			'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400&h=400&fit=crop',
		rating: 4.7,
		reviews: 76,
		weight: '1.8 кг',
		description: 'Кофейный бисквит с карамелью',
		occasions: ['corporate'],
		filling: 'caramel',
	},
	{
		id: 4,
		name: 'Малиновый рай',
		category: 'cakes',
		price: 3900,
		image:
			'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
		rating: 4.9,
		reviews: 112,
		badge: 'Хит',
		weight: '1.6 кг',
		description: 'Ванильный бисквит с малиной',
		occasions: ['birthday', 'kids'],
		filling: 'raspberry',
	},
	{
		id: 5,
		name: 'Фисташковое наслаждение',
		category: 'cakes',
		price: 4500,
		image:
			'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop',
		rating: 4.8,
		reviews: 67,
		badge: 'Премиум',
		weight: '1.7 кг',
		description: 'Фисташковый мусс с вишней',
		occasions: ['wedding'],
		filling: 'pistachio',
	},
	{
		id: 6,
		name: 'Свадебный белоснежный',
		category: 'cakes',
		price: 8500,
		image:
			'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400&fit=crop',
		rating: 5.0,
		reviews: 45,
		badge: 'Премиум',
		weight: '3 кг',
		description: 'Элегантный торт для свадьбы',
		occasions: ['wedding'],
		filling: 'vanilla',
	},
	{
		id: 7,
		name: 'Детский единорог',
		category: 'cakes',
		price: 4800,
		image:
			'https://images.unsplash.com/photo-1557979619-445218f326b9?w=400&h=400&fit=crop',
		rating: 4.9,
		reviews: 89,
		weight: '2 кг',
		description: 'Яркий торт для детского праздника',
		occasions: ['kids'],
		filling: 'strawberry',
	},
	{
		id: 8,
		name: 'Шоколадный капкейк',
		category: 'cupcakes',
		price: 350,
		image:
			'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop',
		rating: 4.7,
		reviews: 156,
		weight: '100 г',
		description: 'Нежный шоколадный капкейк',
		occasions: ['birthday', 'corporate'],
		filling: 'chocolate',
	},
	{
		id: 9,
		name: 'Ванильный капкейк',
		category: 'cupcakes',
		price: 320,
		image:
			'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=400&fit=crop',
		rating: 4.6,
		reviews: 134,
		weight: '100 г',
		description: 'Классический ванильный капкейк',
		occasions: ['kids'],
		filling: 'vanilla',
	},
	{
		id: 10,
		name: 'Эклер классический',
		category: 'pastries',
		price: 280,
		image:
			'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=400&fit=crop',
		rating: 4.8,
		reviews: 201,
		weight: '80 г',
		description: 'Заварное тесто с кремом',
		occasions: ['corporate'],
		filling: 'vanilla',
	},
	{
		id: 11,
		name: 'Макаронс ассорти',
		category: 'macarons',
		price: 150,
		image:
			'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=400&fit=crop',
		rating: 4.9,
		reviews: 267,
		weight: '30 г',
		description: 'Миндальное печенье',
		occasions: ['wedding', 'corporate'],
		filling: 'pistachio',
	},
	{
		id: 12,
		name: 'Тирамису',
		category: 'pastries',
		price: 420,
		image:
			'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop',
		rating: 4.9,
		reviews: 189,
		weight: '150 г',
		description: 'Итальянский десерт',
		occasions: ['birthday'],
		filling: 'chocolate',
	},
])

const categoryTitle = computed(() => {
	const cat = categories.find(c => c.slug === category.value)
	return cat?.name || 'Каталог'
})

const categoryDescription = computed(() => {
	const descriptions = {
		cakes: 'Авторские торты для любого торжества',
		cupcakes: 'Нежные капкейки с разнообразными начинками',
		pastries: 'Изысканные пирожные европейского качества',
		macarons: 'Французские макаронс ручной работы',
	}
	return descriptions[category.value] || 'Лучшие десерты для вас'
})

const categoryEmoji = computed(() => {
	const cat = categories.find(c => c.slug === category.value)
	return cat?.icon || '🍰'
})

const filteredProducts = computed(() => {
	let products = [...allProducts.value]

	// Filter by category
	if (category.value) {
		products = products.filter(p => p.category === category.value)
	}

	// Filter by occasions
	if (selectedOccasions.value.length > 0) {
		products = products.filter(p =>
			p.occasions?.some(o => selectedOccasions.value.includes(o))
		)
	}

	// Filter by fillings
	if (selectedFillings.value.length > 0) {
		products = products.filter(p => selectedFillings.value.includes(p.filling))
	}

	// Filter by price
	if (priceMin.value) {
		products = products.filter(p => p.price >= priceMin.value)
	}
	if (priceMax.value) {
		products = products.filter(p => p.price <= priceMax.value)
	}

	// Sort
	switch (sortBy.value) {
		case 'price-asc':
			products.sort((a, b) => a.price - b.price)
			break
		case 'price-desc':
			products.sort((a, b) => b.price - a.price)
			break
		case 'new':
			products.sort((a, b) => b.id - a.id)
			break
		default:
			products.sort((a, b) => b.reviews - a.reviews)
	}

	return products.slice(0, displayCount.value)
})

function resetFilters() {
	selectedOccasions.value = []
	selectedFillings.value = []
	priceMin.value = null
	priceMax.value = null
	sortBy.value = 'popular'
}

function loadMore() {
	displayCount.value += 12
	if (displayCount.value >= allProducts.value.length) {
		hasMore.value = false
	}
}

function addToCart(product) {
	cart.addToCart({
		id: product.id,
		name: product.name,
		price: product.price,
		image: product.image,
		quantity: 1,
	})
}

watch(category, () => {
	displayCount.value = 12
	hasMore.value = true
})
</script>

<style scoped>
.catalog-page {
	padding-bottom: var(--space-4xl);
}

/* Hero */
.catalog-hero {
	position: relative;
	padding: 140px 0 var(--space-3xl);
	background: var(--color-primary-gradient);
	text-align: center;
	overflow: hidden;
}

.catalog-hero h1 {
	margin-bottom: var(--space-sm);
}

.catalog-hero p {
	font-size: var(--text-lg);
	color: var(--color-chocolate-light);
}

.hero-decor {
	position: absolute;
	top: 50%;
	right: 10%;
	transform: translateY(-50%);
	opacity: 0.2;
}

.decor-emoji {
	font-size: 12rem;
}

/* Layout */
.catalog-layout {
	display: grid;
	grid-template-columns: 280px 1fr;
	gap: var(--space-2xl);
	margin-top: var(--space-2xl);
}

/* Sidebar */
.catalog-sidebar {
	position: sticky;
	top: 100px;
	height: fit-content;
}

.filter-section {
	margin-bottom: var(--space-xl);
	padding: var(--space-lg);
	background: var(--bg-card);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-sm);
}

.filter-section h3 {
	font-family: var(--font-body);
	font-weight: 700;
	font-size: var(--text-base);
	margin-bottom: var(--space-md);
}

.filter-options {
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
}

.filter-options--scroll {
	max-height: 200px;
	overflow-y: auto;
}

.filter-link {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-sm);
	border-radius: var(--radius-md);
	text-decoration: none;
	color: var(--color-chocolate);
	transition: all var(--transition-base);
}

.filter-link:hover,
.filter-link.active {
	background: var(--color-cream);
}

.filter-link.active {
	font-weight: 600;
}

.filter-icon {
	font-size: 1.2rem;
}

.filter-count {
	margin-left: auto;
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

.filter-checkbox {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-xs) var(--space-sm);
	cursor: pointer;
	border-radius: var(--radius-sm);
	transition: background var(--transition-fast);
}

.filter-checkbox:hover {
	background: var(--bg-secondary);
}

.filter-checkbox input {
	width: auto;
	margin: 0;
}

.checkbox-icon {
	font-size: 1rem;
}

.checkbox-label {
	font-size: var(--text-sm);
}

.price-range {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
}

.price-range input {
	width: 100%;
	padding: var(--space-sm);
	font-size: var(--text-sm);
}

.reset-filters {
	width: 100%;
}

/* Main */
.catalog-toolbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: var(--space-xl);
	padding-bottom: var(--space-md);
	border-bottom: 1px solid var(--color-cream-dark);
}

.results-count {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

.sort-select {
	padding: var(--space-sm) var(--space-md);
	font-size: var(--text-sm);
	border-radius: var(--radius-md);
	min-width: 180px;
}

.products-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: var(--space-xl);
}

.empty-state {
	text-align: center;
	padding: var(--space-4xl);
}

.empty-icon {
	font-size: 4rem;
	display: block;
	margin-bottom: var(--space-lg);
}

.empty-state h3 {
	font-family: var(--font-body);
	margin-bottom: var(--space-sm);
}

.empty-state p {
	color: var(--color-chocolate-light);
	margin-bottom: var(--space-xl);
}

.load-more {
	text-align: center;
	margin-top: var(--space-2xl);
}

@media (max-width: 992px) {
	.catalog-layout {
		grid-template-columns: 1fr;
	}

	.catalog-sidebar {
		position: static;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-md);
	}

	.filter-section {
		margin-bottom: 0;
	}

	.reset-filters {
		grid-column: 1 / -1;
	}
}

@media (max-width: 576px) {
	.catalog-hero {
		padding: 120px 0 var(--space-xl);
	}

	.hero-decor {
		display: none;
	}

	.catalog-toolbar {
		flex-direction: column;
		gap: var(--space-md);
		align-items: stretch;
	}
}
</style>
