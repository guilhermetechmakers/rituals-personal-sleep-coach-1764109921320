/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Rituals Design System Colors
        primary: {
          DEFAULT: '#2C3E8A', // Calm Indigo
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#A79BE2', // Soft Lavender
          foreground: '#FFFFFF',
        },
        neutral: {
          dark: '#111318', // Charcoal
          light: '#F6F7FB', // Paper
        },
        success: '#2ECC9B', // Mint
        warning: '#F5A623', // Amber
        error: '#FF6B6B', // Coral
        border: '#E9EDF5',
        input: '#E9EDF5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['28px', { lineHeight: '36px', fontWeight: '600' }],
        h2: ['22px', { lineHeight: '28px', fontWeight: '600' }],
        body: ['16px', { lineHeight: '22px', fontWeight: '400' }],
        small: ['13px', { lineHeight: '18px', fontWeight: '400' }],
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '12px',
        md: '10px',
        sm: '8px',
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(16, 24, 40, 0.04)',
        elevated: '0 4px 6px rgba(16, 24, 40, 0.08)',
      },
    },
  },
  plugins: [],
}