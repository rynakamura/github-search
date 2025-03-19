/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {    
      colors: {
        palette: {
          light: '#F5F3FF',
          primary: '#7C3AED',
          dark: '#6D28D9',
        },
      },
      fontFamily: {
        primary: ['Poppins'],
        secondary: ['"Open Sans"'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms') 
  ],
}

