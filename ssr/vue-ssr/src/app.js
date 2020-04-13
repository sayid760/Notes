// 每一次请求都要重新创建vue实例，需要他里面的内容渲染成html就行了，不需要$mount()

// 创建vue实例
import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router";

export default function createApp() {
  const router = createRouter();
  const app = new Vue({
    router,
    render: h => h(App),
  });
  return { app, router };
}
