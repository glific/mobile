module.exports = {
    preset: 'jest-expo',
    transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
    ],
    collectCoverage: true,
    collectCoverageFrom: [
      '**/*.{js,jsx,ts,tsx}',
      '!**/coverage/**',
      '!**/node_modules/**',
      '!**/babel.config.js',
      '!**/jest.config.js',
      '!**/navigations/**',
      '!**/utils/**',
      '!**/helper.ts',
      '!**/App.tsx',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    coverageReporters: ['lcov'],
};