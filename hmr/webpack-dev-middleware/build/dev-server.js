require('./check-versions')();

const config = require('../config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
console.log(process.env.NODE_ENV) // development
const webpackConfig = process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production' ? require('./webpack.prod.conf') : require('./webpack.dev.conf');

const port = process.env.PORT || config.dev.port;
// 自动打开浏览器
const autoOpenBrowser = !!config.dev.autoOpenBrowser;

// 自定义API后端的HTTP代理
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable; 

const app = express();
const compiler = webpack(webpackConfig); // 传入参数启动webpack编译打包

const devMiddleware = require('webpack-dev-middleware')(compiler, { // 和webpack参数合并
  publicPath: webpackConfig.output.publicPath, // 公共路径，服务器开始解析的目录
  quiet: true,
});

// 客户端轮询，监听文件改变，执行函数
const hotMiddleware = require('webpack-hot-middleware')(compiler, { 
  log: false,
  heartbeat: 2000,
});

// 模板更改时强制页面重新加载
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// proxy api requests
Object.keys(proxyTable).forEach((context) => { // proxyTable = {}
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

// 处理单页history api回调问题，输入错误页面，也会返回index.html
app.use(require('connect-history-api-fallback')());

// webpack编译打包
app.use(devMiddleware);

// 热更新
app.use(hotMiddleware);

// 静态文件
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = `http://localhost:${port}/index.html`;

let _resolve;
const readyPromise = new Promise(resolve => {
  _resolve = resolve;
});

// webpack编译后执行回调
console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${uri}\n`);
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
  _resolve();
});

const server = app.listen(port);

// module.exports = {
//   ready: readyPromise,
//   close: () => {
//     server.close();
//   },
// };


/**
 * 1）静态文件读取
 * 1）webpack-dev-middleware 启动webpack编译
 * 2）webpack-hot-middleware 热更新
 * 3）opn 编译执行后自动打开浏览器
 * 4）connect-history-api-fallback 处理单页history api回调问题，输入错误页面，也会返回index.html
 */