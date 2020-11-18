const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const skeletonRouter = require('./src/skeleton/router')
const SkeletonPlugin = reuqire('./plugin/SkeletonPlugin')

const commonPlugins = [
  /* 放开可测试
  new SkeletonWebpackPlugin({
    webpackConfig: {
      entry: {
        app: path.join(__dirname, './src/skeleton'),
      },
    },
    quiet: true,
    minimize: true,
    router: skeletonRouter,
  }),
  */
  new SkeletonPlugin()
]

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: commonPlugins
  }
}
