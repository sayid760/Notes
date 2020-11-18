class FooError extends Error {
    constructor(m:string){
        super(m)
        // 设置原型对象，修复原型链
        Object.setPrototypeOf(this, FooError.prototype)
    }
    sayHello(){
        return 'hello' + this.message // 这里才能调用message属性
    }
}

let c = new FooError('111111')
c.sayHello()