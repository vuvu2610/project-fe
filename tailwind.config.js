/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#81c408',
        'footer': '#45595b'
      },
      maxWidth:{
        'width-page': '1240px',
      }
      
    },
  },
  plugins: [],
}

