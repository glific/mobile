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
    '!**/navigations/**',
    '!**/babel.config.js',
    '!**/jest.config.js',
    '!**/utils/**',
    '!**/helper.ts',
    '!**/App.tsx',
    '!**/.eslintrc.js',
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', './__mocks__/setupTests.js'],
};
