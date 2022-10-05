import path from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json';

const external = pkg => {
  const externals = Object.keys({ ...packageJson.dependencies, ...packageJson.peerDependencies });

  return externals.some(externalPkg => {
    return pkg.startsWith(externalPkg);
  });
};

const extensions = ['.ts'];

function buildJS(input, output, format) {
  const isESMFormat = format === 'es';
  return {
    input,
    external,
    output: [
      {
        format,
        ...(isESMFormat
          ? { dir: output, entryFileNames: '[name].mjs', preserveModules: true, preserveModulesRoot: 'src' }
          : { file: output }),
      },
    ],
    plugins: [
      resolve({
        extensions,
      }),
      isESMFormat && commonjs(),
      babel({
        extensions,
        babelHelpers: 'runtime',
        rootMode: 'upward',
      }),
    ].filter(Boolean),
  };
}

function buildCJS(input) {
  const parsed = path.parse(input);
  return buildJS(`src/${input}`, `dist/${parsed.dir}/${parsed.name}.js`, 'cjs');
}

function buildESM(input) {
  return buildJS(`src/${input}`, 'esm', 'es');
}

function buildDTS(input, format) {
  const parsed = path.parse(input);
  const isESMFormat = format === 'es';
  const dir = `${isESMFormat ? 'dist' : 'esm'}/${parsed.dir}/`;
  const ext = isESMFormat ? '.ts' : '.mts';

  return {
    input: `./types/${input}`,
    output: [{ file: `${dir}${parsed.name}${ext}`, format }],
    plugins: [dts()],
  };
}

function buildCJSDTS(input) {
  return buildDTS(input, 'cjs');
}

function buildESMDTS(input) {
  return buildDTS(input, 'es');
}

export default [
  // 라이브러리 코드 번들링
  buildCJS('index.ts'),
  buildESM('index.ts'),
  buildCJS('typed/index.ts'),
  buildESM('typed/index.ts'),

  // Typescript Declaration 번들링
  buildCJSDTS('index.d.ts'),
  buildCJSDTS('typed/index.d.ts'),
  buildESMDTS('index.d.ts'),
  buildESMDTS('typed/index.d.ts'),
];
