module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-multiple-empty-lines': [
      'error', {
        max: 2,
      },
    ],
    'object-curly-newline': [
      'error', {
        ImportDeclaration: {
          multiline: true, minProperties: 9,
        },
        ExportDeclaration: {
          multiline: true, minProperties: 2,
        },
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/prop-types': 'off',
  },
};
