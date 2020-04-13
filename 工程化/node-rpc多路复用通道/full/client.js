const net = require('net')
const socket = new net.Socket({})

socket.connect({
    host: '127.0.0.1',
    port: 4000 
})

/* 半双工通信通信通道如果并发请求的话，就很容易出现请求包、返回包错乱的情况，
所有的请求包返回包都要带上序号--->变成全双工  同时发100个包，只接收到一个返回 
*/
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
let id = Math.floor(Math.random() * lessonids.length);

socket.on('data',(buffer)=>{
    console.log(lessonids[id], buffer.toString())
    const seqBuffer = buffer.slice(0, 2)
    const titleBuffer = buffer.slice(2) // 剩下的
    console.log(seqBuffer.readInt16BE(), titleBuffer.toString())
    // 监听server接收到数据后，又不停发送
    id = Math.floor(Math.random()*lessonids.length);
    // socket.write(encode(id))
})

let seq = 0
function encode(index){
    // 在buffer的前两位写seq
    buffer = Buffer.alloc(6)
    buffer.writeInt16BE(seq)
    buffer.writeInt32BE(lessonids[index], 2) // id写在下标2的位置
    console.log(seq, lessonids[index])
    seq++;
    return buffer;
}

// setInterval(()=>{
//     id = Math.floor(Math.random()*lessonids.length);
//     socket.write(encode(id)) // 每50毫秒发送请求包
// }, 50)

// 同时发100个包
for(let k=0;k<100;k++) {
    id = Math.floor(Math.random()*lessonids.length);
    socket.write(encode(id)) // 每50毫秒发送请求包
}

// 只接收到一个放回，tcp底层会自动把我们发的包拼起来，拼成一个大包，一次过发送给server，称为粘包，需要队报进行切分，切分成100个请求包