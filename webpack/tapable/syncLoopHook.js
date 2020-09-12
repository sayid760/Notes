class SyncLoopHook{  // 同步遇到某个不返回undefined的监听函数会多次执行
    constructor(){
        this.tasks=[]
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...args){
        this.tasks.forEach(task=>{
            let ret
            do{
                ret = task(...args)
            }while(ret!=undefined)
        })
    }
}

let hook = new SyncLoopHook(['name'])
let total = 0
hook.tap('node',function(name){
    console.log('node'+name)
    return ++total === 3 ? undefined:'继续学'
})
hook.tap('react',function(name){
    console.log('react'+name)
})
hook.tap('webpack',function(name){
    console.log('webpack'+name)
})
hook.call('hahaha')
