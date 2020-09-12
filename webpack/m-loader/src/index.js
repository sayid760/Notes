// let str = require('./a.js') 
// import {a} from './a.js'
// console.log(a)
// console.log(str)

/*
class Fn{
    static getName(){
        return '1111'
    }
}

var f = new Fn()
console.log(Fn.getName())
*/
// loader 默认是由两部分组成 pitch normal

import './index.less' 

var a = require("./aa.jpg");
var img = document.createElement("img");
img.src = a;
document.body.appendChild(img)
