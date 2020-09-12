class AsyncParallelHook{  // 异步并行钩子
    constructor(){
        this.tasks=[]
    }
    tapAsync(name, task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let finalCallback = args.pop()
        let index=0
        let done=()=>{ // 像promise.all，当完成了就执行
            index++
            if(index == this.task.length){
                finalCallback()
            }
        }
    }
}

let hook = new AsyncParallelHook(['name'])
hook.tapAsync('node', (name,cb)=>{
    setTimeout(()=>{
        console.log('node'+name)
        cb()
    }, 1000)
})
hook.tapAsync('react', (name,cb)=>{
    setTimeout(()=>{
        console.log('react'+name)
        cb()
    }, 1000)
})
hook.tapAsync('webpack', (name,cb)=>{
    setTimeout(()=>{
        console.log('webpack'+name)
        cb()
    }, 1000)
})
hook.callAsync('hahaha', function(){
    console.log('end')
})
