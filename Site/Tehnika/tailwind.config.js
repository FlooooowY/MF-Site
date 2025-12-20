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
				primary: {
					DEFAULT: '#0F1A3C',
					dark: '#0A1128',
					light: '#1E3A8A',
				},
				accent: {
					blue: '#3B82F6',
					purple: '#8B5CF6',
					cyan: '#06B6D4',
					glow: 'rgba(59, 130, 246, 0.15)',
				},
				surface: {
					DEFAULT: '#111827',
					light: '#1F2937',
					card: '#0D1424',
				},
			},
			fontFamily: {
				clash: ['Clash Grotesk', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				dm: ['DM Sans', 'sans-serif'],
			},
			fontSize: {
				'display-xl': ['80px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-lg': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-md': ['52px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'display-sm': ['40px', { lineHeight: '1.2' }],
				'body-lg': ['20px', { lineHeight: '1.6' }],
				body: ['18px', { lineHeight: '1.6' }],
				'body-sm': ['16px', { lineHeight: '1.5' }],
			},
			boxShadow: {
				glow: '0 0 20px rgba(59, 130, 246, 0.3)',
				'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
				'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
				card: '0 4px 24px rgba(0, 0, 0, 0.4)',
				'card-hover': '0 8px 40px rgba(59, 130, 246, 0.2)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-primary': 'linear-gradient(135deg, #0F1A3C 0%, #1E3A8A 100%)',
				'gradient-accent': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
				'gradient-card':
					'linear-gradient(180deg, rgba(30, 58, 138, 0.1) 0%, rgba(15, 26, 60, 0.8) 100%)',
			},
			animation: {
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				float: 'float 6s ease-in-out infinite',
				matrix: 'matrix 20s linear infinite',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.3s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				shimmer: 'shimmer 2s linear infinite',
			},
			keyframes: {
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				matrix: {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '0% 100%' },
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-down': {
					'0%': { opacity: '0', transform: 'translateY(-10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
			screens: {
				xs: '375px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
				'3xl': '1920px',
			},
		},
	},
	plugins: [],
}
