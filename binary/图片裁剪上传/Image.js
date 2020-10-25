import React from 'react';
export default class Image extends React.Component{
    imageRef=React.createRef()
    canvasRef=React.createRef()
    avatarRef=React.createRef()
    state = {
        file:null,//选中的文件
        dataURL:'',//选中的文件的原始的base64字符串
        times:1,//放大倍数,
        startX:0,//鼠标按下的开始的X坐标
        startY:0,//鼠标按下的开始的Y坐标
        startDrag:false,
        lastX:0,
        lastY:0,
        avatarDataUrl:''
    }
    handleChange = (event)=>{
        let file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (event)=>{
            this.setState({
                file,
                dataURL:event.target.result
            });
            //当图片加载成功后会执行回调
            this.imageRef.current.onload = ()=>this.drawImage();
        }
        fileReader.readAsDataURL(file);
    }
    bigger = ()=>{
        this.setState({times:this.state.times+0.1},()=>this.drawImage());
    }
    smaller = ()=>{
        this.setState({times:this.state.times-0.1},()=>this.drawImage());
    }
    handleMouseDown= (event)=>{
        this.setState({
            startX:event.clientX,
            startY:event.clientY,
            startDrag:true
        });
    }
    handleMouseMove= (event)=>{
        //X方向的移动的量 Y方面移动的量
        if(this.state.startDrag)
           this.drawImage(
               event.clientX-this.state.startX+this.state.lastX,
               event.clientY-this.state.startY+this.state.lastY);
    }
    handleMouseUp= (event)=>{
        this.setState({
            lastX:event.clientX-this.state.startX+this.state.lastX,
            lastY:event.clientY-this.state.startY+this.state.lastY,
            startDrag:false
        });
    }
    drawImage=(left=this.state.lastX,top=this.state.lastY)=>{
        let image = this.imageRef.current;//img dom元素
        let canvas = this.canvasRef.current;//canvas dom元素
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height);
        let imageWidth = image.width;
        let imageHeight = image.height;
        if(imageWidth>imageHeight){//如果宽度比高度大 图片的宽度调整为canvas的宽度
            let scale = canvas.width/imageWidth;
            imageWidth = canvas.width*this.state.times;
            imageHeight= imageHeight*scale*this.state.times;
        }else{
            let scale = canvas.height/imageHeight;
            imageHeight = canvas.height*this.state.times;
            imageWidth= imageWidth*scale*this.state.times;
        }
        ctx.drawImage(image,(canvas.width-imageWidth)/2+left,(canvas.height-imageHeight)/2+top,imageWidth,imageHeight);
    }
    confirm = (event)=>{
        let canvas = this.canvasRef.current;
        let ctx = canvas.getContext('2d');
        // 通过getImageData()复制画布上指定矩形的像素数据,然后通过putImageData()将图像数据放回画布:
        const imageData = ctx.getImageData(100,100,100,100);
        let avatarCavnas = document.createElement('canvas');
        avatarCavnas.width=100;
        avatarCavnas.height=100;
        let avatarCtx = avatarCavnas.getContext('2d');
        avatarCtx.putImageData(imageData,0,0);
        let avatarDataUrl= avatarCavnas.toDataURL(); // 转成base64
        this.setState({avatarDataUrl});
        this.avatarRef.current.src = avatarDataUrl;
    }
    upload = (event)=>{
        //不能直接 上传base64. 同一个图片,base64要比二进制大
        //base64 3个字节变成4个字节
        let bytes = atob(this.state.avatarDataUrl.split(',')[1]);
        // console.log('bytes')
        // console.log(bytes);
        let arrayBuffer = new ArrayBuffer(bytes.length);
        let uInt8Array = new Uint8Array();
        for(let i=0;i<bytes.length;i++){
            uInt8Array[i] = bytes.charCodeAt[i];
        }
        let blob = new Blob([uInt8Array],{type:'image/png'});
        let xhr = new XMLHttpRequest;
        // 用来创建表单数据的，用append以键值的形式将数据加入进去即可
        let formData = new FormData(); 
        formData.append('avatar',blob);
        xhr.open('POST','/upload',true);
        xhr.send(formData);
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <input type="file" accept="image/*" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        {
                            this.state.file&&(
                                <img className="img-responsive" 
                                   src={this.state.dataURL} ref={this.imageRef} style={{border:'2px dashed green'}}/>
                            )
                        }
                    </div>
                    <div className="col-md-4" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
                        {
                            this.state.file&&(
                                <>
                                <div style={{position:'relative'}}>
                                    <canvas 
                                      ref={this.canvasRef}
                                       width="300px"
                                       height="300px"
                                       style={{border:'2px dashed blue'}}
                                    />
                                    <div style={{width:100,height:100,backgroundColor:'yellow',opacity:.3,position:'absolute',left:100,top:100}}></div>
                                </div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary" onClick={this.bigger}>变大</button>
                                    <button type="button" className="btn btn-primary" onClick={this.smaller}>变小</button>
                                    <button type="button" className="btn btn-primary" onClick={this.confirm}>剪切</button>
                                </div>
                                </>
                            )
                        }
                    </div>
                    <div className="col-md-4">
                        {
                            this.state.file&&(
                                <img ref={this.avatarRef} style={{border:'2px dashed pink'}}/>
                            )
                        }
                        <button onClick={this.upload}>上传</button>
                    </div>
                </div>
            </div>
        )
    }
}