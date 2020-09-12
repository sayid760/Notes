class SyncHook{
    constructor(){
        this.task=[]
    }
    tap(name,task){
        this.task.push(task)
    }
    call(...args){
        this.task.forEach(task =>task(...args) );
    }
}

let hook = new SyncHook(['name'])
hook.tap('node',function(name){
    console.log('node'+name)
})
hook.tap('react',function(name){
    console.log('react'+name)
})
hook.call('hahaha')

// module.exports = SyncHook