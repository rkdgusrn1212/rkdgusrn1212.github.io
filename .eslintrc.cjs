/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  /** @type {import('@typescript-eslint/parser').ParserOptions} */
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.eslint.json',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'react/no-children-prop': 'off',
  },
  root: true,
};
