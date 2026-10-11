/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FDFCF9',
          100: '#FAF8F5',
          200: '#F4EFE6',
          300: '#E9E2D5',
          400: '#D5C9B3',
        },
        ivory: '#F7F4EE',
        wood: {
          100: '#D9C8B4',
          200: '#C2A788',
          300: '#9E7D59',
          400: '#7A5B3E',
          500: '#5C4028',
          600: '#47311F',
          700: '#382517',
          800: '#2A1B10',
          900: '#1C120A',
        },
        charcoal: {
          900: '#141413',
          800: '#1C1A18',
          700: '#2C2926',
          600: '#45423E',
          500: '#69645E',
          400: '#948F87',
        },
        navy: {
          900: '#182032',
          950: '#0F1624'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.3em',
      }
    },
  },
  plugins: [],
}
