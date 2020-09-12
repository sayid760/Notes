class SyncBailHook{  // 同步的时候可以加上保险，是否向下执行，不ok就不往下执行
    constructor(){
        this.tasks=[]
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...args){
        // 先执行第一个，第一个返回停止向下执行，就不再向下执行 （至少做一个）
        let ret // 当前函数的返回值
        let index=0 // 当前要先执行第一个
        // this.tasks.forEach(task =>task(...args) );
        do{
            ret = this.tasks[index++](...args) // 先取出第一个执行
        }while(ret === undefined && index < this.tasks.length) // 不是等于undefined就相当于卡住了
    }
}

let hook = new SyncBailHook(['name'])
hook.tap('node',function(name){
    console.log('node'+name)
    return '停止向下执行' 
})
hook.tap('react',function(name){
    console.log('react'+name)
})
hook.call('hahaha')

// module.exports = SyncHook