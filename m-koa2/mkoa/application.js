let EventsEmitter = require('events')
let http = require('http')
let context = require('./context')
let request = require('./request')
let response = require('./response')

class Application extends EventsEmitter {
    constructor() {
        super();
        this.middlewares = [];
        this.context = context;
        this.request = request;
        this.response = response;
    }
    // 1.use时注册到数组中
    use(middleware) {
        this.middlewares.push(middleware);
    }
    // 处理middleware：把ctx，oldNext传给中间件并执行
    // 柯里化：先处理部分参数，再传入参数（函数）进来
    compose() { 
        return async ctx => { // 把callback创建的ctx传进来，async返回一个promise对象，可以用then接收
            function createNext(middleware, oldNext) { // 上一个next
                return async ()=>{
                    await middleware(ctx, oldNext) // 把ctx，oldNext传给中间件
                }
            }

            let len = this.middlewares.length;
            // 给出默认值（next() 最初的样子）
            let next = async()=>{
                return Promise.resolve()
            }
            // 从后往前处理，执行最后一项，如果没有next就执行初始的next，如果有，就拿到下一个next函数处理
            for (let i = len - 1; i >= 0; i--) {
                let currentMiddleware = this.middlewares[i];
                next = createNext(currentMiddleware, next) // next等于上一个middleware   执行中间件
            }
            await next();
        }
    }
    // 创建上下文对象，把request、response、req、res等挂载在ctx上下文上
    // 将原生request和response对象进行处理，搭建(挂载)koa的全局对象，生成新的context
    createContext(req,res){
        let ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx
    }
    // 请求http后做什么事情
    callback() {
        return (req, res) => {
            let ctx = this.createContext(req, res);
            let response = () => this.responseBody(ctx)
            let onerror = err => this.onerror(err, ctx)
            let fn = this.compose();
            return fn(ctx).then(response).catch(onerror)
        }
    }
    responseBody(ctx){
        let context = ctx.body;
        // 要么是字符串、要么是二进制
        if(typeof context === 'string'){
            ctx.res.end(context)
        }else if(typeof context =='object'){
            ctx.res.end(JSON.stringify(context)) // 转换未字符串
        }
    }
    onerror(err, ctx){
        if(err.code = 'ENOENT'){
            ctx.status = 404;
        }else{
            ctx.status = 500;
        }
        let msg = err.message || '服务器错误'
        ctx.res.end(msg)
        this.emit('error',err)  // 可以用app.on('error', (ctx, next)=>{})来监听错误事件
    }
    listen(...args) {
        let server = http.createServer(this.callback()) // 创建HTTP服务器之后，并将callback作为request事件的监听函数
        server.listen(...args);
    }
}


module.exports = Application;