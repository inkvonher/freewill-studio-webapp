/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f7f4ed',
        charcoal: '#070707',
        ink: '#111111',
        gold: '#b87905',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Anton', '"Arial Narrow"', 'Impact', 'sans-serif'],
        condensed: ['Anton', '"Arial Narrow"', '"Roboto Condensed"', 'Impact', 'sans-serif'],
      },
      boxShadow: {
        ink: '0 24px 70px rgba(17,17,17,0.08)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
