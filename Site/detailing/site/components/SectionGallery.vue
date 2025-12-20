<script setup lang="ts">
const activeFilter = ref('all')
const selectedWork = ref<number | null>(null)

const filters = [
	{ id: 'all', label: 'Все' },
	{ id: 'mercedes', label: 'Mercedes' },
	{ id: 'bmw', label: 'BMW' },
	{ id: 'audi', label: 'Audi' },
	{ id: 'porsche', label: 'Porsche' },
]

const works = [
	{
		id: 1,
		brand: 'mercedes',
		title: 'Mercedes-Benz S-Class W223',
		service: 'Защитная пленка XPEL',
		type: 'Полная оклейка',
	},
	{
		id: 2,
		brand: 'bmw',
		title: 'BMW X5 G05',
		service: 'Виниловая оклейка',
		type: 'Цвет: Satin Black',
	},
	{
		id: 3,
		brand: 'audi',
		title: 'Audi RS6 Avant',
		service: 'Керамика + PPF',
		type: 'Комплекс',
	},
	{
		id: 4,
		brand: 'porsche',
		title: 'Porsche 911 GT3',
		service: 'Полировка + Керамика',
		type: 'Детейлинг',
	},
	{
		id: 5,
		brand: 'mercedes',
		title: 'Mercedes-AMG G63',
		service: 'PPF + Тонировка',
		type: 'Полная защита',
	},
	{
		id: 6,
		brand: 'bmw',
		title: 'BMW M4 Competition',
		service: 'Винил Nardo Grey',
		type: 'Полная оклейка',
	},
]

const filteredWorks = computed(() => {
	if (activeFilter.value === 'all') return works
	return works.filter(w => w.brand === activeFilter.value)
})

function openLightbox(id: number) {
	selectedWork.value = id
}

function closeLightbox() {
	selectedWork.value = null
}
</script>

<template>
	<section id="gallery" class="gallery section">
		<div class="container">
			<!-- Header -->
			<div class="section-header">
				<h2 class="section-title">НАШИ <span class="accent">РАБОТЫ</span></h2>
				<p class="section-subtitle">
					Портфолио выполненных проектов с фото до и после
				</p>
			</div>

			<!-- Filters -->
			<div class="gallery__filters">
				<button
					v-for="filter in filters"
					:key="filter.id"
					class="gallery__filter"
					:class="{ 'gallery__filter--active': activeFilter === filter.id }"
					@click="activeFilter = filter.id"
				>
					{{ filter.label }}
				</button>
			</div>

			<!-- Featured Before/After -->
			<div class="gallery__featured">
				<BeforeAfterSlider />
			</div>

			<!-- Grid -->
			<div class="gallery__grid">
				<article
					v-for="work in filteredWorks"
					:key="work.id"
					class="gallery__item"
					@click="openLightbox(work.id)"
				>
					<div class="gallery__item-image">
						<div class="gallery__item-placeholder">
							<span>{{ work.brand.charAt(0).toUpperCase() }}</span>
						</div>
						<div class="gallery__item-overlay">
							<svg
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="11" cy="11" r="8"></circle>
								<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
								<line x1="11" y1="8" x2="11" y2="14"></line>
								<line x1="8" y1="11" x2="14" y2="11"></line>
							</svg>
						</div>
					</div>
					<div class="gallery__item-info">
						<h3 class="gallery__item-title">{{ work.title }}</h3>
						<p class="gallery__item-service">{{ work.service }}</p>
						<span class="gallery__item-type">{{ work.type }}</span>
					</div>
				</article>
			</div>

			<!-- Load More -->
			<div class="gallery__more">
				<button class="btn btn-ghost">
					<span>Показать еще</span>
				</button>
			</div>
		</div>

		<!-- Lightbox -->
		<Teleport to="body">
			<Transition name="lightbox">
				<div
					v-if="selectedWork !== null"
					class="gallery__lightbox"
					@click.self="closeLightbox"
				>
					<button class="gallery__lightbox-close" @click="closeLightbox">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
					<div class="gallery__lightbox-content">
						<BeforeAfterSlider :full-size="true" />
					</div>
				</div>
			</Transition>
		</Teleport>
	</section>
</template>

<style lang="scss" scoped>
.gallery {
	background: linear-gradient(
		180deg,
		$deep-space 0%,
		darken($deep-space, 2%) 100%
	);

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
		}
	}

	&__featured {
		margin-bottom: $space-2xl;
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

	&__item {
		@include card-base;
		padding: 0;
		overflow: hidden;
		cursor: pointer;

		&:hover {
			transform: translateY(-8px);

			.gallery__item-overlay {
				opacity: 1;
			}

			.gallery__item-image::after {
				opacity: 0.6;
			}
		}

		&-image {
			height: 220px;
			position: relative;
			background: $gradient-card;

			&::after {
				content: '';
				position: absolute;
				inset: 0;
				background: $electric-blue;
				opacity: 0;
				transition: opacity $transition-fast ease;
			}
		}

		&-placeholder {
			@include flex-center;
			height: 100%;
			font-family: $font-display;
			font-size: 64px;
			color: rgba($electric-blue, 0.2);
		}

		&-overlay {
			position: absolute;
			inset: 0;
			@include flex-center;
			opacity: 0;
			transition: opacity $transition-fast ease;
			z-index: 2;

			svg {
				color: $platinum-white;
			}
		}

		&-info {
			padding: $space-md;
		}

		&-title {
			font-family: $font-body;
			font-size: 16px;
			font-weight: 600;
			color: $platinum-white;
			margin-bottom: $space-xs;
		}

		&-service {
			font-size: 14px;
			color: $electric-blue;
			margin-bottom: $space-xs;
		}

		&-type {
			font-size: 12px;
			color: $platinum-dim;
		}
	}

	&__more {
		text-align: center;
		margin-top: $space-2xl;
	}

	&__lightbox {
		position: fixed;
		inset: 0;
		z-index: $z-modal;
		background: rgba($deep-space, 0.95);
		backdrop-filter: blur(20px);
		@include flex-center;
		padding: $space-xl;

		&-close {
			position: absolute;
			top: $space-lg;
			right: $space-lg;
			@include flex-center;
			width: 48px;
			height: 48px;
			background: rgba($midnight-indigo, 0.5);
			border: 1px solid rgba($electric-blue, 0.3);
			border-radius: 50%;
			color: $platinum-white;
			cursor: pointer;
			transition: all $transition-fast ease;

			&:hover {
				background: $electric-blue;
				border-color: $electric-blue;
			}
		}

		&-content {
			width: 100%;
			max-width: 1000px;
		}
	}
}

.lightbox-enter-active,
.lightbox-leave-active {
	transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
	opacity: 0;
}
</style>
