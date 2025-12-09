<script setup lang="ts">
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
	{ label: 'Услуги', href: '#services' },
	{ label: 'Галерея', href: '#gallery' },
	{ label: 'Калькулятор', href: '#calculator' },
	{ label: 'О нас', href: '#about' },
	{ label: 'Контакты', href: '#contacts' },
]

onMounted(() => {
	window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
	isScrolled.value = window.scrollY > 50
}

function toggleMobileMenu() {
	isMobileMenuOpen.value = !isMobileMenuOpen.value
	document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

function closeMobileMenu() {
	isMobileMenuOpen.value = false
	document.body.style.overflow = ''
}
</script>

<template>
	<header class="header" :class="{ 'header--scrolled': isScrolled }">
		<div class="header__container container">
			<!-- Logo -->
			<NuxtLink to="/" class="header__logo" @click="closeMobileMenu">
				<svg class="header__logo-icon" viewBox="0 0 40 40" fill="none">
					<path
						d="M20 4L36 12V28L20 36L4 28V12L20 4Z"
						stroke="currentColor"
						stroke-width="2"
					/>
					<path
						d="M20 4V36M4 12L36 28M36 12L4 28"
						stroke="currentColor"
						stroke-width="1.5"
						opacity="0.5"
					/>
				</svg>
				<span class="header__logo-text">
					<span class="header__logo-main">APEX</span>
					<span class="header__logo-sub">DETAILING</span>
				</span>
			</NuxtLink>

			<!-- Desktop Navigation -->
			<nav class="header__nav">
				<a
					v-for="item in navItems"
					:key="item.href"
					:href="item.href"
					class="header__nav-item"
				>
					{{ item.label }}
				</a>
			</nav>

			<!-- Phone -->
			<a href="tel:+74951234567" class="header__phone">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
					/>
				</svg>
				<span>+7 (495) 123-45-67</span>
			</a>

			<!-- Mobile Menu Button -->
			<button
				class="header__burger"
				:class="{ 'header__burger--active': isMobileMenuOpen }"
				@click="toggleMobileMenu"
				aria-label="Меню"
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>

		<!-- Mobile Menu -->
		<Transition name="mobile-menu">
			<div v-if="isMobileMenuOpen" class="header__mobile-menu">
				<nav class="header__mobile-nav">
					<a
						v-for="item in navItems"
						:key="item.href"
						:href="item.href"
						class="header__mobile-nav-item"
						@click="closeMobileMenu"
					>
						{{ item.label }}
					</a>
				</nav>
				<a href="tel:+74951234567" class="btn btn-neon header__mobile-cta">
					<span>Позвонить</span>
				</a>
			</div>
		</Transition>
	</header>
</template>

<style lang="scss" scoped>
.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: $z-sticky;
	padding: $space-md 0;
	transition: all $transition-normal $ease-smooth;

	&--scrolled {
		@include glass-effect;
		padding: $space-sm 0;
	}

	&__container {
		@include flex-between;
		gap: $space-lg;
	}

	&__logo {
		display: flex;
		align-items: center;
		gap: $space-sm;
		color: $platinum-white;
		text-decoration: none;

		&-icon {
			width: 40px;
			height: 40px;
			color: $electric-blue;
		}

		&-text {
			display: flex;
			flex-direction: column;
			line-height: 1;
		}

		&-main {
			font-family: $font-display;
			font-size: 24px;
			letter-spacing: 2px;
		}

		&-sub {
			font-family: $font-tech;
			font-size: 10px;
			letter-spacing: 3px;
			color: $electric-blue;
		}
	}

	&__nav {
		display: flex;
		gap: $space-lg;

		@include respond-below('lg') {
			display: none;
		}

		&-item {
			position: relative;
			font-family: $font-body;
			font-size: 14px;
			font-weight: 500;
			color: $platinum-muted;
			text-decoration: none;
			text-transform: uppercase;
			letter-spacing: 1px;
			padding: $space-xs 0;
			transition: color $transition-fast ease;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 0;
				height: 2px;
				background: $electric-blue;
				box-shadow: 0 0 10px $electric-blue;
				transform: translateX(-50%);
				transition: width $transition-fast ease;
			}

			&:hover {
				color: $platinum-white;

				&::after {
					width: 100%;
				}
			}
		}
	}

	&__phone {
		display: flex;
		align-items: center;
		gap: $space-xs;
		font-family: $font-body;
		font-size: 14px;
		font-weight: 500;
		color: $platinum-white;
		text-decoration: none;
		transition: color $transition-fast ease;

		@include respond-below('md') {
			display: none;
		}

		svg {
			color: $electric-blue;
		}

		&:hover {
			color: $electric-blue;
		}
	}

	&__burger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		width: 32px;
		height: 32px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;

		@include respond-below('lg') {
			display: flex;
		}

		span {
			display: block;
			width: 100%;
			height: 2px;
			background: $platinum-white;
			transition: all $transition-fast ease;
		}

		&--active {
			span:nth-child(1) {
				transform: translateY(8px) rotate(45deg);
			}
			span:nth-child(2) {
				opacity: 0;
			}
			span:nth-child(3) {
				transform: translateY(-8px) rotate(-45deg);
			}
		}
	}

	&__mobile-menu {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: $deep-space;
		padding: 100px $space-md $space-xl;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: $space-2xl;
	}

	&__mobile-nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: $space-lg;

		&-item {
			font-family: $font-display;
			font-size: 32px;
			color: $platinum-white;
			text-decoration: none;
			text-transform: uppercase;
			letter-spacing: 2px;
			transition: color $transition-fast ease;

			&:hover {
				color: $electric-blue;
			}
		}
	}

	&__mobile-cta {
		width: 100%;
		max-width: 300px;
		text-align: center;
	}
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
	transition: opacity $transition-normal ease, transform $transition-normal ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}
</style>
