// 加注释的loader
let loaderUtils = require('loader-utils')
let valiateOptions = require('schema-utils')
let fs = require('fs')
// 校验选项符不符合规范
function loader(source){
    // this.cacheable(false) // 不要缓存
    this.cacheable && this.cacheable()
    let options = loaderUtils.getOptions(this)
    let cb = this.async()
    let schema = {
        type:'object',
        properties: {
            text: {
                type: 'string'
            },
            filename: {
                type: 'string'
            }
        }
    }
    valiateOptions(schema, options, 'banner-loader') // 如果不符合，哪个loader报错
    if(options.filename){ // 如果有文件
        // 依赖文件变化，重新去打包
        this.addDependency(options.filename)
        fs.readFile(options.filename, 'utf8', function(err, data){
            cb(err, `/**${data}**/${source}`)
        })
    }else{
        cb(err, `/**${data}**/${source}`)
    }
    return source
}

module.exports = loader