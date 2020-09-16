import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { registerMicroApps, start } from 'qiankun'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
const apps = [
  {
    name: 'vueApp',  // 应用名字
    entry: '//localhost:8081', // 默认会加载这个html 解析里面的js 动态执行 (子应用必须支持跨域), fetch
    container: "#vue", // 容器名称
    activeRule: '/vue' // 激活路径
  },
  {
    name: 'reactApp',
    entry: '//localhost:3000', 
    container: "#react",
    activeRule: '/react',
    // props: { a: 1 } // 传给子应用
  }
]

registerMicroApps(apps); // 注册
start(); // 启动

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
  