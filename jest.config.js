const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0, // TODO ignore this option when merge into develop
      lines: 0,
      statements: 0
    }
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest'
  },
  testMatch: [
    '<rootDir>/test/**/*.test.(ts|js)'
  ],
  testEnvironment: 'node',
  cacheDirectory: '<rootDir>/.cache/unit',
};
