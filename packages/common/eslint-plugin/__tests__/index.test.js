/* eslint-disable @typescript-eslint/no-var-requires */
const ESLintTester = require('eslint').RuleTester;
const rules = require('../src').rules;

ESLintTester.setDefaultConfig({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const tests = {
  'ban-characters': {
    valid: ['foo', 'bar', 'React'],
    invalid: [
      {
        code: 'Angular',
        errors: [
          {
            messageId: 'isCharacterBanned',
            data: {
              bannedCharacter: 'Angular',
            },
          },
        ],
        options: [{ bannedCharactersRegex: 'Angular' }],
      },
      {
        code: 'Angular',
        errors: [
          {
            messageId: 'isCharacterBanned',
            data: {
              bannedCharacter: 'A',
            },
          },
          {
            messageId: 'isCharacterBanned',
            data: {
              bannedCharacter: 'n',
            },
          },
        ],
        options: [{ bannedCharactersRegex: '(A|n)' }],
      },
    ],
  },
  'ban-http-link': {
    valid: [
      `'https://toss.im'`,
      `'다음 링크 https://toss.im 를 참조해주세요'`,
      `320`,
      `/foo/`,
      `if (true) {} else {}`,
      `const http = 'http';`,
      `<a href="https://toss.im" />`,
    ],
    invalid: [
      {
        code: `'http://toss.im'`,
        output: `'https://toss.im'`,
        errors: [
          {
            messageId: 'isHttpBanned',
          },
        ],
      },
      {
        code: `<a href="http://toss.im" />`,
        output: `<a href="https://toss.im" />`,
        errors: [
          {
            messageId: 'isHttpBanned',
          },
        ],
      },
    ],
  },
  'meta-props': {
    valid: [
      `function foo() {}`,
      `foo.metaProps = { logger: myLogger };`,
      `foo.metaProps = { loggerParams: {} };`,
      `foo.metaProps = { logger: myLogger, loggerParams: {} };`,
      `foo.metaProps = { openGraph: { title: 'dd' } };`,
    ],
    invalid: [
      {
        code: `foo.metaProps += 1;`,
        errors: [
          {
            messageId: 'useEqualOperator',
          },
        ],
      },
      {
        code: `foo.metaProps = 1;`,
        errors: [
          {
            messageId: 'useObjectExpression',
          },
        ],
      },
      {
        code: `foo.metaProps = { [myStringProperty]: 'bar' };`,
        errors: [
          {
            messageId: 'useStringLiteralProperty',
          },
        ],
      },
      {
        code: `foo.metaProps = { foo: 'bar' };`,
        errors: [
          {
            messageId: 'invalidPropertyName',
          },
        ],
      },
    ],
  },
  'ban-toss-github-io': {
    valid: [
      `'https://static-docs.toss.im'`,
      `320`,
      `/foo/`,
      `if (true) {} else {}`,
      `const http = 'http';`,
      `<a href="https://toss.im" />`,
    ],
    invalid: [
      {
        code: `'https://toss.github.io/static_docs/faq/some-faq'`,
        output: `'https://static-docs.toss.im/faq/some-faq'`,
        errors: [
          {
            messageId: 'isTossGithubIOStaticDocsBanned',
          },
        ],
      },
      {
        code: `<a href="https://toss.github.io/static_docs/faq/some-faq" />`,
        output: `<a href="https://static-docs.toss.im/faq/some-faq" />`,
        errors: [
          {
            messageId: 'isTossGithubIOStaticDocsBanned',
          },
        ],
      },
      {
        code: `'supertoss://lab?url=https%3A%2F%2Ftoss.github.io%2Fstatic_docs%2Ffaq%2Fsome-faq'`,
        output: `'supertoss://lab?url=https%3A%2F%2Fstatic-docs.toss.im%2Ffaq%2Fsome-faq'`,
        errors: [
          {
            messageId: 'isTossGithubIOStaticDocsBanned',
          },
        ],
      },
      {
        code: `'https://toss.github.io/some-path'`,
        errors: [
          {
            messageId: 'isTossGithubIOBanned',
          },
        ],
      },
      {
        code: `'supertoss://lab?url=https%3A%2F%2Ftoss.github.io%2Fsome-path'`,
        errors: [
          {
            messageId: 'isTossGithubIOBanned',
          },
        ],
      },
    ],
  },
  'ban-app-bridge-post-message': {
    valid: ['tossAppBridge.getEnvironment', 'foo.bar', '1', 'tossAppBridge.someMessage()'],
    invalid: [
      {
        code: `tossAppBridge.postMessage`,
        errors: [
          {
            messageId: 'isPostMessageBanned',
          },
        ],
      },
      {
        code: `tossAppBridge.postMessage()`,
        errors: [
          {
            messageId: 'isPostMessageBanned',
          },
        ],
      },
      {
        code: `tossAppBridge.postMessage({})`,
        errors: [
          {
            messageId: 'isPostMessageBanned',
          },
        ],
      },
    ],
  },
  'ban-get-initial-props': {
    valid: ['function SomeComponent() {}', 'function SomeComponent() {}; SomeComponent.metaProps = {};'],
    invalid: [
      {
        code: [
          'function SomeComponent() {',
          '  return null;',
          '}',
          '',
          'SomeComponent.getInitialProps = () => {}',
        ].join('\n'),
        errors: [
          {
            messageId: 'isGetInitialPropsBanned',
          },
        ],
      },
      {
        code: [
          'function SomeComponent() {',
          '  return null;',
          '}',
          '',
          'SomeComponent.getInitialProps = async () => {}',
        ].join('\n'),
        errors: [
          {
            messageId: 'isGetInitialPropsBanned',
          },
        ],
      },
    ],
  },
  'exhaustive-deps': {
    valid: [
      `
      function TestComponent({ foo, bar, baz }) {
        useQuery(['test', bar], () => fetch(bar))
      }`,
      `
      function TestComponent({ foo, bar }) {
      useQuery(['test', bar], () => fetch(bar?.baz))
      }`,
      `
      function TestComponent({ foo, bar }) {
        useQuery(['test', foo?.baz, bar], () => {
          console.log(bar);
          return fetch(foo?.baz);
        })
      }`,
      `
      function TestComponent({ foo, bar }) {
        useQuery(['test', foo?.baz, bar], () => {
          console.log(bar);
          return fetch(foo?.baz);
        }, {})
      }`,
    ],
    invalid: [
      {
        code: `
        function TestComponent({ foo, bar }) {
        useQuery(['test', foo, bar, foo], () => fetch(foo))
        }`,
        errors: ["'foo'가 의존성 목록에 중복되어 있습니다"],
      },
      {
        code: `
        function TestComponent({ foo, bar }) {
        useQuery(['test', bar], () => fetch(foo))
        }`,
        errors: ["'foo'가 의존성 목록에 존재하지 않습니다"],
      },
      {
        code: `
        function TestComponent({ foo, bar }) {
        useQuery(['test'], () => fetch(foo, bar?.baz))
        }`,
        errors: ["'foo', 'bar.baz'가 의존성 목록에 존재하지 않습니다"],
      },
    ],
  },
  'ban-lodash': {
    valid: [
      `import _ from 'underscore';`,
      `import React from 'react';`,
      `import * as React from 'react';`,
      `import { useEffect } from 'react';`,
      `import difference from 'lodash.difference';`,
    ],
    invalid: [
      {
        code: `import { pick } from 'lodash'`,
        errors: [
          {
            messageId: 'isLodashBanned',
          },
        ],
      },
      {
        code: `import _ from 'lodash'`,
        errors: [
          {
            messageId: 'isLodashBanned',
          },
        ],
      },
      {
        code: `import difference from 'lodash/difference'`,
        errors: [
          {
            messageId: 'isLodashBanned',
          },
        ],
      },
    ],
  },
  'ban-use-query-param-boolean': {
    valid: [
      `useQueryParam('foo')`,
      `useQueryParam('foo', { parser: x => x === 'true' })`,
      `useQueryParam('foo', { parser: x => x === 'true', suspense: true })`,
      `useQueryParam('foo', { parser: Number })`,
    ],
    invalid: [
      {
        code: `useQueryParam('foo', { parser: Boolean })`,
        output: `useQueryParam('foo', { parser: x => x === 'true' })`,
        errors: [
          {
            messageId: 'isUseQueryParamBooleanBanned',
          },
        ],
      },
      {
        code: `useQueryParam('foo', { parser: Boolean, suspense: true })`,
        output: `useQueryParam('foo', { parser: x => x === 'true', suspense: true })`,
        errors: [
          {
            messageId: 'isUseQueryParamBooleanBanned',
          },
        ],
      },
    ],
  },
  'ban-direct-motion-component': {
    valid: [`import { motion } from '@tossteam/framer-motion';`],
    invalid: [
      {
        code: `import { motion } from 'framer-motion';`,
        output: `\nimport { motion } from '@tossteam/framer-motion';`,
        errors: [
          {
            messageId: 'isDirectMotionComponentImportBanned',
          },
        ],
      },
      {
        code: `import { motion, AnimatePresence } from 'framer-motion';`,
        output: `import {  AnimatePresence } from 'framer-motion';\nimport { motion } from '@tossteam/framer-motion';`,
        errors: [
          {
            messageId: 'isDirectMotionComponentImportBanned',
          },
        ],
      },
      {
        code: `import {\n  motion,\n  AnimatePresence,\n} from 'framer-motion';`,
        output: `import {\n  \n  AnimatePresence,\n} from 'framer-motion';\nimport { motion } from '@tossteam/framer-motion';`,
        errors: [
          {
            messageId: 'isDirectMotionComponentImportBanned',
          },
        ],
      },
    ],
  },
  'safely-navigate-to': {
    valid: [
      `URLs.navigateTo(TossCoreURLs.ensure(url))`,
      `window.location.href = TossCoreURLs.ensure(url)`,
      `TossCoreURLs.navigateTo(url)`,
    ],
    invalid: [
      {
        code: `URLs.navigateTo(url)`,
        errors: [
          {
            messageId: 'recommendSafeNavigation',
          },
        ],
      },
      {
        code: `window.location.href = url`,
        errors: [
          {
            messageId: 'recommendSafeNavigation',
          },
        ],
      },
    ],
  },
  'ban-useless-catch': {
    valid: [
      `
      function tryCatch() {
        try {
          doSomething();
        } catch (e) {
          handleCatch(e);
        }
      }`,
      `
        const MyComponent = () => {
          try {
            doSomething();
          } catch (e) {
            handleCatch(e);
          }
        }`,
    ],
    invalid: [
      {
        code: `
        function tryCatch() {
          try {
            doSomething();
          } catch (e) {
            throw e;
          }
        }`,
        errors: ['불필요한 catch 구문입니다. 제거해주세요'],
      },
      {
        code: `
        function tryCatch() {
          try {
            doSomething();
          } catch (e) {
            throw new Error(e);
          }
        }`,
        errors: ['불필요한 catch 구문입니다. 제거해주세요'],
      },
      {
        code: `
        function tryCatch() {
          try {
            doSomething();
          } catch (e) {
            Sentry.captureException(e);
            throw e;
          }
        }`,
        errors: ['불필요한 catch 구문입니다. 제거해주세요'],
      },
      {
        code: `
        function tryCatch() {
          try {
            doSomething();
          } catch (e) {
            Sentry.captureException(e);
            throw new Error(e);
          }
        }`,
        errors: ['불필요한 catch 구문입니다. 제거해주세요'],
      },
    ],
  },

  'ban-sentry-only-catch/react': {
    valid: [
      `
      function tryCatch() {
        try {
          doSomething();
        } catch (e) {
          Sentry.captureException(e);
        }
      }`,
    ],
    invalid: [
      {
        code: `
        const MyComponent = () => {
          try {
            doSomething();
          } catch (e) {
            Sentry.captureException(e);
          }
        }`,
        errors: ['불필요한 catch 구문입니다. 제거해주세요'],
      },
    ],
  },
  'ban-sentry-only-catch/common': {
    valid: [
      `
        const MyComponent = () => {
          try {
            doSomething();
          } catch (e) {
            Sentry.captureException(e);
          }
        }`,
    ],
    invalid: [
      {
        code: `
        function tryCatch() {
          try {
            doSomething();
          } catch (e) {
            Sentry.captureException(e);
          }
        }`,
        errors: ['불필요한 catch 구문인지 확인해주세요.'],
      },
    ],
  },
  'ban-ssr-unsafe-method': {
    valid: [
      {
        code: `
        function tryCatch() {
          try {
            doSomething();
          } catch (e) {
            handleCatch(e);
          }
        }`,
        options: [{ methods: [{ method: 'QS.get', alternate: 'useNextQueryParam' }] }],
      },
      {
        code: `
          const MyComponent = () => {
            try {
              doSomething();
            } catch (e) {
              handleCatch(e);
            }
          }`,
        options: [{ methods: [{ method: 'QS.get', alternate: 'useNextQueryParam' }] }],
      },
      {
        code: `
          const Bar = () => {
            const a = bar();
          }`,
        options: [{ methods: [{ method: 'QS.get', alternate: 'useNextQueryParam' }] }],
      },
      {
        code: `
          const useFoo = () => {
            const a = bar();
          }`,
        options: [{ methods: [{ method: 'QS.get', alternate: 'useNextQueryParam' }] }],
      },
      {
        code: `
          const getQS = () => {
            const a = QS.get();
          }`,
        options: [{ methods: [{ method: 'QS.get', alternate: 'useNextQueryParam' }] }],
      },
      {
        code: `
      const MyComponent = () => {
        const a = () => {
          QS.get();
        }
      }`,
        options: [{ methods: [{ method: 'QS.get', alternate: 'useNextQueryParam' }] }],
      },
      {
        code: `
          const MyComponent = () => {
            useEffect(() => {
              QS.get();
            }, []);
          }`,
        options: [{ methods: [{ method: 'QS.get', alternate: 'useNextQueryParam' }] }],
      },
    ],
    invalid: [
      {
        code: `
          memo(() => {
            const a = QS.get();
          })`,
        options: [{ methods: [{ method: 'QS.get', alternate: 'useNextQueryParam' }] }],
        errors: ['QS.get은 SSR 안전하지 않습니다. 대신 useNextQueryParam를 사용해주세요.'],
      },
      {
        code: `
          function useFoo() {
            const a = QS.get();
          }`,
        options: [{ methods: [{ method: 'QS.get', alternate: 'useNextQueryParam' }] }],
        errors: ['QS.get은 SSR 안전하지 않습니다. 대신 useNextQueryParam를 사용해주세요.'],
      },
      {
        code: `
          function useFoo() {
            const a = foo();
          }`,
        options: [{ methods: [{ method: 'foo' }] }],
        errors: ['foo은 SSR 안전하지 않습니다.'],
      },
      {
        code: `
          function MyComponent() {
            const id = QS.get('id');
            return <div>{id}</div>
          }`,
        options: [{ methods: [{ method: 'QS.get', alternate: 'useNextQueryParam' }] }],
        errors: ['QS.get은 SSR 안전하지 않습니다. 대신 useNextQueryParam를 사용해주세요.'],
      },
    ],
  },
  'ban-axios': {
    valid: [`import ky from '@tossteam/ky';`],
    invalid: [
      {
        code: `import axios from 'axios'`,
        errors: [
          {
            messageId: 'isAxiosBanned',
          },
        ],
      },
    ],
  },
};

const tester = new ESLintTester();

for (const testKey in tests) {
  tester.run(testKey, rules[testKey], tests[testKey]);
}
