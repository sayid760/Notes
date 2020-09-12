let { AsyncParallelHook } = require('tapable')
// 异步的钩子 串行、并行（需要等待所有并发的异步事件执行后再执行回调方法）
// 同时发送多个请求
class Lesson{
    constructor(){
        this.index = 0
        this.hooks = {
            arch:new AsyncParallelHook(['name'])
        }
    }
    tap(){ // 注册监听函数   把这两个方法注册到数组里
        this.hooks.arch.tapAsync('node',(name, cb)=>{
            setTimeout(()=>{
                console.log('node'+name)
                cb()
            }, 1000)
        })
        this.hooks.arch.tapAsync('react',(name, cb)=>{
            setTimeout(()=>{
                console.log('react'+name)
                cb()
            }, 1000)
        })
    }
    start(){ // call的时候会让两个方法执行
        this.hooks.arch.callAsync('hahaha',function(){
            console.log('end')
        })
    }
}

let l = new Lesson()
l.tap() //注册两个事件   先监听再触发
l.start() // 启动钩子

