/* es 高版本转低级版本的时候的补丁处理。 */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
/* 处理dom元素点击延迟的库 */
import fastclick from 'fastclick';

import vuelazyload from "vue-lazyload";

import 'common/stylus/index.styl';

/* document.body所有按钮的点击都没300毫毛的延迟 */
fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(vuelazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
