/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./apps/idea-dropper/**/*.{html,js,jsx,ts,tsx}",
    "./libs/shared/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
