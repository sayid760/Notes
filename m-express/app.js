// const express = require('express')
const express = require('./mexpress/application')
let app = new express();

app.use(function(req, res, next){
    console.log('中间件1~~~~~~~')
    next()
    console.log('中间件3~~~~~~~')
});

app.use(function(req, res, next){
    console.log('中间件2~~~~~~~')
    next()
    console.log('中间件4~~~~~~~')
});

app.use('/', function(req, res, next){
    res.end('Hello World!!!!')
});

app.get('/', (req, res) => res.end('Hello World!'))

app.get('/user', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})
    res.end('用户user')
})

app.listen(3000)

