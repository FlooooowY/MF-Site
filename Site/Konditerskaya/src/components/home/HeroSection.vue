<template>
	<section class="hero" ref="heroRef">
		<!-- Video Background -->
		<div class="hero__video-bg">
			<div class="video-overlay"></div>
			<!-- Placeholder gradient animation instead of actual video -->
			<div class="video-placeholder">
				<div class="gradient-orb gradient-orb--1"></div>
				<div class="gradient-orb gradient-orb--2"></div>
				<div class="gradient-orb gradient-orb--3"></div>
			</div>
		</div>

		<div class="hero__content container">
			<div class="hero__text" ref="textRef">
				<span class="hero__badge">🎂 Премиальная кондитерская</span>
				<h1 class="hero__title">
					<span class="title-line">Создаём</span>
					<span class="title-line title-line--accent">Сладкие мечты</span>
				</h1>
				<p class="hero__subtitle">
					Авторские торты и десерты для ваших особенных моментов. Каждое изделие
					— произведение кондитерского искусства.
				</p>

				<div class="hero__actions">
					<router-link to="/constructor" class="btn-cta">
						<span class="btn-text">Создать свой торт</span>
						<span class="btn-icon">✨</span>
						<span class="btn-cream"></span>
					</router-link>
					<router-link to="/catalog/cakes" class="btn-secondary">
						Смотреть каталог
					</router-link>
				</div>

				<div class="hero__stats">
					<div class="stat-item">
						<span class="stat-number">8+</span>
						<span class="stat-label">Лет опыта</span>
					</div>
					<div class="stat-divider"></div>
					<div class="stat-item">
						<span class="stat-number">15K+</span>
						<span class="stat-label">Счастливых клиентов</span>
					</div>
					<div class="stat-divider"></div>
					<div class="stat-item">
						<span class="stat-number">50+</span>
						<span class="stat-label">Видов начинок</span>
					</div>
				</div>
			</div>

			<!-- 3D Cake Preview -->
			<div class="hero__cake" ref="cakeRef">
				<div class="cake-scene">
					<div class="cake-model">
						<!-- Base tier -->
						<div class="cake-tier cake-tier--bottom">
							<div class="tier-frosting"></div>
							<div class="tier-drip tier-drip--1"></div>
							<div class="tier-drip tier-drip--2"></div>
							<div class="tier-drip tier-drip--3"></div>
							<div class="tier-drip tier-drip--4"></div>
							<div class="tier-drip tier-drip--5"></div>
						</div>
						<!-- Middle tier -->
						<div class="cake-tier cake-tier--middle">
							<div class="tier-frosting"></div>
							<div class="tier-drip tier-drip--1"></div>
							<div class="tier-drip tier-drip--2"></div>
							<div class="tier-drip tier-drip--3"></div>
						</div>
						<!-- Top tier -->
						<div class="cake-tier cake-tier--top">
							<div class="tier-frosting"></div>
							<div class="tier-drip tier-drip--1"></div>
							<div class="tier-drip tier-drip--2"></div>
						</div>
						<!-- Decorations -->
						<div class="cake-decorations">
							<span class="decoration decoration--1">🍓</span>
							<span class="decoration decoration--2">🫐</span>
							<span class="decoration decoration--3">🍫</span>
							<span class="decoration decoration--4">🌸</span>
							<span class="decoration decoration--5">✨</span>
						</div>
					</div>

					<!-- Floating elements -->
					<div class="floating-elements">
						<span class="float-item float-item--1">🧁</span>
						<span class="float-item float-item--2">🍰</span>
						<span class="float-item float-item--3">🍪</span>
						<span class="float-item float-item--4">🎀</span>
					</div>
				</div>

				<!-- Customize badge -->
				<div class="customize-badge">
					<span class="badge-icon">🎨</span>
					<span class="badge-text">Кастомизируй!</span>
				</div>
			</div>
		</div>

		<!-- Scroll indicator -->
		<div class="hero__scroll">
			<span>Листай вниз</span>
			<div class="scroll-icon">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M12 5v14M19 12l-7 7-7-7" />
				</svg>
			</div>
		</div>

		<!-- Decorative pastry tools -->
		<div class="hero__tools">
			<svg class="tool tool--whisk" viewBox="0 0 50 100" fill="none">
				<ellipse cx="25" cy="85" rx="8" ry="3" fill="#D4AF37" />
				<path
					d="M25 82 V20"
					stroke="#4A2C2A"
					stroke-width="4"
					stroke-linecap="round"
				/>
				<path
					d="M15 20 Q25 5 35 20"
					stroke="#4A2C2A"
					stroke-width="3"
					fill="none"
				/>
				<path
					d="M17 22 Q25 8 33 22"
					stroke="#4A2C2A"
					stroke-width="2"
					fill="none"
				/>
				<path
					d="M19 24 Q25 11 31 24"
					stroke="#4A2C2A"
					stroke-width="2"
					fill="none"
				/>
			</svg>

			<svg class="tool tool--bag" viewBox="0 0 60 100" fill="none">
				<path d="M30 95 L10 30 Q30 35 50 30 L30 95Z" fill="url(#bagGradient)" />
				<ellipse cx="30" cy="30" rx="22" ry="8" fill="#FFF8E1" />
				<circle cx="30" cy="95" r="6" fill="#FFF8E1" />
				<defs>
					<linearGradient id="bagGradient" x1="10" y1="30" x2="50" y2="95">
						<stop stop-color="#FFD1DC" />
						<stop offset="1" stop-color="#FFB6C1" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const heroRef = ref(null)
const textRef = ref(null)
const cakeRef = ref(null)

onMounted(() => {
	// Add entrance animations
	setTimeout(() => {
		if (textRef.value) {
			textRef.value.classList.add('animate-in')
		}
	}, 100)

	setTimeout(() => {
		if (cakeRef.value) {
			cakeRef.value.classList.add('animate-in')
		}
	}, 300)
})
</script>

<style scoped>
.hero {
	position: relative;
	min-height: 100vh;
	display: flex;
	align-items: center;
	padding: 120px 0 80px;
	overflow: hidden;
}

/* Video Background */
.hero__video-bg {
	position: absolute;
	inset: 0;
	z-index: -1;
}

.video-overlay {
	position: absolute;
	inset: 0;
	background: linear-gradient(
		135deg,
		rgba(255, 251, 245, 0.95) 0%,
		rgba(255, 248, 225, 0.9) 50%,
		rgba(255, 209, 220, 0.85) 100%
	);
	z-index: 1;
}

.video-placeholder {
	position: absolute;
	inset: 0;
	background: var(--bg-primary);
	overflow: hidden;
}

.gradient-orb {
	position: absolute;
	border-radius: 50%;
	filter: blur(80px);
	opacity: 0.6;
	animation: orbFloat 20s ease-in-out infinite;
}

.gradient-orb--1 {
	width: 600px;
	height: 600px;
	background: var(--color-primary-start);
	top: -200px;
	right: -100px;
	animation-delay: 0s;
}

.gradient-orb--2 {
	width: 400px;
	height: 400px;
	background: var(--color-cream);
	bottom: -100px;
	left: -100px;
	animation-delay: -7s;
}

.gradient-orb--3 {
	width: 300px;
	height: 300px;
	background: var(--color-gold);
	top: 50%;
	left: 50%;
	opacity: 0.3;
	animation-delay: -14s;
}

@keyframes orbFloat {
	0%,
	100% {
		transform: translate(0, 0) scale(1);
	}
	25% {
		transform: translate(50px, -30px) scale(1.1);
	}
	50% {
		transform: translate(-30px, 50px) scale(0.9);
	}
	75% {
		transform: translate(-50px, -20px) scale(1.05);
	}
}

/* Content */
.hero__content {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-3xl);
	align-items: center;
	position: relative;
	z-index: 2;
}

/* Text */
.hero__text {
	opacity: 0;
	transform: translateY(40px);
	transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero__text.animate-in {
	opacity: 1;
	transform: translateY(0);
}

.hero__badge {
	display: inline-block;
	padding: var(--space-sm) var(--space-md);
	background: var(--bg-card);
	border-radius: var(--radius-full);
	font-size: var(--text-sm);
	font-weight: 600;
	color: var(--color-chocolate);
	box-shadow: var(--shadow-sm);
	margin-bottom: var(--space-lg);
}

.hero__title {
	font-size: clamp(3rem, 8vw, 5.5rem);
	line-height: 1.1;
	margin-bottom: var(--space-lg);
}

.title-line {
	display: block;
}

.title-line--accent {
	background: linear-gradient(
		135deg,
		var(--color-gold) 0%,
		var(--color-gold-dark) 100%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.hero__subtitle {
	font-size: var(--text-lg);
	color: var(--color-chocolate-light);
	max-width: 500px;
	margin-bottom: var(--space-xl);
}

/* Actions */
.hero__actions {
	display: flex;
	gap: var(--space-md);
	margin-bottom: var(--space-2xl);
	flex-wrap: wrap;
}

.btn-cta {
	position: relative;
	display: inline-flex;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-lg) var(--space-2xl);
	background: linear-gradient(
		135deg,
		var(--color-gold) 0%,
		var(--color-gold-dark) 100%
	);
	color: white;
	font-weight: 700;
	font-size: var(--text-lg);
	text-decoration: none;
	border-radius: var(--radius-full);
	overflow: hidden;
	transition: all var(--transition-base);
	box-shadow: var(--shadow-gold);
}

.btn-cta:hover {
	transform: translateY(-3px) scale(1.02);
	box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
	color: white;
}

.btn-cream {
	position: absolute;
	top: 0;
	left: -100%;
	width: 50%;
	height: 100%;
	background: linear-gradient(
		90deg,
		transparent,
		rgba(255, 255, 255, 0.4),
		transparent
	);
	transform: skewX(-20deg);
	transition: left 0.6s ease;
}

.btn-cta:hover .btn-cream {
	left: 150%;
}

.btn-icon {
	font-size: 1.2em;
}

/* Stats */
.hero__stats {
	display: flex;
	align-items: center;
	gap: var(--space-lg);
	padding: var(--space-lg);
	background: var(--bg-card);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-md);
	width: fit-content;
}

.stat-item {
	text-align: center;
}

.stat-number {
	display: block;
	font-family: var(--font-elegant);
	font-size: var(--text-2xl);
	font-weight: 700;
	color: var(--color-gold-dark);
	line-height: 1;
}

.stat-label {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

.stat-divider {
	width: 1px;
	height: 40px;
	background: var(--color-cream-dark);
}

/* Cake */
.hero__cake {
	position: relative;
	opacity: 0;
	transform: translateY(40px) scale(0.9);
	transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	transition-delay: 0.2s;
}

.hero__cake.animate-in {
	opacity: 1;
	transform: translateY(0) scale(1);
}

.cake-scene {
	position: relative;
	width: 100%;
	max-width: 400px;
	aspect-ratio: 1;
	margin: 0 auto;
}

.cake-model {
	position: absolute;
	bottom: 10%;
	left: 50%;
	transform: translateX(-50%);
	animation: cakeFloat 4s ease-in-out infinite;
}

@keyframes cakeFloat {
	0%,
	100% {
		transform: translateX(-50%) translateY(0) rotate(-2deg);
	}
	50% {
		transform: translateX(-50%) translateY(-15px) rotate(2deg);
	}
}

/* Cake Tiers */
.cake-tier {
	position: relative;
	border-radius: 50% / 20%;
	margin: 0 auto;
}

.cake-tier--bottom {
	width: 200px;
	height: 80px;
	background: linear-gradient(180deg, #ffe4e1 0%, #ffd1dc 100%);
	box-shadow: 0 10px 30px rgba(255, 182, 193, 0.4);
}

.cake-tier--middle {
	width: 160px;
	height: 70px;
	background: linear-gradient(180deg, #fff8e1 0%, #f5e6c8 100%);
	margin-top: -10px;
	box-shadow: 0 8px 25px rgba(245, 230, 200, 0.4);
}

.cake-tier--top {
	width: 120px;
	height: 60px;
	background: linear-gradient(180deg, #ffb6c1 0%, #ff9aa2 100%);
	margin-top: -8px;
	box-shadow: 0 6px 20px rgba(255, 182, 193, 0.4);
}

.tier-frosting {
	position: absolute;
	top: -8px;
	left: 5%;
	right: 5%;
	height: 12px;
	background: #fff8e1;
	border-radius: 50%;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tier-drip {
	position: absolute;
	top: 0;
	width: 12px;
	background: linear-gradient(
		180deg,
		#fff8e1 0%,
		rgba(255, 248, 225, 0.8) 100%
	);
	border-radius: 0 0 6px 6px;
	animation: drip 3s ease-in-out infinite;
}

.tier-drip--1 {
	left: 15%;
	height: 25px;
	animation-delay: 0s;
}
.tier-drip--2 {
	left: 35%;
	height: 35px;
	animation-delay: 0.5s;
}
.tier-drip--3 {
	right: 35%;
	height: 30px;
	animation-delay: 1s;
}
.tier-drip--4 {
	right: 15%;
	height: 20px;
	animation-delay: 1.5s;
}
.tier-drip--5 {
	left: 50%;
	height: 28px;
	animation-delay: 2s;
	transform: translateX(-50%);
}

@keyframes drip {
	0%,
	100% {
		transform: scaleY(1);
	}
	50% {
		transform: scaleY(1.2);
	}
}

/* Decorations */
.cake-decorations {
	position: absolute;
	top: -30px;
	left: 50%;
	transform: translateX(-50%);
	width: 120px;
	height: 60px;
}

.decoration {
	position: absolute;
	font-size: 1.5rem;
	animation: decorBounce 2s ease-in-out infinite;
}

.decoration--1 {
	top: 0;
	left: 10%;
	animation-delay: 0s;
}
.decoration--2 {
	top: 5px;
	right: 10%;
	animation-delay: 0.3s;
}
.decoration--3 {
	top: -10px;
	left: 50%;
	transform: translateX(-50%);
	animation-delay: 0.6s;
}
.decoration--4 {
	top: 15px;
	left: 30%;
	animation-delay: 0.9s;
}
.decoration--5 {
	top: -5px;
	right: 25%;
	animation-delay: 1.2s;
}

@keyframes decorBounce {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-5px);
	}
}

/* Floating elements */
.floating-elements {
	position: absolute;
	inset: 0;
	pointer-events: none;
}

.float-item {
	position: absolute;
	font-size: 2rem;
	animation: floatAround 8s ease-in-out infinite;
}

.float-item--1 {
	top: 10%;
	right: 10%;
	animation-delay: 0s;
}
.float-item--2 {
	bottom: 20%;
	left: 5%;
	animation-delay: 2s;
}
.float-item--3 {
	top: 30%;
	left: 10%;
	animation-delay: 4s;
}
.float-item--4 {
	bottom: 10%;
	right: 15%;
	animation-delay: 6s;
}

@keyframes floatAround {
	0%,
	100% {
		transform: translate(0, 0) rotate(0deg);
		opacity: 0.8;
	}
	25% {
		transform: translate(10px, -20px) rotate(10deg);
		opacity: 1;
	}
	50% {
		transform: translate(-10px, -10px) rotate(-5deg);
		opacity: 0.9;
	}
	75% {
		transform: translate(5px, 10px) rotate(5deg);
		opacity: 1;
	}
}

/* Customize badge */
.customize-badge {
	position: absolute;
	bottom: 5%;
	right: 10%;
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-sm) var(--space-md);
	background: var(--bg-card);
	border-radius: var(--radius-full);
	box-shadow: var(--shadow-md);
	animation: badgePulse 2s ease-in-out infinite;
}

.badge-icon {
	font-size: 1.2rem;
}

.badge-text {
	font-weight: 600;
	font-size: var(--text-sm);
	color: var(--color-chocolate);
}

@keyframes badgePulse {
	0%,
	100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
}

/* Scroll indicator */
.hero__scroll {
	position: absolute;
	bottom: var(--space-xl);
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-sm);
	color: var(--color-chocolate-light);
	font-size: var(--text-sm);
	animation: scrollBounce 2s ease-in-out infinite;
}

.scroll-icon {
	animation: scrollArrow 2s ease-in-out infinite;
}

@keyframes scrollBounce {
	0%,
	100% {
		transform: translateX(-50%) translateY(0);
	}
	50% {
		transform: translateX(-50%) translateY(10px);
	}
}

@keyframes scrollArrow {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}

/* Tools decoration */
.hero__tools {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	width: 200px;
	pointer-events: none;
	opacity: 0.3;
	overflow: hidden;
}

.tool {
	position: absolute;
	width: 60px;
	animation: toolFloat 6s ease-in-out infinite;
}

.tool--whisk {
	top: 20%;
	right: 30px;
	animation-delay: 0s;
}

.tool--bag {
	bottom: 30%;
	right: 60px;
	animation-delay: 3s;
}

@keyframes toolFloat {
	0%,
	100% {
		transform: translateY(0) rotate(0deg);
	}
	50% {
		transform: translateY(-30px) rotate(10deg);
	}
}

/* Responsive */
@media (max-width: 992px) {
	.hero__content {
		grid-template-columns: 1fr;
		text-align: center;
	}

	.hero__subtitle {
		margin-left: auto;
		margin-right: auto;
	}

	.hero__actions {
		justify-content: center;
	}

	.hero__stats {
		margin: 0 auto;
	}

	.hero__cake {
		order: -1;
		margin-bottom: var(--space-xl);
	}

	.cake-scene {
		max-width: 300px;
	}

	.hero__tools {
		display: none;
	}
}

@media (max-width: 576px) {
	.hero {
		padding: 100px 0 60px;
	}

	.hero__stats {
		flex-direction: column;
		gap: var(--space-md);
	}

	.stat-divider {
		width: 60px;
		height: 1px;
	}

	.hero__actions {
		flex-direction: column;
		width: 100%;
	}

	.btn-cta,
	.btn-secondary {
		width: 100%;
		justify-content: center;
	}

	.cake-model {
		transform: translateX(-50%) scale(0.8);
	}
}
</style>
