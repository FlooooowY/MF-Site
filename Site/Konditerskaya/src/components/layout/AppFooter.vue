<template>
	<footer class="footer">
		<!-- Decorative Wave -->
		<div class="footer__wave">
			<svg viewBox="0 0 1440 120" preserveAspectRatio="none">
				<path
					d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
					fill="url(#waveGradient)"
				/>
				<defs>
					<linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#FFD1DC" />
						<stop offset="100%" stop-color="#FFB6C1" />
					</linearGradient>
				</defs>
			</svg>
		</div>

		<div class="footer__content">
			<div class="container">
				<div class="footer__grid">
					<!-- Brand Column -->
					<div class="footer__brand">
						<div class="footer__logo">
							<svg
								viewBox="0 0 60 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									cx="30"
									cy="35"
									r="20"
									fill="url(#footerCakeGradient)"
								/>
								<ellipse
									cx="30"
									cy="20"
									rx="22"
									ry="8"
									fill="url(#footerCreamGradient)"
								/>
								<circle cx="22" cy="17" r="3" fill="#E57373" />
								<circle cx="30" cy="14" r="3" fill="#E57373" />
								<circle cx="38" cy="17" r="3" fill="#E57373" />
								<defs>
									<linearGradient
										id="footerCakeGradient"
										x1="10"
										y1="35"
										x2="50"
										y2="35"
									>
										<stop stop-color="#FFD1DC" />
										<stop offset="1" stop-color="#FFB6C1" />
									</linearGradient>
									<linearGradient
										id="footerCreamGradient"
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
						<p class="footer__tagline">
							Создаём сладкие шедевры для ваших особенных моментов с 2015 года
						</p>
						<div class="footer__socials">
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
							<a href="#" class="social-link" aria-label="VK">
								<svg viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"
									/>
								</svg>
							</a>
						</div>
					</div>

					<!-- Catalog Column -->
					<div class="footer__column">
						<h4>Каталог</h4>
						<ul>
							<li><router-link to="/catalog/cakes">Торты</router-link></li>
							<li>
								<router-link to="/catalog/cupcakes">Капкейки</router-link>
							</li>
							<li>
								<router-link to="/catalog/pastries">Пирожные</router-link>
							</li>
							<li>
								<router-link to="/catalog/macarons">Макаронс</router-link>
							</li>
							<li>
								<router-link to="/constructor">Конструктор торта</router-link>
							</li>
						</ul>
					</div>

					<!-- Info Column -->
					<div class="footer__column">
						<h4>Информация</h4>
						<ul>
							<li><a href="#">О нас</a></li>
							<li><a href="#">Доставка и оплата</a></li>
							<li><a href="#">Гарантии</a></li>
							<li><a href="#">Отзывы</a></li>
							<li><a href="#">Блог</a></li>
						</ul>
					</div>

					<!-- Contact Column -->
					<div class="footer__column">
						<h4>Контакты</h4>
						<div class="footer__contacts">
							<a href="tel:+79001234567" class="contact-item">
								<svg
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
							<a href="mailto:hello@sweetdreams.ru" class="contact-item">
								<svg
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
								<span>hello@sweetdreams.ru</span>
							</a>
							<div class="contact-item">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
								<span>г. Москва, ул. Сладкая, д. 1</span>
							</div>
							<div class="contact-item">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<circle cx="12" cy="12" r="10" />
									<polyline points="12 6 12 12 16 14" />
								</svg>
								<span>Пн-Вс: 9:00 - 21:00</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Bottom Bar -->
				<div class="footer__bottom">
					<p>&copy; {{ currentYear }} Sweet Dreams. Все права защищены.</p>
					<div class="footer__links">
						<a href="#">Политика конфиденциальности</a>
						<a href="#">Пользовательское соглашение</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Decorative Elements -->
		<div class="footer__decor">
			<span class="decor-item decor-item--1">🍰</span>
			<span class="decor-item decor-item--2">🧁</span>
			<span class="decor-item decor-item--3">🍪</span>
			<span class="decor-item decor-item--4">🎂</span>
		</div>
	</footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
	position: relative;
	margin-top: auto;
	overflow: hidden;
}

.footer__wave {
	position: relative;
	height: 60px;
	margin-bottom: -1px;
}

.footer__wave svg {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.footer__content {
	background: var(--color-primary-gradient);
	padding: var(--space-3xl) 0 var(--space-xl);
}

.footer__grid {
	display: grid;
	grid-template-columns: 1.5fr repeat(3, 1fr);
	gap: var(--space-2xl);
}

/* Brand */
.footer__brand {
	max-width: 300px;
}

.footer__logo {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	margin-bottom: var(--space-md);
}

.footer__logo svg {
	width: 50px;
	height: 50px;
}

.footer__logo span {
	font-family: var(--font-script);
	font-size: var(--text-2xl);
	color: var(--color-chocolate);
}

.footer__tagline {
	color: var(--color-chocolate-light);
	margin-bottom: var(--space-lg);
	font-size: var(--text-sm);
}

.footer__socials {
	display: flex;
	gap: var(--space-sm);
}

.social-link {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background: var(--bg-card);
	border-radius: var(--radius-full);
	color: var(--color-chocolate);
	transition: all var(--transition-base);
	box-shadow: var(--shadow-sm);
}

.social-link svg {
	width: 20px;
	height: 20px;
}

.social-link:hover {
	background: var(--color-chocolate);
	color: var(--color-cream);
	transform: translateY(-3px);
}

/* Columns */
.footer__column h4 {
	font-family: var(--font-body);
	font-weight: 700;
	font-size: var(--text-lg);
	margin-bottom: var(--space-lg);
	color: var(--color-chocolate);
}

.footer__column ul {
	list-style: none;
}

.footer__column li {
	margin-bottom: var(--space-sm);
}

.footer__column a {
	color: var(--color-chocolate-light);
	font-size: var(--text-sm);
	transition: color var(--transition-base);
}

.footer__column a:hover {
	color: var(--color-chocolate);
}

/* Contacts */
.footer__contacts {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.contact-item {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	color: var(--color-chocolate-light);
	font-size: var(--text-sm);
	text-decoration: none;
	transition: color var(--transition-base);
}

.contact-item svg {
	width: 18px;
	height: 18px;
	flex-shrink: 0;
}

a.contact-item:hover {
	color: var(--color-chocolate);
}

/* Bottom */
.footer__bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: var(--space-xl);
	margin-top: var(--space-2xl);
	border-top: 1px solid rgba(74, 44, 42, 0.1);
}

.footer__bottom p {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	margin: 0;
}

.footer__links {
	display: flex;
	gap: var(--space-lg);
}

.footer__links a {
	font-size: var(--text-sm);
	color: var(--color-chocolate-light);
	transition: color var(--transition-base);
}

.footer__links a:hover {
	color: var(--color-chocolate);
}

/* Decorative Elements */
.footer__decor {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	overflow: hidden;
}

.decor-item {
	position: absolute;
	font-size: 2rem;
	opacity: 0.3;
	animation: float 6s ease-in-out infinite;
}

.decor-item--1 {
	top: 20%;
	left: 5%;
	animation-delay: 0s;
}

.decor-item--2 {
	top: 40%;
	right: 10%;
	animation-delay: 1.5s;
}

.decor-item--3 {
	bottom: 30%;
	left: 15%;
	animation-delay: 3s;
}

.decor-item--4 {
	bottom: 20%;
	right: 5%;
	animation-delay: 4.5s;
}

@keyframes float {
	0%,
	100% {
		transform: translateY(0) rotate(0deg);
	}
	50% {
		transform: translateY(-20px) rotate(10deg);
	}
}

/* Responsive */
@media (max-width: 992px) {
	.footer__grid {
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-xl);
	}

	.footer__brand {
		max-width: none;
		grid-column: span 2;
		text-align: center;
	}

	.footer__socials {
		justify-content: center;
	}
}

@media (max-width: 576px) {
	.footer__grid {
		grid-template-columns: 1fr;
		text-align: center;
	}

	.footer__brand {
		grid-column: span 1;
	}

	.footer__contacts {
		align-items: center;
	}

	.footer__bottom {
		flex-direction: column;
		gap: var(--space-md);
		text-align: center;
	}

	.footer__links {
		flex-direction: column;
		gap: var(--space-sm);
	}
}
</style>
