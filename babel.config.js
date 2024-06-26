module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
        },
      },
    ],
    ['module:react-native-dotenv'],
    'react-native-reanimated/plugin',
  ],
};
