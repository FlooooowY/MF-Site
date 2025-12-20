<template>
	<Transition name="mobile-nav">
		<div v-if="isOpen" class="mobile-nav">
			<div class="mobile-nav__overlay" @click="$emit('close')"></div>

			<div class="mobile-nav__content">
				<!-- Close Button -->
				<button
					class="mobile-nav__close"
					@click="$emit('close')"
					aria-label="Закрыть меню"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>

				<!-- Logo -->
				<div class="mobile-nav__logo">
					<svg
						viewBox="0 0 60 60"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="30" cy="35" r="20" fill="url(#mobileNavCakeGradient)" />
						<ellipse
							cx="30"
							cy="20"
							rx="22"
							ry="8"
							fill="url(#mobileNavCreamGradient)"
						/>
						<circle cx="22" cy="17" r="3" fill="#E57373" />
						<circle cx="30" cy="14" r="3" fill="#E57373" />
						<circle cx="38" cy="17" r="3" fill="#E57373" />
						<defs>
							<linearGradient
								id="mobileNavCakeGradient"
								x1="10"
								y1="35"
								x2="50"
								y2="35"
							>
								<stop stop-color="#FFD1DC" />
								<stop offset="1" stop-color="#FFB6C1" />
							</linearGradient>
							<linearGradient
								id="mobileNavCreamGradient"
								x1="8"
								y1="20"
								x2="52"
								y2="20"
							>
								<stop stop-color="#FFF8E1" />
								<stop offset="1" stop-color="#F5E6C8" />
							</linearGradient>
						</defs>
					</svg>
					<span>Sweet Dreams</span>
				</div>

				<!-- Navigation Links -->
				<nav class="mobile-nav__links">
					<router-link
						v-for="(link, index) in navLinks"
						:key="link.path"
						:to="link.path"
						class="mobile-nav__link"
						:style="{ animationDelay: `${index * 0.1}s` }"
						@click="$emit('close')"
					>
						<span class="link-icon">{{ link.icon }}</span>
						<span class="link-text">{{ link.name }}</span>
						<svg
							class="link-arrow"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<polyline points="9 18 15 12 9 6" />
						</svg>
					</router-link>
				</nav>

				<!-- Constructor CTA -->
				<div class="mobile-nav__cta">
					<router-link
						to="/constructor"
						class="cta-button"
						@click="$emit('close')"
					>
						<span>✨</span>
						Создать свой торт
					</router-link>
				</div>

				<!-- Contact Info -->
				<div class="mobile-nav__contact">
					<a href="tel:+79001234567" class="contact-link">
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
						+7 900 123-45-67
					</a>
					<p class="work-hours">Ежедневно с 9:00 до 21:00</p>
				</div>

				<!-- Social Links -->
				<div class="mobile-nav__socials">
					<a href="#" class="social-link" aria-label="Instagram">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
							<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
							<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
						</svg>
					</a>
					<a href="#" class="social-link" aria-label="Telegram">
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
							/>
						</svg>
					</a>
					<a href="#" class="social-link" aria-label="WhatsApp">
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
defineProps({
	isOpen: Boolean,
})

defineEmits(['close'])

const navLinks = [
	{ path: '/', name: 'Главная', icon: '🏠' },
	{ path: '/catalog/cakes', name: 'Торты', icon: '🎂' },
	{ path: '/catalog/cupcakes', name: 'Капкейки', icon: '🧁' },
	{ path: '/catalog/pastries', name: 'Пирожные', icon: '🍰' },
	{ path: '/catalog/macarons', name: 'Макаронс', icon: '🍪' },
]
</script>

<style scoped>
.mobile-nav {
	position: fixed;
	inset: 0;
	z-index: var(--z-modal);
}

.mobile-nav__overlay {
	position: absolute;
	inset: 0;
	background: rgba(74, 44, 42, 0.5);
	backdrop-filter: blur(4px);
}

.mobile-nav__content {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: min(85vw, 360px);
	background: var(--bg-primary);
	padding: var(--space-xl);
	display: flex;
	flex-direction: column;
	overflow-y: auto;
}

.mobile-nav__close {
	position: absolute;
	top: var(--space-lg);
	right: var(--space-lg);
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--bg-card);
	border: none;
	border-radius: var(--radius-full);
	cursor: pointer;
	color: var(--color-chocolate);
	transition: all var(--transition-base);
	box-shadow: var(--shadow-sm);
}

.mobile-nav__close:hover {
	background: var(--color-primary-start);
	transform: rotate(90deg);
}

.mobile-nav__logo {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	margin-bottom: var(--space-2xl);
}

.mobile-nav__logo svg {
	width: 50px;
	height: 50px;
}

.mobile-nav__logo span {
	font-family: var(--font-script);
	font-size: var(--text-2xl);
	color: var(--color-chocolate);
}

.mobile-nav__links {
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
	margin-bottom: var(--space-xl);
}

.mobile-nav__link {
	display: flex;
	align-items: center;
	gap: var(--space-md);
	padding: var(--space-md);
	background: var(--bg-card);
	border-radius: var(--radius-md);
	text-decoration: none;
	color: var(--color-chocolate);
	font-weight: 600;
	transition: all var(--transition-base);
	box-shadow: var(--shadow-sm);
	animation: slideInRight 0.4s ease-out backwards;
}

.mobile-nav__link:hover,
.mobile-nav__link.router-link-active {
	background: var(--color-primary-gradient);
	transform: translateX(-8px);
}

.link-icon {
	font-size: 1.5rem;
}

.link-text {
	flex: 1;
}

.link-arrow {
	opacity: 0.5;
	transition: transform var(--transition-base);
}

.mobile-nav__link:hover .link-arrow {
	transform: translateX(4px);
	opacity: 1;
}

.mobile-nav__cta {
	margin-bottom: var(--space-xl);
}

.cta-button {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--space-sm);
	width: 100%;
	padding: var(--space-lg);
	background: linear-gradient(
		135deg,
		var(--color-gold) 0%,
		var(--color-gold-dark) 100%
	);
	color: white;
	font-weight: 700;
	text-decoration: none;
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-gold);
	transition: all var(--transition-base);
}

.cta-button:hover {
	transform: scale(1.02);
	color: white;
}

.mobile-nav__contact {
	text-align: center;
	margin-bottom: var(--space-xl);
	padding: var(--space-lg);
	background: var(--bg-secondary);
	border-radius: var(--radius-lg);
}

.contact-link {
	display: inline-flex;
	align-items: center;
	gap: var(--space-sm);
	font-size: var(--text-lg);
	font-weight: 700;
	color: var(--color-chocolate);
	text-decoration: none;
	margin-bottom: var(--space-sm);
}

.work-hours {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin: 0;
}

.mobile-nav__socials {
	display: flex;
	justify-content: center;
	gap: var(--space-md);
	margin-top: auto;
}

.social-link {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	background: var(--bg-card);
	border-radius: var(--radius-full);
	color: var(--color-chocolate);
	transition: all var(--transition-base);
	box-shadow: var(--shadow-sm);
}

.social-link svg {
	width: 22px;
	height: 22px;
}

.social-link:hover {
	background: var(--color-chocolate);
	color: var(--color-cream);
	transform: translateY(-3px);
}

/* Transitions */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
	transition: opacity 0.3s ease;
}

.mobile-nav-enter-active .mobile-nav__content,
.mobile-nav-leave-active .mobile-nav__content {
	transition: transform 0.3s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
	opacity: 0;
}

.mobile-nav-enter-from .mobile-nav__content,
.mobile-nav-leave-to .mobile-nav__content {
	transform: translateX(100%);
}

@keyframes slideInRight {
	from {
		opacity: 0;
		transform: translateX(30px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>
