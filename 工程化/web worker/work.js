let total= 0
for(var i=0;i<100000000;i++){
    total +=i
}
// 1.监听主线程发送的消息
self.addEventListener('message', e=>{
    console.log(e.data)
})
// 2.给主线程发送消息
self.postMessage({total:`我是子线程---->${total}`})
