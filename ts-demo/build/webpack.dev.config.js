const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const webpack = require('webpack')
const path = require('path')
const { smart } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = smart(baseConfig , {
    mode: 'development',
    devtool:'cheap-module-eval-source-map',
    // entry:{
    //     index : [
    //         'webpack-dev-server/client?http://localhost:8081',
    //         'webpack/hot/dev-server',
    //         path.resolve(__dirname,'../src/index.ts')
    //     ]
    // },
    devServer:{
        port: 8081,
        progress: true,  // 显示打包的进度条
        contentBase: path.resolve(__dirname,'../dist'),  // 根目录
        // open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩
        hot: true,
        // 设置代理
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('development')
        }),
        new HotModuleReplacementPlugin()
    ]
})