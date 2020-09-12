const router = require('koa-router')()
const ssrConfig = require('../config/config.ssr')
const { renderToString } = require('react-dom/server')

ssrConfig.routes.map(route => {
  router.get(`${route.path}`, async (ctx, next) => {
    console.log(ssrConfig)
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      ctx.type = 'text/html'
      ctx.status = 200
      Object.assign(ctx.app, {"config": ssrConfig})
      const { useCDN, serverJs, baseDir, isRax, useReactToString } = ctx.app.config
      // console.log(serverJs)
      // console.log(baseDir)
      // console.log(isRax)
      // console.log(useReactToString)
      let SEVER_JS = serverJs
      // const serverComponent = typeof SEVER_JS === 'string' ? await require(SEVER_JS).default(ctx): await SEVER_JS(ctx)
      const serverComponent = await require(SEVER_JS).default(ctx)
      // const stream = await renderToStream(ctx, ctx.app.config)
      // console.log(require(SEVER_JS).default(ctx))
      const stream = renderToString(serverComponent)
      console.log(stream)
      ctx.body ='<!DOCTYPE html>'+stream
  } catch (error) {
    console.log(`Page Controller renderToStream Error`, error)
  }

  }) 
})


router.get('/api/getIndexData', async (ctx, next) => {
  try {
    // Page为webpack打包的chunkName，项目默认的entry为Page
    ctx.type = 'text/json'
    ctx.status = 200
    ctx.body = {
      news: [
        {
          id: '1',
          title: 'Racket v7.3 Release Notes'
        },
        {
          id: '2',
          title: 'Free Dropbox Accounts Now Only Sync to Three Devices'
        },
        { id: '3',
          title: 'Voynich Manuscript Decoded by Bristol Academic'
        },
        { id: '4',
          title: 'Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic'
        },
        { id: '5',
          title: 'How much do YouTube celebrities charge to advertise your product? '
        }
      ]
    }
  } catch (error) {
    console.log(error)
  }
})



// 测试
router.get('/aa', async (ctx, next) => {
    try {
        console.log(ctx)
      // Page为webpack打包的chunkName，项目默认的entry为Page
      ctx.type = 'text/html'
      ctx.status = 200
      Object.assign(ctx.app, {"config": ssrConfig})
      console.log(ctx)
      const { useCDN, serverJs, baseDir, isRax, useReactToString } = ctx.app.config
      console.log(serverJs)
      console.log(baseDir)
      console.log(isRax)
      console.log(useReactToString)
      let SEVER_JS = serverJs
      // const serverComponent = typeof SEVER_JS === 'string' ? await require(SEVER_JS).default(ctx): await SEVER_JS(ctx)
      const serverComponent = await require(SEVER_JS).default(ctx)
      
      // const stream = await renderToStream(ctx, ctx.app.config)
      // console.log(require(SEVER_JS).default(ctx))
      const stream = renderToString(serverComponent)
      console.log(stream)
      // console.log(stream)
      // let html = renderToString()
      // ctx.body = `<!DOCTYPE html>
      // <html lang="en">
      // <head>
      //     <meta charset="UTF-8">
      // </head>
      // <body>
      //     <div id="root">${ctx.app.config}</div>
      //     <textarea id="ssrTextInitData" style="display:none;">${JSON.stringify(fetchResult)}</textarea>
      // </body>
      // </html>
      // `;
      ctx.body ='<!DOCTYPE html>'+stream
      // ctx.body = { 'success': 'true', 'result': {name:"111",age:"222"} }
    } catch (error) {
      console.log(`Page Controller renderToStream Error`, error)
    }
})

// 测试
router.post('/testPost', async (ctx, next) => {
  ctx.body = { 'success': 'true', 'result': {name:"111",age:"222"} }
})

module.exports = router
