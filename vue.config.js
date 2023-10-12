const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["quasar"],

  // indexPath:
  //   process.env.NODE_ENV === "production"
  //     ? "/configurator/index.html"
  //     : "index.html",
  css: { extract: false },

  publicPath: process.env.NODE_ENV === "production" ? "/configurator/" : "/",
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
