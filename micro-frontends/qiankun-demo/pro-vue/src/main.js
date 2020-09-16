import Vue from "vue";
import App from "./App.vue";
import router from "./router";

let instance = null;
// 挂载到子应用html中之后，基座会拿到这个挂载后的html，将其插入进去
function render() {
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount("#app"); // 这里是挂载到自己的html中  基座会拿到这个挂载后的html 将其插入进去
}
if (window.__POWERED_BY_QIANKUN__) {
  // 动态添加publicPath
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 使用这个全局变量来区分当前是否运行在qiankun的主应用的上下文中
// 没有父应用  独自开启运行子应用
if (!window.__POWERED_BY_QIANKUN__) {
  // 默认独立运行
  render();
}
// 导出方法
export async function bootstrap() {}
export async function mount(props) {
  // 接收主应用传过来的参数
  console.log(props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
}
