module.exports = {
  root: true,

  env: {
    node: true,
  },

  plugins: ["prettier", "vue"],

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
  },

  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "@vue/typescript",
  ],
};
