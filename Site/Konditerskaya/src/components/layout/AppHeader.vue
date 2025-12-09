<template>
	<header class="header" :class="{ 'header--scrolled': isScrolled }">
		<div class="header__container container">
			<!-- Logo -->
			<router-link to="/" class="header__logo">
				<div class="logo-icon">
					<svg
						viewBox="0 0 60 60"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="30" cy="35" r="20" fill="url(#cakeGradient)" />
						<ellipse
							cx="30"
							cy="20"
							rx="22"
							ry="8"
							fill="url(#creamGradient)"
						/>
						<circle cx="22" cy="17" r="3" fill="#E57373" />
						<circle cx="30" cy="14" r="3" fill="#E57373" />
						<circle cx="38" cy="17" r="3" fill="#E57373" />
						<defs>
							<linearGradient id="cakeGradient" x1="10" y1="35" x2="50" y2="35">
								<stop stop-color="#FFD1DC" />
								<stop offset="1" stop-color="#FFB6C1" />
							</linearGradient>
							<linearGradient id="creamGradient" x1="8" y1="20" x2="52" y2="20">
								<stop stop-color="#FFF8E1" />
								<stop offset="1" stop-color="#F5E6C8" />
							</linearGradient>
						</defs>
					</svg>
				</div>
				<span class="logo-text">Sweet Dreams</span>
			</router-link>

			<!-- Desktop Navigation -->
			<nav class="header__nav hide-mobile">
				<router-link to="/" class="nav-link" active-class="active"
					>Главная</router-link
				>
				<router-link to="/catalog/cakes" class="nav-link" active-class="active"
					>Торты</router-link
				>
				<router-link
					to="/catalog/cupcakes"
					class="nav-link"
					active-class="active"
					>Капкейки</router-link
				>
				<router-link
					to="/catalog/pastries"
					class="nav-link"
					active-class="active"
					>Пирожные</router-link
				>
				<router-link
					to="/constructor"
					class="nav-link nav-link--highlight"
					active-class="active"
				>
					<span class="sparkle">✨</span>
					Конструктор
				</router-link>
			</nav>

			<!-- Actions -->
			<div class="header__actions">
				<!-- Phone -->
				<a href="tel:+79001234567" class="header__phone hide-mobile">
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
						/>
					</svg>
					<span>+7 900 123-45-67</span>
				</a>

				<!-- Cart Button -->
				<button
					class="header__cart"
					@click="$emit('openCart')"
					aria-label="Корзина"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<circle cx="9" cy="21" r="1" />
						<circle cx="20" cy="21" r="1" />
						<path
							d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
						/>
					</svg>
					<span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
				</button>

				<!-- Mobile Menu Button -->
				<button
					class="header__burger"
					@click="$emit('toggleMenu')"
					aria-label="Меню"
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
		</div>
	</header>
</template>

<script setup>
defineProps({
	isScrolled: Boolean,
	cartCount: {
		type: Number,
		default: 0,
	},
})

defineEmits(['toggleMenu', 'openCart'])
</script>

<style scoped>
.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: var(--z-sticky);
	padding: var(--space-md) 0;
	transition: all var(--transition-base);
}

.header--scrolled {
	background: rgba(255, 251, 245, 0.95);
	backdrop-filter: blur(10px);
	box-shadow: var(--shadow-md);
	padding: var(--space-sm) 0;
}

.header__container {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

/* Logo */
.header__logo {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	text-decoration: none;
}

.logo-icon {
	width: 50px;
	height: 50px;
	transition: transform var(--transition-bounce);
}

.header__logo:hover .logo-icon {
	transform: rotate(-10deg) scale(1.1);
}

.logo-text {
	font-family: var(--font-script);
	font-size: var(--text-2xl);
	color: var(--color-chocolate);
	transition: color var(--transition-base);
}

.header__logo:hover .logo-text {
	color: var(--color-gold);
}

/* Navigation */
.header__nav {
	display: flex;
	align-items: center;
	gap: var(--space-xl);
}

.nav-link {
	position: relative;
	font-weight: 600;
	color: var(--color-chocolate);
	text-decoration: none;
	padding: var(--space-sm) 0;
	transition: color var(--transition-base);
}

.nav-link::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 2px;
	background: var(--color-gold);
	transition: width var(--transition-base);
}

.nav-link:hover,
.nav-link.active {
	color: var(--color-gold);
}

.nav-link:hover::after,
.nav-link.active::after {
	width: 100%;
}

.nav-link--highlight {
	display: flex;
	align-items: center;
	gap: var(--space-xs);
	padding: var(--space-sm) var(--space-md);
	background: var(--color-primary-gradient);
	border-radius: var(--radius-full);
}

.nav-link--highlight::after {
	display: none;
}

.nav-link--highlight:hover {
	color: var(--color-chocolate);
	transform: scale(1.05);
}

.sparkle {
	animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
	0%,
	100% {
		opacity: 1;
		transform: scale(1);
	}
	50% {
		opacity: 0.5;
		transform: scale(1.2);
	}
}

/* Actions */
.header__actions {
	display: flex;
	align-items: center;
	gap: var(--space-lg);
}

.header__phone {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	font-weight: 600;
	color: var(--color-chocolate);
	text-decoration: none;
	transition: color var(--transition-base);
}

.header__phone:hover {
	color: var(--color-gold);
}

.header__cart {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	background: var(--bg-card);
	border: none;
	border-radius: var(--radius-full);
	cursor: pointer;
	transition: all var(--transition-base);
	box-shadow: var(--shadow-sm);
}

.header__cart:hover {
	transform: scale(1.1);
	box-shadow: var(--shadow-md);
}

.header__cart svg {
	color: var(--color-chocolate);
}

.cart-badge {
	position: absolute;
	top: -4px;
	right: -4px;
	min-width: 20px;
	height: 20px;
	padding: 0 6px;
	font-size: 12px;
	font-weight: 700;
	color: white;
	background: var(--color-gold);
	border-radius: var(--radius-full);
	display: flex;
	align-items: center;
	justify-content: center;
	animation: scaleIn 0.3s ease-out;
}

/* Burger Menu */
.header__burger {
	display: none;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
	width: 32px;
	height: 32px;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
}

.header__burger span {
	display: block;
	width: 100%;
	height: 3px;
	background: var(--color-chocolate);
	border-radius: 2px;
	transition: all var(--transition-base);
}

@media (max-width: 992px) {
	.header__burger {
		display: flex;
	}

	.hide-mobile {
		display: none !important;
	}
}

@media (max-width: 576px) {
	.logo-text {
		font-size: var(--text-xl);
	}

	.logo-icon {
		width: 40px;
		height: 40px;
	}
}
</style>
