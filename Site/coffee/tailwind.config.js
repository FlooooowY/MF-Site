/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				coffee: {
					dark: '#2D1B19',
					medium: '#4A2C2A',
					light: '#6B4423',
				},
				gold: {
					primary: '#D4AF37',
					light: '#E8D48B',
					glow: 'rgba(212, 175, 55, 0.15)',
				},
				cream: {
					DEFAULT: '#F8F4E9',
					dark: '#E8E0D0',
				},
				ceramic: {
					white: '#FDFCFA',
				},
				terracotta: {
					DEFAULT: '#C76B4C',
					hover: '#B55A3B',
					pressed: '#A04830',
				},
			},
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				inter: ['Inter', 'sans-serif'],
				fraunces: ['Fraunces', 'serif'],
			},
			fontSize: {
				hero: ['72px', { lineHeight: '1.1' }],
				'hero-mobile': ['40px', { lineHeight: '1.1' }],
				section: ['48px', { lineHeight: '1.2' }],
				'section-mobile': ['32px', { lineHeight: '1.2' }],
			},
			boxShadow: {
				card: '0 4px 24px rgba(45, 27, 25, 0.15)',
				'card-hover': '0 8px 40px rgba(45, 27, 25, 0.25)',
				'gold-glow': '0 0 40px rgba(212, 175, 55, 0.15)',
				button: '0 4px 16px rgba(199, 107, 76, 0.3)',
				inset: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
			},
			animation: {
				'pulse-cta': 'pulse-cta 5s ease-in-out infinite',
				shine: 'shine 5s ease-in-out infinite',
				steam: 'steam-rise 3s ease-out infinite',
				float: 'float 6s ease-in-out infinite',
				'rotate-slow': 'rotate 20s linear infinite',
				'fade-in': 'fadeIn 0.8s ease-out forwards',
				'slide-up': 'slideUp 0.8s ease-out forwards',
				'scale-in': 'scaleIn 0.5s ease-out forwards',
			},
			keyframes: {
				'pulse-cta': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
				},
				shine: {
					'0%, 90%, 100%': { transform: 'translateX(-100%) rotate(45deg)' },
					'95%': { transform: 'translateX(100%) rotate(45deg)' },
				},
				'steam-rise': {
					'0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
					'20%': { opacity: '0.8' },
					'100%': { transform: 'translateY(-100px) scale(2)', opacity: '0' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				rotate: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				fadeIn: {
					'0%': { opacity: '0', filter: 'blur(10px)' },
					'100%': { opacity: '1', filter: 'blur(0)' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(60px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
			},
			backgroundImage: {
				'coffee-gradient':
					'linear-gradient(180deg, #2D1B19 0%, #4A2C2A 50%, #6B4423 100%)',
				'gold-gradient': 'linear-gradient(180deg, #F8F4E9 0%, #E8D48B 100%)',
			},
		},
	},
	plugins: [],
}
