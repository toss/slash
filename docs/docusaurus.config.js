/* eslint-disable @typescript-eslint/no-var-requires */
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const pnpapi = require('pnpapi');
const path = require('path');

require('@babel/register')({
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  ignore: [
    path => {
      const locator = pnpapi.findPackageLocator(path);

      if (locator.name.startsWith('@toss/')) {
        return false;
      }

      return true;
    },
  ],
  cache: true,
});

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Slash libraries',
  tagline: 'A collection of TypeScript/JavaScript packages to build high-quality web services.',
  url: 'https://slash.page/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://static.toss.im/tds/favicon/favicon.ico',
  organizationName: 'toss',
  projectName: 'slash',
  i18n: {
    path: './i18n',
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
      },
      ko: {
        htmlLang: 'ko-KR',
      },
    },
  },
  themeConfig: {
    navbar: {
      title: 'Slash libraries',
      logo: {
        alt: 'Toss',
        src: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'common/utils/README',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/toss/slash',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: '/libraries/common/utils/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/toss/slash',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexPages: true,
        language: ['en', 'ko'],
      },
    ],
  ],
  plugins: [require.resolve('./scripts/webpack5-compat.js')],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: [require.resolve('./styles.css')],
        },
        docs: {
          path: './docs',
          routeBasePath: '/libraries',
          sidebarPath: require.resolve('./sidebars.libraries.js'),
          exclude: ['**/CHANGELOG.md'],
          editUrl: ({ docPath, locale }) => {
            const dirname = path.dirname(docPath);
            const markdownFilename = getFilename(docPath);
            const sourceFilename = getSourceFilename(markdownFilename, locale);
            const editUrl = `${GITHUB_EDIT_PAGE_PREFIX}/packages/${dirname}/${sourceFilename}`;
            return editUrl;
          },
        },
        pages: {
          path: 'pages',
          routeBasePath: '/',
          include: ['**/*.{js,jsx,ts,tsx,md,mdx,html}'],
          mdxPageComponent: '@theme/MDXPage',
        },
      },
    ],
  ],
  stylesheets: ['https://static.toss.im/tps/main.css', 'https://static.toss.im/tps/others.css'],
};

const GITHUB_EDIT_PAGE_PREFIX = 'https://github.com/toss/slash/edit/main';

/*
 @example
 input: twdk-next/src/components/TossNextApp/WebNavbarProvider/Navbar/type.generated.md
 output: type.generated.md
 */
function getFilename(path) {
  const names = path.split('/');
  const filename = names[names.length - 1];

  if (filename == null) {
    throw new Error(`path가 올바르지 않습니다. ${path}`);
  }

  return filename;
}

function getSourceFilename(markdownFilename, locale) {
  const isAutoGenerated = markdownFilename.endsWith('.tossdocs.md');

  if (isAutoGenerated) {
    return markdownFilename.replace('.tossdocs.md', '');
  }

  const isI18n = markdownFilename.endsWith('.i18n.md');

  if (isI18n) {
    return markdownFilename.replace('.i18n.md', `.${locale}.md`);
  }

  return markdownFilename;
}
