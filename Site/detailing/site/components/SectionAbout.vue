<script setup lang="ts">
const stats = [
	{ value: '1500+', label: 'Выполненных работ', suffix: '' },
	{ value: '5', label: 'Лет гарантии', suffix: '' },
	{ value: '98%', label: 'Довольных клиентов', suffix: '' },
	{ value: '15', label: 'Мастеров', suffix: '' },
]

const features = [
	{
		icon: '🏆',
		title: 'Премиальные материалы',
		description:
			'Работаем только с ведущими брендами: XPEL, SunTek, 3M, Ceramic Pro',
	},
	{
		icon: '🔬',
		title: 'Современное оборудование',
		description: 'Покрасочная камера с климат-контролем, профессиональный свет',
	},
	{
		icon: '👨‍🔧',
		title: 'Сертифицированные мастера',
		description: 'Обучение в официальных академиях производителей пленок',
	},
	{
		icon: '📋',
		title: 'Прозрачные условия',
		description: 'Фиксированные цены, договор, гарантия на все виды работ',
	},
]

const animatedStats = ref<Record<string, number>>({})

onMounted(async () => {
	if (process.client) {
		const gsap = (await import('gsap')).default
		const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
		gsap.registerPlugin(ScrollTrigger)

		// Анимация счетчиков
		stats.forEach(stat => {
			const numValue = parseInt(stat.value.replace(/\D/g, ''))
			animatedStats.value[stat.label] = 0

			ScrollTrigger.create({
				trigger: '.about__stats',
				start: 'top 80%',
				onEnter: () => {
					gsap.to(animatedStats.value, {
						[stat.label]: numValue,
						duration: 2,
						ease: 'power2.out',
					})
				},
			})
		})

		// Анимация карточек
		gsap.fromTo(
			'.about__feature',
			{ y: 40, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				stagger: 0.15,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.about__features',
					start: 'top 80%',
				},
			}
		)
	}
})

function formatStat(stat: (typeof stats)[0]) {
	const value = Math.round(animatedStats.value[stat.label] || 0)
	if (stat.value.includes('+')) return `${value}+`
	if (stat.value.includes('%')) return `${value}%`
	return value
}
</script>

<template>
	<section id="about" class="about section">
		<div class="container">
			<div class="about__grid">
				<!-- Content -->
				<div class="about__content">
					<h2 class="section-title text-left">
						О <span class="accent">НАС</span>
					</h2>
					<p class="about__text">
						<strong>APEX Detailing</strong> — премиальный детейлинг-центр в
						Москве, специализирующийся на защите и преображении автомобилей
						любого класса.
					</p>
					<p class="about__text">
						Мы первыми в России внедрили интерактивный 3D-конфигуратор,
						позволяющий клиентам увидеть результат до начала работ. Наша команда
						сертифицированных мастеров использует только премиальные материалы и
						современное оборудование.
					</p>

					<!-- Features -->
					<div class="about__features">
						<div
							v-for="feature in features"
							:key="feature.title"
							class="about__feature"
						>
							<span class="about__feature-icon">{{ feature.icon }}</span>
							<div class="about__feature-content">
								<h4 class="about__feature-title">{{ feature.title }}</h4>
								<p class="about__feature-desc">{{ feature.description }}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Stats & Image -->
				<div class="about__side">
					<!-- Stats -->
					<div class="about__stats">
						<div v-for="stat in stats" :key="stat.label" class="about__stat">
							<span class="about__stat-value">{{ formatStat(stat) }}</span>
							<span class="about__stat-label">{{ stat.label }}</span>
						</div>
					</div>

					<!-- Brands -->
					<div class="about__brands">
						<h4>Официальные партнеры</h4>
						<div class="about__brands-grid">
							<div class="about__brand">XPEL</div>
							<div class="about__brand">SunTek</div>
							<div class="about__brand">3M</div>
							<div class="about__brand">Ceramic Pro</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.about {
	background: $deep-space;

	&__grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: $space-3xl;
		align-items: start;

		@include respond-below('lg') {
			grid-template-columns: 1fr;
			gap: $space-2xl;
		}
	}

	&__content {
		.section-title {
			margin-bottom: $space-lg;
		}
	}

	&__text {
		@include body-text;
		margin-bottom: $space-md;

		strong {
			color: $electric-blue;
		}
	}

	&__features {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $space-lg;
		margin-top: $space-xl;

		@include respond-below('sm') {
			grid-template-columns: 1fr;
		}
	}

	&__feature {
		display: flex;
		gap: $space-md;

		&-icon {
			font-size: 32px;
			flex-shrink: 0;
		}

		&-title {
			font-family: $font-body;
			font-size: 16px;
			font-weight: 600;
			color: $platinum-white;
			margin-bottom: $space-xs;
		}

		&-desc {
			font-size: 14px;
			color: $platinum-muted;
			line-height: 1.5;
		}
	}

	&__side {
		display: flex;
		flex-direction: column;
		gap: $space-xl;
	}

	&__stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $space-md;
	}

	&__stat {
		@include card-base;
		text-align: center;
		padding: $space-lg;

		&-value {
			display: block;
			font-family: $font-tech;
			font-size: 40px;
			font-weight: 700;
			color: $electric-blue;
			@include neon-text;
			margin-bottom: $space-xs;
		}

		&-label {
			font-size: 14px;
			color: $platinum-muted;
		}
	}

	&__brands {
		@include card-base;

		h4 {
			font-size: 14px;
			color: $platinum-dim;
			text-transform: uppercase;
			letter-spacing: 1px;
			margin-bottom: $space-md;
			text-align: center;
		}

		&-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: $space-sm;
		}
	}

	&__brand {
		padding: $space-md;
		background: rgba($midnight-indigo, 0.5);
		border: 1px solid rgba($electric-blue, 0.1);
		border-radius: $border-radius-md;
		text-align: center;
		font-family: $font-display;
		font-size: 18px;
		color: $platinum-white;
		letter-spacing: 2px;
	}
}
</style>
