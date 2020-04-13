var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    input AccountInput { // 修改数据前面要加input   
        name: String
        age: Int
        sex: String
        department: String
    }
    type Account {
        name: String
        age: Int
        sex: String
        department: String
    }
    type Mutation {
        createAccount(input:AccountInput):Account
        updateAccount(id: ID!, input: AccountInput):Account
    }
    type Query {
        accounts: [Account]
    }
`)

const fakeDb = {};

var root = {
    accounts(){
        const arr = [];
        for (const key in fakeDb) {
            arr.push(fakeDb[key])
        }
        return arr;
    },
    createAccount({input}) {
        fakeDb[input.name] = input;
        return fakeDb[input.name];
    },
    updateAccount({id, input}) {
        const updateAccount = Object.assign({}, fakeDb[id], input);
        fakeDb[id] = updateAccount;
        return updateAccount;
    }
}

var app = express()

app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true
}))

app.listen(4000, () => {
    console.log('Server start on port 4000')
})

// 调用
// mutation {
//     createAccount(input:{
//       name:"小明",
//       sex: "man",
//       age: 18,
//       department:"开发部"
//     }) {
//       name
//       age
//       sex
//       department
//     }
//   }
  
//   mutation {
//     updateAccount(id:"小明",input:{
//       age: 100
//     }) {
//       age
//     }
//   }
  
//   query {
//     accounts {
//       name
//       age
//       sex
//       department
//     }
//   }