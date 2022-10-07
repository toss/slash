const path = require('path');
const fs = require('fs');

const ROOT_DIR = __dirname;

module.exports = {
  projects: getJestProjects(),
  testPathIgnorePatterns: ['<rootDir>/packages/'],
  modulePathIgnorePatterns: ['fixture'],
  reporters: ['default', require.resolve('jest-junit')],
};

function getJestProjects() {
  const packagePaths = ['packages/common', 'packages/react'].flatMap(dir => {
    const parent = path.resolve(ROOT_DIR, dir);

    const dirs = fs.readdirSync(parent);

    return dirs.map(d => path.join(parent, d));
  });

  return packagePaths.flatMap(packagePath => {
    const packageJestConfig = path.resolve(packagePath, 'jest.config.js');

    if (!fs.existsSync(packageJestConfig)) {
      return [];
    }

    const config = require(packageJestConfig);

    if (config.projects) {
      return config.projects.map(project => {
        return project.replace(/<rootDir>/g, packagePath);
      });
    }

    return [packageJestConfig];
  });
}
