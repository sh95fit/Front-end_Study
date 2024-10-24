/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./index.html"
  ],
  theme: {
    extend: {},
    fontSize: {
      '4xl': ['2.4rem', {
        lineHeight: '2.5rem',
        letterSpacing: '-0.005em',
        fontWeight: '800',
      }],
    }
  },
  plugins: [],
}

