const { defineConfig } = require("@vue/cli-service");

const getPublicPath = () => {
  if (process.env.FOR_PAGES === "true") {
    return "/test/configurator/";
  } else if (process.env.NODE_ENV === "production") {
    return "/configurator/";
  }
  return "/";
};

module.exports = defineConfig({
  transpileDependencies: ["quasar"],

  css: { extract: false },

  publicPath: getPublicPath(),
  productionSourceMap: false,
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  configureWebpack: {
    output: {
      filename: "js/[name].[contenthash:8].js",
      chunkFilename: "js/[name].[contenthash:8].js",
    },
  },
});
