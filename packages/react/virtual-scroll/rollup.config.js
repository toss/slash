import path from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import packageJson from './package.json';

const external = pkg => {
  const externals = Object.keys({ ...packageJson.dependencies, ...packageJson.peerDependencies });

  return externals.some(externalPkg => {
    return pkg.startsWith(externalPkg);
  });
};

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

function buildJS(input, output, format) {
  const isESMFormat = format === 'es';
  return {
    input,
    external,
    output: [
      {
        format,
        ...(isESMFormat ? { dir: output } : { file: output }),
      },
    ],
    plugins: [
      resolve({
        extensions,
      }),
      commonjs(),
      babel({
        extensions,
        babelHelpers: 'runtime',
        rootMode: 'upward',
      }),
      json(),
      url(),
    ],
    preserveModules: isESMFormat,
  };
}

function buildCJS(input) {
  const filename = path.parse(input).name;
  return buildJS(input, `dist/${filename}.js`, 'cjs');
}

function buildESM(input) {
  return buildJS(input, path.dirname(packageJson.publishConfig.module), 'es');
}

export default [buildCJS('src/index.ts'), buildESM('src/index.ts')];
