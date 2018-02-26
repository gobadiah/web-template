const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '../../..'),
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  setupFiles: [
    '<rootDir>/src/config/jest/setup.js',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/src/config/jest/setup-test-framework.js',
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'html',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  coverageDirectory: '<rootDir>/reports/coverage',
};
