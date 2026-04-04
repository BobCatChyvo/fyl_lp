import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#120E15',
        card: '#1A1523',
        primary: '#E11D48',
        secondary: '#A78BFA',
        lavender: '#A78BFA',
        muted: '#8B5CF6',
        textMain: '#FFFFFF',
        textMuted: '#D1D5DB',
        border: '#2e263d'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      }
    },
  },
  plugins: [],
}
export default config
