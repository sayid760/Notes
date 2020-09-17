module.exports = {
  lintOnSave: false,
  // publicPath: "http://localhost:8081/", 也可以在这里定义 __webpack_public_path__
  devServer: {
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  configureWebpack: {
    output: {
      library: "vueApp",
      libraryTarget: "umd"
    }
  }
};
