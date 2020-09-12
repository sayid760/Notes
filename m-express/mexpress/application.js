let http = require('http');
let url = require('url');
class Application{
  constructor(){
    this.routes = [];
  }
  
  use(path, fn) {
    let method = 'all'
    if (typeof fn !== 'function') {
      fn = path;
      path = '/';
      method = 'middle'
    }
    let layer = {
      method: method, // method是middle我们就表示他是一个中间件
      path,
      fn
    }
    this.routes.push(layer); // 将中间件放到容器内
  }
  get(path, fn){
    let layer = {
      method: 'get',
      path,
      fn
    }
    this.routes.push(layer);
  }
  listen(port) {
    http.createServer((req,res)=>{
      this.handle(req, res)
    }).listen(port)
  }
  handle(req, res) {
    let m = req.method.toLowerCase();
    let { pathname } = url.parse(req.url, true);
    // 通过next方法进行迭代
    let index = 0;
    const next=(err)=> {
      if ( index === this.routes.length) return res.end(`Cannot ${m} ${pathname}`);
      let { method, path, fn } = this.routes[index++]; // 每次调用next就应该取下一个layer
      if(err){
        // 如果有错误 我们应该去找错误中间件，错误中间件有一个特点（fn有四个参数）
        if(fn.length === 4){
          fn(err,req,res,next); 
        }else{
          //如果没有匹配到 要将err继续传递下去
          next(err);// 继续走下一个layer继续判断
        }
      }else{
        // 如果数组全部迭代完成还没有找到 说明路径不存在
        if (method === 'middle') { // 处理中间件
          if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
            fn(req, res, next);
          } else {
            next(); // 如果这个中间件没有匹配到 那么继续走下一个层匹配
          }
        } else { // 处理路由
          if ((method === m || method === 'all') && (path === pathname || path === '*')) {
            fn(req, res);
          } else {
            next();
          }
        }
      }
    }
    next(); // 中间件中的next方法
  }
}

module.exports = Application;

/*  node原生http服务
    const http = require("http");  
    const server = http.createServer(function(req, res){  
        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'});  
        res.write('<div style="font-size:24px;color:red">一个简单的服务器</div>');  
    });  
    server.listen('3000', '127.0.0.1'); 
*/