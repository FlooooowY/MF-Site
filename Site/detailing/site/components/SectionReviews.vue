<script setup lang="ts">
const currentSlide = ref(0)

const reviews = [
	{
		id: 1,
		name: 'Александр М.',
		car: 'Mercedes-Benz S-Class',
		service: 'Защитная пленка PPF',
		rating: 5,
		text: 'Отличная работа! Оклеили S-Class полностью пленкой XPEL. Качество на высшем уровне, пленка идеально легла, никаких пузырей и складок. Рекомендую!',
		date: '15.11.2025',
		isVideo: false,
	},
	{
		id: 2,
		name: 'Дмитрий К.',
		car: 'BMW M4',
		service: 'Виниловая оклейка',
		rating: 5,
		text: 'Перекрасил машину в матовый серый винил. Выглядит потрясающе, все друзья в восторге. Цена адекватная, сроки соблюдены.',
		date: '02.11.2025',
		isVideo: true,
	},
	{
		id: 3,
		name: 'Елена В.',
		car: 'Porsche Cayenne',
		service: 'Керамика + Полировка',
		rating: 5,
		text: 'Делала комплекс: полировка + керамика. Машина сияет как новая! Спасибо команде за профессионализм и внимание к деталям.',
		date: '28.10.2025',
		isVideo: false,
	},
	{
		id: 4,
		name: 'Михаил Т.',
		car: 'Audi RS6',
		service: 'Полная оклейка PPF',
		rating: 5,
		text: 'Второй раз обращаюсь в APEX. Оклеили RS6 полностью. Работа выполнена безупречно. Отдельное спасибо за 3D-конфигуратор — очень удобно!',
		date: '20.10.2025',
		isVideo: false,
	},
]

function nextSlide() {
	currentSlide.value = (currentSlide.value + 1) % reviews.length
}

function prevSlide() {
	currentSlide.value =
		currentSlide.value === 0 ? reviews.length - 1 : currentSlide.value - 1
}

function goToSlide(index: number) {
	currentSlide.value = index
}
</script>

<template>
	<section id="reviews" class="reviews section">
		<div class="container">
			<!-- Header -->
			<div class="section-header">
				<h2 class="section-title">
					ОТЗЫВЫ <span class="accent">КЛИЕНТОВ</span>
				</h2>
				<p class="section-subtitle">Мнения наших клиентов о качестве работ</p>
			</div>

			<!-- Slider -->
			<div class="reviews__slider">
				<div
					class="reviews__track"
					:style="{ transform: `translateX(-${currentSlide * 100}%)` }"
				>
					<article
						v-for="review in reviews"
						:key="review.id"
						class="reviews__slide"
					>
						<div class="reviews__card">
							<!-- Rating -->
							<div class="reviews__rating">
								<span
									v-for="i in 5"
									:key="i"
									class="reviews__star"
									:class="{ 'reviews__star--filled': i <= review.rating }"
								>
									★
								</span>
							</div>

							<!-- Text -->
							<p class="reviews__text">{{ review.text }}</p>

							<!-- Author -->
							<div class="reviews__author">
								<div class="reviews__avatar">
									{{ review.name.charAt(0) }}
								</div>
								<div class="reviews__info">
									<span class="reviews__name">{{ review.name }}</span>
									<span class="reviews__car">{{ review.car }}</span>
								</div>
								<div class="reviews__meta">
									<span class="reviews__service">{{ review.service }}</span>
									<span class="reviews__date">{{ review.date }}</span>
								</div>
							</div>

							<!-- Video badge -->
							<div v-if="review.isVideo" class="reviews__video-badge">
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<polygon points="5 3 19 12 5 21 5 3"></polygon>
								</svg>
								Видеоотзыв
							</div>
						</div>
					</article>
				</div>

				<!-- Navigation -->
				<button class="reviews__nav reviews__nav--prev" @click="prevSlide">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</button>
				<button class="reviews__nav reviews__nav--next" @click="nextSlide">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>

				<!-- Dots -->
				<div class="reviews__dots">
					<button
						v-for="(_, index) in reviews"
						:key="index"
						class="reviews__dot"
						:class="{ 'reviews__dot--active': currentSlide === index }"
						@click="goToSlide(index)"
					></button>
				</div>
			</div>

			<!-- CTA -->
			<div class="reviews__cta">
				<p>Хотите оставить отзыв о нашей работе?</p>
				<a href="#" class="btn btn-ghost">
					<span>Написать отзыв</span>
				</a>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.reviews {
	background: linear-gradient(
		180deg,
		darken($deep-space, 2%) 0%,
		$deep-space 100%
	);

	&__slider {
		position: relative;
		overflow: hidden;
		margin: 0 -$space-md;
		padding: 0 $space-md;
	}

	&__track {
		display: flex;
		transition: transform 0.5s $ease-smooth;
	}

	&__slide {
		flex: 0 0 100%;
		padding: 0 $space-md;

		@include respond-to('md') {
			flex: 0 0 50%;
		}

		@include respond-to('lg') {
			flex: 0 0 33.333%;
		}
	}

	&__card {
		@include card-base;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	&__rating {
		margin-bottom: $space-md;
	}

	&__star {
		font-size: 20px;
		color: rgba($amber-alert, 0.3);

		&--filled {
			color: $amber-alert;
		}
	}

	&__text {
		flex: 1;
		font-size: 16px;
		color: $platinum-muted;
		line-height: 1.6;
		margin-bottom: $space-lg;
	}

	&__author {
		display: flex;
		align-items: center;
		gap: $space-md;
		padding-top: $space-md;
		border-top: 1px solid rgba($platinum-white, 0.1);
	}

	&__avatar {
		@include flex-center;
		width: 48px;
		height: 48px;
		background: $gradient-cta;
		border-radius: 50%;
		font-family: $font-display;
		font-size: 20px;
		color: $deep-space;
	}

	&__info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	&__name {
		font-weight: 600;
		color: $platinum-white;
	}

	&__car {
		font-size: 14px;
		color: $electric-blue;
	}

	&__meta {
		text-align: right;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	&__service {
		font-size: 12px;
		color: $platinum-dim;
	}

	&__date {
		font-size: 12px;
		color: $platinum-dim;
	}

	&__video-badge {
		position: absolute;
		top: $space-md;
		right: $space-md;
		display: flex;
		align-items: center;
		gap: $space-xs;
		padding: $space-xs $space-sm;
		background: rgba($electric-blue, 0.2);
		border: 1px solid $electric-blue;
		border-radius: $border-radius-full;
		font-size: 12px;
		color: $electric-blue;
	}

	&__nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		@include flex-center;
		width: 48px;
		height: 48px;
		background: rgba($midnight-indigo, 0.8);
		border: 1px solid rgba($electric-blue, 0.3);
		border-radius: 50%;
		color: $platinum-white;
		cursor: pointer;
		transition: all $transition-fast ease;
		z-index: 10;

		&:hover {
			background: $electric-blue;
			border-color: $electric-blue;
		}

		&--prev {
			left: $space-sm;
		}

		&--next {
			right: $space-sm;
		}

		@include respond-below('md') {
			display: none;
		}
	}

	&__dots {
		display: flex;
		justify-content: center;
		gap: $space-sm;
		margin-top: $space-xl;
	}

	&__dot {
		width: 12px;
		height: 12px;
		background: rgba($electric-blue, 0.3);
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: all $transition-fast ease;

		&:hover {
			background: rgba($electric-blue, 0.5);
		}

		&--active {
			background: $electric-blue;
			box-shadow: 0 0 10px $electric-blue;
		}
	}

	&__cta {
		text-align: center;
		margin-top: $space-2xl;
		padding-top: $space-xl;
		border-top: 1px solid rgba($platinum-white, 0.1);

		p {
			color: $platinum-muted;
			margin-bottom: $space-md;
		}
	}
}
</style>
