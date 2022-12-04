/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      strokeWidth: {
        '5': '5px',
        '3': '3px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
