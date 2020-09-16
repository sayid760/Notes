let Koa = require('koa');
let serve = require('koa-static');
// const API = require('./middleware/api.js');
// const sourceMap = require('./middleware/sourceMap.js');
const router = require('koa-router')()

const app = new Koa();
const port = 3003;

// app.use(sourceMap);
// app.use(API);
// app.use((c)=>{
//     c.body = 123
// });

app.use(serve(__dirname + '/client'));

// 添加 url映射(:hello URL命名参数 )
router.get('/asldjs.gif', async (ctx, next) => {
    // const { hello, name } = ctx.params
    // ctx.body = `<h1>${hello}, ${name}</h1>`
    console.log(ctx.originalUrl)
    ctx.body={

    }
})

app.use(router.routes())  /*启动路由*/
app.listen(port, ()=>{
    console.log(`${port} is listen`);
})
