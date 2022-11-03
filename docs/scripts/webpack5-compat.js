const path = require('path');

module.exports = function pluginWebpackCompat() {
  return {
    name: 'docusaurus-toss-plugin-webpack5-compat',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            react: path.dirname(require.resolve('react/package.json')),
            'react-dom': path.dirname(require.resolve('react-dom/package.json')),
            '@mdx-js/react': path.dirname(require.resolve('@mdx-js/react/package.json')),
          },
        },
      };
    },
  };
};
