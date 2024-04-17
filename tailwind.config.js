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
        grayDark: '#2A2929',
      },
    },
  },
  plugins: [],
};
