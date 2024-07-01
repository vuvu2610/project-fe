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
      },
      boxShadow: {
        'custom': '0 2px 12px rgba(0,0,0,0.19), 0 3px 6px rgba(0,0,0,0.23)',
      },
    },
  },
  plugins: [],
}

