<template>
	<Transition name="slide-up">
		<div class="cookie-banner">
			<div class="cookie-banner__content">
				<span class="cookie-icon">🍪</span>
				<div class="cookie-text">
					<p>
						Мы используем файлы cookie, чтобы сделать ваш опыт ещё слаще!
						Продолжая использовать сайт, вы соглашаетесь с нашей
						<a href="#">политикой конфиденциальности</a>.
					</p>
				</div>
				<button class="cookie-btn" @click="$emit('accept')">Принять</button>
			</div>
		</div>
	</Transition>
</template>

<script setup>
defineEmits(['accept'])
</script>

<style scoped>
.cookie-banner {
	position: fixed;
	bottom: var(--space-lg);
	left: 50%;
	transform: translateX(-50%);
	z-index: var(--z-notification);
	width: calc(100% - var(--space-xl) * 2);
	max-width: 600px;
}

.cookie-banner__content {
	display: flex;
	align-items: center;
	gap: var(--space-md);
	padding: var(--space-md) var(--space-lg);
	background: var(--bg-card);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-xl);
}

.cookie-icon {
	font-size: 2rem;
	flex-shrink: 0;
}

.cookie-text {
	flex: 1;
}

.cookie-text p {
	margin: 0;
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	line-height: 1.5;
}

.cookie-text a {
	color: var(--color-gold);
	text-decoration: underline;
}

.cookie-btn {
	padding: var(--space-sm) var(--space-lg);
	background: var(--color-primary-gradient);
	color: var(--color-chocolate);
	font-weight: 600;
	border: none;
	border-radius: var(--radius-full);
	cursor: pointer;
	white-space: nowrap;
	transition: all var(--transition-base);
}

.cookie-btn:hover {
	transform: scale(1.05);
	box-shadow: var(--shadow-md);
}

/* Transition */
.slide-up-enter-active,
.slide-up-leave-active {
	transition: all 0.4s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
	opacity: 0;
	transform: translateX(-50%) translateY(100%);
}

@media (max-width: 576px) {
	.cookie-banner__content {
		flex-direction: column;
		text-align: center;
	}

	.cookie-btn {
		width: 100%;
	}
}
</style>
