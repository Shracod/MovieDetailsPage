/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tmdb: {
          red: '#E50914',
          redHover: '#ff1a1a',
          dark: '#000000',
          darker: '#000000',
          card: '#111111',
          border: '#222222',
        },
      },
    },
  },
  plugins: [],
}
