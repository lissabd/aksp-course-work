module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    jsx: true,
  },
  rules: {
    'no-undef': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
