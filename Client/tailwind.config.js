/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
    './public/index.html'
  ],
  theme: {
    extend: {
      width: {
        '1100': '1100px'

      },
      backgroundColor: {
        'primary': '#F5F5F5',
        'secondary': '#F8F8F8',
        'secondary1': '#1266dd',
        'secondary2': '#f73859',
        'danger': '#e3342f',
        'light': '#f8f9fa',
        'dark': '#343a40'
      },
      maxWidth: {
        '1100': '1100px'
      },
      cursor: {
        pointer: 'pointer'
      },
      flex: {
        '3': '3 3 0%',
      }
    },

  },
  plugins: [],
}

