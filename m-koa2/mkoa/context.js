let context = {};
// 代理方法，接收属性和名字
function delegateSet(property,name){
    // name被调用时触发的回调函数
    context.__defineSetter__(name, function(val){
        this[property][name] = val;
    })
}

function delegateGet(property,name){
    context.__defineGetter__(name,function(val){
        return this[property][name]
    })
}

// 往context身上挂东西，请求参数啥的挂上去，相当于在context上也挂载了response和request的方法、字段属性等
let requestSet =[];
let requestGet = ["query"];
let responseSet = ["body","status"];
let responseGet = responseSet

// 把方法依次挂上
requestSet.forEach(ele => {
    delegateSet('request', ele);
})

requestGet.forEach(ele => {
    delegateGet('request', ele)
})

responseSet.forEach(ele => {
    delegateSet('response', ele)
})

responseGet.forEach(ele => {
    delegateGet('response', ele)
})

// { query: [Getter], body: [Getter/Setter], status: [Getter/Setter] }
module.exports = context;
