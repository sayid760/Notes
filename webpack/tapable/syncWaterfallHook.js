class SyncWaterfallHook{  // 上一个的放回值是下一个的输入
    constructor(){
        this.tasks=[]
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...args){
      let [first, ...others] = this.tasks
      let ret = first(...args) // 第一个的结果
      // 迭代
      others.reduce((a, b)=>{
        b(a)  // 相当于下一个函数，a就是第一个函数的返回结果
      }, ret) // 把ret传进去
    }
}

let hook = new SyncWaterfallHook(['name'])
hook.tap('node',function(name){
    console.log('node'+name)
    return '停止向下执行' 
})
hook.tap('react',function(name){
    console.log('react'+name)
})
hook.tap('webpack',function(name){
    console.log('webpack'+name)
})
hook.call('hahaha')
