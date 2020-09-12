let less = require('less')
function loader(source){
    console.log('less-loader')
    let css
    less.render(source,function(err, r){ // r.css 转化后的css
        css = r.css
    })
    return css
}

module.exports = loader