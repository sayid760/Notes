var { graphql, buildSchema } = require('graphql')

const schema = buildSchema(`
    type Comment {
        id: Int,
        name: String,
        isTop: Boolean,
        content: String,
        publishDate: String,
        commentNum: Int,
        praiseNum: Int
    }

    type Query{
        comment:[Comment]
    }
`)

schema.getQueryType().getFields().comment.resolve=()=>{
    return [{
        id:1,
        name:'小明',
        isTop:true,
        content:'hhhh',
        publishDate:'今天',
        commentNum:10,
        praiseNum:5
    }]
}

module.exports = schema




/*
var schema = buildSchema(`
    type Query{
        hello: String
    }
`)

var root = {
    hello: ()=>{
        return 'hello world!'
    }
}

module.exports = function(query){
    return graphql(schema, query, root).then(response =>{
        return response
    })
}


const query = require('./schema')
app.use(async ctx=>{
    const res = await query('{hello}')
    ctx.body = res
})



*/