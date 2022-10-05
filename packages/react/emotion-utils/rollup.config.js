import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const external = pkgName => {
  const externals = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });

  return externals.some(externalPkg => {
    return pkgName === externalPkg || pkgName.startsWith(`${externalPkg}/`);
  });
};

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
        babelrc: true,
        extensions,
        babelHelpers: 'runtime',
        rootMode: 'upward',
        plugins: ['@babel/transform-runtime'],
      }),
    ],
    preserveModules: isESMFormat,
  };
}

function buildCJS(input) {
  const filename = path.parse(input).name;
  return buildJS(input, `dist/${filename}.js`, 'cjs');
}

function buildESM(input) {
  return buildJS(input, path.dirname(pkg.publishConfig.module), 'es');
}

export default [buildCJS('src/index.ts'), buildESM('src/index.ts')];
