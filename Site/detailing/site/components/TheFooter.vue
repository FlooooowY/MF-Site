<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socialLinks = [
	{ name: 'Instagram', icon: 'instagram', href: '#' },
	{ name: 'Telegram', icon: 'telegram', href: '#' },
	{ name: 'WhatsApp', icon: 'whatsapp', href: '#' },
	{ name: 'YouTube', icon: 'youtube', href: '#' },
]

const footerLinks = [
	{
		title: 'Услуги',
		links: [
			{ label: 'Защитная пленка PPF', href: '#' },
			{ label: 'Виниловая оклейка', href: '#' },
			{ label: 'Тонировка', href: '#' },
			{ label: 'Полировка', href: '#' },
			{ label: 'Керамика', href: '#' },
		],
	},
	{
		title: 'Компания',
		links: [
			{ label: 'О нас', href: '#about' },
			{ label: 'Галерея работ', href: '#gallery' },
			{ label: 'Отзывы', href: '#reviews' },
			{ label: 'Контакты', href: '#contacts' },
		],
	},
	{
		title: 'Контакты',
		links: [
			{ label: '+7 (495) 123-45-67', href: 'tel:+74951234567' },
			{
				label: 'info@apex-detailing.ru',
				href: 'mailto:info@apex-detailing.ru',
			},
			{ label: 'Москва, ул. Примерная, 123', href: '#' },
		],
	},
]
</script>

<template>
	<footer class="footer">
		<div class="footer__top">
			<div class="container">
				<div class="footer__grid">
					<!-- Brand Column -->
					<div class="footer__brand">
						<NuxtLink to="/" class="footer__logo">
							<svg class="footer__logo-icon" viewBox="0 0 40 40" fill="none">
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
							<span class="footer__logo-text">
								<span class="footer__logo-main">APEX</span>
								<span class="footer__logo-sub">DETAILING</span>
							</span>
						</NuxtLink>
						<p class="footer__brand-desc">
							Премиум детейлинг-центр в Москве. Защитная пленка, виниловая
							оклейка, керамическое покрытие. Гарантия качества 5 лет.
						</p>
						<div class="footer__social">
							<a
								v-for="social in socialLinks"
								:key="social.name"
								:href="social.href"
								:aria-label="social.name"
								class="footer__social-link"
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<template v-if="social.icon === 'instagram'">
										<path
											d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
										/>
									</template>
									<template v-else-if="social.icon === 'telegram'">
										<path
											d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
										/>
									</template>
									<template v-else-if="social.icon === 'whatsapp'">
										<path
											d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
										/>
									</template>
									<template v-else-if="social.icon === 'youtube'">
										<path
											d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
										/>
									</template>
								</svg>
							</a>
						</div>
					</div>

					<!-- Links Columns -->
					<div
						v-for="section in footerLinks"
						:key="section.title"
						class="footer__links"
					>
						<h4 class="footer__links-title">{{ section.title }}</h4>
						<ul class="footer__links-list">
							<li v-for="link in section.links" :key="link.label">
								<a :href="link.href" class="footer__link">{{ link.label }}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="footer__bottom">
			<div class="container">
				<div class="footer__bottom-content">
					<p class="footer__copyright">
						© {{ currentYear }} APEX Detailing. Все права защищены.
					</p>
					<div class="footer__legal">
						<a href="#">Политика конфиденциальности</a>
						<a href="#">Публичная оферта</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	background: linear-gradient(
		180deg,
		$deep-space 0%,
		darken($deep-space, 3%) 100%
	);
	border-top: 1px solid rgba($electric-blue, 0.1);

	&__top {
		padding: $space-3xl 0 $space-2xl;
	}

	&__grid {
		display: grid;
		grid-template-columns: 1.5fr repeat(3, 1fr);
		gap: $space-2xl;

		@include respond-below('lg') {
			grid-template-columns: repeat(2, 1fr);
		}

		@include respond-below('sm') {
			grid-template-columns: 1fr;
			text-align: center;
		}
	}

	&__brand {
		@include respond-below('lg') {
			grid-column: 1 / -1;
		}

		&-desc {
			margin: $space-md 0;
			font-size: 14px;
			color: $platinum-muted;
			max-width: 300px;

			@include respond-below('sm') {
				margin-left: auto;
				margin-right: auto;
			}
		}
	}

	&__logo {
		display: inline-flex;
		align-items: center;
		gap: $space-sm;
		color: $platinum-white;
		text-decoration: none;

		&-icon {
			width: 36px;
			height: 36px;
			color: $electric-blue;
		}

		&-text {
			display: flex;
			flex-direction: column;
			line-height: 1;
		}

		&-main {
			font-family: $font-display;
			font-size: 20px;
			letter-spacing: 2px;
		}

		&-sub {
			font-family: $font-tech;
			font-size: 9px;
			letter-spacing: 3px;
			color: $electric-blue;
		}
	}

	&__social {
		display: flex;
		gap: $space-sm;

		@include respond-below('sm') {
			justify-content: center;
		}

		&-link {
			@include flex-center;
			width: 40px;
			height: 40px;
			background: rgba($midnight-indigo, 0.5);
			border: 1px solid rgba($electric-blue, 0.2);
			border-radius: $border-radius-md;
			color: $platinum-muted;
			transition: all $transition-fast ease;

			&:hover {
				background: $electric-blue;
				border-color: $electric-blue;
				color: $deep-space;
				transform: translateY(-2px);
			}

			svg {
				width: 20px;
				height: 20px;
			}
		}
	}

	&__links {
		&-title {
			font-family: $font-body;
			font-size: 14px;
			font-weight: 600;
			color: $platinum-white;
			text-transform: uppercase;
			letter-spacing: 1px;
			margin-bottom: $space-md;
		}

		&-list {
			list-style: none;
			display: flex;
			flex-direction: column;
			gap: $space-sm;
		}
	}

	&__link {
		font-size: 14px;
		color: $platinum-muted;
		text-decoration: none;
		transition: color $transition-fast ease;

		&:hover {
			color: $electric-blue;
		}
	}

	&__bottom {
		border-top: 1px solid rgba($platinum-white, 0.1);
		padding: $space-md 0;

		&-content {
			@include flex-between;

			@include respond-below('md') {
				flex-direction: column;
				gap: $space-sm;
				text-align: center;
			}
		}
	}

	&__copyright {
		font-size: 14px;
		color: $platinum-dim;
	}

	&__legal {
		display: flex;
		gap: $space-lg;

		a {
			font-size: 14px;
			color: $platinum-dim;
			text-decoration: none;
			transition: color $transition-fast ease;

			&:hover {
				color: $electric-blue;
			}
		}
	}
}
</style>
