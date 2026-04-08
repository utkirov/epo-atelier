// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts}',
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#111111',
        border: '#1E1E1E',
        gold: '#C9A96E',
        'gold-dim': '#8A6A3A',
        text: '#F5F0E8',
        muted: '#6B6560',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.75rem', { lineHeight: '1rem' }],
        xs: ['0.875rem', { lineHeight: '1.25rem' }],
        sm: ['1rem', { lineHeight: '1.6' }],
        md: ['1.25rem', { lineHeight: '1.5' }],
        lg: ['1.5rem', { lineHeight: '1.4' }],
        xl: ['2rem', { lineHeight: '1.2' }],
        '2xl': ['3rem', { lineHeight: '1.15' }],
        '3xl': ['4rem', { lineHeight: '1.1' }],
        '4xl': ['5rem', { lineHeight: '1.05' }],
        '5xl': ['6rem', { lineHeight: '1' }],
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
    },
  },
} satisfies Config
