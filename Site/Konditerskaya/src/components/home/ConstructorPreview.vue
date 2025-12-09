<template>
	<section class="constructor-preview section">
		<div class="container">
			<div class="constructor-preview__grid">
				<!-- Content -->
				<div class="constructor-preview__content">
					<span class="preview__label">✨ Эксклюзив</span>
					<h2>Создай торт своей мечты</h2>
					<p class="preview__text">
						Используйте наш интерактивный конструктор, чтобы создать идеальный
						торт. Выберите форму, количество ярусов, начинки и декор — увидьте
						результат в реальном времени!
					</p>

					<div class="preview__steps">
						<div class="step">
							<span class="step__number">1</span>
							<span class="step__text">Выберите форму и размер</span>
						</div>
						<div class="step">
							<span class="step__number">2</span>
							<span class="step__text">Добавьте начинки и крем</span>
						</div>
						<div class="step">
							<span class="step__number">3</span>
							<span class="step__text">Украсьте на свой вкус</span>
						</div>
					</div>

					<router-link to="/constructor" class="btn-gold preview__cta">
						Открыть конструктор
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

				<!-- Interactive Demo -->
				<div class="constructor-preview__demo">
					<div class="demo-scene">
						<!-- Cake Preview -->
						<div
							class="cake-preview"
							:class="{ 'cake-preview--animated': isAnimating }"
						>
							<!-- Base -->
							<div class="cake-base">
								<div
									class="cake-layer"
									v-for="(layer, index) in selectedLayers"
									:key="index"
									:class="`cake-layer--${layer.type}`"
									:style="{
										'--layer-color': layer.color,
										animationDelay: `${index * 0.2}s`,
									}"
								>
									<div
										class="layer-frosting"
										:style="{ background: layer.frostingColor }"
									></div>
									<div class="layer-drips">
										<span
											v-for="n in 5"
											:key="n"
											class="drip"
											:style="{ left: `${n * 18}%` }"
										></span>
									</div>
								</div>
							</div>

							<!-- Decorations -->
							<div class="cake-decorations">
								<span
									v-for="(decor, index) in selectedDecorations"
									:key="index"
									class="decoration"
									:style="{
										left: decor.x + '%',
										top: decor.y + '%',
										animationDelay: `${index * 0.1}s`,
									}"
								>
									{{ decor.emoji }}
								</span>
							</div>
						</div>

						<!-- Controls -->
						<div class="demo-controls">
							<div class="control-group">
								<span class="control-label">Начинка:</span>
								<div class="control-options">
									<button
										v-for="filling in fillings"
										:key="filling.id"
										class="option-btn"
										:class="{ active: selectedFilling === filling.id }"
										@click="selectFilling(filling)"
										:style="{ '--option-color': filling.color }"
									>
										{{ filling.emoji }}
									</button>
								</div>
							</div>

							<div class="control-group">
								<span class="control-label">Декор:</span>
								<div class="control-options">
									<button
										v-for="decor in decorOptions"
										:key="decor.id"
										class="option-btn"
										:class="{ active: selectedDecor === decor.id }"
										@click="selectDecor(decor)"
									>
										{{ decor.emoji }}
									</button>
								</div>
							</div>
						</div>

						<!-- Price Preview -->
						<div class="demo-price">
							<span class="price-label">Примерная стоимость:</span>
							<span class="price-value text-elegant"
								>от {{ formatPrice(estimatedPrice) }} ₽</span
							>
						</div>
					</div>

					<!-- Floating elements -->
					<div class="demo-floats">
						<span class="float-item float-item--1">🎀</span>
						<span class="float-item float-item--2">⭐</span>
						<span class="float-item float-item--3">🌸</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Background decoration -->
		<div class="constructor-preview__bg">
			<div class="bg-shape bg-shape--1"></div>
			<div class="bg-shape bg-shape--2"></div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue'

const isAnimating = ref(false)
const selectedFilling = ref('strawberry')
const selectedDecor = ref('berries')

const fillings = [
	{ id: 'strawberry', emoji: '🍓', color: '#FFB6C1', name: 'Клубника' },
	{ id: 'chocolate', emoji: '🍫', color: '#8B4513', name: 'Шоколад' },
	{ id: 'caramel', emoji: '🍯', color: '#DAA520', name: 'Карамель' },
	{ id: 'pistachio', emoji: '🥜', color: '#93C572', name: 'Фисташка' },
]

const decorOptions = [
	{ id: 'berries', emoji: '🍓', items: ['🍓', '🫐', '🍒'] },
	{ id: 'flowers', emoji: '🌸', items: ['🌸', '🌺', '🌷'] },
	{ id: 'sweets', emoji: '🍬', items: ['🍬', '🍭', '🍫'] },
	{ id: 'gold', emoji: '✨', items: ['✨', '⭐', '💫'] },
]

const selectedLayers = computed(() => {
	const filling = fillings.find(f => f.id === selectedFilling.value)
	return [
		{
			type: 'bottom',
			color: filling?.color || '#FFB6C1',
			frostingColor: '#FFF8E1',
		},
		{
			type: 'middle',
			color: '#FFF8E1',
			frostingColor: filling?.color || '#FFB6C1',
		},
		{
			type: 'top',
			color: filling?.color || '#FFB6C1',
			frostingColor: '#FFF8E1',
		},
	]
})

const selectedDecorations = computed(() => {
	const decor = decorOptions.find(d => d.id === selectedDecor.value)
	if (!decor) return []

	return [
		{ emoji: decor.items[0], x: 20, y: 10 },
		{ emoji: decor.items[1], x: 50, y: 5 },
		{ emoji: decor.items[2], x: 80, y: 10 },
		{ emoji: decor.items[0], x: 35, y: 15 },
		{ emoji: decor.items[1], x: 65, y: 12 },
	]
})

const estimatedPrice = computed(() => {
	const basePrice = 3500
	const fillingBonus = selectedFilling.value === 'pistachio' ? 500 : 0
	const decorBonus = selectedDecor.value === 'gold' ? 300 : 0
	return basePrice + fillingBonus + decorBonus
})

function selectFilling(filling) {
	isAnimating.value = true
	selectedFilling.value = filling.id
	setTimeout(() => {
		isAnimating.value = false
	}, 500)
}

function selectDecor(decor) {
	isAnimating.value = true
	selectedDecor.value = decor.id
	setTimeout(() => {
		isAnimating.value = false
	}, 500)
}

function formatPrice(price) {
	return new Intl.NumberFormat('ru-RU').format(price)
}
</script>

<style scoped>
.constructor-preview {
	background: var(--bg-primary);
	position: relative;
	overflow: hidden;
}

.constructor-preview__grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-4xl);
	align-items: center;
}

/* Content */
.constructor-preview__content {
	position: relative;
	z-index: 2;
}

.preview__label {
	display: inline-block;
	padding: var(--space-xs) var(--space-md);
	background: linear-gradient(
		135deg,
		var(--color-gold) 0%,
		var(--color-gold-dark) 100%
	);
	border-radius: var(--radius-full);
	font-size: var(--text-sm);
	font-weight: 600;
	color: white;
	margin-bottom: var(--space-lg);
}

.constructor-preview__content h2 {
	font-size: var(--text-4xl);
	margin-bottom: var(--space-lg);
}

.preview__text {
	font-size: var(--text-lg);
	color: var(--color-chocolate-light);
	margin-bottom: var(--space-2xl);
	line-height: 1.8;
}

/* Steps */
.preview__steps {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
	margin-bottom: var(--space-2xl);
}

.step {
	display: flex;
	align-items: center;
	gap: var(--space-md);
	padding: var(--space-md);
	background: var(--bg-card);
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-sm);
	transition: all var(--transition-base);
}

.step:hover {
	transform: translateX(10px);
	box-shadow: var(--shadow-md);
}

.step__number {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	background: var(--color-primary-gradient);
	border-radius: var(--radius-full);
	font-weight: 700;
	color: var(--color-chocolate);
}

.step__text {
	font-weight: 500;
}

.preview__cta {
	display: inline-flex;
	align-items: center;
	gap: var(--space-sm);
	text-decoration: none;
}

/* Demo */
.constructor-preview__demo {
	position: relative;
}

.demo-scene {
	position: relative;
	padding: var(--space-2xl);
	background: var(--bg-card);
	border-radius: var(--radius-xl);
	box-shadow: var(--shadow-lg);
}

/* Cake Preview */
.cake-preview {
	position: relative;
	height: 250px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	margin-bottom: var(--space-xl);
}

.cake-base {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.cake-layer {
	position: relative;
	border-radius: 50% / 30%;
	background: var(--layer-color);
	animation: layerAppear 0.5s ease-out backwards;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.cake-layer--bottom {
	width: 180px;
	height: 60px;
}

.cake-layer--middle {
	width: 140px;
	height: 50px;
	margin-top: -8px;
}

.cake-layer--top {
	width: 100px;
	height: 45px;
	margin-top: -6px;
}

.layer-frosting {
	position: absolute;
	top: -6px;
	left: 10%;
	right: 10%;
	height: 10px;
	border-radius: 50%;
}

.layer-drips {
	position: absolute;
	top: 0;
	left: 5%;
	right: 5%;
	height: 100%;
}

.drip {
	position: absolute;
	top: 0;
	width: 8px;
	height: 20px;
	background: var(--layer-color);
	border-radius: 0 0 4px 4px;
	opacity: 0.8;
}

@keyframes layerAppear {
	from {
		opacity: 0;
		transform: translateY(-20px) scale(0.8);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

.cake-preview--animated .cake-layer {
	animation: layerBounce 0.5s ease-out;
}

@keyframes layerBounce {
	0%,
	100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
}

/* Decorations */
.cake-decorations {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 120px;
	height: 80px;
}

.decoration {
	position: absolute;
	font-size: 1.5rem;
	animation: decorPop 0.3s ease-out backwards;
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

/* Controls */
.demo-controls {
	display: flex;
	gap: var(--space-xl);
	margin-bottom: var(--space-lg);
}

.control-group {
	flex: 1;
}

.control-label {
	display: block;
	font-size: var(--text-sm);
	font-weight: 600;
	margin-bottom: var(--space-sm);
	color: var(--color-chocolate-light);
}

.control-options {
	display: flex;
	gap: var(--space-sm);
}

.option-btn {
	width: 44px;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.25rem;
	background: var(--bg-secondary);
	border: 2px solid transparent;
	border-radius: var(--radius-md);
	cursor: pointer;
	transition: all var(--transition-base);
}

.option-btn:hover {
	transform: scale(1.1);
	background: var(--option-color, var(--color-cream));
}

.option-btn.active {
	border-color: var(--color-gold);
	background: var(--color-cream);
	box-shadow: var(--shadow-gold);
}

/* Price */
.demo-price {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--space-md);
	background: var(--color-primary-gradient);
	border-radius: var(--radius-md);
}

.price-label {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

.price-value {
	font-size: var(--text-xl);
	color: var(--color-chocolate);
}

/* Floats */
.demo-floats {
	position: absolute;
	inset: 0;
	pointer-events: none;
}

.float-item {
	position: absolute;
	font-size: 2rem;
	animation: float 4s ease-in-out infinite;
}

.float-item--1 {
	top: -20px;
	right: 20px;
	animation-delay: 0s;
}
.float-item--2 {
	bottom: 30%;
	left: -30px;
	animation-delay: 1s;
}
.float-item--3 {
	top: 40%;
	right: -20px;
	animation-delay: 2s;
}

@keyframes float {
	0%,
	100% {
		transform: translateY(0) rotate(0deg);
	}
	50% {
		transform: translateY(-15px) rotate(10deg);
	}
}

/* Background */
.constructor-preview__bg {
	position: absolute;
	inset: 0;
	pointer-events: none;
	overflow: hidden;
}

.bg-shape {
	position: absolute;
	border-radius: 50%;
	filter: blur(100px);
	opacity: 0.3;
}

.bg-shape--1 {
	width: 500px;
	height: 500px;
	background: var(--color-primary-start);
	top: -200px;
	right: -100px;
}

.bg-shape--2 {
	width: 400px;
	height: 400px;
	background: var(--color-gold);
	bottom: -150px;
	left: -100px;
	opacity: 0.2;
}

@media (max-width: 992px) {
	.constructor-preview__grid {
		grid-template-columns: 1fr;
		gap: var(--space-2xl);
	}
}

@media (max-width: 576px) {
	.demo-controls {
		flex-direction: column;
		gap: var(--space-md);
	}

	.cake-layer--bottom {
		width: 140px;
		height: 50px;
	}
	.cake-layer--middle {
		width: 110px;
		height: 40px;
	}
	.cake-layer--top {
		width: 80px;
		height: 35px;
	}
}
</style>
