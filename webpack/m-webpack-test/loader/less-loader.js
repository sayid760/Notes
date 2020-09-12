let less = require('less');

function loader(source) { // 渲染源码，渲染完之后返回回去
    let css = '';
    less.render(source, function(err,c){ // 转成css
        css= c.css
    })
    css = css.replace(/\n/g, '\\n')
    return css
}

module.exports = loader;