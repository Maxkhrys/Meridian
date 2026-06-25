/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: {
          DEFAULT: '#0f0f0f',
          light: '#141414',
        },
        border: '#1a1a1a',
        emerald: {
          DEFAULT: '#10b981',
        },
        text: {
          primary: '#f5f5f5',
          secondary: '#888888',
          muted: '#444444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['80px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        section: ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        glow: '0 0 60px rgba(16, 185, 129, 0.15)',
        'glow-sm': '0 0 30px rgba(16, 185, 129, 0.12)',
      },
      backgroundImage: {
        'emerald-glow':
          'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
