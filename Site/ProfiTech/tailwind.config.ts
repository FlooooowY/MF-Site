import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF', // Классический синий
          light: '#3B82F6',
          dark: '#1E3A8A',
          hover: '#2563EB',
        },
        accent: {
          DEFAULT: '#DC2626', // Яркий красный акцент
          dark: '#B91C1C',
          light: '#EF4444',
        },
        secondary: {
          DEFAULT: '#059669', // Зеленый
          light: '#10B981',
          dark: '#047857',
        },
        purple: {
          DEFAULT: '#7C3AED', // Фиолетовый
          light: '#8B5CF6',
          dark: '#6D28D9',
        },
        teal: {
          DEFAULT: '#0D9488', // Бирюзовый
          light: '#14B8A6',
          dark: '#0F766E',
        },
        text: {
          primary: '#1F2937', // Темно-серый
          secondary: '#6B7280', // Средне-серый
          light: '#9CA3AF', // Светло-серый
          dark: '#111827', // Очень темный
          muted: '#4B5563', // Приглушенный
        },
        background: {
          DEFAULT: '#FFFFFF', // Белый фон
          card: '#FFFFFF', // Белые карточки
          light: '#F9FAFB', // Очень светлый серый для секций
          dark: '#F3F4F6', // Светло-серый
        },
      },
      fontFamily: {
        sans: ['TT Commons Pro', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(30, 64, 175, 0.15)',
      },
      borderRadius: {
        card: '12px',
        button: '10px',
      },
    },
  },
  plugins: [],
}
export default config

