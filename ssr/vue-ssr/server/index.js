/* eslint-disable no-console */
// nodejs服务器
const express = require("express");
const fs = require('fs')

// 创建express实例和vue实例
const app = express();
// 创建渲染器
const {createBundleRenderer} = require("vue-server-renderer");
const serverBundle = require('../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync('../public/index.temp.html', 'utf-8'), // 宿主模板文件
    clientManifest
})

// 中间件处理静态文件请求
app.use(express.static('../dist/client', {index: false})) // 为false是不让它渲染成dist/client/index.html
// app.use(express.static('../dist/client'))

// 前端请求什么我都不关系，所有的路由处理交给vue
app.get("*", async (req, res) => {
  try {
      const context = {
          url: req.url,
          title: 'ssr test'
      }
    // console.log(req.url);
    const html = await renderer.renderToString(context); // 之前接收vue实例，现在接收上下文
    // console.log(html);
    res.send(html);
  } catch (error) {
    console.log(error);
    res.status(500).send("服务器内部错误");
  }
});

app.listen(3000, () => {
  console.log("渲染服务器启动成功");
});
