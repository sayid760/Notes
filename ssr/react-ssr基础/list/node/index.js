const static = require('koa-static')
const app = new (require('koa'))
const mount = require('koa-mount')

require('@babel/register')({
  presets: ['@babel/preset-react']
})
const ReactDomServer = require('react-dom/server')

const getFakeData = require('./fake-data')
const getApp = require('./app.jsx')

// node 端使用 React 渲染，也只是渲染一个大的 div，而不是整个 html，
// 所以需要模板引擎，因为要将这个大的 div 渲染完成后放到模板引擎中处理，再返回给前端。
const template = require('./template')(__dirname + '/index.htm')

app.use(
  mount('/static', static(__dirname + '/source'))
)

// http://localhost:3000/data?sort=3&filt=1

app.use(
  mount('/data', async (ctx) => {
    const filtType = +(ctx.query.filt || 0)
    const sortType = +(ctx.query.sort || 0)
  
    const data = getFakeData(sortType, filtType)
    ctx.status = 200
    ctx.body = data
  })
)

app.use(async(ctx) => {
  ctx.status = 200
  const filtType = +(ctx.query.filt || 0)
  const sortType = +(ctx.query.sort || 0)

  const reactData = getFakeData(sortType, filtType)

  // 如果不写 ctx.body，默认返回 'OK'
  ctx.body = template({
    reactString: ReactDomServer.renderToString(
      getApp(reactData)
    ),
    reactData,     
    filtType,
    sortType
    })
})

app.listen(3000,()=>{
	console.log('3000')
})