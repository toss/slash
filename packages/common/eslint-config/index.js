module.exports = {
  // `extends`를 생략해도 이 파일이 있는 위치까지만 부모 eslintrc를 찾도록 제한함
  root: true,

  env: {
    es6: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'eslint-config-prettier'],
  plugins: ['@typescript-eslint', 'import', 'prettier', '@tossteam'],
  settings: { 'import/resolver': { typescript: {} } },

  rules: {
    'prettier/prettier': 'error',
    '@tossteam/ban-characters': [
      'error',
      {
        bannedCharactersRegex: mergeBannedCharacters([
          '\u001c', // Zeplin에서 텍스트 복사 시 잘못 추가될 수 있는 문자
          '', // Zeplin에서 텍스트 복사 시 잘못 추가될 수 있는 문자
          '', // Framer에서 텍스트 복사 시 잘못 추가될 수 있는 문자
        ]),
      },
    ],
    '@tossteam/ban-http-link': 'error',
    'no-implicit-coercion': 'error',

    // TypeScript에서 이미 잡고 있는 문제이기 때문에 + location, document 등의 global variable도 잡아서
    'no-undef': 'off',

    // 아래 3개의 경우, Prettier가 이미 잘 해 주고 있는 부분이기 때문에
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    semi: 'off',

    // 이미 널리 쓰이고 있어 에러 수가 감당이 되지 않아 잠시 꺼둡니다.
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Strict-boolean-expression을 사용할지 아직 결론이 나지 않아서
    'no-extra-boolean-cast': 'off',

    // union type을 받는 함수에서 모든 경우의 수에 대해 return 해도 eslint가 추론하지 못하고 있어서 warn만 하고 있음
    'getter-return': 'warn',

    // 대부분의 경우 필요가 없어서
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Hoisting을 전략적으로 사용한 경우가 많아서
    '@typescript-eslint/no-use-before-define': 'off',

    // 모델 정의 부분에서 class와 interface를 합치기 위해 사용하는 용법도 잡고 있어서
    '@typescript-eslint/no-empty-interface': 'off',

    // 모델 정의 부분에서 파라미터 프로퍼티를 잘 쓰고 있어서
    '@typescript-eslint/no-parameter-properties': 'off',

    // 대부분 타입 추론이 가능함
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'util',
            importNames: ['isArray'],
            message: '`Array.isArray`를 대신 사용해주세요!',
          },
        ],
      },
    ],

    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'private-static-field',
          'public-instance-field',
          'private-instance-field',
          'public-constructor',
          'private-constructor',
          'public-instance-method',
          'private-instance-method',
        ],
      },
    ],
    'no-warning-comments': [
      'warn',
      {
        terms: ['TODO', 'FIXME', 'XXX', 'BUG'],
        location: 'anywhere',
      },
    ],
    'prefer-const': 'error',
    'no-var': 'error',
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'import/no-duplicates': 'error',
  },
};

function mergeBannedCharacters(chars) {
  return `(${chars.join('|')})`;
}
