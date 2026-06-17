/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#106EBE', 600: '#0e5fa6', 700: '#0b4d87' },
        mint:  { DEFAULT: '#0FFCBE', 600: '#0ad6a3' },
        ink: {
          950: '#05080c',
          900: '#080d14',
          850: '#0b131d',
          800: '#0f1925',
          700: '#16273a',
        },
        slatey: '#93a4b8',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans:    ['Manrope', 'system-ui', 'sans-serif'],
        mono:    ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { container: '1200px' },
    },
  },
  plugins: [],
}
