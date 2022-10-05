import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import builtins from 'builtin-modules';
import path from 'path';
import packageJson from './package.json';

const external = pkg => {
  const externals = [...Object.keys({ ...packageJson.dependencies, ...packageJson.peerDependencies }), ...builtins];

  return externals.some(externalPkg => {
    return pkg === externalPkg || pkg.startsWith(`${externalPkg}/`);
  });
};

const extensions = ['.js', '.ts', '.jsx', '.tsx'];

const plugins = [
  resolve({
    extensions,
  }),
  commonjs(),
  babel({
    extensions,
    babelHelpers: 'runtime',
  }),
];

const input = './src/index.ts';

export default [
  {
    input,
    plugins,
    output: {
      dir: path.dirname(packageJson.publishConfig.module),
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: path.dirname(input),
    },
    external,
  },
  {
    input,
    plugins,
    output: {
      file: packageJson.publishConfig.main,
      format: 'cjs',
    },
    external,
  },
];
