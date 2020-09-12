var config = require('../config');
var opn = require('opn')
var path = require('path')
var express = require('express')
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const axios = require('axios');
var webpackConfig = require('./webpack.dev.conf');
var devMiddleware = require('webpack-dev-middleware')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable
var app = express();
var compiler = webpack(webpackConfig);

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'));

// delage
var apiRouters = express.Router();
apiRouters.get('/getDiscList', function(req, res) {
  var url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e);
  })
})

app.use('/api', apiRouters);
app.listen(port);
