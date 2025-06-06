import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:@stylistic/recommended-extends',
    ],
    plugins: [
      '@stylistic',
      'newline-destructuring',
    ],
    rules: {
      /* Stylistic */
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/object-curly-newline': ['error', { multiline: true }],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
      'newline-destructuring/newline': ['error', { items: 1 }],
      'no-else-return': ['error', { allowElseIf: false }],
      '@stylistic/function-paren-newline': ['error', 'multiline'],
      'no-console': 'error',
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiprop'],
      'object-shorthand': ['error', 'always'],
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
    },
  }),
];

export default eslintConfig;
