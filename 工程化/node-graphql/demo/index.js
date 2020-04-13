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
        salary(city: String): Int
    }
    type Query{
        getClassMates(classNo:Int!):[String]
        account(username: String):Account
    }
`)

// 定义查询对应的处理器
var root = {
    getClassMates({classNo}){
        const obj = {
            31: ['张三', '李四', '王五'],
            61: ['aa','bb','cc']
        }
        return obj[classNo]
    },
    account({username}){
        const name = username
        const age = 18
        const sex = 'man'
        const department = '开发部' 
        const salary = (city)=>{
            if( city === '北京' || city=='上海'||city=='广州'|| city=='深圳'){
                return 10000
            }
            return 8000
        }
        return {
            name,
            age,
            sex,
            department,
            salary
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
//     hello
//     accountName
//     age
//     account {
//       name
//       age
//       sex
//       department
//     }
//   }