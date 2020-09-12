// class FileListPlugin{
//     constructor({filename}){
//         this.filename = filename
//     }
//     apply(compiler){ 
//         compiler.hooks.emit.tap('FileListPlugin',(compilcation)=>{ //compilcation 当前编译信息  compilcation.assets 当前打包的资源
//             let assets = compilcation.assets
//             let content = `##   文件名   资源大小\r\n`
//              // 把对象转成数组 [[bundle.js,{}],[index.html,{}]]
//              Object.entries(assets).forEach(([filename,statObj])=>{ // 参数解构
//                 content +=`- ${filename}    ${statObj.size()}`
//              })
//             assets[this.filename] = {
//                 source(){
//                     return content
//                 },
//                 size(){
//                     return content.length
//                 }
//             }
             
//         })
//     }
// }

// module.exports = FileListPlugin

class FileListPlugin {
    constructor({ filename }) {
      this.filename = filename
    }
  
    apply(compiler) {
      compiler.hooks.emit.tap('FileListPlugin', compilation => {
        const { assets } = compilation
        let content = `## 文件名    资源大小\r\n`
  
        //[ [bundle.js, {}], [index.html, {}] ]
        Object.entries(assets).forEach(([filename, stats]) => {
          content += `- ${filename}    ${stats.size()}\r\n`
        })
  
        assets[this.filename] = {
          source() {
            return content
          },
          size() {
            // return content.length
            //获取字符串长度可把中文拆成字节
            return Buffer.byteLength(content)
          }
        }
      })
    }
  }
  
  module.exports = FileListPlugin