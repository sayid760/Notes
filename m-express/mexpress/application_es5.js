let http = require('http');
let url = require('url');
function createApplication() {
  let app = (req, res) => {
    let m = req.method.toLowerCase();
    let { pathname } = url.parse(req.url, true);
    // 通过next方法进行迭代
    let index = 0;
    function next(err) {
      if (index === app.routes.length) return res.end(`Cannot ${m} ${pathname}`);
      let { method, path, fn } = app.routes[index++]; // 每次调用next就应该取下一个layer
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
  app.routes = [];
  app.use = function (path, fn) {
    if (typeof fn !== 'function') {
      fn = path;
      path = '/';
    }
    let layer = {
      method: 'middle', // method是middle我们就表示他是一个中间件
      path,
      fn
    }
    app.routes.push(layer); // 将中间件放到容器内
  }
  app.use(function (req,res,next) { // express内置中间件
    let {pathname,query} = url.parse(req.url,true);
    let hostname = req.headers['host'].split(':')[0];
    req.path = pathname;
    req.query = query;
    req.hostname = hostname;
    next();
  })  
  app.all = function (path, fn) {
    let layer = {
      method: 'all',
      path,
      fn
    }
    app.routes.push(layer);
  }
  http.METHODS.forEach(method => {
    method = method.toLocaleLowerCase();
    app[method] = function (path, fn) {
      let layer = {
        method,
        path,
        fn
      }
      app.routes.push(layer);
    }
  })

  app.listen = function () {
    let server = http.createServer(app);
    server.listen(...arguments);
  }
  return app;
}
module.exports = createApplication;
// 路径参数 /article/:id/:name
// express 自路由
// res封装
// 模板的渲染