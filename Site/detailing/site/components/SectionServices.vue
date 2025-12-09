<script setup lang="ts">
const activeFilter = ref('all')

const filters = [
	{ id: 'all', label: 'Все' },
	{ id: 'ppf', label: 'PPF' },
	{ id: 'vinyl', label: 'Винил' },
	{ id: 'tint', label: 'Тонировка' },
	{ id: 'polish', label: 'Полировка' },
	{ id: 'ceramic', label: 'Керамика' },
]

const services = [
	{
		id: 'ppf',
		category: 'ppf',
		title: 'Защитная пленка PPF',
		icon: '🛡️',
		price: 'от 45 000 ₽',
		description: 'Невидимая защита кузова от сколов, царапин и реагентов',
		features: [
			'Защита от сколов',
			'Гидрофобный эффект',
			'Гарантия 5 лет',
			'XPEL / SunTek',
		],
		image: '/images/services/ppf.jpg',
	},
	{
		id: 'vinyl',
		category: 'vinyl',
		title: 'Виниловая оклейка',
		icon: '🎨',
		price: 'от 35 000 ₽',
		description: 'Изменение цвета автомобиля без перекраски',
		features: ['100+ цветов', 'Матовый/глянец', 'Защита ЛКП', 'Съемная'],
		image: '/images/services/vinyl.jpg',
	},
	{
		id: 'tint',
		category: 'tint',
		title: 'Тонировка стекол',
		icon: '🕶️',
		price: 'от 8 000 ₽',
		description: 'Атермальная тонировка с защитой от ультрафиолета',
		features: ['Атермальная', 'UV-защита', 'Не выгорает', 'По ГОСТу'],
		image: '/images/services/tint.jpg',
	},
	{
		id: 'polish',
		category: 'polish',
		title: 'Полировка кузова',
		icon: '✨',
		price: 'от 15 000 ₽',
		description: 'Восстановление блеска и удаление царапин',
		features: [
			'Удаление царапин',
			'Зеркальный блеск',
			'3-этапная',
			'Детейлинг',
		],
		image: '/images/services/polish.jpg',
	},
	{
		id: 'ceramic',
		category: 'ceramic',
		title: 'Керамическое покрытие',
		icon: '💎',
		price: 'от 25 000 ₽',
		description: 'Долговременная защита с невероятным блеском',
		features: ['9H твердость', 'Гидрофоб', 'До 3 лет', 'Ceramic Pro'],
		image: '/images/services/ceramic.jpg',
	},
	{
		id: 'interior',
		category: 'polish',
		title: 'Химчистка салона',
		icon: '🧽',
		price: 'от 12 000 ₽',
		description: 'Глубокая очистка и восстановление салона',
		features: [
			'Паровая чистка',
			'Кожа/ткань',
			'Озонирование',
			'Антибактериальная',
		],
		image: '/images/services/interior.jpg',
	},
]

const filteredServices = computed(() => {
	if (activeFilter.value === 'all') return services
	return services.filter(s => s.category === activeFilter.value)
})

onMounted(async () => {
	if (process.client) {
		const gsap = (await import('gsap')).default
		const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
		gsap.registerPlugin(ScrollTrigger)

		gsap.fromTo(
			'.services__card',
			{ y: 60, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				stagger: 0.1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.services__grid',
					start: 'top 80%',
				},
			}
		)
	}
})
</script>

<template>
	<section id="services" class="services section">
		<div class="container">
			<!-- Header -->
			<div class="section-header">
				<h2 class="section-title">НАШИ <span class="accent">УСЛУГИ</span></h2>
				<p class="section-subtitle">
					Премиальный детейлинг для вашего автомобиля с использованием лучших
					материалов
				</p>
			</div>

			<!-- Filters -->
			<div class="services__filters">
				<button
					v-for="filter in filters"
					:key="filter.id"
					class="services__filter"
					:class="{ 'services__filter--active': activeFilter === filter.id }"
					@click="activeFilter = filter.id"
				>
					{{ filter.label }}
				</button>
			</div>

			<!-- Services Grid -->
			<div class="services__grid">
				<article
					v-for="service in filteredServices"
					:key="service.id"
					class="services__card"
				>
					<div class="services__card-inner">
						<!-- Front -->
						<div class="services__card-front">
							<div class="services__card-image">
								<div class="services__card-placeholder">
									<span class="services__card-icon">{{ service.icon }}</span>
								</div>
							</div>
							<div class="services__card-content">
								<span class="services__card-icon-small">{{
									service.icon
								}}</span>
								<h3 class="services__card-title">{{ service.title }}</h3>
								<p class="services__card-price">{{ service.price }}</p>
							</div>
						</div>

						<!-- Back -->
						<div class="services__card-back">
							<h3 class="services__card-title">{{ service.title }}</h3>
							<p class="services__card-desc">{{ service.description }}</p>
							<ul class="services__card-features">
								<li v-for="feature in service.features" :key="feature">
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
									{{ feature }}
								</li>
							</ul>
							<a href="#calculator" class="btn btn-neon btn-sm">
								<span>Рассчитать</span>
							</a>
						</div>
					</div>
				</article>
			</div>

			<!-- Laser Divider -->
			<div class="laser-divider mt-5"></div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.services {
	background: $deep-space;

	&__filters {
		display: flex;
		justify-content: center;
		gap: $space-sm;
		margin-bottom: $space-2xl;
		flex-wrap: wrap;
	}

	&__filter {
		padding: $space-sm $space-md;
		font-family: $font-body;
		font-size: 14px;
		font-weight: 500;
		color: $platinum-muted;
		background: transparent;
		border: 1px solid rgba($electric-blue, 0.2);
		border-radius: $border-radius-full;
		cursor: pointer;
		transition: all $transition-fast ease;

		&:hover {
			border-color: $electric-blue;
			color: $platinum-white;
		}

		&--active {
			background: $electric-blue;
			border-color: $electric-blue;
			color: $deep-space;
			@include neon-text;
			text-shadow: none;
			box-shadow: 0 0 20px rgba($electric-blue, 0.4);
		}
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $space-lg;

		@include respond-below('lg') {
			grid-template-columns: repeat(2, 1fr);
		}

		@include respond-below('sm') {
			grid-template-columns: 1fr;
		}
	}

	&__card {
		perspective: 1000px;
		height: 380px;

		&-inner {
			position: relative;
			width: 100%;
			height: 100%;
			transition: transform 0.6s $ease-smooth;
			transform-style: preserve-3d;
		}

		&:hover &-inner {
			transform: rotateY(180deg);
		}

		&-front,
		&-back {
			position: absolute;
			width: 100%;
			height: 100%;
			backface-visibility: hidden;
			border-radius: $border-radius-lg;
			overflow: hidden;
		}

		&-front {
			@include card-base;
			padding: 0;
			display: flex;
			flex-direction: column;
		}

		&-back {
			@include card-base;
			background: linear-gradient(
				145deg,
				rgba($electric-blue, 0.15) 0%,
				rgba($deep-space, 0.95) 100%
			);
			transform: rotateY(180deg);
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: $space-lg;
		}

		&-image {
			height: 200px;
			background: $gradient-card;
			position: relative;
			overflow: hidden;
		}

		&-placeholder {
			@include flex-center;
			height: 100%;
			font-size: 64px;
			opacity: 0.3;
		}

		&-content {
			padding: $space-md;
			display: flex;
			flex-direction: column;
			gap: $space-xs;
		}

		&-icon {
			font-size: 48px;
		}

		&-icon-small {
			font-size: 24px;
		}

		&-title {
			font-family: $font-body;
			font-size: 18px;
			font-weight: 600;
			color: $platinum-white;
		}

		&-price {
			font-family: $font-tech;
			font-size: 16px;
			color: $electric-blue;
		}

		&-desc {
			font-size: 14px;
			color: $platinum-muted;
			margin: $space-sm 0;
		}

		&-features {
			list-style: none;
			margin: $space-md 0;

			li {
				display: flex;
				align-items: center;
				gap: $space-xs;
				font-size: 14px;
				color: $platinum-muted;
				margin-bottom: $space-xs;

				svg {
					color: $electric-blue;
					flex-shrink: 0;
				}
			}
		}
	}
}
</style>
