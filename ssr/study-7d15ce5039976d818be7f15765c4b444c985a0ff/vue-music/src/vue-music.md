# 项目目录分解
```
src
  |- api            后台请求代码 ajax 等
  |- common         静态资源
    |- fonts
    |- images
    |- js
    |- stylus
        |- base.styl            //基础组件
        |- variable.styl        //颜色规范，字体规范，变量
        |- index.style          //
        |- icon                 //图标字体文件
        |- rest.style
        |- mixin.style          //定义一些函数替换样式
  |- components     通用组件
  |- router         路由组件
  |- store          
  |- static         静态文件
```

## 第三方包
```
"babel-polyfill": "^6.26.0",
"fastclick": "^1.0.6",
"stylus": "^0.54.7",
"stylus-loader": "^3.0.2",

jsonp 库
better-scroll 库
```

### jsonp 原理 & 手写实现

### better-scroll 的使用
- 自动滚动
- 滚间隔
- dots 的显示
- 方法
- probeType 
### vue-lazyload 使用
```
main.js

Vue.use(vuelazyload, {
  loading:require('common/image/default.png)
})
//用v-lazy 标签
<img v-lazy="item.picUrl" />
```

### webpack-dev-server 服务的使用&本地接口代理

- 使用 webpack-dev-middleware 拓展自己的服务代理

```
npm install --save-dev express webpack-dev-middleware@2.0.6
```

### vue使用要点
- 组件
  - 插槽 <slot></slot>
  - 的生命周期
  - 数据域
    - props
    - data
    - this
  - methods
  - watch
  - 事件
    -$emit
- 绑定 绑定到组件的props 属性
  :title
- 交互
  -@click
- 路由

