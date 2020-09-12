
const Controller = require('egg').Controller
// const renderToStream = require('ykfe-utils/lib/renderToStream')
const ssrConfig = require('../../config/config.ssr')
const { renderToString } = require('react-dom/server')


class PageController extends Controller {
  async index () {
    const { ctx } = this
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      ctx.type = 'text/html'
      ctx.status = 200
      Object.assign(ctx.app.config, ssrConfig)
      const { useCDN, serverJs, baseDir, isRax, useReactToString } = ssrConfig
      // console.log(serverJs)
      // console.log(baseDir)
      // console.log(isRax)
      // console.log(useReactToString)
      // console.log(ctx)
      let SEVER_JS = serverJs
      // const serverComponent = typeof SEVER_JS === 'string' ? await require(SEVER_JS).default(ctx): await SEVER_JS(ctx)
      const serverComponent =  await require(SEVER_JS).default(ctx)
      // console.log(serverComponent)
      // const stream = await renderToStream(ctx, ctx.app.config)
      // console.log(require(SEVER_JS).default(ctx))
      const stream = renderToString(serverComponent)
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
    } catch (error) {
      ctx.logger.error(`Page Controller renderToStream Error`, error)
    }
  }
}

module.exports = PageController
