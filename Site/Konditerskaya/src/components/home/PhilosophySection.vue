<template>
	<section class="philosophy section">
		<div class="container">
			<div class="philosophy__grid">
				<!-- Images -->
				<div class="philosophy__images">
					<div class="image-main">
						<img
							src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=500&h=600&fit=crop"
							alt="Кондитер за работой"
						/>
					</div>
					<div class="image-secondary">
						<img
							src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=300&h=300&fit=crop"
							alt="Процесс приготовления"
						/>
					</div>
					<div class="image-accent">
						<img
							src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop"
							alt="Готовый десерт"
						/>
					</div>

					<!-- Decorative elements -->
					<div class="images-decor">
						<span class="decor-icon decor-icon--1">🎂</span>
						<span class="decor-icon decor-icon--2">❤️</span>
						<span class="decor-icon decor-icon--3">✨</span>
					</div>
				</div>

				<!-- Content -->
				<div class="philosophy__content">
					<span class="philosophy__label">Наша философия</span>
					<h2>Каждый торт — это история любви</h2>

					<p class="philosophy__text">
						Мы верим, что десерт — это не просто еда. Это эмоции, воспоминания и
						моменты счастья. Каждое наше изделие создаётся с любовью и вниманием
						к деталям.
					</p>

					<div class="philosophy__features">
						<div class="feature">
							<div class="feature__icon">🌿</div>
							<div class="feature__content">
								<h4>Натуральные ингредиенты</h4>
								<p>Только свежие продукты высшего качества без консервантов</p>
							</div>
						</div>

						<div class="feature">
							<div class="feature__icon">👩‍🍳</div>
							<div class="feature__content">
								<h4>Мастера своего дела</h4>
								<p>Команда профессионалов с европейским образованием</p>
							</div>
						</div>

						<div class="feature">
							<div class="feature__icon">🎨</div>
							<div class="feature__content">
								<h4>Индивидуальный подход</h4>
								<p>Создаём уникальные десерты по вашим пожеланиям</p>
							</div>
						</div>
					</div>

					<div class="philosophy__stats">
						<div class="stat">
							<span class="stat__number">8</span>
							<span class="stat__label">лет опыта</span>
						</div>
						<div class="stat">
							<span class="stat__number">15K+</span>
							<span class="stat__label">довольных клиентов</span>
						</div>
						<div class="stat">
							<span class="stat__number">50+</span>
							<span class="stat__label">видов начинок</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup></script>

<style scoped>
.philosophy {
	background: var(--bg-secondary);
	position: relative;
	overflow: hidden;
}

.philosophy__grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-4xl);
	align-items: center;
}

/* Images */
.philosophy__images {
	position: relative;
	height: 600px;
}

.image-main {
	position: absolute;
	top: 0;
	left: 0;
	width: 70%;
	height: 80%;
	border-radius: var(--radius-xl);
	overflow: hidden;
	box-shadow: var(--shadow-xl);
}

.image-main img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.image-secondary {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 50%;
	height: 50%;
	border-radius: var(--radius-lg);
	overflow: hidden;
	box-shadow: var(--shadow-lg);
	border: 5px solid var(--bg-card);
}

.image-secondary img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.image-accent {
	position: absolute;
	top: 60%;
	left: 55%;
	width: 120px;
	height: 120px;
	border-radius: var(--radius-full);
	overflow: hidden;
	box-shadow: var(--shadow-lg);
	border: 4px solid var(--color-gold);
	animation: float 4s ease-in-out infinite;
}

.image-accent img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.images-decor {
	position: absolute;
	inset: 0;
	pointer-events: none;
}

.decor-icon {
	position: absolute;
	font-size: 2rem;
	animation: float 5s ease-in-out infinite;
}

.decor-icon--1 {
	top: -20px;
	right: 20%;
	animation-delay: 0s;
}

.decor-icon--2 {
	bottom: 30%;
	left: -10px;
	animation-delay: 1.5s;
}

.decor-icon--3 {
	top: 40%;
	right: 10%;
	animation-delay: 3s;
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

/* Content */
.philosophy__content {
	padding-left: var(--space-xl);
}

.philosophy__label {
	display: inline-block;
	padding: var(--space-xs) var(--space-md);
	background: var(--color-primary-gradient);
	border-radius: var(--radius-full);
	font-size: var(--text-sm);
	font-weight: 600;
	color: var(--color-chocolate);
	margin-bottom: var(--space-lg);
}

.philosophy__content h2 {
	font-size: var(--text-4xl);
	margin-bottom: var(--space-lg);
}

.philosophy__text {
	font-size: var(--text-lg);
	color: var(--color-chocolate-light);
	line-height: 1.8;
	margin-bottom: var(--space-2xl);
}

/* Features */
.philosophy__features {
	display: flex;
	flex-direction: column;
	gap: var(--space-lg);
	margin-bottom: var(--space-2xl);
}

.feature {
	display: flex;
	gap: var(--space-md);
	padding: var(--space-md);
	background: var(--bg-card);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-sm);
	transition: all var(--transition-base);
}

.feature:hover {
	transform: translateX(10px);
	box-shadow: var(--shadow-md);
}

.feature__icon {
	font-size: 2rem;
	flex-shrink: 0;
}

.feature__content h4 {
	font-family: var(--font-body);
	font-weight: 700;
	font-size: var(--text-base);
	margin: 0 0 var(--space-xs);
}

.feature__content p {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin: 0;
}

/* Stats */
.philosophy__stats {
	display: flex;
	gap: var(--space-2xl);
	padding: var(--space-lg);
	background: var(--color-primary-gradient);
	border-radius: var(--radius-lg);
}

.stat {
	text-align: center;
}

.stat__number {
	display: block;
	font-family: var(--font-elegant);
	font-size: var(--text-3xl);
	font-weight: 700;
	color: var(--color-chocolate);
	line-height: 1;
}

.stat__label {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

@media (max-width: 992px) {
	.philosophy__grid {
		grid-template-columns: 1fr;
		gap: var(--space-2xl);
	}

	.philosophy__images {
		height: 400px;
		order: 2;
	}

	.philosophy__content {
		padding-left: 0;
		order: 1;
	}
}

@media (max-width: 576px) {
	.philosophy__images {
		height: 300px;
	}

	.image-main {
		width: 65%;
		height: 75%;
	}

	.image-secondary {
		width: 55%;
		height: 45%;
	}

	.image-accent {
		width: 80px;
		height: 80px;
		left: 50%;
	}

	.philosophy__stats {
		flex-direction: column;
		gap: var(--space-md);
	}
}
</style>
