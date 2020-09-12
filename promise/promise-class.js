const { reject } = require("async")

(function(window){
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

class Promise{
    // 如果执行器抛了异常，promise会有什么状态，失败状态，但是既调掉resolve，也没调reject
    // excutor 执行器函数（同步执行）
    constructor(excutor){
        // 将当前promise对象保存起来
        const self = this
        self.status = PENDING // 给promise对象指定status属性，初始值为PENDING
        self.data = undefined   // 给promise对象指定一个用于存储结果数据的属性
        self.callbacks = [] // 每个元素的结构：{onResolved(){},onRejected(){}}
        function resolve(value){
            // 如果当前状态不是PENDING，直接结束
            if(self.status !== PENDING){
                return
            }

            // 将状态改为RESOLVED
            self.status = RESOLVED
            // 保存value数据
            self.data = value
            // 如果有待执行callback函数，立即异步执行回调函数onResolved
            if(self.callbacks.length>0){
                setTimeout(()=>{ // 放入队列中执行所有成功的回调
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onResolved(value)
                    });
                })
            }
        }

        function reject(reason){
            // 将状态改为RESOLVED
            self.status = REJECTED
            // 保存value数据
            self.data = reason
            // 如果有待执行callback函数，立即异步执行回调函数onResolved
            // 异步执行待执行的回调函数，注意：有待执行说明提前已经有then调用过来
            if(self.callbacks.length>0){ 
                setTimeout(()=>{ // 放入队列中执行所有成功的回调
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onRejected(reason)
                    });
                })
            }
        }

        try{
            // 立即同步执行excutor
            excutor(resolve,reject)
        }catch(err){ // 如果执行器抛出异常，promise对象变为REJECTED状态
            reject(err)
        }
    
    }
    /*
        Promise原型对象的方法
        指定成功和失败的回调函数
        返回一个新的promise对象
    */
    then(onResolved, onRejected){ // then里面有两个回调函数

        // 调用.then的时候有可能不执行onRejected，有可能会异常穿透：如果onRejected没有值，要给它一个函数，并且这个函数要向外抛出reason
        onResolved = typeof onResolved === 'function'? onResolved : value => value // 向后传递成功的value

        // 指定默认的失败回调(实现错误、异常传递)
        onRejected = typeof onRejected === 'function'? onRejected : reason=>{throw reason} // 向后传递失败的reason

        const self = this
        
        // 返回一个新的promise对象
        return new Promise((resolve, reject)=>{
            // 调用指定回调函数处理，你传谁我就调用谁，改变return的promise状态
            function handle(callback) { 
                /*
                1、如果抛出异常，return的promise就会失败，reason就是error
                2、如果回调函数返回不是promise，return的promise就会成功，value就是返回的值
                3、如果回调函数返回的是promise，return的promise结果就是这个promise的结果
                */
                // 怎么知道他是不是抛出异常？捕获一下就知道
                try {
                    const result = callback(self.data) 
                    if(result instanceof Promise){
                        // 怎么样得到promise的结果？只有.then才能得到,如果value说明成功，reason说明失败
                        result.then(
                            value=> resolve(value), // 当result成功时，让return的promise也成功
                            reason=> reject(reason) // 当result失败时，让return的promise也失败
                        )
                        // 相当于result.then(resolve, reject)
                    } else{
                        resolve(result)
                    }  
                } catch (error) {
                    reject(error)
                }
            }
            if(self.status === PENDING){
                // 状态还是PENDING的时候调用.then
                // 假设当前状态还是PENDING状态，将回调函数保存起来
                self.callbacks.push({ //不仅要执行这onResolved/onRejected两个回调函数，还要修改promise状态
                    onResolved(value){
                        handle(onResolved)
                    }, 
                    onRejected(reason){
                        handle(onRejected)
                    }
                })
            }else if(self.status === RESOLVED){ // 如果当前是resolve状态，异步执行onResolve并改变return的promise状态
                setTimeout(() => {
                    handle(onResolved)
                });
            }else{ // 如果当前是rejected状态，那就异步去处理失败回调
                setTimeout(() => {
                    handle(onRejected)
                });
            }
        
        })
    }

    /*
        Promise原型对象的方法
        指定失败的回调函数
        返回一个新的promise对象
    */
    catch(onRejected){
        return this.then(undefined, onRejected)
    }

    /*
        Promise函数对象的方法
        返回一个指定结果的成功promise
    */
    static resolve(value){
        // 返回一个成功/失败的promise
        return new Promise((resolve, reject)=>{
            // value是promise
            if(value instanceof Promise){
                value.then(resolve, reject) //使用value的结果作为promise的结果
            }else{ // value不是promise => promise变成功，数据是value
                resolve(value)
            }
        })
    }

    /*
        Promise函数对象的方法
        返回一个指定结果的失败promise
    */
   static reject(reason){
        // 返回一个失败的promise
        return new Promise((resolve, reject)=>{
            reject(reason)
        })
    }

    /*
        Promise函数对象的方法
        返回一个promise，只有当所有promise都成功时才成功，否则只要有一个失败就失败
    */
   static all(promises){
        // 用来保存所有成功value的数组
        const values = new Array(promises.length)
        // 用来保存成功promise的数量
        let resolveCount = 0
        // 返回一个新的promise
        return new Promise((resolve,reject)=>{
            // 遍历promises获取每个promise的结果
            promises.forEach((p,index)=>{ // index不能拿来判断多少次，因为只是遍历的下标，不代表结果它每一个是成功
            // p可能不是promise，要把它包装成promise
            Promise.resolve(p).then(
                    value=>{ // 进来一个说明成功一次，怎么知道进来多少次？计步器
                        resolveCount++; // 成功的数量加1

                        // p成功，将成功的value保存values
                        // values.push(value) //这种是先成功先放，后成功后放，是异步，不能这样存，要按promises的顺序存
                        values[index] = value
                        
                        // 只要进来promises.length次就说成功
                        // 如果全部成功了，将return的promise改变成功
                        if(resolveCount === promises.length){
                            resolve(values)
                        }
                    },
                    reason=>{ // 只要一个失败了，return的promise就失败
                        // 如果两个失败，那么reject会调用两次三次，后面的不会把前面覆盖，因为promise状态只能改一次
                        reject(reason)
                    }
                )
            })
        })
    }

    /*
        Promise函数对象的方法
        返回一个promise，其结果由第一个完成的promise决定
        谁最先完成，它成功我就成功，它失败我就失败
    */
   static race(promises){
        return new Promise((resolve, reject)=>{
            // 遍历promise获取每一个promise的结果
            promises.forEach((p, index)=>{
                Promise.resolve(p).then(
                    value=>{ // 一旦有成功了，将return为成功
                        resolve(value)
                    },
                    reason=>{ // 一旦有失败，将return变为失败
                        reject(reason)
                    }
                )
            })
        })
    }

    /**
     * 返回一个promise对象，它在指定的时间后才确定结果
     */
    static resolveDelay(value, time){
        // 返回一个成功/失败的promise
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                // value是promise
                if(value instanceof Promise){
                    value.then(resolve, reject) //使用value的结果作为promise的结果
                }else{ // value不是promise => promise变成功，数据是value
                    resolve(value)
                }
            }, time)
        })
    }

    /**
     * 返回一个promise对象，它在指定的时间后才失败
     */
    static rejectDelay(reason, time){
        // 返回一个失败的promise
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                reject(reason)
            }, time)
        })
    }
}

    window.Promise = Promise

})(window)

