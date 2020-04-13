const net = require('net')
const socket = new net.Socket({})

socket.connect({
    host: '127.0.0.1',
    port: 4000 
})

// socket.write('good morning~')
// 半双工通信 
// 隔一段时间发送id（随机产生的id）到服务端获取数据
let lessonids =[
    "136791",
    "136792",
    "136793",
    "136794",
    "136795",
    "136796",
    "136797",
    "136798",
    "136799",
    "136801",
    "136802",
    "136803",
    "136804",
    "136805",
    "136806",
    "136807",
    "136808",
    "136809",
    "136810",
    "136811",
    "136812"
]
let buffer = Buffer.alloc(4);
let index = Math.floor(Math.random() * lessonids.length);
buffer.writeInt32BE(
    lessonids[index]
);
console.log(buffer);
socket.write(buffer);

socket.on('data',(buffer)=>{
    console.log(lessonids[index], buffer.toString())
    // 监听server接收到数据后，又不停发送
    buffer = Buffer.alloc(4);
    index = Math.floor(Math.random()*lessonids.length);
    buffer.writeInt32BE(
        lessonids[index]
    );
    socket.write(buffer);
})