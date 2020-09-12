原理：
交互点击数据bundle.js（由react组件打包出来的） +  初始化html（react组件通过renderToString变成html） = 同构渲染 

使用：
```
// 安装
npm install

// 打包客户端 bundle.js
npm run build:client      

// 打包server端
npm run build:server   

// 打包完开启server端
npm run dev:start  // 打开 http://localhost:3000/search
```
