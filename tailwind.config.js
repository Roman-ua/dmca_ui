/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        inputBackground: '#ffffff',
        mainBackground: '#fcfcfc',
        mainBlue: '#0277ff',
        sideBarBlue: '#005ab2',
      },
    },
  },
  plugins: [],
};
