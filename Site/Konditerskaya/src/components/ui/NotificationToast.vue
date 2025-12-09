<template>
	<Transition name="toast">
		<div
			v-if="show"
			class="notification-toast"
			:class="`notification-toast--${type}`"
		>
			<span class="toast-icon">
				<template v-if="type === 'success'">✓</template>
				<template v-else-if="type === 'error'">✕</template>
				<template v-else>ℹ</template>
			</span>
			<span class="toast-message">{{ message }}</span>
			<button class="toast-close" @click="$emit('close')" aria-label="Закрыть">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		</div>
	</Transition>
</template>

<script setup>
defineProps({
	show: Boolean,
	message: {
		type: String,
		default: '',
	},
	type: {
		type: String,
		default: 'success',
		validator: v => ['success', 'error', 'info'].includes(v),
	},
})

defineEmits(['close'])
</script>

<style scoped>
.notification-toast {
	position: fixed;
	top: 100px;
	right: var(--space-xl);
	display: flex;
	align-items: center;
	gap: var(--space-md);
	padding: var(--space-md) var(--space-lg);
	background: var(--bg-card);
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-lg);
	z-index: var(--z-notification);
	max-width: 400px;
}

.notification-toast--success {
	border-left: 4px solid var(--color-success);
}

.notification-toast--error {
	border-left: 4px solid var(--color-error);
}

.notification-toast--info {
	border-left: 4px solid var(--color-gold);
}

.toast-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	border-radius: var(--radius-full);
	font-size: 14px;
	font-weight: 700;
	flex-shrink: 0;
}

.notification-toast--success .toast-icon {
	background: rgba(139, 195, 74, 0.2);
	color: var(--color-success);
}

.notification-toast--error .toast-icon {
	background: rgba(229, 115, 115, 0.2);
	color: var(--color-error);
}

.notification-toast--info .toast-icon {
	background: rgba(212, 175, 55, 0.2);
	color: var(--color-gold);
}

.toast-message {
	flex: 1;
	font-weight: 500;
	color: var(--color-chocolate);
}

.toast-close {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	background: none;
	border: none;
	cursor: pointer;
	color: var(--color-chocolate-light);
	opacity: 0.6;
	transition: opacity var(--transition-fast);
}

.toast-close:hover {
	opacity: 1;
}

/* Transition */
.toast-enter-active,
.toast-leave-active {
	transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
	opacity: 0;
	transform: translateX(50px);
}

@media (max-width: 576px) {
	.notification-toast {
		top: auto;
		bottom: var(--space-lg);
		right: var(--space-md);
		left: var(--space-md);
		max-width: none;
	}
}
</style>
