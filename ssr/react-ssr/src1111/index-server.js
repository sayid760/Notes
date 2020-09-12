const Koa = require('koa')

import reactSsr from './utils/react-ssr';
let app = new Koa()

// app.use(require('koa-static')('./dist'))

app.use(reactSsr);

app.listen(3000, ()=>{ console.log('server is start http://localhost:3000')})

// import reactSsr from '../middlewares/react-ssr';
// import Koa from 'koa2';
// import koaStatic from 'koa-static';
// import path from 'path';
// import proConfig from '../../share/pro-config.js';

// const port = proConfig.nodeServerPort || process.env.PORT;

// const app = new Koa();


// //设置可访问的静态资源
// //TODO:生产换需要删除此功能
// app.use(koaStatic('./dist/static'));


// //ssr 中间件
// app.use(reactSsr);

// //启动服务
// app.listen(port);

// console.log('server is start .',);



// app.use(_.get('/search', async function (ctx, next) {
//     // 转义组件为字符串
//     let counter = renderToString(<Search />)
//     ctx.body = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta http-equiv="X-UA-Compatible" content="ie=edge">
//         <title>Document</title>
//     </head>
//     <body>
//         <div id="root">${counter}</div>
//         <script src="/client.js"></script>
//     </body>
//     </html>
//     `
// }))