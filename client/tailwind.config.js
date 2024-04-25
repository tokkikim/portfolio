/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans-kr': ['NotoSansKR', 'sans-serif'],
      },
      animation: {
        'ping-py': 'ping-py 2s infinite',
        move: 'move 10s 1 forwards',
        loding: 'loding 2s 1',
      },
      keyframes: {
        'ping-py': {
          '0%': { paddingTop: '2rem', paddingBottom: '2rem', opacity: 1 },
          '100%': {
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            opacity: 0.1,
          },
        },
        move: {
          '0%': { top: 0 },
          '20%': { top: 0 },
          '40%': { top: '-6em' },
          '60%': { top: '-11.2em' },
          '80%': { top: '-17em' },
          '100%': { top: '-22.8em' },
        },
        loding: {
          '0%': { height: '100%' },
          '100%': { height: '0' },
        },
      },
    },
  },
  plugins: [],
};
