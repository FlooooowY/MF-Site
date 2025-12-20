<script setup lang="ts">
const heroRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const isLoaded = ref(false)

const services = [
	{ id: 'ppf', label: 'PPF', icon: '🛡️' },
	{ id: 'vinyl', label: 'Винил', icon: '🎨' },
	{ id: 'tint', label: 'Тонировка', icon: '🕶️' },
	{ id: 'polish', label: 'Полировка', icon: '✨' },
]

onMounted(async () => {
	isLoaded.value = true

	// GSAP анимации
	if (process.client) {
		const gsap = (await import('gsap')).default

		// Анимация заголовка
		gsap.fromTo(
			'.hero__title-line',
			{ y: 100, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out',
				delay: 0.3,
			}
		)

		// Анимация подзаголовка
		gsap.fromTo(
			'.hero__subtitle',
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.6, delay: 0.8, ease: 'power2.out' }
		)

		// Анимация кнопок
		gsap.fromTo(
			'.hero__cta',
			{ y: 20, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.6, delay: 1, ease: 'power2.out' }
		)

		// Анимация быстрых фильтров
		gsap.fromTo(
			'.hero__filter',
			{ y: 20, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.4,
				stagger: 0.1,
				delay: 1.2,
				ease: 'power2.out',
			}
		)

		// Пульсация CTA кнопки
		gsap.to('.hero__cta-primary', {
			boxShadow: '0 0 40px rgba(33, 150, 243, 0.6)',
			repeat: -1,
			yoyo: true,
			duration: 1.5,
			delay: 1.5,
		})
	}
})
</script>

<template>
	<section ref="heroRef" class="hero" :class="{ 'hero--loaded': isLoaded }">
		<!-- Animated Background -->
		<div class="hero__bg">
			<div class="hero__bg-gradient"></div>
			<div class="hero__bg-particles"></div>
			<div class="hero__bg-grid"></div>
		</div>

		<!-- 3D Car Container -->
		<div class="hero__car">
			<ClientOnly>
				<Car3D />
				<template #fallback>
					<div class="hero__car-placeholder">
						<span>🚗</span>
					</div>
				</template>
			</ClientOnly>
		</div>

		<div class="hero__content container">
			<div class="hero__text">
				<!-- Title -->
				<h1 ref="titleRef" class="hero__title">
					<span class="hero__title-line">TRANSFORM</span>
					<span class="hero__title-line"
						>YOUR <span class="accent">CAR</span></span
					>
					<span class="hero__title-line">TO PERFECTION</span>
				</h1>

				<!-- Subtitle -->
				<p class="hero__subtitle">
					Премиум детейлинг-центр с интерактивным 3D-конфигуратором. Увидьте
					результат до начала работ.
				</p>

				<!-- CTA Buttons -->
				<div class="hero__cta">
					<a href="#calculator" class="btn btn-neon hero__cta-primary">
						<span>✨ Рассчитать стоимость</span>
					</a>
					<a href="#gallery" class="btn btn-ghost">
						<span>Смотреть работы</span>
					</a>
				</div>
			</div>

			<!-- Quick Service Filters -->
			<div class="hero__filters">
				<button
					v-for="service in services"
					:key="service.id"
					class="hero__filter"
				>
					<span class="hero__filter-icon">{{ service.icon }}</span>
					<span class="hero__filter-label">{{ service.label }}</span>
				</button>
			</div>
		</div>

		<!-- Scroll Indicator -->
		<div class="hero__scroll">
			<span>Скролл</span>
			<div class="hero__scroll-line">
				<div class="hero__scroll-dot"></div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.hero {
	position: relative;
	min-height: 100vh;
	display: flex;
	align-items: center;
	padding: 120px 0 80px;
	overflow: hidden;

	// Background Layers
	&__bg {
		position: absolute;
		inset: 0;
		z-index: 0;

		&-gradient {
			position: absolute;
			inset: 0;
			background: $gradient-hero;
		}

		&-particles {
			position: absolute;
			inset: 0;
			background-image: radial-gradient(
					ellipse at 30% 20%,
					rgba($electric-blue, 0.08) 0%,
					transparent 60%
				),
				radial-gradient(
					ellipse at 70% 80%,
					rgba($neon-cyan, 0.05) 0%,
					transparent 50%
				);
		}

		&-grid {
			display: none;
		}
	}

	// 3D Car
	&__car {
		position: absolute;
		right: -10%;
		top: 50%;
		transform: translateY(-50%);
		width: 75%;
		height: 90%;
		z-index: 1;

		@include respond-below('lg') {
			position: relative;
			right: auto;
			top: auto;
			transform: none;
			width: 100%;
			height: 400px;
			margin-bottom: $space-xl;
		}
	}

	// Content
	&__content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: $space-2xl;
	}

	&__text {
		max-width: 700px;
	}

	&__title {
		margin-bottom: $space-lg;
		overflow: hidden;

		&-line {
			display: block;
			font-family: $font-display;
			font-size: clamp(48px, 8vw, 96px);
			font-weight: 700;
			line-height: 1;
			letter-spacing: 3px;
			color: $platinum-white;
			text-transform: uppercase;

			.accent {
				color: $electric-blue;
				@include neon-text;
			}
		}
	}

	&__subtitle {
		@include body-text;
		font-size: clamp(16px, 1.5vw, 20px);
		max-width: 500px;
		margin-bottom: $space-xl;
	}

	&__cta {
		display: flex;
		gap: $space-md;
		flex-wrap: wrap;

		&-primary {
			animation: pulse-glow 2s ease-in-out infinite;
			animation-delay: 2s;
		}
	}

	// Quick Filters
	&__filters {
		display: flex;
		gap: $space-sm;
		flex-wrap: wrap;

		@include respond-below('sm') {
			justify-content: center;
		}
	}

	&__filter {
		display: flex;
		align-items: center;
		gap: $space-xs;
		padding: $space-sm $space-md;
		background: rgba($midnight-indigo, 0.4);
		border: 1px solid rgba($electric-blue, 0.2);
		border-radius: $border-radius-full;
		color: $platinum-muted;
		font-family: $font-body;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all $transition-fast ease;

		&:hover {
			background: rgba($electric-blue, 0.2);
			border-color: $electric-blue;
			color: $platinum-white;
			transform: translateY(-2px);
		}

		&-icon {
			font-size: 18px;
		}
	}

	// Scroll Indicator
	&__scroll {
		position: absolute;
		bottom: $space-xl;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: $space-xs;
		color: $platinum-dim;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 2px;

		@include respond-below('md') {
			display: none;
		}

		&-line {
			width: 1px;
			height: 60px;
			background: rgba($platinum-white, 0.2);
			position: relative;
			overflow: hidden;
		}

		&-dot {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 20px;
			background: $electric-blue;
			animation: scroll-dot 2s ease-in-out infinite;
		}
	}
}

@keyframes scroll-dot {
	0%,
	100% {
		transform: translateY(0);
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		transform: translateY(40px);
		opacity: 0;
	}
}

.hero__car-placeholder {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 120px;
	opacity: 0.3;
}
</style>
