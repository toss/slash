import { defineConfig } from 'tsup';
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp';

export default defineConfig({
  name: 'tsup',
  target: 'node16',
  format: ['cjs', 'esm'],
  outDir: 'built',
  splitting: false,
  dts: {
    resolve: true,
    entry: './src/index.server.ts',
  },
  esbuildPlugins: [nodePlugin(), pnpPlugin()],
});

function nodePlugin() {
  return {
    name: 'resolveNode',
    setup(build) {
      build.onResolve({ filter: /^node:/ }, args => {
        // node: 를 없앤다
        return { external: true, path: args.path.slice('node:'.length) };
      });
    },
  };
}
