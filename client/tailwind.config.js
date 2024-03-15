/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poopins: 'Poppins'
      },
      colors: {
        primary: {
          300: '#80BEFC',
          400: '#3C4071',
          450: '#2F3367',
          500: '#007DFA',
          900: '#141E30',
        },
        secondary: {
          100: '#F5F5F7',
          600: '#868AA5',
        },
      }
    }
  },
  plugins: [],
};