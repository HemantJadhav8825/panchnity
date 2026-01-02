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
        gold: {
          50: '#F5E6D3',
          100: '#F0D9B8',
          200: '#E8C88A',
          300: '#D4AF37',
          400: '#B8941F',
          500: '#9A7A0F',
          600: '#7D5F0A',
          700: '#604505',
          800: '#432C03',
          900: '#261401',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

