'use strict';

module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true,
    es2020: true,
    webextensions: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  overrides: [
    {
      files: ['.eslintrc.js', '*.config.js', 'gen_bookmarklet.js'],
      env: {
        node: true
      },
      rules: {
        '@typescript-eslint/no-var-requires': 0
      },
    }
  ]
};
