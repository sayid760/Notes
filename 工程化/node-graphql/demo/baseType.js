var express = require('express')
var graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')

// 用来描述接口信息，对外公开查询语句和类型
var schema = buildSchema(`
    type Account {
        name: String
        age: Int
        sex: String
        department: String
    }
    type Query{
        hello: String
        account: Account
    }
`)

// 定义查询对应的处理器
var root = {
    hello :()=>{
        return 'hello word'
    },
    account :()=>{
        return {
            name: 'hh',
            age: 18,
            sex: '男',
            department: 'xxx' 
        }
    }
}

var app = express()
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // 是否启动调试界面，用来调试，上线时不能对外暴露这个接口，要设置成false
}))

app.listen(4000)

// 调用
// query{
//     getClassMates(classNo:31),
//     account(username:"小明"){
//       name,
//       age,
//       sex,
//       department,
//       salary(city:"广州")
//     }
//   }