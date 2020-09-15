import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app");

/*	1. singleSpaVue(Vue, appOptions)
	- Vue（必须参数），Vue对象，通过import暴露或者通过require('vue')的方式
	- appOptions（必须参数），是用于创建你的vue应用的一个实例对象，通过new Vue(appOptions)的方式创建
  	2. __webpack_public_path__ = 'xxx'，相当于webpack里的公共路径，output: {publicPath: 'http://123.com/'},
*/

const appOptions = {
  el: '#vue', // el是挂载到父应用的哪个标签上
  router,
  render: h => h(App)
}
const vueLifeCycle = singleSpaVue({
  Vue, // 生成包装后的生命周期
  appOptions
})

// 被父应用引用时
if (window.singleSpaNavigate) {
  /* eslint-disable */
  __webpack_public_path__ = 'http://localhost:1000/' // 给打包的时候加目录
}
// 当没有被父应用引用时，做回自己
if (!window.singleSpaNavigate) {
  delete appOptions.el
  new Vue(appOptions).$mount('#app')
}

// 定义好的协议，会被父应用调用
export const bootstrap = vueLifeCycle.bootstrap
export const mount = vueLifeCycle.mount
export const unmount = vueLifeCycle.unmount

// 父应用加载子应用，将子应用打包成一个个lib去给父应用使用
// 给window挂载3个属性，就是子应用的三个方法
