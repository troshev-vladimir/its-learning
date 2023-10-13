module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  plugins: ["prettier", "vue", "@typescript-eslint"],

  parserOptions: {
    parser: "@typescript-eslint/parser",
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        endOfLine: "auto",
        semi: true,
      },
    ],
    "vue/multi-word-component-names": "off",
    "vue/object-curly-spacing": [2, "always"],
  },

  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "@vue/typescript",
  ],
};
