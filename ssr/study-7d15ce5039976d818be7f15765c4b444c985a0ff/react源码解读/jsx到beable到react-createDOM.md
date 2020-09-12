### react 
jsx 都是通过 babel 工具转换成 js 代码的

```
function Comp() {
    return <a>123</a>
}

<Comp id="div" key="key">
    <span>1</span>
    <span>2</span>
</Comp>

//=============================== 转换之后代码

//这里注意的是，定义自定义组件的时候首字母必须是大写，否则在转换过程中第一个参数会转成字符
//例如 React.createElement('comp',null,123)，会在运行时报错
//只有原生dom 首字母才是小写。

function Comp() {
    return React.createElement('a',null,123);
}

React.createElement(
    Comp,
    {id:'div",key:'key'},
    React.createElement('span',null,1),
    React.createElement('span',null,2),
)
```