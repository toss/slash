/* eslint-disable @typescript-eslint/no-var-requires */
const globby = require('globby');
const path = require('path');
const pnpapi = require('pnpapi');

const BASE_PATH = path.resolve(__dirname, '../packages');

const paths = globby
  .sync('**/*.md', {
    cwd: BASE_PATH,
  })
  .filter(x => !x.endsWith('/CHANGELOG.md'))
  .sort();

const groups = {};

for (const p of paths) {
  const { name } = pnpapi.findPackageLocator(`${BASE_PATH}/${p}`);

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
