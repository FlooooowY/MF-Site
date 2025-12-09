<script setup lang="ts">
const step = ref(1)
const selectedBrand = ref('')
const selectedModel = ref('')
const selectedService = ref('')
const selectedZones = ref<string[]>([])
const selectedFilm = ref('standard')
const totalPrice = ref(0)
const animatedPrice = ref(0)

const brands = [
	{
		id: 'mercedes',
		name: 'Mercedes-Benz',
		models: ['S-Class', 'E-Class', 'C-Class', 'GLE', 'GLS', 'G-Class'],
	},
	{
		id: 'bmw',
		name: 'BMW',
		models: ['7 Series', '5 Series', '3 Series', 'X5', 'X6', 'X7'],
	},
	{ id: 'audi', name: 'Audi', models: ['A8', 'A6', 'A4', 'Q7', 'Q8', 'RS6'] },
	{
		id: 'porsche',
		name: 'Porsche',
		models: ['911', 'Cayenne', 'Panamera', 'Taycan', 'Macan'],
	},
	{ id: 'other', name: 'Другая марка', models: ['Указать в заявке'] },
]

const services = [
	{ id: 'ppf', name: 'Защитная пленка PPF', basePrice: 15000 },
	{ id: 'vinyl', name: 'Виниловая оклейка', basePrice: 12000 },
	{ id: 'ceramic', name: 'Керамическое покрытие', basePrice: 25000 },
	{ id: 'tint', name: 'Тонировка стекол', basePrice: 8000 },
	{ id: 'polish', name: 'Полировка кузова', basePrice: 15000 },
]

const zones = [
	{ id: 'hood', name: 'Капот', price: 15000, icon: '🚗' },
	{ id: 'roof', name: 'Крыша', price: 12000, icon: '⬛' },
	{ id: 'fenders', name: 'Крылья', price: 18000, icon: '◀️' },
	{ id: 'doors', name: 'Двери', price: 20000, icon: '🚪' },
	{ id: 'bumpers', name: 'Бамперы', price: 18000, icon: '🛡️' },
	{ id: 'mirrors', name: 'Зеркала', price: 5000, icon: '🪞' },
	{ id: 'full', name: 'Полная оклейка', price: 85000, icon: '✨' },
]

const filmTypes = [
	{ id: 'budget', name: '3M Pro Series', multiplier: 0.8, label: 'Бюджет' },
	{ id: 'standard', name: 'SunTek PPF', multiplier: 1, label: 'Стандарт' },
	{
		id: 'premium',
		name: 'XPEL Ultimate Plus',
		multiplier: 1.3,
		label: 'Премиум',
	},
]

const currentBrand = computed(() =>
	brands.find(b => b.id === selectedBrand.value)
)

watch([selectedZones, selectedFilm, selectedService], calculatePrice, {
	deep: true,
})

function calculatePrice() {
	let price = 0

	// Базовая цена услуги
	const service = services.find(s => s.id === selectedService.value)
	if (service && selectedService.value !== 'ppf') {
		price = service.basePrice
	}

	// Цена по зонам (для PPF и винила)
	if (selectedService.value === 'ppf' || selectedService.value === 'vinyl') {
		if (selectedZones.value.includes('full')) {
			price = zones.find(z => z.id === 'full')?.price || 0
		} else {
			selectedZones.value.forEach(zoneId => {
				const zone = zones.find(z => z.id === zoneId)
				if (zone) price += zone.price
			})
		}
	}

	// Множитель пленки
	const film = filmTypes.find(f => f.id === selectedFilm.value)
	if (film) {
		price = Math.round(price * film.multiplier)
	}

	totalPrice.value = price
	animatePrice(price)
}

async function animatePrice(target: number) {
	if (!process.client) return

	const gsap = (await import('gsap')).default
	gsap.to(animatedPrice, {
		value: target,
		duration: 0.8,
		ease: 'power2.out',
		onUpdate: () => {
			animatedPrice.value = Math.round(animatedPrice.value)
		},
	})
}

function toggleZone(zoneId: string) {
	if (zoneId === 'full') {
		selectedZones.value = selectedZones.value.includes('full') ? [] : ['full']
	} else {
		selectedZones.value = selectedZones.value.filter(z => z !== 'full')
		const index = selectedZones.value.indexOf(zoneId)
		if (index === -1) {
			selectedZones.value.push(zoneId)
		} else {
			selectedZones.value.splice(index, 1)
		}
	}
}

function selectBrand(brandId: string) {
	selectedBrand.value = brandId
	selectedModel.value = ''
}

function nextStep() {
	if (step.value < 4) step.value++
}

function prevStep() {
	if (step.value > 1) step.value--
}

function formatPrice(value: number) {
	return value.toLocaleString('ru-RU')
}
</script>

<template>
	<section id="calculator" class="calculator section">
		<div class="container">
			<!-- Header -->
			<div class="section-header">
				<h2 class="section-title">
					КАЛЬКУЛЯТОР <span class="accent">СТОИМОСТИ</span>
				</h2>
				<p class="section-subtitle">
					Рассчитайте стоимость услуг онлайн за 1 минуту
				</p>
			</div>

			<div class="calculator__wrapper">
				<!-- Progress -->
				<div class="calculator__progress">
					<div
						v-for="i in 4"
						:key="i"
						class="calculator__progress-step"
						:class="{
							'calculator__progress-step--active': step === i,
							'calculator__progress-step--completed': step > i,
						}"
					>
						<span class="calculator__progress-number">{{ i }}</span>
						<span class="calculator__progress-label">
							{{ ['Авто', 'Услуга', 'Зоны', 'Итого'][i - 1] }}
						</span>
					</div>
					<div
						class="calculator__progress-bar"
						:style="{ width: `${((step - 1) / 3) * 100}%` }"
					></div>
				</div>

				<!-- Steps Content -->
				<div class="calculator__content">
					<!-- Step 1: Car Selection -->
					<Transition name="step" mode="out-in">
						<div v-if="step === 1" key="step1" class="calculator__step">
							<h3 class="calculator__step-title">Выберите автомобиль</h3>

							<div class="calculator__brands">
								<button
									v-for="brand in brands"
									:key="brand.id"
									class="calculator__brand"
									:class="{
										'calculator__brand--active': selectedBrand === brand.id,
									}"
									@click="selectBrand(brand.id)"
								>
									{{ brand.name }}
								</button>
							</div>

							<Transition name="fade">
								<div v-if="currentBrand" class="calculator__models">
									<h4>Модель</h4>
									<div class="calculator__models-grid">
										<button
											v-for="model in currentBrand.models"
											:key="model"
											class="calculator__model"
											:class="{
												'calculator__model--active': selectedModel === model,
											}"
											@click="selectedModel = model"
										>
											{{ model }}
										</button>
									</div>
								</div>
							</Transition>
						</div>

						<!-- Step 2: Service Selection -->
						<div v-else-if="step === 2" key="step2" class="calculator__step">
							<h3 class="calculator__step-title">Выберите услугу</h3>

							<div class="calculator__services">
								<button
									v-for="service in services"
									:key="service.id"
									class="calculator__service"
									:class="{
										'calculator__service--active':
											selectedService === service.id,
									}"
									@click="selectedService = service.id"
								>
									<span class="calculator__service-name">{{
										service.name
									}}</span>
									<span class="calculator__service-price"
										>от {{ formatPrice(service.basePrice) }} ₽</span
									>
								</button>
							</div>
						</div>

						<!-- Step 3: Zones Selection -->
						<div v-else-if="step === 3" key="step3" class="calculator__step">
							<h3 class="calculator__step-title">Выберите зоны</h3>

							<div class="calculator__zones">
								<button
									v-for="zone in zones"
									:key="zone.id"
									class="calculator__zone"
									:class="{
										'calculator__zone--active': selectedZones.includes(zone.id),
										'calculator__zone--full': zone.id === 'full',
									}"
									@click="toggleZone(zone.id)"
								>
									<span class="calculator__zone-icon">{{ zone.icon }}</span>
									<span class="calculator__zone-name">{{ zone.name }}</span>
									<span class="calculator__zone-price"
										>{{ formatPrice(zone.price) }} ₽</span
									>
								</button>
							</div>

							<div
								v-if="selectedService === 'ppf' || selectedService === 'vinyl'"
								class="calculator__films"
							>
								<h4>Тип пленки</h4>
								<div class="calculator__films-grid">
									<button
										v-for="film in filmTypes"
										:key="film.id"
										class="calculator__film"
										:class="{
											'calculator__film--active': selectedFilm === film.id,
										}"
										@click="selectedFilm = film.id"
									>
										<span class="calculator__film-label">{{ film.label }}</span>
										<span class="calculator__film-name">{{ film.name }}</span>
									</button>
								</div>
							</div>
						</div>

						<!-- Step 4: Summary -->
						<div v-else-if="step === 4" key="step4" class="calculator__step">
							<h3 class="calculator__step-title">Итого</h3>

							<div class="calculator__summary">
								<div class="calculator__summary-item">
									<span>Автомобиль</span>
									<span>{{ currentBrand?.name }} {{ selectedModel }}</span>
								</div>
								<div class="calculator__summary-item">
									<span>Услуга</span>
									<span>{{
										services.find(s => s.id === selectedService)?.name
									}}</span>
								</div>
								<div
									v-if="selectedZones.length"
									class="calculator__summary-item"
								>
									<span>Зоны</span>
									<span>{{
										selectedZones
											.map(z => zones.find(zone => zone.id === z)?.name)
											.join(', ')
									}}</span>
								</div>

								<div class="calculator__total">
									<span>Стоимость</span>
									<span class="calculator__total-price">
										{{ formatPrice(animatedPrice) }} ₽
									</span>
								</div>

								<a
									href="#contacts"
									class="btn btn-neon btn-lg calculator__submit"
								>
									<span>✨ Оформить заявку</span>
								</a>
							</div>
						</div>
					</Transition>
				</div>

				<!-- Navigation -->
				<div class="calculator__nav">
					<button v-if="step > 1" class="btn btn-ghost" @click="prevStep">
						<span>← Назад</span>
					</button>
					<div v-else></div>

					<button
						v-if="step < 4"
						class="btn btn-neon"
						:disabled="
							(step === 1 && (!selectedBrand || !selectedModel)) ||
							(step === 2 && !selectedService) ||
							(step === 3 && selectedZones.length === 0)
						"
						@click="nextStep"
					>
						<span>Далее →</span>
					</button>
				</div>

				<!-- Live Price -->
				<div v-if="totalPrice > 0" class="calculator__live-price">
					<span>Итого:</span>
					<span class="calculator__live-price-value"
						>{{ formatPrice(animatedPrice) }} ₽</span
					>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.calculator {
	background: $gradient-deep-space;

	&__wrapper {
		max-width: 800px;
		margin: 0 auto;
		@include card-base;
		padding: $space-2xl;

		@include respond-below('md') {
			padding: $space-lg;
		}
	}

	&__progress {
		display: flex;
		justify-content: space-between;
		margin-bottom: $space-2xl;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 20px;
			left: 40px;
			right: 40px;
			height: 2px;
			background: rgba($electric-blue, 0.2);
		}

		&-bar {
			position: absolute;
			top: 20px;
			left: 40px;
			height: 2px;
			background: $electric-blue;
			transition: width $transition-normal ease;
		}

		&-step {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: $space-xs;
			position: relative;
			z-index: 1;

			&--active,
			&--completed {
				.calculator__progress-number {
					background: $electric-blue;
					border-color: $electric-blue;
					color: $deep-space;
				}
			}
		}

		&-number {
			@include flex-center;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: $deep-space;
			border: 2px solid rgba($electric-blue, 0.3);
			font-family: $font-tech;
			font-size: 14px;
			color: $platinum-muted;
			transition: all $transition-fast ease;
		}

		&-label {
			font-size: 12px;
			color: $platinum-dim;

			@include respond-below('sm') {
				display: none;
			}
		}
	}

	&__content {
		min-height: 350px;
	}

	&__step {
		&-title {
			@include heading-3;
			margin-bottom: $space-lg;
			text-align: center;
		}
	}

	&__brands {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: $space-sm;
		margin-bottom: $space-lg;
	}

	&__brand {
		padding: $space-md;
		font-family: $font-body;
		font-size: 14px;
		font-weight: 500;
		color: $platinum-muted;
		background: rgba($midnight-indigo, 0.3);
		border: 1px solid rgba($electric-blue, 0.2);
		border-radius: $border-radius-md;
		cursor: pointer;
		transition: all $transition-fast ease;

		&:hover {
			border-color: $electric-blue;
			color: $platinum-white;
		}

		&--active {
			background: rgba($electric-blue, 0.2);
			border-color: $electric-blue;
			color: $platinum-white;
		}
	}

	&__models {
		h4 {
			font-size: 14px;
			color: $platinum-dim;
			margin-bottom: $space-sm;
		}

		&-grid {
			display: flex;
			flex-wrap: wrap;
			gap: $space-xs;
		}
	}

	&__model {
		padding: $space-xs $space-md;
		font-size: 14px;
		color: $platinum-muted;
		background: transparent;
		border: 1px solid rgba($platinum-white, 0.1);
		border-radius: $border-radius-full;
		cursor: pointer;
		transition: all $transition-fast ease;

		&:hover,
		&--active {
			border-color: $electric-blue;
			color: $electric-blue;
		}
	}

	&__services {
		display: flex;
		flex-direction: column;
		gap: $space-sm;
	}

	&__service {
		@include flex-between;
		padding: $space-md $space-lg;
		background: rgba($midnight-indigo, 0.3);
		border: 1px solid rgba($electric-blue, 0.2);
		border-radius: $border-radius-md;
		cursor: pointer;
		transition: all $transition-fast ease;

		&:hover,
		&--active {
			border-color: $electric-blue;
			background: rgba($electric-blue, 0.1);
		}

		&--active {
			box-shadow: 0 0 20px rgba($electric-blue, 0.2);
		}

		&-name {
			font-size: 16px;
			color: $platinum-white;
		}

		&-price {
			font-family: $font-tech;
			font-size: 14px;
			color: $electric-blue;
		}
	}

	&__zones {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: $space-sm;
		margin-bottom: $space-lg;
	}

	&__zone {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: $space-xs;
		padding: $space-md;
		background: rgba($midnight-indigo, 0.3);
		border: 1px solid rgba($electric-blue, 0.2);
		border-radius: $border-radius-md;
		cursor: pointer;
		transition: all $transition-fast ease;

		&:hover,
		&--active {
			border-color: $electric-blue;
			background: rgba($electric-blue, 0.1);
		}

		&--active {
			box-shadow: 0 0 20px rgba($electric-blue, 0.2);
		}

		&--full {
			grid-column: 1 / -1;
			flex-direction: row;
			justify-content: center;
			gap: $space-md;
			background: linear-gradient(
				135deg,
				rgba($electric-blue, 0.2) 0%,
				rgba($neon-cyan, 0.1) 100%
			);
		}

		&-icon {
			font-size: 24px;
		}

		&-name {
			font-size: 14px;
			color: $platinum-white;
		}

		&-price {
			font-family: $font-tech;
			font-size: 12px;
			color: $electric-blue;
		}
	}

	&__films {
		h4 {
			font-size: 14px;
			color: $platinum-dim;
			margin-bottom: $space-sm;
		}

		&-grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: $space-sm;

			@include respond-below('sm') {
				grid-template-columns: 1fr;
			}
		}
	}

	&__film {
		display: flex;
		flex-direction: column;
		gap: $space-xs;
		padding: $space-md;
		background: rgba($midnight-indigo, 0.3);
		border: 1px solid rgba($electric-blue, 0.2);
		border-radius: $border-radius-md;
		cursor: pointer;
		transition: all $transition-fast ease;
		text-align: center;

		&:hover,
		&--active {
			border-color: $electric-blue;
		}

		&--active {
			background: rgba($electric-blue, 0.2);
		}

		&-label {
			font-size: 12px;
			color: $electric-blue;
			text-transform: uppercase;
			letter-spacing: 1px;
		}

		&-name {
			font-size: 14px;
			color: $platinum-white;
		}
	}

	&__summary {
		display: flex;
		flex-direction: column;
		gap: $space-md;

		&-item {
			@include flex-between;
			padding-bottom: $space-sm;
			border-bottom: 1px solid rgba($platinum-white, 0.1);

			span:first-child {
				color: $platinum-dim;
			}

			span:last-child {
				color: $platinum-white;
			}
		}
	}

	&__total {
		@include flex-between;
		padding-top: $space-md;
		margin-top: $space-sm;

		span:first-child {
			font-size: 18px;
			color: $platinum-white;
		}

		&-price {
			font-family: $font-tech;
			font-size: 36px;
			color: $electric-blue;
			@include neon-text;
		}
	}

	&__submit {
		margin-top: $space-lg;
		width: 100%;
	}

	&__nav {
		@include flex-between;
		margin-top: $space-xl;
		padding-top: $space-lg;
		border-top: 1px solid rgba($platinum-white, 0.1);
	}

	&__live-price {
		position: fixed;
		bottom: $space-lg;
		right: $space-lg;
		@include flex-center;
		gap: $space-sm;
		padding: $space-md $space-lg;
		@include glass-effect;
		border-radius: $border-radius-lg;
		z-index: $z-sticky;

		@include respond-below('md') {
			bottom: $space-sm;
			right: $space-sm;
			left: $space-sm;
		}

		span:first-child {
			font-size: 14px;
			color: $platinum-muted;
		}

		&-value {
			font-family: $font-tech;
			font-size: 24px;
			color: $electric-blue;
		}
	}
}

.step-enter-active,
.step-leave-active {
	transition: all 0.3s ease;
}

.step-enter-from {
	opacity: 0;
	transform: translateX(20px);
}

.step-leave-to {
	opacity: 0;
	transform: translateX(-20px);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
