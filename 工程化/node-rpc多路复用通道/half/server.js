const net=require('net')
const server=net.createServer((socket)=>{
    socket.on('data', function(buffer){
        // console.log(buffer, buffer.toString())

        const lessonid = buffer.readInt32BE()
        console.log(lessonid)
        setTimeout(()=>{
            socket.write(
                Buffer.from(data[lessonid])
            )
        }, 500)
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

