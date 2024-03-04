module.exports = {
  root: true,
  extends: [
    '@nuxt/eslint-config',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
  },
}
