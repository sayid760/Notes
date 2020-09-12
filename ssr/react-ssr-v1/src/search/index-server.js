const Koa = require('koa')
const path = require('path')
const _ = require('koa-route');
import React from 'react'
import Search from './index'
import {renderToString} from 'react-dom/server'
let app = new Koa()

app.use(require('koa-static')('public'))

app.use(_.get('/search', async function (ctx, next) {
    // 转义组件为字符串
    let counter = renderToString(<Search />)
    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div id="root">${counter}</div>
        <script src="/client.js"></script>
    </body>
    </html>
    `
}))

app.listen(3000)