const webpack = require('webpack')
const path = require('path')
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr)
// const nodeExternal = require('webpack-node-externals')

//提取 css  插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
      'process.env': { NODE_ENV: '"production"'},
      '__IS_PROD__': true,
      '__SERVER__': false
    }),
    //  // 删除文件 保留新文件
    //  new CleanWebpackPlugin(),
     //生成 manifest 方便定位对应的资源文件
     new ManifestPlugin({
        fileName: '../server/asset-manifest.json',
     }),
]

const optimization = {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        vendors: {
          test: (module) => {
            return module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.match('node_modules')
          },
          name: 'vendor'
        }
      }
    }
}

module.exports = merge(base, {
    // entry: {
    //     Page: [require.resolve('@babel/polyfill'), paths.entry] // ./src/index-client.js
    // },
    entry: [require.resolve('@babel/polyfill'), resolvePath('../src/index-client.js')],//入口文件
    output: {
        // path: paths.appBuild, // path.join(__dirname,'dist')
        // pathinfo: true,
        // filename: 'static/js/[name].js',  // client.js
        // chunkFilename: 'static/js/[name].chunk.js',
        // publicPath: publicPath,
        filename: 'js/[name].[chunkhash:8].js',
        path: resolvePath('../dist/static'),
        publicPath: '/'
    },
    resolve: {
        alias: {
            'react-router': require.resolve('react-router') // 别名
        }
    },
    optimization: optimization,
    plugins: plugins,
    
})