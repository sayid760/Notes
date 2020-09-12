let http = require('http')

class Application {
    constructor() {
        // super();
        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    compose() { 
        let next = async () => Promise.resolve();
        // function createNext(middleware, oldNext) {   
        //     return async () => {
        //         await middleware(oldNext); // 相当于fn1(fn2)
        //     };
        // }

        function createNext(middleware, oldNext) {  
            middleware(oldNext); // 相当于fn1(fn2)
        }

        let len = this.middlewares.length;
        for(let i=len-1;i>=0;i--){
            createNext(this.middlewares[i], next)
        }
        // next()
    }
    listen(...args) {
        console.log(args)
        // https.createServer(this.callback()).listen(3001);
        let server = http.createServer(this.compose()) 
        server.listen(...args);
    }
}


module.exports = Application;