let express=require('express')
let path = require('path')
let cors = require(cors)
let app=express()
const multer = require('multer') // 实现文件上传
app.use(cors)
app.use(express.static(path.join(__dirname,'public')))
app.use(multer({dest:'./uploads'}).single('avatar'))
app.post('/upload',function(req,res){
    res.json({scuess:true})
})
app.listen(3001,()=>{
    console.log('server started at port 3001')
})