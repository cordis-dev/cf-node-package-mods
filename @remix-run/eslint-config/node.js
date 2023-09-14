/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */

module.exports = {
  plugins: ["node"],
  env: {
    node: true,
  },
};
