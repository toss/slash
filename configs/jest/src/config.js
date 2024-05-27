// The basic policy of configuration is to delegate configs to the users and extend (override) them as necessary.
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const defaultSettings = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/esm/'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleDirectories: ['node_modules', 'src'],
};

function settings(extraSettings) {
  const settings = {
    ...defaultSettings,
    ...extraSettings,
    setupFilesAfterEnv: handleSetupFilesAfterEnv(extraSettings),
    testMatch: handleTestMatch(extraSettings),
    displayName: handleDisplayName(extraSettings),
  };

  if (settings.rootDir == null) {
    console.error(
      [
        `jest.config.js에서 rootDir를 __dirname으로 설정해주세요.`,
        '',
        '예시 코드:',
        '// jest.config.js',
        `module.exports = require('@toss/jest').config({`,
        `  rootDir: __dirname,`,
        `});`,
      ].join('\n')
    );
  }

  return settings;
}

function handleDisplayName(extraSettings) {
  if (extraSettings?.rootDir != null) {
    const packageJSONPath = path.resolve(extraSettings.rootDir, 'package.json');

    if (fs.existsSync(packageJSONPath)) {
      return require(packageJSONPath).name;
    }
  }

  return undefined;
}

function handleTestMatch(extraSettings) {
  if (extraSettings?.rootDir != null && extraSettings.testMatch == null) {
    return [
      path.join(extraSettings.rootDir, '**/*.{spec,test}.{js,jsx,ts,tsx}'),
      path.join(extraSettings.rootDir, '**/__tests__/**/*.{js,jsx,ts,tsx}'),
    ];
  }

  return defaultSettings.testMatch;
}

function handleSetupFilesAfterEnv(extraSettings) {
  if (extraSettings?.rootDir != null) {
    const setupFilesAfterEnv = extraSettings.setupFilesAfterEnv ?? defaultSettings.setupFilesAfterEnv;

    return setupFilesAfterEnv
      .map(file => path.resolve(extraSettings.rootDir, file.replace('<rootDir>/', '')))
      .filter(filepath => fs.existsSync(filepath));
  }

  return defaultSettings.setupFilesAfterEnv;
}

module.exports = Object.assign(settings, defaultSettings);
