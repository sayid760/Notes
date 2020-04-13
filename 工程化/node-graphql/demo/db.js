var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '123456xxx',
    database        : 'graphql'
});

var schema = buildSchema(`
    input AccountInput {
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
        deleteAccount(name: String!): Boolean
        updateAccount(name: String!, input: AccountInput):Account
    }
    type Query {
        accounts: [Account]
    }
`)

var root = {
    accounts(){
        return new Promise((resolve, reject) => {
            pool.query('SELECT name, age, sex, department from account', (error, results, fields) => {
                if (error) throw error;
                const arr = [];
                for (let i=0; i< results.length; i++) {
                    arr.push({
                        name: results[i].name,
                        age: results[i].age,
                        sex: results[i].sex,
                        department: results[i].department
                    })
                }
                resolve(arr);
            });
        })
    },
    createAccount({input}) {
        const data = {
            name: input.name,
            age: input.age,
            sex: input.sex,
            department: input.department
        }
        return new Promise((resolve, reject) => {
            pool.query('insert into account set ?', data, (error) => {
                if (error) throw error;
                // 返回保存结果
                resolve(data);
            });
        })
    },
    deleteAccount({name}) {
        return new Promise((resolve, reject) => {
            pool.query('delete from account where name = ?', [name], (error) => {
                if (error) {
                    console.log('出错了：' + error.message)
                    reject(false);
                    return;
                };
                // 返回保存结果
                resolve(true);
            });
        })
    },
    updateAccount({name, input}) {
        return new Promise((resolve, reject) => {
            pool.query('update account set ? where name = ?', [input, name], (error) => {
                if (error) throw error;
                // 返回保存结果
                resolve(input);
            });
        })
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