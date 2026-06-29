/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Iridescent noir. NOTE: the accent token *names* are kept from the
        // previous palette to avoid churn, but their hues are repurposed:
        //   emerald = violet (primary)   teal = magenta   cyan = cyan
        //   violet  = indigo (deep)
        background: '#08080c',
        surface: {
          DEFAULT: '#0e0e16',
          light: '#15151f',
        },
        border: '#242436',
        emerald: {
          DEFAULT: '#8b5cf6',
          bright: '#a78bfa',
          glow: '#c4b5fd',
          pale: '#ddd6fe',
        },
        teal: {
          DEFAULT: '#ec4899',
          glow: '#f9a8d4',
        },
        cyan: {
          DEFAULT: '#22d3ee',
          glow: '#67e8f9',
        },
        violet: {
          DEFAULT: '#6366f1',
        },
        text: {
          primary: '#f3f3f8',
          secondary: '#a0a0b8',
          muted: '#5e5e78',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero: ['80px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        section: ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        glow: '0 0 60px rgba(139, 92, 246, 0.22)',
        'glow-sm': '0 0 30px rgba(139, 92, 246, 0.18)',
        'glow-lg': '0 0 110px rgba(139, 92, 246, 0.32)',
        'glow-cyan': '0 0 60px rgba(34, 211, 238, 0.20)',
        'glow-magenta': '0 0 60px rgba(236, 72, 153, 0.20)',
      },
      keyframes: {
        enterUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(139,92,246,0.5)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 0 6px rgba(139,92,246,0)' },
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
        // Animated iridescent gradient sweep for display text.
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        floatY: 'floatY 7s ease-in-out infinite',
        scrollCue: 'scrollCue 1.8s ease-in-out infinite',
        enterUp: 'enterUp 0.5s ease-out both',
        gradientShift: 'gradientShift 8s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
      },
      backgroundImage: {
        'emerald-glow':
          'radial-gradient(circle at center, rgba(139, 92, 246, 0.18) 0%, transparent 70%)',
        'iris-grad':
          'linear-gradient(110deg, #8b5cf6 0%, #22d3ee 38%, #ec4899 72%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
};
