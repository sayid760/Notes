const app = new(require('koa'))
// const mount = require('koa-mount')
const graphqlHTTP = require('koa-graphql')

app.use(
    graphqlHTTP({
        schema:require('./schema')
    })
)

app.listen(3000)

// 测试 http://localhost:3000/?query={comment{name}}