import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerApplication, start } from 'single-spa'
Vue.config.productionTip = false

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// 名字随便起，加载哪个应用？调子应用方法，方法必须是promise
registerApplication(
  'myVueApp',
  async () => {
    console.log('加载模块')
    // 先加载公共脚本，再加载app
    await loadScript(`http://localhost:1000/js/chunk-vendors.js`)
    await loadScript(`http://localhost:1000/js/app.js`)
    return window.singleVue
  },
  location => location.pathname.startsWith('/vue')
)

start()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 注册子应用，并把它加载进来
