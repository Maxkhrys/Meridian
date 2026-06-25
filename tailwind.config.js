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
          bright: '#34d399',
          glow: '#5eead4',
          pale: '#a7f3d0',
        },
        teal: {
          DEFAULT: '#2dd4bf',
          glow: '#5eead4',
        },
        cyan: {
          DEFAULT: '#22d3ee',
          glow: '#67e8f9',
        },
        violet: {
          DEFAULT: '#8b5cf6',
        },
        text: {
          primary: '#f5f5f5',
          secondary: '#888888',
          muted: '#444444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero: ['80px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        section: ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        glow: '0 0 60px rgba(16, 185, 129, 0.15)',
        'glow-sm': '0 0 30px rgba(16, 185, 129, 0.12)',
        'glow-lg': '0 0 100px rgba(16, 185, 129, 0.25)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(16,185,129,0.5)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 0 6px rgba(16,185,129,0)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scrollCue: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '40%': { opacity: '1' },
          '80%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        floatY: 'floatY 7s ease-in-out infinite',
        scrollCue: 'scrollCue 1.8s ease-in-out infinite',
      },
      backgroundImage: {
        'emerald-glow':
          'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
