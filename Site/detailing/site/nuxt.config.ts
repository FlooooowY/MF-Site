// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	devtools: { enabled: true },

	app: {
		head: {
			htmlAttrs: { lang: 'ru' },
			title: 'APEX Detailing — Премиум детейлинг в Москве',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'format-detection', content: 'telephone=no' },
				{
					name: 'description',
					content:
						'Защитная пленка PPF, виниловая оклейка, керамическое покрытие, полировка. Интерактивный 3D-конфигуратор. Гарантия 5 лет.',
				},
				{ name: 'theme-color', content: '#0A0F22' },
				{
					property: 'og:title',
					content: 'APEX Detailing — Премиум детейлинг в Москве',
				},
				{
					property: 'og:description',
					content: 'Первый детейлинг-центр с полным цифровым погружением',
				},
				{ property: 'og:type', content: 'website' },
				{ property: 'og:locale', content: 'ru_RU' },
			],
			link: [
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com',
					crossorigin: '',
				},
			],
		},
		pageTransition: { name: 'page', mode: 'out-in' },
	},

	modules: [
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/image',
		'@nuxtjs/google-fonts',
	],

	googleFonts: {
		families: {
			'Bebas Neue': true,
			Poppins: [300, 400, 500, 600, 700],
			Orbitron: [400, 500, 700],
		},
		display: 'swap',
		preload: true,
	},

	css: ['~/assets/scss/main.scss'],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@use "sass:color";
						@import "~/assets/scss/_variables.scss";
						@import "~/assets/scss/_mixins.scss";
					`,
				},
			},
		},
	},

	image: {
		quality: 80,
		format: ['webp', 'avif'],
	},

	nitro: {
		compressPublicAssets: true,
	},

	experimental: {
		viewTransition: true,
	},

	compatibilityDate: '2025-01-01',
})
