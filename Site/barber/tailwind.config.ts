import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				// Primary Colors
				'deep-indigo': '#2D2B55',
				'velvet-night': '#1A1835',
				'royal-gold': '#D4AF37',
				charcoal: '#2D2D2D',
				// Secondary Colors
				ivory: '#FEFDF9',
				smoke: '#8B8B9E',
				burgundy: '#722F37',
				emerald: '#2E8B57',
				obsidian: '#0D0C1A',
				// Gold variants
				'gold-light': '#F4E4BA',
				'gold-dark': '#B8860B',
			},
			fontFamily: {
				cormorant: ['Cormorant Garamond', 'serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				'roboto-mono': ['Roboto Mono', 'monospace'],
			},
			fontSize: {
				hero: ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'hero-mobile': [
					'44px',
					{ lineHeight: '1.1', letterSpacing: '-0.02em' },
				],
				section: ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'section-mobile': [
					'32px',
					{ lineHeight: '1.2', letterSpacing: '-0.01em' },
				],
				card: ['32px', { lineHeight: '1.3' }],
				'card-mobile': ['24px', { lineHeight: '1.3' }],
			},
			backgroundImage: {
				'gradient-hero':
					'linear-gradient(180deg, #2D2B55 0%, #1A1835 50%, #0D0C1A 100%)',
				'gradient-gold':
					'linear-gradient(135deg, #D4AF37 0%, #F4E4BA 25%, #D4AF37 50%, #B8860B 75%, #D4AF37 100%)',
				'gradient-card':
					'linear-gradient(145deg, rgba(212, 175, 55, 0.1) 0%, rgba(45, 43, 85, 0.8) 100%)',
				'gradient-button': 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
			},
			boxShadow: {
				gold: '0 4px 15px rgba(212, 175, 55, 0.3)',
				'gold-hover': '0 8px 25px rgba(212, 175, 55, 0.4)',
				'gold-intense': '0 15px 35px rgba(212, 175, 55, 0.5)',
				card: '0 10px 30px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)',
				'card-hover':
					'0 20px 50px rgba(0, 0, 0, 0.4), 0 10px 30px rgba(212, 175, 55, 0.1)',
			},
			animation: {
				'velvet-shimmer': 'velvet-shimmer 20s linear infinite',
				'logo-engrave': 'logo-engrave 2.5s ease-out forwards',
				'fade-up': 'fade-up 0.8s ease-out forwards',
				'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
				shimmer: 'shimmer 2s linear infinite',
			},
			keyframes: {
				'velvet-shimmer': {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '200px 200px' },
				},
				'logo-engrave': {
					'0%': { strokeDashoffset: '1000', fillOpacity: '0' },
					'70%': { strokeDashoffset: '0', fillOpacity: '0' },
					'100%': { strokeDashoffset: '0', fillOpacity: '1' },
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'pulse-gold': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
			transitionTimingFunction: {
				standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
				decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
				accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
				elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
				mechanical: 'cubic-bezier(0.7, 0, 0.3, 1)',
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
				'30': '7.5rem',
			},
		},
	},
	plugins: [],
}

export default config

