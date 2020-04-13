const fs = require('fs')
const protobuf = require('protocol-buffers')
const schema = protobuf(fs.readFileSync(__dirname+'/test.proto', 'utf-8'))

console.log(schema)

// 把结构化的数据编码成二进制的数据包
const buffer = schema.Column.encode({ 
    id:1,
    name:'Node.js',
    price:80.4
})

console.log(schema.Column.decode(buffer)) // 把二级制包解码成结构化数据