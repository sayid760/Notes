const webpack = require('webpack')
const path = require('path')
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr)
// const nodeExternal = require('webpack-node-externals')

//生成 manifest 方便定位对应的资源文件
const ManifestPlugin = require('webpack-manifest-plugin');

//构建前清理目录
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const merge = require('webpack-merge')
const base = require('./webpack.base')
const isDev = process.env.NODE_ENV === 'development'

const plugins = [
    new webpack.DefinePlugin({
      '__isBrowser__': false, //eslint-disable-line
      'process.env': { NODE_ENV: '"development"'},
      '__IS_PROD__': true,
      '__SERVER__': false
    }),
     // 删除文件 保留新文件
     new CleanWebpackPlugin(),
     //生成 manifest 方便定位对应的资源文件
     new ManifestPlugin({
        fileName: '../server/asset-manifest.json',
     }),
]

module.exports = merge(base, {
    mode: 'development',
    entry: ['react-hot-loader/patch', resolvePath('../src/index-client.js')],//入口文件
    output: {
        // path: paths.appBuild, // path.join(__dirname,'dist')
        // pathinfo: true,
        // filename: 'static/js/[name].js',  // client.js
        // chunkFilename: 'static/js/[name].chunk.js',
        // publicPath: publicPath,
        filename: '[name].js',
        path: resolvePath('../dist/static'),
        publicPath: '/'
    },
    // resolve: {
    //     alias: {
    //         'react-dom': '@hot-loader/react-dom'
    //     }
    // },
    plugins: plugins,
    devServer:{ // 开发服务器的配置
        publicPath: '/',
        host: '0.0.0.0',
        port: 8000,
        // progress: true,
        contentBase: './dist', // build作为静态服务目录
        // compress: true, // 压缩
        headers: {
            'access-control-allow-origin': '*'
        },
        proxy: {
            '/api': 'http://localhost:7001'
        }
    },
    resolve: {
       alias: {
           'react-dom': '@hot-loader/react-dom'
       }
   }
})