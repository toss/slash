module.exports = {
  // `extends`를 생략해도 이 파일이 있는 위치까지만 부모 eslintrc를 찾도록 제한함
  root: true,
  extends: ['./index.js', 'plugin:react/recommended'],

  env: {
    node: false,
    browser: true,
    'shared-node-browser': true,
  },

  parserOptions: {
    ecmaFeatures: { jsx: true },
    jsx: true,
    useJSXTextNode: true,
  },

  plugins: ['react', 'react-hooks'],
  settings: { react: { version: 'detect' } },

  rules: {
    // TypeScript에서 이미 잘 해주고 있어서
    'react/prop-types': 'off',

    // React.memo, React.forwardRef에서 사용하는 경우도 막고 있어서
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    // 탭내빙 어택 방지
    'react/jsx-no-target-blank': 'error',
  },
};
