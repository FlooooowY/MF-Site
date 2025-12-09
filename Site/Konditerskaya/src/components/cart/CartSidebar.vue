<template>
	<Transition name="cart-sidebar">
		<div v-if="isOpen" class="cart-sidebar">
			<div class="cart-overlay" @click="$emit('close')"></div>

			<div class="cart-content">
				<!-- Header -->
				<div class="cart-header">
					<h3>Корзина</h3>
					<button
						class="cart-close"
						@click="$emit('close')"
						aria-label="Закрыть"
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
				</div>

				<!-- Empty State -->
				<div v-if="items.length === 0" class="cart-empty">
					<div class="empty-icon">🛒</div>
					<h4>Корзина пуста</h4>
					<p>Добавьте что-нибудь сладкое!</p>
					<button class="btn-primary" @click="$emit('close')">
						Перейти к каталогу
					</button>
				</div>

				<!-- Cart Items -->
				<div v-else class="cart-items">
					<TransitionGroup name="cart-item">
						<div
							v-for="(item, index) in items"
							:key="item.id + '-' + item.addedAt"
							class="cart-item"
						>
							<div class="item-image">
								<img :src="item.image" :alt="item.name" />
							</div>

							<div class="item-details">
								<h4 class="item-name">{{ item.name }}</h4>
								<p v-if="item.options" class="item-options">
									{{ formatOptions(item.options) }}
								</p>
								<div class="item-price text-elegant">
									{{ formatPrice(item.price * item.quantity) }} ₽
								</div>
							</div>

							<div class="item-actions">
								<div class="quantity-control">
									<button
										class="qty-btn"
										@click="$emit('updateQuantity', index, item.quantity - 1)"
										aria-label="Уменьшить"
									>
										−
									</button>
									<span class="qty-value">{{ item.quantity }}</span>
									<button
										class="qty-btn"
										@click="$emit('updateQuantity', index, item.quantity + 1)"
										aria-label="Увеличить"
									>
										+
									</button>
								</div>

								<button
									class="remove-btn"
									@click="$emit('removeItem', index)"
									aria-label="Удалить"
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<polyline points="3 6 5 6 21 6" />
										<path
											d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
										/>
									</svg>
								</button>
							</div>
						</div>
					</TransitionGroup>
				</div>

				<!-- Footer -->
				<div v-if="items.length > 0" class="cart-footer">
					<div class="cart-total">
						<span>Итого:</span>
						<span class="total-price text-elegant"
							>{{ formatPrice(totalPrice) }} ₽</span
						>
					</div>

					<router-link
						to="/cart"
						class="btn-gold checkout-btn"
						@click="$emit('close')"
					>
						Оформить заказ
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="12 5 19 12 12 19" />
						</svg>
					</router-link>

					<p class="delivery-note">🚚 Бесплатная доставка от 3000 ₽</p>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	isOpen: Boolean,
	items: {
		type: Array,
		default: () => [],
	},
})

defineEmits(['close', 'removeItem', 'updateQuantity'])

const totalPrice = computed(() => {
	return props.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

function formatPrice(price) {
	return new Intl.NumberFormat('ru-RU').format(price)
}

function formatOptions(options) {
	if (!options) return ''
	return Object.entries(options)
		.map(([key, value]) => `${value}`)
		.join(' • ')
}
</script>

<style scoped>
.cart-sidebar {
	position: fixed;
	inset: 0;
	z-index: var(--z-modal);
}

.cart-overlay {
	position: absolute;
	inset: 0;
	background: rgba(74, 44, 42, 0.5);
	backdrop-filter: blur(4px);
}

.cart-content {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: min(90vw, 450px);
	background: var(--bg-primary);
	display: flex;
	flex-direction: column;
	box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
}

.cart-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--space-lg) var(--space-xl);
	border-bottom: 1px solid var(--color-cream-dark);
}

.cart-header h3 {
	font-family: var(--font-body);
	font-weight: 700;
	font-size: var(--text-xl);
	margin: 0;
}

.cart-close {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background: var(--bg-card);
	border: none;
	border-radius: var(--radius-full);
	cursor: pointer;
	color: var(--color-chocolate);
	transition: all var(--transition-base);
}

.cart-close:hover {
	background: var(--color-primary-start);
	transform: rotate(90deg);
}

/* Empty State */
.cart-empty {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: var(--space-2xl);
	text-align: center;
}

.empty-icon {
	font-size: 4rem;
	margin-bottom: var(--space-lg);
	animation: float 3s ease-in-out infinite;
}

.cart-empty h4 {
	font-family: var(--font-body);
	font-weight: 700;
	margin-bottom: var(--space-sm);
}

.cart-empty p {
	color: var(--color-chocolate-light);
	margin-bottom: var(--space-xl);
}

/* Cart Items */
.cart-items {
	flex: 1;
	overflow-y: auto;
	padding: var(--space-md);
}

.cart-item {
	display: flex;
	gap: var(--space-md);
	padding: var(--space-md);
	background: var(--bg-card);
	border-radius: var(--radius-md);
	margin-bottom: var(--space-md);
	box-shadow: var(--shadow-sm);
}

.item-image {
	width: 80px;
	height: 80px;
	border-radius: var(--radius-sm);
	overflow: hidden;
	flex-shrink: 0;
}

.item-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.item-details {
	flex: 1;
	min-width: 0;
}

.item-name {
	font-family: var(--font-body);
	font-weight: 600;
	font-size: var(--text-base);
	margin: 0 0 var(--space-xs);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.item-options {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin: 0 0 var(--space-sm);
}

.item-price {
	color: var(--color-gold-dark);
}

.item-actions {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: var(--space-sm);
}

.quantity-control {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	background: var(--bg-secondary);
	border-radius: var(--radius-full);
	padding: var(--space-xs);
}

.qty-btn {
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--bg-card);
	border: none;
	border-radius: var(--radius-full);
	cursor: pointer;
	font-size: 16px;
	font-weight: 600;
	color: var(--color-chocolate);
	transition: all var(--transition-fast);
}

.qty-btn:hover {
	background: var(--color-primary-start);
}

.qty-value {
	min-width: 24px;
	text-align: center;
	font-weight: 600;
}

.remove-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	background: none;
	border: none;
	cursor: pointer;
	color: var(--color-chocolate-light);
	opacity: 0.6;
	transition: all var(--transition-fast);
}

.remove-btn:hover {
	color: var(--color-error);
	opacity: 1;
}

/* Footer */
.cart-footer {
	padding: var(--space-lg) var(--space-xl);
	border-top: 1px solid var(--color-cream-dark);
	background: var(--bg-card);
}

.cart-total {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: var(--space-lg);
	font-size: var(--text-lg);
	font-weight: 600;
}

.total-price {
	font-size: var(--text-2xl);
	color: var(--color-chocolate);
}

.checkout-btn {
	width: 100%;
	text-decoration: none;
	margin-bottom: var(--space-md);
}

.delivery-note {
	text-align: center;
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin: 0;
}

/* Transitions */
.cart-sidebar-enter-active,
.cart-sidebar-leave-active {
	transition: opacity 0.3s ease;
}

.cart-sidebar-enter-active .cart-content,
.cart-sidebar-leave-active .cart-content {
	transition: transform 0.3s ease;
}

.cart-sidebar-enter-from,
.cart-sidebar-leave-to {
	opacity: 0;
}

.cart-sidebar-enter-from .cart-content,
.cart-sidebar-leave-to .cart-content {
	transform: translateX(100%);
}

/* Item transitions */
.cart-item-enter-active,
.cart-item-leave-active {
	transition: all 0.3s ease;
}

.cart-item-enter-from,
.cart-item-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.cart-item-move {
	transition: transform 0.3s ease;
}

@keyframes float {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}
</style>
