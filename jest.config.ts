import { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  // contains a set of configuration options for Jest, such as the test environment, the test runner, and the test file patterns.
  preset: 'ts-jest',
  // allows you to specify the environment in which your tests will run.
  testEnvironment: 'node',
  // allows you to specify the file patterns for Jest to search for test files.
  testMatch: ['**/**/*.test.ts'],
  // determines the amount of output produced by Jest during test runs.
  verbose: true
};

export default jestConfig;