<template>
	<div class="cart-page">
		<div class="container">
			<h1>Оформление заказа</h1>

			<div v-if="cart.items.value.length === 0" class="cart-empty">
				<div class="empty-content">
					<span class="empty-icon">🛒</span>
					<h2>Корзина пуста</h2>
					<p>Добавьте что-нибудь сладкое!</p>
					<router-link to="/catalog/cakes" class="btn-primary">
						Перейти в каталог
					</router-link>
				</div>
			</div>

			<div v-else class="cart-layout">
				<!-- Cart Items -->
				<div class="cart-items-section">
					<div class="cart-header">
						<span>Товар</span>
						<span>Цена</span>
						<span>Количество</span>
						<span>Сумма</span>
						<span></span>
					</div>

					<TransitionGroup name="cart-item" tag="div" class="cart-items-list">
						<div
							v-for="(item, index) in cart.items.value"
							:key="item.id + '-' + item.addedAt"
							class="cart-item"
						>
							<div class="item-product">
								<div class="item-image">
									<img :src="item.image" :alt="item.name" />
								</div>
								<div class="item-info">
									<h3>{{ item.name }}</h3>
									<p v-if="item.options" class="item-options">
										{{ formatOptions(item.options) }}
									</p>
								</div>
							</div>

							<div class="item-price text-elegant">
								{{ formatPrice(item.price) }} ₽
							</div>

							<div class="item-quantity">
								<button
									class="qty-btn"
									@click="cart.updateQuantity(index, item.quantity - 1)"
								>
									−
								</button>
								<span class="qty-value">{{ item.quantity }}</span>
								<button
									class="qty-btn"
									@click="cart.updateQuantity(index, item.quantity + 1)"
								>
									+
								</button>
							</div>

							<div class="item-total text-elegant">
								{{ formatPrice(item.price * item.quantity) }} ₽
							</div>

							<button class="item-remove" @click="cart.removeFromCart(index)">
								<svg
									width="18"
									height="18"
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
					</TransitionGroup>
				</div>

				<!-- Order Form -->
				<div class="order-section">
					<div class="order-summary">
						<h3>Ваш заказ</h3>

						<div class="summary-rows">
							<div class="summary-row">
								<span>Товары ({{ totalItems }})</span>
								<span>{{ formatPrice(subtotal) }} ₽</span>
							</div>
							<div class="summary-row">
								<span>Доставка</span>
								<span>{{
									deliveryCost > 0
										? formatPrice(deliveryCost) + ' ₽'
										: 'Бесплатно'
								}}</span>
							</div>
							<div v-if="discount > 0" class="summary-row discount">
								<span>Скидка</span>
								<span>-{{ formatPrice(discount) }} ₽</span>
							</div>
						</div>

						<div class="summary-total">
							<span>Итого:</span>
							<span class="total-value text-elegant"
								>{{ formatPrice(total) }} ₽</span
							>
						</div>

						<div v-if="subtotal < 3000" class="free-delivery-hint">
							<span>🚚</span>
							До бесплатной доставки: {{ formatPrice(3000 - subtotal) }} ₽
						</div>
					</div>

					<!-- Checkout Form -->
					<form @submit.prevent="submitOrder" class="checkout-form">
						<h3>Контактные данные</h3>

						<div class="form-group">
							<label for="checkout-name">Ваше имя *</label>
							<input
								type="text"
								id="checkout-name"
								v-model="order.name"
								placeholder="Как вас зовут?"
								required
							/>
						</div>

						<div class="form-group">
							<label for="checkout-phone">Телефон *</label>
							<input
								type="tel"
								id="checkout-phone"
								v-model="order.phone"
								placeholder="+7 (___) ___-__-__"
								required
							/>
						</div>

						<div class="form-group">
							<label for="checkout-email">Email</label>
							<input
								type="email"
								id="checkout-email"
								v-model="order.email"
								placeholder="email@example.com"
							/>
						</div>

						<h3>Доставка</h3>

						<div class="delivery-options">
							<label class="delivery-option">
								<input
									type="radio"
									name="delivery"
									value="delivery"
									v-model="order.deliveryType"
								/>
								<span class="option-content">
									<span class="option-icon">🚗</span>
									<span class="option-info">
										<span class="option-title">Доставка</span>
										<span class="option-desc">{{
											subtotal >= 3000 ? 'Бесплатно' : 'от 500 ₽'
										}}</span>
									</span>
								</span>
							</label>

							<label class="delivery-option">
								<input
									type="radio"
									name="delivery"
									value="pickup"
									v-model="order.deliveryType"
								/>
								<span class="option-content">
									<span class="option-icon">🏪</span>
									<span class="option-info">
										<span class="option-title">Самовывоз</span>
										<span class="option-desc">Бесплатно</span>
									</span>
								</span>
							</label>
						</div>

						<div v-if="order.deliveryType === 'delivery'" class="form-group">
							<label for="checkout-address">Адрес доставки *</label>
							<textarea
								id="checkout-address"
								v-model="order.address"
								placeholder="Улица, дом, квартира, подъезд, этаж"
								rows="2"
								required
							></textarea>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="checkout-date">Дата *</label>
								<input
									type="date"
									id="checkout-date"
									v-model="order.date"
									:min="minDate"
									required
								/>
							</div>
							<div class="form-group">
								<label for="checkout-time">Время</label>
								<select id="checkout-time" v-model="order.time">
									<option value="">Любое время</option>
									<option value="10-12">10:00 - 12:00</option>
									<option value="12-14">12:00 - 14:00</option>
									<option value="14-16">14:00 - 16:00</option>
									<option value="16-18">16:00 - 18:00</option>
									<option value="18-20">18:00 - 20:00</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="checkout-comment">Комментарий к заказу</label>
							<textarea
								id="checkout-comment"
								v-model="order.comment"
								placeholder="Особые пожелания, надпись на торте и т.д."
								rows="3"
							></textarea>
						</div>

						<h3>Оплата</h3>

						<div class="payment-options">
							<label class="payment-option">
								<input
									type="radio"
									name="payment"
									value="card"
									v-model="order.paymentType"
								/>
								<span class="option-content">
									<span class="option-icon">💳</span>
									<span class="option-title">Онлайн картой</span>
								</span>
							</label>

							<label class="payment-option">
								<input
									type="radio"
									name="payment"
									value="cash"
									v-model="order.paymentType"
								/>
								<span class="option-content">
									<span class="option-icon">💵</span>
									<span class="option-title">При получении</span>
								</span>
							</label>
						</div>

						<button
							type="submit"
							class="btn-gold submit-btn"
							:disabled="isSubmitting"
						>
							{{ isSubmitting ? 'Оформление...' : 'Оформить заказ' }}
						</button>

						<p class="privacy-note">
							Нажимая кнопку, вы соглашаетесь с
							<a href="#">политикой конфиденциальности</a>
						</p>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cart = inject('cart')
const showNotification = inject('showNotification')

const isSubmitting = ref(false)

const order = ref({
	name: '',
	phone: '',
	email: '',
	deliveryType: 'delivery',
	address: '',
	date: '',
	time: '',
	comment: '',
	paymentType: 'card',
})

const minDate = computed(() => {
	const date = new Date()
	date.setDate(date.getDate() + 3)
	return date.toISOString().split('T')[0]
})

const totalItems = computed(() => {
	return cart.items.value.reduce((sum, item) => sum + item.quantity, 0)
})

const subtotal = computed(() => {
	return cart.items.value.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)
})

const deliveryCost = computed(() => {
	if (order.value.deliveryType === 'pickup') return 0
	if (subtotal.value >= 3000) return 0
	return 500
})

const discount = ref(0)

const total = computed(() => {
	return subtotal.value + deliveryCost.value - discount.value
})

function formatPrice(price) {
	return new Intl.NumberFormat('ru-RU').format(price)
}

function formatOptions(options) {
	if (!options) return ''
	return Object.entries(options)
		.map(([key, value]) => value)
		.join(' • ')
}

async function submitOrder() {
	isSubmitting.value = true

	// Simulate API call
	await new Promise(resolve => setTimeout(resolve, 2000))

	isSubmitting.value = false
	cart.clearCart()
	showNotification(
		'Заказ успешно оформлен! Мы свяжемся с вами для подтверждения.',
		'success'
	)

	router.push('/')
}
</script>

<style scoped>
.cart-page {
	padding: 120px 0 var(--space-4xl);
	min-height: 100vh;
}

.cart-page h1 {
	text-align: center;
	margin-bottom: var(--space-2xl);
}

/* Empty State */
.cart-empty {
	display: flex;
	justify-content: center;
	padding: var(--space-4xl) 0;
}

.empty-content {
	text-align: center;
}

.empty-icon {
	font-size: 5rem;
	display: block;
	margin-bottom: var(--space-lg);
}

.empty-content h2 {
	font-family: var(--font-body);
	font-weight: 700;
	margin-bottom: var(--space-sm);
}

.empty-content p {
	color: var(--color-chocolate-light);
	margin-bottom: var(--space-xl);
}

/* Layout */
.cart-layout {
	display: grid;
	grid-template-columns: 1.5fr 1fr;
	gap: var(--space-2xl);
	align-items: start;
}

/* Cart Items */
.cart-items-section {
	background: var(--bg-card);
	border-radius: var(--radius-xl);
	overflow: hidden;
	box-shadow: var(--shadow-md);
}

.cart-header {
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 1fr 50px;
	gap: var(--space-md);
	padding: var(--space-md) var(--space-lg);
	background: var(--bg-secondary);
	font-weight: 600;
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

.cart-item {
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 1fr 50px;
	gap: var(--space-md);
	align-items: center;
	padding: var(--space-lg);
	border-bottom: 1px solid var(--color-cream-dark);
}

.cart-item:last-child {
	border-bottom: none;
}

.item-product {
	display: flex;
	gap: var(--space-md);
	align-items: center;
}

.item-image {
	width: 80px;
	height: 80px;
	border-radius: var(--radius-md);
	overflow: hidden;
	flex-shrink: 0;
}

.item-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.item-info h3 {
	font-family: var(--font-body);
	font-weight: 600;
	font-size: var(--text-base);
	margin: 0 0 var(--space-xs);
}

.item-options {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin: 0;
}

.item-price,
.item-total {
	font-size: var(--text-lg);
	color: var(--color-gold-dark);
}

.item-quantity {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
}

.qty-btn {
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--bg-secondary);
	border: none;
	border-radius: var(--radius-full);
	cursor: pointer;
	font-size: 16px;
	font-weight: 600;
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

.item-remove {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	background: none;
	border: none;
	cursor: pointer;
	color: var(--color-chocolate-light);
	opacity: 0.5;
	transition: all var(--transition-fast);
}

.item-remove:hover {
	opacity: 1;
	color: var(--color-error);
}

/* Order Section */
.order-section {
	position: sticky;
	top: 100px;
}

.order-summary {
	background: var(--color-primary-gradient);
	border-radius: var(--radius-xl);
	padding: var(--space-xl);
	margin-bottom: var(--space-lg);
}

.order-summary h3 {
	font-family: var(--font-body);
	font-weight: 700;
	margin-bottom: var(--space-lg);
}

.summary-rows {
	margin-bottom: var(--space-lg);
}

.summary-row {
	display: flex;
	justify-content: space-between;
	padding: var(--space-sm) 0;
	color: var(--color-chocolate-light);
}

.summary-row.discount {
	color: var(--color-success);
}

.summary-total {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: var(--space-md);
	border-top: 1px solid rgba(74, 44, 42, 0.1);
	font-weight: 600;
}

.total-value {
	font-size: var(--text-2xl);
	color: var(--color-chocolate);
}

.free-delivery-hint {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	margin-top: var(--space-md);
	padding: var(--space-sm) var(--space-md);
	background: rgba(255, 255, 255, 0.5);
	border-radius: var(--radius-md);
	font-size: var(--text-sm);
}

/* Checkout Form */
.checkout-form {
	background: var(--bg-card);
	border-radius: var(--radius-xl);
	padding: var(--space-xl);
	box-shadow: var(--shadow-md);
}

.checkout-form h3 {
	font-family: var(--font-body);
	font-weight: 700;
	font-size: var(--text-lg);
	margin: 0 0 var(--space-lg);
	padding-top: var(--space-lg);
	border-top: 1px solid var(--color-cream-dark);
}

.checkout-form h3:first-of-type {
	padding-top: 0;
	border-top: none;
}

.form-group {
	margin-bottom: var(--space-md);
}

.form-row {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-md);
}

.delivery-options,
.payment-options {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-md);
	margin-bottom: var(--space-lg);
}

.delivery-option,
.payment-option {
	cursor: pointer;
}

.delivery-option input,
.payment-option input {
	display: none;
}

.option-content {
	display: flex;
	align-items: center;
	gap: var(--space-md);
	padding: var(--space-md);
	background: var(--bg-secondary);
	border: 2px solid transparent;
	border-radius: var(--radius-md);
	transition: all var(--transition-base);
}

.delivery-option input:checked + .option-content,
.payment-option input:checked + .option-content {
	border-color: var(--color-gold);
	background: var(--color-cream);
}

.option-icon {
	font-size: 1.5rem;
}

.option-info {
	display: flex;
	flex-direction: column;
}

.option-title {
	font-weight: 600;
}

.option-desc {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
}

.submit-btn {
	width: 100%;
	padding: var(--space-lg);
	margin-bottom: var(--space-md);
}

.privacy-note {
	text-align: center;
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin: 0;
}

.privacy-note a {
	color: var(--color-gold);
}

/* Transitions */
.cart-item-enter-active,
.cart-item-leave-active {
	transition: all 0.3s ease;
}

.cart-item-enter-from,
.cart-item-leave-to {
	opacity: 0;
	transform: translateX(-30px);
}

@media (max-width: 992px) {
	.cart-layout {
		grid-template-columns: 1fr;
	}

	.order-section {
		position: static;
	}

	.cart-header {
		display: none;
	}

	.cart-item {
		grid-template-columns: 1fr auto;
		gap: var(--space-md);
	}

	.item-product {
		grid-column: 1 / -1;
	}

	.item-price {
		display: none;
	}
}

@media (max-width: 576px) {
	.cart-page {
		padding: 100px 0 var(--space-2xl);
	}

	.form-row {
		grid-template-columns: 1fr;
	}

	.delivery-options,
	.payment-options {
		grid-template-columns: 1fr;
	}
}
</style>
