// 渲染首屏
import createApp from "./app";

// node服务器通过上下文的方式给我们传一个url进来，所以用context.url知道他访问的是什么
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();
    // 进入首屏
    router.push(context.url)
     // router不是一出来就有，需要时间，所以监听onReady方法，告诉他我准备就绪了
    router.onReady(() => {
        resolve(app); // 把我们实例返回
    }, reject)
  });
};
