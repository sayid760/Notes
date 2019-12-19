(function(window){
    const PENDING='pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    function Promise(excutor){
        const self = this
        self.status = PENDING
        self.data = ''
        self.callbacks = [] // 每个元素的结构：{onResolved(){},onRejected(){}}

        function resolve(value){
            if(self.status !== PENDING) return
            self.status = RESOLVED
            self.data = value
            if(self.callbacks.length>0){
                setTimeout(()=>{
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onResolved(value)
                    });
                })
            }
        }

        function reject(reason){
            if(self.status == PENDING) return
            self.status = REJECTED
            self.data = reason
            if(self.callbacks.length>0){
                setTimeout(()=>{
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onRejected(reason)
                    });
                })
            }
        }

        try{
            excutor(resolve, reject)
        }catch(err){
            reject(err)
        }
    }

    Promise.prototype.then=function(onResolved,onRejected){
        return Promise((resolve,reject)=>{
            if(self.status == RESOLVED){
                onResolved()
            }else if(self.status == REJECTED){
                reject()
            }else{
                this.callbacks.push({onResolved,onRejected})
            }
        })
    }

    Promise.prototype.catch=function(){

    }

    Promise.all=function(){

    }

    Promise.race=function(){

    }

    window.Promise = Promise
})(winodw)