const http = require('http')
const Layer = require('./layer')

class Application{
    constructor(){
        this.routes=[
          /*  {
                path:'*',
                fn: function(req, res){
                    res.writeHead(404, {'Content-Type': 'text/plain'})
                    res.end('404')
                }
            },*/
            // 改写成Layer数据结构
            new Layer('*', function(req, res){
                res.writeHead(404, {'Content-Type': 'text/plain'})
                res.end('404')
            }),
            // new Layer('/', function(req, res){
            //     res.writeHead(200, {'Content-Type': 'text/plain'})
            //     res.end('Hello Express')
            // })
        ]
    }
    use(path, fn){
        // this.routes.push({path, fn})
        this.routes.push(new Layer(path, fn))
    }
    listen(port){
        console.log(this.routes)
        http.createServer((req,res)=>{
            this.handle(req, res)
        }).listen(port)
    }
    handle(req, res){
        for(var i=0,len=this.routes.length;i<len;i++){
            if(this.routes[i].match(req.url)){
                return this.routes[i].handle_request(req, res)
            }
        }
        return this.routes[0].handle_request(req, res) // 默认路由
    }
}

module.exports = Application;















/*
// 根据不同路径做不同响应：请求路径、请求处理程序
const routes = []
routes.push(
    {
        path:'*',
        fn: function(req, res){
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.end('404')
        }
    },
    {
        path:'/',
        fn: function(req, res){
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.end('Hello Express')
        }
    }
)


// 开起一个服务器
http.createServer(function(req,res){
    // res.writeHead(200,{'Content-Type':'text/plain'})
    // res.end('Hello Express')
    for(var i=0,len=routes.length;i<len;i++){
        routes[i].fn(req, res)
    }
}).listen(3000)
*/