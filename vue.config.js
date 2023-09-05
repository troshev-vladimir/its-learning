const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["quasar"],
  publicPath: process.env.NODE_ENV === "production" ? "/configurator" : "/",
  // indexPath:
  //   process.env.NODE_ENV === "production"
  //     ? "/configurator/index.html"
  //     : "index.html",
  css: { extract: false },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
});
