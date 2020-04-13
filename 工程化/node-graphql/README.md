## GraphQL
是facebook开发的一种数据查询语言，是一种描述性查询语言。
特点:
- 请求需要的数据不多不少
resulf不可以定制要哪些字段，graphql可以定义要哪些字段，可以只取需要的字段。
- 获取多个资源，只用一个请求
- 把所有需要的资源描述成类型。
便于维护，根据需求平滑演进，添加或者隐藏字段

基本类型：String、Int、Float、Boolean和ID（本质字符串类型）
[类型]代表数组，例如:[Int]代表整型数组
参数传递：小括号内定义，但是参数需要定义类型。!(叹号)代表参数不能为空
type Query{
    rollDice(numDice:Int!,numSide:Int):[Int]
}

```
// 安装
npm i --save express express-graphql graphql

// 访问
http://localhost:4000/graphql
```

### 使用mutation修改数据
查询使用query，修改数据使用mutation
修改数据前面要加input  
```
input AccoutInput{
    name: String
    age: Int
    sex: String
    department: String
}
type Mutation {
    createAccount(input:AccountInput):Account
    updateAccount(id: ID!, input: AccountInput):Account
}
```

### 高级ConstructingTypes
```
var schema = buildSchema(`
    type Account {
        name: String
        age: Int
        sex: String
        department: String
        salary(city: String): Int
    }

    type Query {
        getClassMates(classNo: Int!): [String],
        account(username: String): Account
    }
`)

// 修改为
/ 使用GraphQLObjectType定义type(类型)   比较好维护：因为字符串出问题了，我们不知道哪里出问题了
var AccountType = new graphql.GraphQLObjectType({
    name: 'Account',
    fields: {
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        sex: { type: graphql.GraphQLString },
        department: { type: graphql.GraphQLString }
    }
})

// 使用GraphQLObjectType定义query(查询)
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        account: { // 方法名
            type: AccountType, // 方法的返回值
            args: {
                username: { type: graphql.GraphQLString } // 参数
            },
            resolve: function(_, {username}) { // 方法体
                const name = username
                const sex = 'man'
                const age = 18
                const department = '开发部'
                return {
                    name,
                    age,
                    sex,
                    department
                }
            }
        }
    }
})
```