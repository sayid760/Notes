
前后端同构
ReactDomServer.renderToString()
VueServerRender.renderToString()

React/Vue同构的最大难题其实是数据部分

原理：
交互点击数据bundle.js（由react组件打包出来的） +  初始化html（react组件通过renderToString变成html） = 同构渲染 

使用：
```
// 安装
npm install

// 打包bundle.js
npm run build:ssr

// 启动server端
npm run start    // 打开 http://localhost:3000/search

// 开发环境 
npm run dev      // 打开 http://localhost:8080/search.html
```


说明：

- 初始化html：拉取数据，然后放到模板引擎渲染（组件通过renderToString变成html）
app.jsx 是为了通过服务端渲染时，给 components 中的 container.jsx 传递参数

- 一个页面可能多个请求接口，可以并行请求回来再做模板引擎渲染
```
const mount = require('koa-mount');
const static = require('koa-static')
const app = new (require('koa'));
const rpcClient = require('./client');
const template = require('./template');

const detailTemplate = template(__dirname + '/template/index.html');

app.use(mount('/static', static(`${__dirname}/source/static/`)))

app.use(async (ctx) => {
    if (!ctx.query.columnid) {
        ctx.status = 400;
        ctx.body = 'invalid columnid';
        return 
    }

    const result = await new Promise((resolve, reject) => {
        rpcClient.write({
            columnid: ctx.query.columnid
        }, function (err, data) {
            err ? reject(err) : resolve(data)
        })
    })

    console.log(result)
    ctx.status = 200;
    
    ctx.body = detailTemplate(result);
})

app.listen(3000)
```


detail
```
node ./detail/index.js

node ./detail/server.js
```
http://localhost:3000/?columnid=1