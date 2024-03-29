module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: ['plugin:react/recommended'],
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
  },
};
