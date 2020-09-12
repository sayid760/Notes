// const Koa = require('koa');
const Koa = require('./mkoa/application')
const app = new Koa(); // 必须是构造函数
const route = require('koa-route');

/*
async function  fn1(next){
  console.log(1)
  await next()
  console.log(2)
}

async function fn2(){
  console.log(3)
  await fn()
  console.log(4)
}

fn1(fn2)
*/


// 异步函数
function fn() {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve();
          console.log("hello");
      }, 3000);
  });
}

app.use(async next => {
  console.log(1);
  await next();
  console.log(2);
});

app.use(async next => {
  console.log(3);
  await fn(); // 调用异步函数
  await next();
  console.log(4);
});

app.use(async next => {
  console.log(5);
  // ctx.response.status = 'xxxxx'
  ctx.response.status = 200
  ctx.body = 'Hello World' 
  await next()
  console.log(6);
});

app.on('error',err=>{
  console.log("发生错误")
})

// app.use(route.get('/aa', async (ctx, next) => {
//   ctx.body = 'aaaaa';
// }))

app.listen(3000);

