import React from 'react';
import axios from 'axios';
export default class Audio extends React.Component{
  startRef=React.createRef()
  endRef=React.createRef()
  audioRef=React.createRef()
  audioClipRef=React.createRef()
  clip = async ()=>{
    // 创建一条线程
    this.worker = createWorker('/ffmpeg-worker-mp4.js');
    let response = await axios({url:'/song.mp3',responseType:'arraybuffer'});
    let originBuffer = response.data;
    let start = parseInt(this.startRef.current.value);
    let end = parseInt(this.endRef.current.value);
    let duration = end-start;//持续的时间
    // 把worker变成promise
    let result  = (await toPromise(
        this.worker,
        getClipCommand(originBuffer,start,duration)
    )).data.data.MEMFS[0].data;
    let blob = bufferToBlob(result);
    let audioClip = this.audioClipRef.current;
    audioClip.src = URL.createObjectURL(blob);
    audioClip.load();
    audioClip.play();
  }
  render(){
      return (
        <div>
            <input ref={this.startRef} defaultValue={0}/>
            <input ref={this.endRef} defaultValue={10}/>
            <button type="button" className="primary" onClick={this.clip}>clip</button>
            <audio ref={this.audioRef} controls src="/song.mp3"/>
            <audio ref={this.audioClipRef} controls/>
       </div>
      )
  }

}

function getClipCommand(arrayBuffer, start = 0, duration = 10) {
  return {
    type: "run",
    arguments: `-ss ${start} -i input.mp3 ${ duration ? `-t ${duration} ` : "" }-acodec copy output.mp3`.split(" "),
    MEMFS: [
      {
        data: new Uint8Array(arrayBuffer),
        name: "input.mp3"
      }
    ]
  };
}

function toPromise(worker, command) {
    return new Promise((resolve) => {
      const onSuccess = function (event) {
        switch (event.data.type) {
          case "done":
            worker.removeEventListener("message", onSuccess);
            resolve(event);
            break;
          default:
            break;
        }
      };
      // 主线程监听子线程的消息，如果有就调用函数onSuccess，如果类型为done，就把内容返回出去，并清除监听状态
      worker.addEventListener("message", onSuccess);
      // 是否存在，存在主线程把内容发给子线程
      command && worker.postMessage(command);
    });
  }
function createWorker(path){
    return new Worker(path);
}
function bufferToBlob(buffer){
    return new File([buffer],'clip.mp3',{type:'audio/mpeg'});
}