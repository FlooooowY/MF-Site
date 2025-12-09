<template>
	<div class="constructor-page">
		<div class="container">
			<!-- Header -->
			<div class="constructor-header">
				<h1>Конструктор торта</h1>
				<p>Создайте торт своей мечты за 3 простых шага</p>
			</div>

			<div class="constructor-layout">
				<!-- 3D Preview -->
				<div class="cake-preview-section">
					<div class="cake-3d-container" ref="cakeContainer">
						<div
							class="cake-model"
							:style="{ transform: `rotateY(${rotation}deg)` }"
						>
							<!-- Cake Base (Plate) -->
							<div class="cake-plate"></div>

							<!-- Tiers -->
							<div
								v-for="(tier, index) in cake.tiers"
								:key="index"
								class="cake-tier"
								:class="[
									`tier-${shapes[cake.shape]}`,
									`tier-size-${tier.size}`,
								]"
								:style="{
									'--tier-color':
										fillings.find(f => f.id === tier.filling)?.color ||
										'#FFB6C1',
									'--cream-color':
										creams.find(c => c.id === tier.cream)?.color || '#FFF8E1',
									'animation-delay': `${index * 0.15}s`,
								}"
							>
								<div class="tier-body"></div>
								<div class="tier-cream-top"></div>
								<div class="tier-drips">
									<span v-for="n in 8" :key="n" class="drip"></span>
								</div>
							</div>

							<!-- Decorations -->
							<div class="cake-decorations-layer">
								<span
									v-for="(item, i) in cake.decorations"
									:key="i"
									class="cake-decoration"
									:style="{
										left: item.x + '%',
										top: item.y + '%',
										animationDelay: `${i * 0.1}s`,
									}"
								>
									{{ decorations.find(d => d.id === item.type)?.emoji || '✨' }}
								</span>
							</div>

							<!-- Topper -->
							<div v-if="cake.topper" class="cake-topper">
								{{ toppers.find(t => t.id === cake.topper)?.emoji || '' }}
							</div>
						</div>

						<!-- Rotation Control -->
						<div class="rotation-control">
							<button @click="rotation -= 45" class="rotate-btn">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<polyline points="1 4 1 10 7 10" />
									<path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
								</svg>
							</button>
							<span>Вращать</span>
							<button @click="rotation += 45" class="rotate-btn">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<polyline points="23 4 23 10 17 10" />
									<path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
								</svg>
							</button>
						</div>
					</div>

					<!-- Price Calculator -->
					<div class="price-calculator">
						<div class="price-header">
							<span class="price-label">Стоимость торта:</span>
							<span class="price-value text-elegant"
								>{{ formatPrice(totalPrice) }} ₽</span
							>
						</div>
						<div class="price-details">
							<div class="price-row">
								<span>Базовая стоимость</span>
								<span>{{ formatPrice(basePrice) }} ₽</span>
							</div>
							<div class="price-row" v-if="fillingsPrice > 0">
								<span>Премиум начинки</span>
								<span>+{{ formatPrice(fillingsPrice) }} ₽</span>
							</div>
							<div class="price-row" v-if="decorPrice > 0">
								<span>Декор</span>
								<span>+{{ formatPrice(decorPrice) }} ₽</span>
							</div>
							<div class="price-row" v-if="topperPrice > 0">
								<span>Топпер</span>
								<span>+{{ formatPrice(topperPrice) }} ₽</span>
							</div>
						</div>
						<div class="weight-info">
							<span>🎂 Примерный вес: {{ estimatedWeight }} кг</span>
						</div>
					</div>
				</div>

				<!-- Controls -->
				<div class="constructor-controls">
					<!-- Steps Progress -->
					<div class="steps-progress">
						<div
							v-for="(step, index) in steps"
							:key="index"
							class="step-indicator"
							:class="{
								active: currentStep === index,
								completed: currentStep > index,
							}"
							@click="currentStep = index"
						>
							<span class="step-number">{{ index + 1 }}</span>
							<span class="step-name">{{ step }}</span>
						</div>
					</div>

					<!-- Step Content -->
					<div class="step-content">
						<!-- Step 1: Shape & Tiers -->
						<div v-show="currentStep === 0" class="step-panel">
							<h3>Форма и размер</h3>

							<div class="option-group">
								<label class="option-label">Форма торта</label>
								<div class="shape-options">
									<button
										v-for="(shape, key) in shapes"
										:key="key"
										class="shape-btn"
										:class="{ active: cake.shape === key }"
										@click="cake.shape = key"
									>
										<span class="shape-icon">{{ shapeIcons[key] }}</span>
										<span class="shape-name">{{ shape }}</span>
									</button>
								</div>
							</div>

							<div class="option-group">
								<label class="option-label">Количество ярусов</label>
								<div class="tiers-selector">
									<button
										v-for="n in 4"
										:key="n"
										class="tier-btn"
										:class="{ active: cake.tiers.length === n }"
										@click="setTiersCount(n)"
									>
										{{ n }} {{ n === 1 ? 'ярус' : n < 5 ? 'яруса' : 'ярусов' }}
									</button>
								</div>
							</div>

							<div class="option-group">
								<label class="option-label">Размер нижнего яруса</label>
								<div class="size-options">
									<button
										v-for="size in sizes"
										:key="size.id"
										class="size-btn"
										:class="{ active: cake.tiers[0]?.size === size.id }"
										@click="setBaseSize(size.id)"
									>
										<span class="size-diameter">{{ size.diameter }} см</span>
										<span class="size-servings"
											>~{{ size.servings }} порций</span
										>
									</button>
								</div>
							</div>
						</div>

						<!-- Step 2: Fillings -->
						<div v-show="currentStep === 1" class="step-panel">
							<h3>Начинки и крем</h3>

							<div
								v-for="(tier, tierIndex) in cake.tiers"
								:key="tierIndex"
								class="tier-filling-group"
							>
								<h4>{{ tierIndex + 1 }} ярус</h4>

								<div class="filling-row">
									<div class="filling-select">
										<label>Бисквит + начинка</label>
										<div class="filling-options">
											<button
												v-for="filling in fillings"
												:key="filling.id"
												class="filling-btn"
												:class="{ active: tier.filling === filling.id }"
												@click="tier.filling = filling.id"
												:style="{ '--fill-color': filling.color }"
											>
												<span class="filling-emoji">{{ filling.emoji }}</span>
												<span class="filling-name">{{ filling.name }}</span>
												<span v-if="filling.premium" class="premium-badge"
													>+{{ filling.extraPrice }}₽</span
												>
											</button>
										</div>
									</div>

									<div class="cream-select">
										<label>Прослойка крема</label>
										<div class="cream-options">
											<button
												v-for="cream in creams"
												:key="cream.id"
												class="cream-btn"
												:class="{ active: tier.cream === cream.id }"
												@click="tier.cream = cream.id"
												:style="{ '--cream-bg': cream.color }"
											>
												{{ cream.name }}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Step 3: Decoration -->
						<div v-show="currentStep === 2" class="step-panel">
							<h3>Декор и украшения</h3>

							<div class="option-group">
								<label class="option-label">Топпер</label>
								<div class="topper-options">
									<button
										v-for="topper in toppers"
										:key="topper.id"
										class="topper-btn"
										:class="{ active: cake.topper === topper.id }"
										@click="
											cake.topper = cake.topper === topper.id ? null : topper.id
										"
									>
										<span class="topper-emoji">{{ topper.emoji }}</span>
										<span class="topper-name">{{ topper.name }}</span>
										<span class="topper-price">+{{ topper.price }}₽</span>
									</button>
								</div>
							</div>

							<div class="option-group">
								<label class="option-label"
									>Декор (нажмите для добавления)</label
								>
								<div class="decor-options">
									<button
										v-for="decor in decorations"
										:key="decor.id"
										class="decor-btn"
										@click="addDecoration(decor)"
									>
										<span class="decor-emoji">{{ decor.emoji }}</span>
										<span class="decor-name">{{ decor.name }}</span>
									</button>
								</div>

								<div v-if="cake.decorations.length > 0" class="selected-decor">
									<span>Выбрано: {{ cake.decorations.length }} элементов</span>
									<button @click="cake.decorations = []" class="clear-decor">
										Очистить
									</button>
								</div>
							</div>

							<div class="option-group">
								<label class="option-label">Надпись на торте</label>
								<input
									type="text"
									v-model="cake.inscription"
									placeholder="Например: С днём рождения!"
									maxlength="30"
								/>
							</div>
						</div>
					</div>

					<!-- Navigation -->
					<div class="step-navigation">
						<button
							v-if="currentStep > 0"
							class="btn-secondary nav-btn"
							@click="currentStep--"
						>
							← Назад
						</button>
						<div v-else></div>

						<button
							v-if="currentStep < steps.length - 1"
							class="btn-primary nav-btn"
							@click="currentStep++"
						>
							Далее →
						</button>
						<button v-else class="btn-gold nav-btn" @click="addCakeToCart">
							🛒 В корзину
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, reactive, inject } from 'vue'

const cart = inject('cart')
const showNotification = inject('showNotification')

const currentStep = ref(0)
const rotation = ref(0)

const steps = ['Форма и размер', 'Начинки', 'Декор']

const shapes = {
	circle: 'Круглый',
	square: 'Квадратный',
	heart: 'Сердце',
}

const shapeIcons = {
	circle: '⭕',
	square: '⬜',
	heart: '❤️',
}

const sizes = [
	{ id: 'small', diameter: 16, servings: 8, weight: 1.2, priceMultiplier: 1 },
	{
		id: 'medium',
		diameter: 20,
		servings: 12,
		weight: 1.8,
		priceMultiplier: 1.3,
	},
	{
		id: 'large',
		diameter: 24,
		servings: 18,
		weight: 2.5,
		priceMultiplier: 1.6,
	},
	{ id: 'xlarge', diameter: 28, servings: 25, weight: 3.2, priceMultiplier: 2 },
]

const fillings = [
	{
		id: 'strawberry',
		name: 'Клубничная',
		emoji: '🍓',
		color: '#FFB6C1',
		premium: false,
		extraPrice: 0,
	},
	{
		id: 'chocolate',
		name: 'Шоколадная',
		emoji: '🍫',
		color: '#8B4513',
		premium: false,
		extraPrice: 0,
	},
	{
		id: 'vanilla',
		name: 'Ванильная',
		emoji: '🍦',
		color: '#FFF8DC',
		premium: false,
		extraPrice: 0,
	},
	{
		id: 'caramel',
		name: 'Карамельная',
		emoji: '🍯',
		color: '#DAA520',
		premium: false,
		extraPrice: 0,
	},
	{
		id: 'pistachio',
		name: 'Фисташковая',
		emoji: '🥜',
		color: '#93C572',
		premium: true,
		extraPrice: 500,
	},
	{
		id: 'raspberry',
		name: 'Малиновая',
		emoji: '🫐',
		color: '#E30B5C',
		premium: false,
		extraPrice: 0,
	},
	{
		id: 'mango',
		name: 'Манго-маракуйя',
		emoji: '🥭',
		color: '#FF8C00',
		premium: true,
		extraPrice: 400,
	},
]

const creams = [
	{ id: 'butter', name: 'Сливочный', color: '#FFF8E1' },
	{ id: 'cream-cheese', name: 'Крем-чиз', color: '#FFFAF0' },
	{ id: 'mascarpone', name: 'Маскарпоне', color: '#FFEFD5' },
	{ id: 'chocolate', name: 'Шоколадный', color: '#D2691E' },
]

const decorations = [
	{ id: 'berries', name: 'Ягоды', emoji: '🍓', price: 300 },
	{ id: 'flowers', name: 'Цветы', emoji: '🌸', price: 500 },
	{ id: 'macarons', name: 'Макаронс', emoji: '🍪', price: 400 },
	{ id: 'gold', name: 'Золото', emoji: '✨', price: 350 },
	{ id: 'chocolate-decor', name: 'Шоколад', emoji: '🍫', price: 250 },
	{ id: 'meringue', name: 'Безе', emoji: '☁️', price: 200 },
]

const toppers = [
	{ id: 'happy-birthday', name: 'С днём рождения', emoji: '🎂', price: 350 },
	{ id: 'hearts', name: 'Сердечки', emoji: '💕', price: 300 },
	{ id: 'stars', name: 'Звёзды', emoji: '⭐', price: 300 },
	{ id: 'number', name: 'Цифра', emoji: '🔢', price: 400 },
	{ id: 'custom', name: 'Индивидуальный', emoji: '✨', price: 600 },
]

const cake = reactive({
	shape: 'circle',
	tiers: [{ size: 'medium', filling: 'strawberry', cream: 'cream-cheese' }],
	decorations: [],
	topper: null,
	inscription: '',
})

function setTiersCount(count) {
	const currentSize = cake.tiers[0]?.size || 'medium'
	const currentFilling = cake.tiers[0]?.filling || 'strawberry'
	const currentCream = cake.tiers[0]?.cream || 'cream-cheese'

	cake.tiers = Array.from({ length: count }, (_, i) => ({
		size:
			i === 0 ? currentSize : i === 1 ? 'small' : i === 2 ? 'small' : 'small',
		filling: currentFilling,
		cream: currentCream,
	}))
}

function setBaseSize(sizeId) {
	if (cake.tiers[0]) {
		cake.tiers[0].size = sizeId
	}
}

function addDecoration(decor) {
	if (cake.decorations.length < 12) {
		cake.decorations.push({
			type: decor.id,
			x: 20 + Math.random() * 60,
			y: 10 + Math.random() * 30,
		})
	}
}

const basePrice = computed(() => {
	const baseSize = sizes.find(s => s.id === cake.tiers[0]?.size) || sizes[1]
	return 2500 * baseSize.priceMultiplier * cake.tiers.length
})

const fillingsPrice = computed(() => {
	return cake.tiers.reduce((sum, tier) => {
		const filling = fillings.find(f => f.id === tier.filling)
		return sum + (filling?.extraPrice || 0)
	}, 0)
})

const decorPrice = computed(() => {
	const uniqueDecors = [...new Set(cake.decorations.map(d => d.type))]
	return uniqueDecors.reduce((sum, decorId) => {
		const decor = decorations.find(d => d.id === decorId)
		return sum + (decor?.price || 0)
	}, 0)
})

const topperPrice = computed(() => {
	const topper = toppers.find(t => t.id === cake.topper)
	return topper?.price || 0
})

const totalPrice = computed(() => {
	return (
		basePrice.value + fillingsPrice.value + decorPrice.value + topperPrice.value
	)
})

const estimatedWeight = computed(() => {
	const baseSize = sizes.find(s => s.id === cake.tiers[0]?.size) || sizes[1]
	return (baseSize.weight * cake.tiers.length * 0.7).toFixed(1)
})

function formatPrice(price) {
	return new Intl.NumberFormat('ru-RU').format(Math.round(price))
}

function addCakeToCart() {
	const cakeDescription = `${shapes[cake.shape]}, ${cake.tiers.length} ${
		cake.tiers.length === 1 ? 'ярус' : 'яруса'
	}`

	cart.addToCart({
		id: `custom-cake-${Date.now()}`,
		name: 'Торт по вашему дизайну',
		price: totalPrice.value,
		image:
			'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
		options: {
			description: cakeDescription,
			weight: estimatedWeight.value + ' кг',
		},
		quantity: 1,
	})

	showNotification('Торт добавлен в корзину!', 'success')
}
</script>

<style scoped>
.constructor-page {
	padding: 120px 0 var(--space-4xl);
	min-height: 100vh;
	background: var(--bg-primary);
}

.constructor-header {
	text-align: center;
	margin-bottom: var(--space-3xl);
}

.constructor-header h1 {
	margin-bottom: var(--space-sm);
}

.constructor-header p {
	font-size: var(--text-lg);
	color: var(--color-chocolate-light);
}

.constructor-layout {
	display: grid;
	grid-template-columns: 1fr 1.2fr;
	gap: var(--space-2xl);
	align-items: start;
}

/* 3D Preview */
.cake-preview-section {
	position: sticky;
	top: 120px;
}

.cake-3d-container {
	background: var(--bg-card);
	border-radius: var(--radius-xl);
	padding: var(--space-2xl);
	box-shadow: var(--shadow-lg);
	margin-bottom: var(--space-lg);
}

.cake-model {
	position: relative;
	height: 350px;
	display: flex;
	flex-direction: column-reverse;
	align-items: center;
	justify-content: flex-start;
	padding-bottom: var(--space-xl);
	transition: transform 0.5s ease;
	transform-style: preserve-3d;
	perspective: 1000px;
}

.cake-plate {
	width: 200px;
	height: 15px;
	background: linear-gradient(135deg, #e8e8e8 0%, #d3d3d3 100%);
	border-radius: 50%;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.cake-tier {
	position: relative;
	animation: tierBuild 0.5s ease-out backwards;
}

.tier-body {
	background: var(--tier-color);
	border-radius: 50% / 25%;
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.tier-size-small .tier-body {
	width: 100px;
	height: 50px;
}
.tier-size-medium .tier-body {
	width: 140px;
	height: 60px;
}
.tier-size-large .tier-body {
	width: 170px;
	height: 70px;
}
.tier-size-xlarge .tier-body {
	width: 200px;
	height: 80px;
}

.tier-square .tier-body {
	border-radius: 8px;
}
.tier-heart .tier-body {
	border-radius: 50% 50% 10% 50%;
	transform: rotate(-45deg);
}

.tier-cream-top {
	position: absolute;
	top: -8px;
	left: 10%;
	right: 10%;
	height: 12px;
	background: var(--cream-color);
	border-radius: 50%;
}

.tier-drips {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
}

.drip {
	position: absolute;
	top: 5px;
	width: 10px;
	background: var(--cream-color);
	border-radius: 0 0 5px 5px;
	animation: dripAnim 2s ease-in-out infinite;
}

.drip:nth-child(1) {
	left: 10%;
	height: 20px;
	animation-delay: 0s;
}
.drip:nth-child(2) {
	left: 25%;
	height: 30px;
	animation-delay: 0.3s;
}
.drip:nth-child(3) {
	left: 40%;
	height: 25px;
	animation-delay: 0.6s;
}
.drip:nth-child(4) {
	left: 55%;
	height: 35px;
	animation-delay: 0.9s;
}
.drip:nth-child(5) {
	left: 70%;
	height: 22px;
	animation-delay: 1.2s;
}
.drip:nth-child(6) {
	left: 85%;
	height: 28px;
	animation-delay: 1.5s;
}

@keyframes tierBuild {
	from {
		opacity: 0;
		transform: translateY(-30px) scale(0.8);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

@keyframes dripAnim {
	0%,
	100% {
		transform: scaleY(1);
	}
	50% {
		transform: scaleY(1.1);
	}
}

.cake-decorations-layer {
	position: absolute;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	width: 150px;
	height: 100px;
	pointer-events: none;
}

.cake-decoration {
	position: absolute;
	font-size: 1.5rem;
	animation: decorPop 0.3s ease-out backwards;
}

.cake-topper {
	position: absolute;
	top: 10px;
	font-size: 2.5rem;
	animation: topperBounce 2s ease-in-out infinite;
}

@keyframes decorPop {
	from {
		opacity: 0;
		transform: scale(0);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes topperBounce {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-5px);
	}
}

.rotation-control {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--space-md);
	margin-top: var(--space-lg);
	padding-top: var(--space-lg);
	border-top: 1px solid var(--color-cream-dark);
}

.rotate-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background: var(--bg-secondary);
	border: none;
	border-radius: var(--radius-full);
	cursor: pointer;
	color: var(--color-chocolate);
	transition: all var(--transition-base);
}

.rotate-btn:hover {
	background: var(--color-primary-gradient);
}

/* Price Calculator */
.price-calculator {
	background: var(--color-primary-gradient);
	border-radius: var(--radius-lg);
	padding: var(--space-lg);
}

.price-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: var(--space-md);
	padding-bottom: var(--space-md);
	border-bottom: 1px solid rgba(74, 44, 42, 0.1);
}

.price-label {
	font-weight: 600;
}

.price-value {
	font-size: var(--text-2xl);
	color: var(--color-chocolate);
}

.price-details {
	margin-bottom: var(--space-md);
}

.price-row {
	display: flex;
	justify-content: space-between;
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	padding: var(--space-xs) 0;
}

.weight-info {
	text-align: center;
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

/* Controls */
.constructor-controls {
	background: var(--bg-card);
	border-radius: var(--radius-xl);
	padding: var(--space-xl);
	box-shadow: var(--shadow-lg);
}

/* Steps Progress */
.steps-progress {
	display: flex;
	gap: var(--space-md);
	margin-bottom: var(--space-xl);
	padding-bottom: var(--space-lg);
	border-bottom: 1px solid var(--color-cream-dark);
}

.step-indicator {
	flex: 1;
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-sm) var(--space-md);
	background: var(--bg-secondary);
	border-radius: var(--radius-full);
	cursor: pointer;
	transition: all var(--transition-base);
}

.step-indicator.active {
	background: var(--color-primary-gradient);
}

.step-indicator.completed {
	background: var(--color-cream);
}

.step-number {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	background: var(--bg-card);
	border-radius: var(--radius-full);
	font-weight: 700;
	font-size: var(--text-sm);
}

.step-indicator.active .step-number {
	background: var(--color-gold);
	color: white;
}

.step-name {
	font-size: var(--text-sm);
	font-weight: 500;
}

/* Step Panel */
.step-panel h3 {
	font-family: var(--font-body);
	font-weight: 700;
	font-size: var(--text-xl);
	margin-bottom: var(--space-xl);
}

.option-group {
	margin-bottom: var(--space-xl);
}

.option-label {
	display: block;
	font-weight: 600;
	margin-bottom: var(--space-md);
}

/* Shape Options */
.shape-options {
	display: flex;
	gap: var(--space-md);
}

.shape-btn {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-lg);
	background: var(--bg-secondary);
	border: 2px solid transparent;
	border-radius: var(--radius-lg);
	cursor: pointer;
	transition: all var(--transition-base);
}

.shape-btn:hover {
	background: var(--color-cream);
}

.shape-btn.active {
	border-color: var(--color-gold);
	background: var(--color-cream);
	box-shadow: var(--shadow-gold);
}

.shape-icon {
	font-size: 2rem;
}

.shape-name {
	font-weight: 500;
	font-size: var(--text-sm);
}

/* Tiers Selector */
.tiers-selector {
	display: flex;
	gap: var(--space-sm);
}

.tier-btn {
	flex: 1;
	padding: var(--space-md);
	background: var(--bg-secondary);
	border: 2px solid transparent;
	border-radius: var(--radius-md);
	cursor: pointer;
	font-weight: 500;
	transition: all var(--transition-base);
}

.tier-btn:hover {
	background: var(--color-cream);
}

.tier-btn.active {
	border-color: var(--color-gold);
	background: var(--color-cream);
}

/* Size Options */
.size-options {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: var(--space-md);
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
}

.size-btn:hover {
	background: var(--color-cream);
}

.size-btn.active {
	border-color: var(--color-gold);
	background: var(--color-cream);
}

.size-diameter {
	font-weight: 700;
	font-size: var(--text-lg);
}

.size-servings {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

/* Filling Options */
.tier-filling-group {
	margin-bottom: var(--space-xl);
	padding: var(--space-lg);
	background: var(--bg-secondary);
	border-radius: var(--radius-lg);
}

.tier-filling-group h4 {
	font-family: var(--font-body);
	font-weight: 600;
	margin-bottom: var(--space-md);
}

.filling-row {
	display: grid;
	gap: var(--space-lg);
}

.filling-select label,
.cream-select label {
	display: block;
	font-size: var(--text-sm);
	font-weight: 600;
	margin-bottom: var(--space-sm);
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
	gap: var(--space-xs);
	padding: var(--space-sm) var(--space-md);
	background: var(--bg-card);
	border: 2px solid transparent;
	border-radius: var(--radius-full);
	cursor: pointer;
	font-size: var(--text-sm);
	transition: all var(--transition-base);
}

.filling-btn:hover {
	border-color: var(--fill-color);
}

.filling-btn.active {
	border-color: var(--color-gold);
	background: var(--color-cream);
}

.filling-emoji {
	font-size: 1.1rem;
}

.premium-badge {
	font-size: var(--text-xs);
	color: var(--color-gold);
	font-weight: 600;
}

.cream-options {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-sm);
}

.cream-btn {
	padding: var(--space-sm) var(--space-md);
	background: var(--cream-bg);
	border: 2px solid transparent;
	border-radius: var(--radius-full);
	cursor: pointer;
	font-size: var(--text-sm);
	font-weight: 500;
	transition: all var(--transition-base);
}

.cream-btn.active {
	border-color: var(--color-gold);
}

/* Topper & Decor Options */
.topper-options,
.decor-options {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-sm);
}

.topper-btn,
.decor-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-xs);
	padding: var(--space-md);
	background: var(--bg-secondary);
	border: 2px solid transparent;
	border-radius: var(--radius-md);
	cursor: pointer;
	transition: all var(--transition-base);
	min-width: 90px;
}

.topper-btn:hover,
.decor-btn:hover {
	background: var(--color-cream);
	transform: translateY(-3px);
}

.topper-btn.active {
	border-color: var(--color-gold);
	background: var(--color-cream);
}

.topper-emoji,
.decor-emoji {
	font-size: 1.5rem;
}

.topper-name,
.decor-name {
	font-size: var(--text-xs);
	font-weight: 500;
}

.topper-price {
	font-size: var(--text-xs);
	color: var(--color-gold);
}

.selected-decor {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: var(--space-md);
	padding: var(--space-sm) var(--space-md);
	background: var(--color-cream);
	border-radius: var(--radius-md);
	font-size: var(--text-sm);
}

.clear-decor {
	background: none;
	border: none;
	color: var(--color-error);
	cursor: pointer;
	font-weight: 600;
}

/* Navigation */
.step-navigation {
	display: flex;
	justify-content: space-between;
	margin-top: var(--space-xl);
	padding-top: var(--space-xl);
	border-top: 1px solid var(--color-cream-dark);
}

.nav-btn {
	min-width: 150px;
}

@media (max-width: 992px) {
	.constructor-layout {
		grid-template-columns: 1fr;
	}

	.cake-preview-section {
		position: static;
	}
}

@media (max-width: 576px) {
	.constructor-page {
		padding: 100px 0 var(--space-2xl);
	}

	.steps-progress {
		flex-direction: column;
	}

	.shape-options {
		flex-direction: column;
	}

	.size-options {
		grid-template-columns: 1fr;
	}
}
</style>
