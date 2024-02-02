module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'vue/multi-word-component-names': 'off',
  },
}
