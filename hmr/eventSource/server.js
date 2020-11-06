const express = require("express")
const path = require('path')
const app = express(),
            DIST_DIR = path.join(__dirname, "./"), // 设置静态访问文件路径
            PORT = 3001// 设置启动端口

// app.get("*", (req, res, next) =>{
   
//     // res.writeHead(200, {
//     //   'Access-Control-Allow-Origin': '*',
//     //   ,
//     //   'Cache-Control': 'no-cache, no-transform',
//     //   'Connection': 'keep-alive',
//     //   // While behind nginx, event stream should not be buffered:
//     //   // http://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffering
//     //   'X-Accel-Buffering': 'no'
//     // });
//     // res.write('\n');
//     // next()
// })

app.use(express.static(DIST_DIR))

var tt=0;
app.get("/__webpack_hmr", (req, res, next) =>{
    res.setHeader("Content-Type", "text/event-stream");
    tt++;
   if(tt<5){
       res.write("data: {\"now\":\"" + new Date()+"\",\"success\":true}\r\n\r\n");
    }
    else{
       res.write("data: {\"now\":\"" + new Date()+"\",\"success\":false}\r\n\r\n");
    }
    res.end();
})

app.listen(PORT,function(){
    console.log("成功启动：localhost:"+ PORT)
})