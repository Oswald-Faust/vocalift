/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        dark: '#0A0914',
        darkBlue: '#13111F',
        primary: {
          50: '#E6F1FF',
          100: '#CCE4FF',
          200: '#99C9FF',
          300: '#66ADFF',
          400: '#3392FF',
          500: '#0076FF', // Primary blue
          600: '#005ECC',
          700: '#004799',
          800: '#002F66',
          900: '#001833',
        },
        accent: {
          50: '#F0E7FF',
          100: '#E1CEFF',
          200: '#C39DFF',
          300: '#A56CFF',
          400: '#873BFF',
          500: '#680AFF', // Vibrant purple
          600: '#5308CC',
          700: '#3E0699',
          800: '#2A0466',
          900: '#150233',
        },
        cyan: {
          50: '#E6FBFF',
          100: '#CCF7FF',
          200: '#99EFFF',
          300: '#66E7FF',
          400: '#33DFFF',
          500: '#00D7FF', // Electric cyan
          600: '#00ACCC',
          700: '#008199',
          800: '#005666',
          900: '#002B33',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};