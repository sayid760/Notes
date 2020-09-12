const nodeExternal = require('webpack-node-externals')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr)
const isProd=process.env.NODE_ENV==='production'
const plugins = [
    new webpack.DefinePlugin({
        '__isBrowser__': false, //eslint-disable-line
        'process.env': { NODE_ENV: `"${process.env.NODE_ENV}"`},
        '__IS_PROD__':true,
        '__SERVER__': true
    })
]

module.exports = merge(base, {
    target: 'node', // 告诉webpack 打包的是node环境的
    entry: [require.resolve('@babel/polyfill'), resolvePath('../src/index-server.js')],//入口文件
    output: {
        filename: 'app.js',
        path: resolvePath('../dist/server')
        // path: paths.appBuild, // path.join(__dirname,'dist')
        // publicPath: '/',
        // filename: '[name].server.js', // server.js
        // libraryTarget: 'commonjs2'
    },
    // 负责检测所有引入node的核心模块，并且通知webpack不需要将核心代码打入到server.js 文件中去
    externals: [nodeExternal()],
    plugins: plugins,
    resolve: {
        alias: {
            //定义dist 目录别名，方便导入模块
            '@dist': resolvePath('../dist')
        }
    }
})
