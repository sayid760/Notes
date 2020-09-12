// let {SyncHook} = require('tapable')
// let SyncHook = require('./synckHook')
let { SyncLoopHook } = require('tapable')

class Lesson{
    constructor(){
        this.index = 0
        this.hooks = {
            arch:new SyncLoopHook(['name'])
        }
    }
    tap(){ // 注册监听函数   把这两个方法注册到数组里
        this.hooks.arch.tap('node',(name)=>{
            console.log('node'+name)
            return ++this.index === 3 ? undefined:'继续学'
        })
        this.hooks.arch.tap('react',(name)=>{
            console.log('react'+name)
        })
    }
    start(){ // call的时候会让两个方法执行
        this.hooks.arch.call('hahaha')
    }
}

let l = new Lesson()
l.tap() //注册两个事件   先监听再触发
l.start() // 启动钩子

