// 没有加layer数据结构
const http=require('http')

class Application{
    constructor(){
        this.routes=[
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
        ]
    }
    use(path, fn){
        this.routes.push({
            path, fn
        })
    }
    listen(port){
        http.createServer((req,res)=>{
            for(var i=0,len=this.routes.length;i<len;i++){
                if(req.url === this.routes[i].path){
                    return this.routes[i].fn(req, res)
                }
            }
            return this.routes[0].fn(req, res) // 默认路由
        }).listen(port)
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