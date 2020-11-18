const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()

router.get('/banners', function(ctx){
    ctx.body = "获得get banners";
})

router.post("/banners",(ctx,next)=>{
    ctx.body = "post banners";
});

app.use(router.routes())
.use(router.allowedMethods())

app.listen(3001, () => {
    console.log("渲染服务器启动成功");
});
  