let babel = require('@babel/core')
let loaderUtils = require('loader-utils')
function loader(source){ // this loaderContext
    // console.log(Object.keys(this))
    // console.log(this)
    let options = loaderUtils.getOptions(this)  // 获取webpack.config.js的参数
    let cb=this.async() 
    babel.transform(source,{ // 转换哪些代码，转换选项有哪些
        ...options, // presets:options.presets
        sourceMap: true,
        filename: this.resourcePath.split('/').pop() // 文件名
    },function(err, result){
        cb(err, result.code, result.map) // code是编译出来的代码
    })
    return source
}

module.exports = loader