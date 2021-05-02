const {defaults: tsJestConfig} = require('ts-jest/presets');

module.exports = {
  ...tsJestConfig,
  clearMocks: true,
  preset: 'react-native',
  transform: {
    ...tsJestConfig.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(@react-native|react-native)/)'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  modulePathIgnorePatterns: [
    '<rootDir>/lib/',
    '<rootDir>/node_modules/',
    '<rootDir>/.history/',
  ],
  cacheDirectory: '.jest/cache',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  haste: {
    defaultPlatform: 'ios',
    platforms: ['android', 'ios', 'native'],
  },
  coveragePathIgnorePatterns: ['/node_modules/', '__tests__'],
};
