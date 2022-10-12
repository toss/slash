/* eslint-disable @typescript-eslint/no-var-requires */
const globby = require('globby');
const path = require('path');
const pnpapi = require('pnpapi');

const PROJECT_PATH = path.resolve(__dirname, '..');
const BASE_PATH = path.resolve(__dirname, 'docs');

const paths = globby
  .sync('**/*.md', {
    cwd: BASE_PATH,
  })
  .sort();

const groups = {};

for (const p of paths) {
  console.log(`${p}`);
  const { name } = pnpapi.findPackageLocator(`${PROJECT_PATH}/${p}`);

  if (groups[name] == null) {
    groups[name] = [];
  }

  const isIndex = p.endsWith('README.md');

  const id = p.replace(new RegExp(`^${BASE_PATH}`), '').replace(/\.md$/, '');

  if (isIndex) {
    groups[name].unshift(id);
  } else {
    groups[name].push(id);
  }
}

module.exports = {
  librariesSidebar: groups,
};
