const express = require("express")
const path = require('path')
const app = express(),
            DIST_DIR = path.join(__dirname, "./"), // 设置静态访问文件路径
            PORT = 3001// 设置启动端口

app.use(express.static(DIST_DIR))

app.get("/__webpack_hmr", (req, res, next) =>{
    res.setHeader("Content-Type", "text/event-stream");
    setInterval(()=>{
      if(Math.floor(Math.random() + 0.5) == 1){
            res.write("data: \uD83D\uDC93\n\n");
      }else{
            res.write("data:{\"action\":\"built\", \" hash\":\"9ec4541e8510ba68ecb3\", \"now\":\"" + new Date()+"\"}\r\n\r\n");
      }
    },2000)
})

app.listen(PORT,function(){
    console.log("成功启动：localhost:"+ PORT)
})