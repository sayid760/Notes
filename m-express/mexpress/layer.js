class Layer{
    constructor(path, fn, method){
        this.handle = fn
        this.method = method 
        this.path = path
    }
    // 执行路径对应的处理函数
    handle_request(req, res){
        const fn = this.handle
        // 边界判断
        if(fn){
            fn(req, res)
        }
    }
    // 判断路径是否匹配，然后提取url里的参数
    match(path){
        if(path === this.path){
            return true
        }
        return false
    }
}

exports = module.exports = Layer