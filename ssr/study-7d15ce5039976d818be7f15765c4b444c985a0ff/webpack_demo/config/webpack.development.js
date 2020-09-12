const { join } = require('path');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  devServer: {
    contentBase: join(__dirname, "../dist"),
    hot: true,
    quiet: true,
    historyApiFallback:true,
  },
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,

      // add formatters and transformers (see below)
      // additionalFormatters: [],
      // additionalTransformers: []
    }),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    })
  ]
}