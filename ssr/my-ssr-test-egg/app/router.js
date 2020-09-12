'use strict'

const config = require('../config/config.ssr')

// module.exports = app => {
//   const { router, controller } = app
//   config.routes.map(route => {
//     router.get(`${route.path}`, controller[route.controller][route.handler]) // 挂载在controller上
//   })
//   router.get('/api/getIndexData', controller.api.index)
// }

module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.isIOS);
  router.get('/', controller.page.index);
  router.get('/news/:id', controller.page.index);
  router.get('/api/getIndexData', controller.api.index)
};

/*
class Home extends Controller {
  async isIOS() {
    this.ctx.body = `isIOS: ${this.ctx.isIOS}`;
  }
}
module.exports = Home;
*/