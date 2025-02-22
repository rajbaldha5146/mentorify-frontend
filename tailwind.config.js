/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4540E1',
        secondary: '#FFB800',
        accent: '#FFE5A3',
      },
      borderRadius: {
        'blob': '40% 60% 70% 30% / 40% 50% 60% 50%',
      },
      fontSize: {
        '6xl': '4rem',
        '5xl': '3rem',
        '4xl': '2.5rem',
        '3xl': '2rem',
        '2xl': '1.75rem',
        'xl': '1.25rem',
        'lg': '1.125rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  plugins: [],
};
