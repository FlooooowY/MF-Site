<template>
	<section class="order-form section" id="order">
		<div class="container">
			<div class="order-form__grid">
				<!-- Form -->
				<div class="order-form__content">
					<div
						class="section-title"
						style="text-align: left; margin-bottom: var(--space-xl)"
					>
						<h2>Оставить заявку</h2>
						<p>Расскажите о вашем празднике — мы создадим идеальный десерт</p>
					</div>

					<form @submit.prevent="submitForm" class="form">
						<div class="form__row">
							<div class="form__group">
								<label for="name">Ваше имя</label>
								<input
									type="text"
									id="name"
									v-model="form.name"
									placeholder="Как вас зовут?"
									required
								/>
							</div>
							<div class="form__group">
								<label for="phone">Телефон</label>
								<input
									type="tel"
									id="phone"
									v-model="form.phone"
									placeholder="+7 (___) ___-__-__"
									required
								/>
							</div>
						</div>

						<div class="form__group">
							<label for="occasion">Повод</label>
							<div class="occasion-buttons">
								<button
									v-for="occasion in occasions"
									:key="occasion.id"
									type="button"
									class="occasion-btn"
									:class="{ active: form.occasion === occasion.id }"
									@click="form.occasion = occasion.id"
								>
									<span class="occasion-icon">{{ occasion.icon }}</span>
									<span class="occasion-text">{{ occasion.name }}</span>
								</button>
							</div>
						</div>

						<div class="form__row">
							<div class="form__group">
								<label for="date">Дата мероприятия</label>
								<input
									type="date"
									id="date"
									v-model="form.date"
									:min="minDate"
									required
								/>
							</div>
							<div class="form__group">
								<label for="guests">Количество гостей</label>
								<select id="guests" v-model="form.guests">
									<option value="">Выберите</option>
									<option value="5-10">5-10 человек</option>
									<option value="10-20">10-20 человек</option>
									<option value="20-30">20-30 человек</option>
									<option value="30+">Более 30 человек</option>
								</select>
							</div>
						</div>

						<div class="form__group">
							<label for="message">Пожелания</label>
							<textarea
								id="message"
								v-model="form.message"
								placeholder="Расскажите о ваших пожеланиях: любимые вкусы, цветовая гамма, особые детали..."
								rows="4"
							></textarea>
						</div>

						<div class="form__group">
							<label class="upload-label">
								<input
									type="file"
									@change="handleFileUpload"
									accept="image/*"
									multiple
									class="upload-input"
								/>
								<div class="upload-area">
									<span class="upload-icon">📎</span>
									<span class="upload-text">
										{{
											uploadedFiles.length > 0
												? `Загружено ${uploadedFiles.length} фото`
												: 'Прикрепить фото или эскиз'
										}}
									</span>
								</div>
							</label>
						</div>

						<button
							type="submit"
							class="btn-gold form__submit"
							:disabled="isSubmitting"
						>
							<span v-if="!isSubmitting">
								Отправить заявку
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<line x1="22" y1="2" x2="11" y2="13" />
									<polygon points="22 2 15 22 11 13 2 9 22 2" />
								</svg>
							</span>
							<span v-else class="loading">
								<span class="loading-dot"></span>
								<span class="loading-dot"></span>
								<span class="loading-dot"></span>
							</span>
						</button>

						<p class="form__privacy">
							Нажимая кнопку, вы соглашаетесь с
							<a href="#">политикой конфиденциальности</a>
						</p>
					</form>
				</div>

				<!-- Contact Info -->
				<div class="order-form__info">
					<div class="info-card">
						<h3>Свяжитесь с нами</h3>

						<div class="info-items">
							<a href="tel:+79001234567" class="info-item">
								<span class="info-icon">📞</span>
								<div class="info-content">
									<span class="info-label">Телефон</span>
									<span class="info-value">+7 900 123-45-67</span>
								</div>
							</a>

							<a href="https://wa.me/79001234567" class="info-item">
								<span class="info-icon">💬</span>
								<div class="info-content">
									<span class="info-label">WhatsApp</span>
									<span class="info-value">Написать</span>
								</div>
							</a>

							<a href="https://t.me/sweetdreams" class="info-item">
								<span class="info-icon">✈️</span>
								<div class="info-content">
									<span class="info-label">Telegram</span>
									<span class="info-value">@sweetdreams</span>
								</div>
							</a>

							<a href="mailto:hello@sweetdreams.ru" class="info-item">
								<span class="info-icon">✉️</span>
								<div class="info-content">
									<span class="info-label">Email</span>
									<span class="info-value">hello@sweetdreams.ru</span>
								</div>
							</a>
						</div>

						<div class="info-hours">
							<h4>🕐 Режим работы</h4>
							<p>Ежедневно с 9:00 до 21:00</p>
							<p class="note">Заказы принимаем минимум за 3 дня</p>
						</div>

						<div class="info-address">
							<h4>📍 Адрес</h4>
							<p>г. Москва, ул. Сладкая, д. 1</p>
							<p class="note">Самовывоз и дегустации по записи</p>
						</div>
					</div>

					<!-- Decorative cake -->
					<div class="info-decor">
						<div class="cake-3d">
							<span class="cake-emoji">🎂</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, inject } from 'vue'

const showNotification = inject('showNotification')

const form = ref({
	name: '',
	phone: '',
	occasion: '',
	date: '',
	guests: '',
	message: '',
})

const uploadedFiles = ref([])
const isSubmitting = ref(false)

const occasions = [
	{ id: 'birthday', name: 'День рождения', icon: '🎂' },
	{ id: 'wedding', name: 'Свадьба', icon: '💒' },
	{ id: 'kids', name: 'Детский праздник', icon: '🎈' },
	{ id: 'corporate', name: 'Корпоратив', icon: '🏢' },
	{ id: 'other', name: 'Другое', icon: '✨' },
]

const minDate = computed(() => {
	const date = new Date()
	date.setDate(date.getDate() + 3) // Minimum 3 days in advance
	return date.toISOString().split('T')[0]
})

function handleFileUpload(event) {
	const files = Array.from(event.target.files)
	uploadedFiles.value = files
}

async function submitForm() {
	isSubmitting.value = true

	// Simulate API call
	await new Promise(resolve => setTimeout(resolve, 2000))

	isSubmitting.value = false
	showNotification(
		'Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
		'success'
	)

	// Reset form
	form.value = {
		name: '',
		phone: '',
		occasion: '',
		date: '',
		guests: '',
		message: '',
	}
	uploadedFiles.value = []
}
</script>

<style scoped>
.order-form {
	background: var(--bg-primary);
	position: relative;
}

.order-form__grid {
	display: grid;
	grid-template-columns: 1.2fr 1fr;
	gap: var(--space-3xl);
	align-items: start;
}

/* Form */
.form {
	display: flex;
	flex-direction: column;
	gap: var(--space-lg);
}

.form__row {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-lg);
}

.form__group label {
	display: block;
	margin-bottom: var(--space-sm);
	font-weight: 600;
}

.form__group input,
.form__group select,
.form__group textarea {
	width: 100%;
}

/* Occasion buttons */
.occasion-buttons {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-sm);
}

.occasion-btn {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-sm) var(--space-md);
	background: var(--bg-card);
	border: 2px solid var(--color-cream-dark);
	border-radius: var(--radius-full);
	cursor: pointer;
	transition: all var(--transition-base);
}

.occasion-btn:hover {
	border-color: var(--color-primary-end);
	background: var(--bg-secondary);
}

.occasion-btn.active {
	border-color: var(--color-gold);
	background: var(--color-cream);
}

.occasion-icon {
	font-size: 1.2rem;
}

.occasion-text {
	font-weight: 500;
	font-size: var(--text-sm);
}

/* Upload */
.upload-input {
	display: none;
}

.upload-area {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--space-sm);
	padding: var(--space-lg);
	background: var(--bg-secondary);
	border: 2px dashed var(--color-cream-dark);
	border-radius: var(--radius-md);
	cursor: pointer;
	transition: all var(--transition-base);
}

.upload-area:hover {
	border-color: var(--color-primary-end);
	background: var(--bg-card);
}

.upload-icon {
	font-size: 1.5rem;
}

.upload-text {
	font-weight: 500;
	color: var(--color-chocolate-light);
}

/* Submit */
.form__submit {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--space-sm);
	width: 100%;
	padding: var(--space-lg);
}

.form__submit:disabled {
	opacity: 0.7;
	cursor: not-allowed;
}

.loading {
	display: flex;
	gap: var(--space-xs);
}

.loading-dot {
	width: 8px;
	height: 8px;
	background: white;
	border-radius: 50%;
	animation: loadingBounce 1.4s ease-in-out infinite both;
}

.loading-dot:nth-child(1) {
	animation-delay: -0.32s;
}
.loading-dot:nth-child(2) {
	animation-delay: -0.16s;
}

@keyframes loadingBounce {
	0%,
	80%,
	100% {
		transform: scale(0);
	}
	40% {
		transform: scale(1);
	}
}

.form__privacy {
	text-align: center;
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin: 0;
}

.form__privacy a {
	color: var(--color-gold);
	text-decoration: underline;
}

/* Info Card */
.order-form__info {
	position: sticky;
	top: 120px;
}

.info-card {
	padding: var(--space-xl);
	background: var(--color-primary-gradient);
	border-radius: var(--radius-xl);
	box-shadow: var(--shadow-lg);
}

.info-card h3 {
	font-family: var(--font-body);
	font-weight: 700;
	font-size: var(--text-xl);
	margin-bottom: var(--space-xl);
	text-align: center;
}

.info-items {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
	margin-bottom: var(--space-xl);
}

.info-item {
	display: flex;
	align-items: center;
	gap: var(--space-md);
	padding: var(--space-md);
	background: var(--bg-card);
	border-radius: var(--radius-md);
	text-decoration: none;
	transition: all var(--transition-base);
}

.info-item:hover {
	transform: translateX(5px);
	box-shadow: var(--shadow-md);
}

.info-icon {
	font-size: 1.5rem;
}

.info-content {
	display: flex;
	flex-direction: column;
}

.info-label {
	font-size: var(--text-xs);
	color: var(--color-chocolate-light);
}

.info-value {
	font-weight: 600;
	color: var(--color-chocolate);
}

.info-hours,
.info-address {
	padding: var(--space-md);
	background: rgba(255, 255, 255, 0.5);
	border-radius: var(--radius-md);
	margin-bottom: var(--space-md);
}

.info-hours h4,
.info-address h4 {
	font-family: var(--font-body);
	font-weight: 600;
	font-size: var(--text-base);
	margin: 0 0 var(--space-sm);
}

.info-hours p,
.info-address p {
	margin: 0;
	font-size: var(--text-sm);
}

.note {
	font-size: var(--text-xs) !important;
	color: var(--color-chocolate-light);
	margin-top: var(--space-xs) !important;
}

/* Decorative cake */
.info-decor {
	text-align: center;
	margin-top: var(--space-lg);
}

.cake-3d {
	display: inline-block;
	animation: float 3s ease-in-out infinite;
}

.cake-emoji {
	font-size: 4rem;
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

@media (max-width: 992px) {
	.order-form__grid {
		grid-template-columns: 1fr;
	}

	.order-form__info {
		position: static;
	}
}

@media (max-width: 576px) {
	.form__row {
		grid-template-columns: 1fr;
	}

	.occasion-buttons {
		justify-content: center;
	}
}
</style>
