module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    '@typescript-eslint/no-empty-interface': 0,
    'react/no-array-index-key': 'off',
    'no-param-reassign': [
      'warn',
      { props: true, ignorePropertyModificationsForRegex: ['^draft', '^memo'] },
    ],
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
};
