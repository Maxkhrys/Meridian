/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep, slightly emerald-tinted darks — reads richer than pure black.
        background: '#0a0f0d',
        surface: {
          DEFAULT: '#101714',
          light: '#16201c',
        },
        border: '#21302b',
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
          primary: '#f3f6f5',
          secondary: '#9aa5a1',
          muted: '#5c6b66',
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
        glow: '0 0 60px rgba(16, 185, 129, 0.18)',
        'glow-sm': '0 0 30px rgba(16, 185, 129, 0.15)',
        'glow-lg': '0 0 100px rgba(16, 185, 129, 0.28)',
        'glow-cyan': '0 0 60px rgba(34, 211, 238, 0.18)',
      },
      keyframes: {
        enterUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
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
        enterUp: 'enterUp 0.5s ease-out both',
      },
      backgroundImage: {
        'emerald-glow':
          'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
