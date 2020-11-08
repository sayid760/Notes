export default {
  init: (cb) => {
    let isDOMReady = false;
    let isOnload = false;
    let cycleTime = 100;

    let Util = {
      getPerfData: (p) => {
        let data = {
          // 网络建连
          prevPage: p.fetchStart - p.navigationStart, // 上一个页面的时间
          redirect: p.redirectEnd - p.redirectStart, // 重定向时间
          dns: p.domainLookupEnd - p.domainLookupStart, // DNS查找时间
          connect: p.connectEnd - p.connectStart, // TCP建连时间
          network: p.connectEnd - p.navigationStart, // 网络总耗时

          // 网络接收
          send: p.responseStart - p.requestStart, // 前端从发送到接收的时间
          receive: p.responseEnd - p.responseStart, // 接收数据用时
          request: p.responseEnd - p.requestStart, // 请求页面的总耗时

          // 前端渲染
          dom: p.domComplete - p.domLoading, // dom解析时间
          loadEvent: p.loadEventEnd - p.loadEventStart, // loadEvent时间
          frontend: p.loadEventEnd - p.domLoading, // 前端总时间

          // 关键阶段
          load: p.loadEventEnd - p.navigationStart, // 页面完全加载的时间
          domReady: p.domContentLoadedEventStart - p.navigationStart, // DOM准备时间
          interactive: p.domInteractive - p.navigationStart, // 可操作时间
          ttfb: p.responseStart - p.navigationStart, // 首字节时间
        };
        return data
      },
      // DOM解析完成
      domready: (callback) => {
        if (isDOMReady === true) {
          return void 0;
        }
        let timer = null;
        let runCheck = () => {
          if (performance.timing.domComplete) {
            // 1.停止循环检测  2.运行callback
            clearTimeout(timer)
            callback()
            isDOMReady = true;
          } else {
            // 再去循环检测
            timer = setTimeout(runCheck, cycleTime);
          }
        }
        if (document.readyState === 'interactive') {
          callback();
          return void 0;
        }
        document.addEventListener('DOMContentLoaded', () => {
          // 开始循环检测， 是否DOMContentLoaded已经完成。
          runCheck();
        })
      },
      // 页面加载完成
      onload: (callback) => {
        if (isOnload === true) {
          return void 0;
        }
        let timer = null;
        let runCheck = () => {
          if (performance.timing.loadEventEnd) {
            // 1.停止循环检测  2.运行callback
            clearTimeout(timer)
            callback()
            isOnload = true;
          } else {
            // 再去循环检测
            timer = setTimeout(runCheck, cycleTime);
          }
        }
        if (document.readyState === 'interactive') {
          callback();
          return void 0;
        }
        window.addEventListener('load', () => {
          // 开始循环检测， 是否DOMContentLoaded已经完成。
          runCheck();
        })
      }
    }

    let performance = window.performance;
    Util.domready(() => {
      let perfData = Util.getPerfData(performance.timing)
      perfData.type = 'domready'
      // 获取到数据应该给sdk上层 去上传这个数据
      cb(perfData);
    });
    Util.onload(() => {
      let perfData = Util.getPerfData(performance.timing)
      perfData.type = 'onload'
      // 获取到数据应该给sdk上层 去上传这个数据
      cb(perfData);
    })
  }
}