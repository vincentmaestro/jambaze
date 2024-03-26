/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'desktop': {'max': '1535px'},

      'laptop': {'max': '1280px'},

      'laptop_m': {'max': '1024px'},

      'laptop_s': {'max': '992px'},

      'tablet': {'max': '768px'},

      'tablet_s': {'max': '640px'},

      'mobile': {'max': '530px'},

      'mobile_m': {'max': '375px'},

      'mobile_s': {'max': '320px'},
    },
    extend: {},
  },
  plugins: [],
}