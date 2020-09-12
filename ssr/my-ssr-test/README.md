# koa + react + ssr 脚手架

"csr": "cross-env NODE_ENV=development ykcli dev",

<!-- 详细用法实现请查看[官方文档](http://ykfe.net) -->

# 功能/特性
- [x] 基于cra脚手架开发
- [x] 支持本地开发热更替

- [x] 推荐使用egg作为Node.js框架但并不强制，事实上你可以发现几乎无需做任何修改即可迁移到koa,nest.js等框架
- [x] 支持react路由
- [x] 同时支持SSR以及CSR两种开发模式,本地开发环境以及线上环境皆可无缝切换两种渲染模式
- [x] 统一前端路由与服务端路由，无需重复编写路由文件配置

- [x] 
- [x] 支持tree shaking，优化构建bundle大小以及数量
- [x] 支持csr/ssr自定义layout，无需通过path来手动区分

<!-- - [x] 独创[最佳发布实践](http://ykfe.net/guide/deploy.html)，让你更新页面无需重启应用机器 -->


开发问题
- [x] webpack-dev-server打包后的文件都存在内存中，nodejs读取此内存就要通过


```
// 开发场景
npm run dev

// 打包
npm run prod    # 使用egg-scripts模拟SSR应用生产环境，如无特殊定制要求生产环境可以用该方式启动
npm run build   # 打包服务端以及客户端资源文件
npm run analyze # 可视化分析客户端打包的资源详情
```