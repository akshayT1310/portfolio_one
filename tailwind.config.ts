import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx,json}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#050816',
        primary: '#2563EB',
        secondary: '#8B5CF6',
        accent: '#06B6D4',
        success: '#22C55E',
        muted: '#94A3B8'
      },
      boxShadow: {
        glow: '0 0 40px rgba(37, 99, 235, 0.35)'
      },
      backgroundImage: {
        aurora: 'radial-gradient(circle at 20% 20%, rgba(37,99,235,0.3), transparent 30%), radial-gradient(circle at 80% 0%, rgba(139,92,246,0.3), transparent 30%)'
      }
    }
  },
  plugins: []
} satisfies Config;
