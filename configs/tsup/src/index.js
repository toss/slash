/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const tsup = require('tsup');

const defaultOptions = [
  {
    entry: ['./src/**/*.{ts,tsx}', '!./src/**/*.stories.{ts,tsx}', '!./src/**/*.spec.{ts,tsx}', '!./src/index.{ts,tsx}'],
    format: ['esm', 'cjs'],
    sourcemap: true,
    clean: true,
    dts: './src/index.ts',
  },
  {
    entry: ['./src/index.{ts,tsx}'],
    format: ['esm', 'cjs'],
    sourcemap: true,
    clean: true,
    dts: './src/index.ts',
    bundle: false,
  }
];

function resolveEntryPath(entry, basePath) {
  return entry.map(p => /^!/.test(p) ? path.join('!', basePath, p.slice(1)) : path.join(basePath, p));
}

function getExternals(basePath) {
  try {
    const pkg = require(path.join(basePath, 'package.json'));
    return [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ];
  } catch {
    throw new Error(`Failed to load package.json at ${basePath}`);
  }
}

function defineConfig(moreOptions = [], basePath) {
  const externals = getExternals(basePath ?? process.cwd());
  const options = defaultOptions.map(option => {
    if (option.entry && basePath) {
      option.entry = resolveEntryPath(option.entry, basePath)
    }

    return {
      ...option,
      externals,
    };
  });

  return tsup.defineConfig([
    ...options,
    ...moreOptions,
  ]);
}

module.exports = defineConfig;
