const net=require('net')
const server=net.createServer((socket)=>{
    socket.on('data', function(buffer){
        // console.log(buffer, buffer.toString())
        const seqBuffer = buffer.slice(0, 2)
        const lessonid = buffer.readInt32BE(2)
        console.log(buffer)
        setTimeout(()=>{
            const buffer = Buffer.concat([
                seqBuffer,
                Buffer.from(data[lessonid])
            ])
            socket.write(
                buffer
            )
        }, 10+Math.random()*1000) // 随机一秒内返回，确定在包乱序返回的时候，客户端还能不能把返回包和请求包对应上
    })
})

server.listen(4000,()=>{
    console.log(4000)
})

const data={
    136791:'aaaa',
    136792:'bbbbb',
    136793:'cccccccc',
    136794:'ddddddd',
    136795:'eeeeeee',
    136796:'fffffff',
    136797:'ggggggg',
    136798:'hhhhhhh',
    136799:'iiiiiiii',
    136801:'gggggggg',
    136802:'kkkkkkkk',
    136803:'lllllllll',
    136804:'mmmmmmmmmm',
    136805:'nnnnnnnnn',
    136806:'ooooooo',
    136807:'ppppppppp',
    136808:'qqqqqqqq',
    136809:'rrrrrrrr',
    136810:'ssssssssss',
    136811:'tttttttttt',
    136812:'uuuuuuuuuu',
}

