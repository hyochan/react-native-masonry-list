import {cleanup} from '@testing-library/react-native';

// Cleanup after each case.
afterEach(cleanup);

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line jest/no-jasmine-globals
  fail(err);
});
