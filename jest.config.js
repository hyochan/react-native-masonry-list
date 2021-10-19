const expoPreset = require('jest-expo/jest-preset');

process.env.TZ = 'Asia/Seoul';

module.exports = {
  preset: 'react-native',
  automock: false,
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'svg', 'png', 'json'],
  globals: {
    'ts-jest': {babelConfig: true},
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/.history/',
  ],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  cacheDirectory: '.jest/cache',
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'ts-jest',
  },
  setupFiles: [...expoPreset.setupFiles],
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  /* eslint-disable */
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?(@react-native|react-native)|react-clone-referenced-element|@react-native-community|@unimodules|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules-*|native-base|dooboo-ui|@dooboo-ui|@sentry/.*|sentry-expo)',
  ],
  /* eslint-enable */
  haste: {
    defaultPlatform: 'ios',
    platforms: ['android', 'ios', 'native'],
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
};
