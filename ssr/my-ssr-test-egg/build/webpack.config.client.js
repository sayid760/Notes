'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const safePostCssParser = require('postcss-safe-parser')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const paths = require('./paths')
const baseConfig = require('./webpack.config.base')
const publicPath = '/'
const isDev = process.env.NODE_ENV === 'development'
const shouldUseSourceMap = isDev || process.env.GENERATE_SOURCEMAP
const devtool = isDev ? 'cheap-module-source-map' : (shouldUseSourceMap ? 'source-map' : false)
let devServer = {}
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

if (!isDev) {
  optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2
        },
        mangle: {
          safari10: true
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true
        }
      },
      // Use multi-process parallel running to improve the build speed
      // Default number of concurrent runs: os.cpus().length - 1
      parallel: true,
      // Enable file caching
      cache: true,
      sourceMap: shouldUseSourceMap
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        parser: safePostCssParser,
        map: shouldUseSourceMap
          ? {
            // `inline: false` forces the sourcemap to be output into a
            // separate file
            inline: false,
            // `annotation: true` appends the sourceMappingURL to the end of
            // the css file, helping the browser find the sourcemap
            annotation: true
          }
          : false
      }
    })
  ]
}

if(isDev){
  devServer = {
    publicPath: '/',
    host: '0.0.0.0',
    sockPort: 8000,
    contentBase: './dist',
    hot: true,
    port: 8000,
    headers: {
        'access-control-allow-origin': '*'
    },
    proxy: {
        '/': 'http://localhost:7001'
    }
  }
}

const plugins = [
  new webpack.DefinePlugin({
    '__isBrowser__': true // eslint-disable-line
  }),
  new ModuleNotFoundPlugin(paths.appPath),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ManifestPlugin({ // 用于生成资产清单
    fileName: 'asset-manifest.json',
    publicPath: publicPath
  })
]

if (process.env.npm_config_report === 'true') {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseConfig, {
  devtool: devtool,
  entry: {
    Page: [require.resolve('@babel/polyfill'), paths.entry]
  },
  resolve: {
    alias: {
      'react-router': require.resolve('react-router')
    }
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    hotUpdateChunkFilename: '[hash].hot-update.js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  optimization: optimization,
  plugins: plugins.filter(Boolean),
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: false,
  devServer: devServer
})