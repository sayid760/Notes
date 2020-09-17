import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
// 组件
import components from '@/utils/component'
import { registerMicroApps, start, initGlobalState } from 'qiankun'

// 可以通过 initGlobalState 生成全局参数
const actions = initGlobalState({
  password: store.state.password,
  username: store.state.username
})
actions.onGlobalStateChange((options, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('主应用state改变')
  console.log(options, prev)
})
actions.setGlobalState({
  password: '123',
  username: 'hhh'
})

// actions.offGlobalStateChange()

const apps = [
  {
    name: 'vueApp', // 应用名字
    entry: '//localhost:8081', // 默认会加载这个html 解析里面的js 动态执行 (子应用必须支持跨域), fetch
    container: '#vue', // 容器名称
    activeRule: '/vue', // 激活路径
    props: {
      actions,
      // getMainStoreModules: () => mainModules,
      components
    }
  },
  {
    name: 'reactApp',
    entry: '//localhost:3000',
    container: '#react',
    activeRule: '/react',
    props: {
      // 传给子应用
      actions,
      // getMainStoreModules: () => mainModules,
      components
    }
  }
]

registerMicroApps(apps) // 注册
start() // 启动

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
