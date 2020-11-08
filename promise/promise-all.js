
const resolvePromise = (promise2, result, resolve, reject) => {
    // 当 result 和 promise2 相等时，也就是说 onfulfilled 返回 promise2 时，进行 reject
    if (result === promise2) {
      return reject(new TypeError('error due to circular reference'))
    }
  
    // 是否已经执行过 onfulfilled 或者 onrejected
    let consumed = false
    let thenable
  
    if (result instanceof Promise) {
      if (result.status === 'pending') {
        result.then(function(data) {
          resolvePromise(promise2, data, resolve, reject)
        }, reject)
      } else {
        result.then(resolve, reject)
      }
      return
    }
  
    let isComplexResult = target => (typeof target === 'function' || typeof target === 'object') && (target !== null)
    // 如果返回的是疑似 Promise 类型
    if (isComplexResult(result)) {
      try {
        thenable = result.then
        // 如果返回的是 Promise 类型，具有 then 方法
        if (typeof thenable === 'function') {
          thenable.call(result, function(data) {
            if (consumed) {
              return
            }
            consumed = true
  
            return resolvePromise(promise2, data, resolve, reject)
          }, function(error) {
            if (consumed) {
              return
            }
            consumed = true
  
            return reject(error)
          })
        }
        else {
          return resolve(result)
        }
  
      } catch(e) {
        if (consumed) {
          return
        }
        consumed = true
        return reject(e)
      }
    }
    else {
      return resolve(result)
    }
}
  
  
  
  myPromise.prototype.catch = function(catchFunc) {
    return this.then(null, catchFunc)
  }
  
  myPromise.resolve = function(value) {
    return new myPromise((resolve, reject) => {
      resolve(value)
    })
  }
  
  myPromise.reject = function(value) {
    return new myPromise((resolve, reject) => {
      reject(value)
    })
  }
  
  myPromise.race = function(promiseArray) {
    if (!Array.isArray(promiseArray)) {
        throw new TypeError('The arguments should be an array!')
    }
    return new myPromise((resolve, reject) => {
      try {
        const length = promiseArray.length
        for (let i = 0; i <length; i++) {
          promiseArray[i].then(resolve, reject)
        }
      }
      catch(e) {
        reject(e)
      }
    })
  }
  
  myPromise.all = function(promiseArray) {
    if (!Array.isArray(promiseArray)) {
        throw new TypeError('The arguments should be an array!')
    }
    return new myPromise((resolve, reject) => {
      try {
        let resultArray = []
  
        const length = promiseArray.length
  
        for (let i = 0; i <length; i++) {
          promiseArray[i].then(data => {
            resultArray.push(data)
  
            if (resultArray.length === length) {
              resolve(resultArray)
            }
          }, reject)
        }
      }
      catch(e) {
        reject(e)
      }
    })
  }