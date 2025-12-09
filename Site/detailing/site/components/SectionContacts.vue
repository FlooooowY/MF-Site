<script setup lang="ts">
const form = reactive({
	name: '',
	phone: '',
	brand: '',
	model: '',
	service: '',
	message: '',
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errors = reactive<Record<string, string>>({})

const services = [
	'Защитная пленка PPF',
	'Виниловая оклейка',
	'Тонировка стекол',
	'Полировка кузова',
	'Керамическое покрытие',
	'Химчистка салона',
	'Другое',
]

function validateForm(): boolean {
	Object.keys(errors).forEach(key => delete errors[key])

	if (!form.name.trim()) {
		errors.name = 'Введите ваше имя'
	}

	const phoneRegex = /^[\d\s\-+()]{10,}$/
	if (!phoneRegex.test(form.phone)) {
		errors.phone = 'Введите корректный номер телефона'
	}

	if (!form.service) {
		errors.service = 'Выберите услугу'
	}

	return Object.keys(errors).length === 0
}

async function handleSubmit() {
	if (!validateForm()) return

	isSubmitting.value = true

	// Имитация отправки
	await new Promise(resolve => setTimeout(resolve, 1500))

	isSubmitting.value = false
	isSuccess.value = true

	// Сброс формы
	Object.assign(form, {
		name: '',
		phone: '',
		brand: '',
		model: '',
		service: '',
		message: '',
	})
}

function formatPhone(e: Event) {
	const input = e.target as HTMLInputElement
	let value = input.value.replace(/\D/g, '')

	if (value.length > 0) {
		if (value[0] === '7' || value[0] === '8') {
			value = value.substring(1)
		}

		let formatted = '+7'
		if (value.length > 0) formatted += ' (' + value.substring(0, 3)
		if (value.length >= 3) formatted += ') ' + value.substring(3, 6)
		if (value.length >= 6) formatted += '-' + value.substring(6, 8)
		if (value.length >= 8) formatted += '-' + value.substring(8, 10)

		form.phone = formatted
	}
}
</script>

<template>
	<section id="contacts" class="contacts section">
		<div class="container">
			<div class="contacts__grid">
				<!-- Info -->
				<div class="contacts__info">
					<h2 class="section-title text-left">
						СВЯЗАТЬСЯ <span class="accent">С НАМИ</span>
					</h2>
					<p class="contacts__desc">
						Оставьте заявку, и мы свяжемся с вами в течение 15 минут для
						консультации и записи
					</p>

					<!-- Contact Cards -->
					<div class="contacts__cards">
						<a href="tel:+74951234567" class="contacts__card">
							<div class="contacts__card-icon">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
									/>
								</svg>
							</div>
							<div class="contacts__card-content">
								<span class="contacts__card-label">Телефон</span>
								<span class="contacts__card-value">+7 (495) 123-45-67</span>
							</div>
						</a>

						<a href="mailto:info@apex-detailing.ru" class="contacts__card">
							<div class="contacts__card-icon">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
									/>
									<polyline points="22,6 12,13 2,6" />
								</svg>
							</div>
							<div class="contacts__card-content">
								<span class="contacts__card-label">Email</span>
								<span class="contacts__card-value">info@apex-detailing.ru</span>
							</div>
						</a>

						<div class="contacts__card">
							<div class="contacts__card-icon">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
							</div>
							<div class="contacts__card-content">
								<span class="contacts__card-label">Адрес</span>
								<span class="contacts__card-value"
									>Москва, ул. Примерная, 123</span
								>
							</div>
						</div>

						<div class="contacts__card">
							<div class="contacts__card-icon">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<circle cx="12" cy="12" r="10" />
									<polyline points="12 6 12 12 16 14" />
								</svg>
							</div>
							<div class="contacts__card-content">
								<span class="contacts__card-label">Режим работы</span>
								<span class="contacts__card-value">Пн-Сб: 9:00 - 21:00</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Form -->
				<div class="contacts__form-wrapper">
					<Transition name="fade" mode="out-in">
						<div v-if="isSuccess" key="success" class="contacts__success">
							<div class="contacts__success-icon">✓</div>
							<h3>Заявка отправлена!</h3>
							<p>Мы свяжемся с вами в ближайшее время</p>
							<button class="btn btn-ghost" @click="isSuccess = false">
								<span>Отправить еще</span>
							</button>
						</div>

						<form
							v-else
							key="form"
							class="contacts__form"
							@submit.prevent="handleSubmit"
						>
							<h3 class="contacts__form-title">Оставить заявку</h3>

							<div class="contacts__form-row">
								<div class="form-group">
									<label class="form-label">Ваше имя *</label>
									<input
										v-model="form.name"
										type="text"
										class="form-input"
										:class="{ 'form-input--error': errors.name }"
										placeholder="Александр"
									/>
									<span v-if="errors.name" class="form-error">{{
										errors.name
									}}</span>
								</div>

								<div class="form-group">
									<label class="form-label">Телефон *</label>
									<input
										v-model="form.phone"
										type="tel"
										class="form-input"
										:class="{ 'form-input--error': errors.phone }"
										placeholder="+7 (___) ___-__-__"
										@input="formatPhone"
									/>
									<span v-if="errors.phone" class="form-error">{{
										errors.phone
									}}</span>
								</div>
							</div>

							<div class="contacts__form-row">
								<div class="form-group">
									<label class="form-label">Марка авто</label>
									<input
										v-model="form.brand"
										type="text"
										class="form-input"
										placeholder="Mercedes-Benz"
									/>
								</div>

								<div class="form-group">
									<label class="form-label">Модель</label>
									<input
										v-model="form.model"
										type="text"
										class="form-input"
										placeholder="S-Class"
									/>
								</div>
							</div>

							<div class="form-group">
								<label class="form-label">Услуга *</label>
								<select
									v-model="form.service"
									class="form-select"
									:class="{ 'form-input--error': errors.service }"
								>
									<option value="">Выберите услугу</option>
									<option
										v-for="service in services"
										:key="service"
										:value="service"
									>
										{{ service }}
									</option>
								</select>
								<span v-if="errors.service" class="form-error">{{
									errors.service
								}}</span>
							</div>

							<div class="form-group">
								<label class="form-label">Комментарий</label>
								<textarea
									v-model="form.message"
									class="form-textarea"
									placeholder="Опишите ваши пожелания..."
									rows="3"
								></textarea>
							</div>

							<button
								type="submit"
								class="btn btn-neon btn-lg contacts__submit"
								:disabled="isSubmitting"
							>
								<span v-if="isSubmitting">Отправка...</span>
								<span v-else>✨ Отправить заявку</span>
							</button>

							<p class="contacts__form-disclaimer">
								Нажимая кнопку, вы соглашаетесь с
								<a href="#">политикой конфиденциальности</a>
							</p>
						</form>
					</Transition>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.contacts {
	background: $gradient-deep-space;

	&__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: $space-3xl;
		align-items: start;

		@include respond-below('lg') {
			grid-template-columns: 1fr;
			gap: $space-2xl;
		}
	}

	&__info {
		.section-title {
			margin-bottom: $space-md;
		}
	}

	&__desc {
		@include body-text;
		margin-bottom: $space-xl;
	}

	&__cards {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $space-md;

		@include respond-below('sm') {
			grid-template-columns: 1fr;
		}
	}

	&__card {
		display: flex;
		gap: $space-md;
		padding: $space-md;
		background: rgba($midnight-indigo, 0.3);
		border: 1px solid rgba($electric-blue, 0.2);
		border-radius: $border-radius-md;
		text-decoration: none;
		transition: all $transition-fast ease;

		&:hover {
			border-color: $electric-blue;
			background: rgba($electric-blue, 0.1);
		}

		&-icon {
			@include flex-center;
			width: 48px;
			height: 48px;
			background: rgba($electric-blue, 0.2);
			border-radius: $border-radius-md;
			color: $electric-blue;
			flex-shrink: 0;
		}

		&-content {
			display: flex;
			flex-direction: column;
			gap: 2px;
		}

		&-label {
			font-size: 12px;
			color: $platinum-dim;
			text-transform: uppercase;
			letter-spacing: 1px;
		}

		&-value {
			font-size: 14px;
			color: $platinum-white;
		}
	}

	&__form-wrapper {
		@include card-base;
		padding: $space-xl;
	}

	&__form {
		&-title {
			@include heading-3;
			text-align: center;
			margin-bottom: $space-lg;
		}

		&-row {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: $space-md;

			@include respond-below('sm') {
				grid-template-columns: 1fr;
			}
		}

		&-disclaimer {
			text-align: center;
			font-size: 12px;
			color: $platinum-dim;
			margin-top: $space-md;

			a {
				color: $electric-blue;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}

	&__submit {
		width: 100%;
		margin-top: $space-md;
	}

	&__success {
		text-align: center;
		padding: $space-2xl $space-lg;

		&-icon {
			@include flex-center;
			width: 80px;
			height: 80px;
			margin: 0 auto $space-lg;
			background: $emerald-success;
			border-radius: 50%;
			font-size: 40px;
			color: $deep-space;
			animation: scale-in 0.5s $ease-bounce;
		}

		h3 {
			@include heading-3;
			margin-bottom: $space-sm;
		}

		p {
			color: $platinum-muted;
			margin-bottom: $space-lg;
		}
	}
}

.form-input--error {
	border-color: $error-red !important;
}

.form-error {
	display: block;
	font-size: 12px;
	color: $error-red;
	margin-top: $space-xs;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
