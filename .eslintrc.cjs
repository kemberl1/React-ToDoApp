module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['node_modules', 'dist', 'build'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: ['react', 'import', 'react-hooks', 'jsx-a11y', 'prettier'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'warn',
    'import/no-unresolved': ['error', { caseSensitive: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'react/button-has-type': 'error',
    'react/prefer-stateless-function': [1, { ignorePureComponents: true }],
    'react/require-default-props': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
