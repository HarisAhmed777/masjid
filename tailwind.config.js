/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        lg: '1440px', // Define the large screen breakpoint if not already defined
      },
      maxWidth: {
        'contt': '1328px',
        'smallcontt':'600px'
      },
      padding: {
        '2px': '12px',
      },
      margin: {
        '10px': '100px',
      },
      backgroundImage:{
        'bannerimg':"url('./assets/images/banner1.jpg')"
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.contt': {
          '@apply max-w-[1320px] lg:max-w-[contt] ml-10px': {},
        },
        '.smallcontt':{
          '@apply max-w-[600px] ms-4 me-4':{}
        }
      });
    },
  ],
}