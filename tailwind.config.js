/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    height: {
      '28rem': '28rem', // Add your custom value here
      '15rem': '15rem',
      '13rem': '13rem',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

