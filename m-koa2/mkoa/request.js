let url = require('url');

module.exports = {
    get query() {
        return url.parse(this.req.url,true).query  // url.parse()将一个URL字符串转换成对象并返回
    }
}

/**
 * 
 * var a = url.parse('http://localhost:8080/one?a=index&t=article');
   console.log(a);
    //输出结果：
    {
        protocol : 'http' ,
        auth : null ,
        host : 'localhost:8080' ,
        port : '8080' ,
        hostname : 'localhost' ,
        hash : null ,
        search : '?a=index&t=article',
        query : 'a=index&t=article',
        pathname : '/one',
        path : '/one?a=index&t=article',
        href : 'http://localhost:8080/one?a=index&t=article'
    }
 * 
 */