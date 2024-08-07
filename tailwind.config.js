/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        robotoBold: 'Roboto-Bold',
        robotoMedium: 'Roboto-Medium',
        robotoRegular: 'Roboto-Regular',
      },
      colors: {
        grayLight: '#BEBABA',
        grayMedium: '#5E5959',
        grayDark: '#2A2929',
        blue: '#5E82FF',
        orange: '#E8751A',
        red: '#FF0000',
        green: '#17A400',
      },
    },
  },
  plugins: [],
};
