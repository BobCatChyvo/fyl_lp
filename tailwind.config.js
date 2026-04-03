/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          dark: '#121212',
          card: '#1e1e1e',
          accent: '#d4af37', // Gold/Amber
          text: '#f3f4f6', 
          muted: '#9ca3af'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.5))' },
          '50%': { filter: 'drop-shadow(0 0 25px rgba(212,175,55,0.9))' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
