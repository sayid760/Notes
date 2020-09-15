module.exports = {
  configureWebpack: {
    output: {
      library: 'singleVue',
      libraryTarget: 'umd' // AMD、CJS、winodw , 把方法挂载到window上
    },
    devServer: {
      port: 1000
    }
  }
}
