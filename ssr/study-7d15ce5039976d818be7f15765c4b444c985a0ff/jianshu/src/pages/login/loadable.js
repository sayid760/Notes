
import React from 'react'
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
    //指定加载的模块
    loader: () => import('./index'),
    //加载时候显示的dom原生
    loading() {
        return <span>loading....</span>;
    }
})

//异步加载 login 界面
export default () => <LoadableComponent />