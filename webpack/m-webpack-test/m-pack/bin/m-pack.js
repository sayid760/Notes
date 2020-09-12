#! /usr/bin/env node

// 告诉人家当前代码需要使用node环境来执行
// npm link 把包链接到全局下  (解除 npm unlink)
// console.log('~~~~~~')  测试

// 1）找到当前执行名的路径 拿到webpack.config.js
let path = require('path')

// config配置文件
let config = require(path.resolve('webpack.config.js'))
let Compiler = require('../lib/Compiler.js')
let compiler = new Compiler(config)

// 运行编译
compiler.run()