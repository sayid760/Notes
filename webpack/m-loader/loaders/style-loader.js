// 导出脚本
let loaderUtils = require('loader-utils')
function loader(source){
    console.log('style-loader')
    // style.innerHTML= "body{\r\n background:red}"
    let str = `
        let style = document.createElement('style');
        style.innerHTML= ${JSON.stringify(source)};
        document.head.appendChild(style);
    `
    return str
}

// style-loader    less-loader!css-loader/./index.less
loader.pitch = function(remainingRequest){ // 剩余的请求
    // console.log(remainingRequest)
    return `style = document.createElement('style')
    style.innerHTML = require(${loaderUtils.stringifyRequest(this,'!!'+remainingRequest)})
    document.head.appendChild(style)`
}

module.exports = loader