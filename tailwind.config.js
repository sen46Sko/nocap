/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
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
      },
    },
  },
  plugins: [],
};
