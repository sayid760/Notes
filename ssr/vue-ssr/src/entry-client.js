// 挂载、激活app
import createApp from './app'
// 把填满内容的app挂载到#app div上，让它成为真正spa
const {app,router} = createApp();
router.onReady(() => {
    app.$mount('#app')
})