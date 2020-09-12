// file-loader 根据图片生成一个md5戳, 发射到dist目录, 返回当前的图片路径
let loaderUtils = require("loader-utils")
function loader(source){
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {content: source}) // 生成图片路径，md5戳
    console.log(filename)
    this.emitFile(filename, source) // 发射文件
    return `module.exports="${filename}"`
}
loader.raw = true // 转成二进制 buffer
module.exports = loader