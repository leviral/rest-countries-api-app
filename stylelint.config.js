export default {
  extends: ['stylelint-config-recommended-scss'],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-html',
  rules: {
    'order/properties-alphabetical-order': true,
  },
};
