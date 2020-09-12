import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import defaultLayout from '@/layout'
// import { getWrappedComponent, getComponent } from 'ykfe-utils'
// import { getWrappedComponent } from 'ykfe-utils'
import { routes as Routes } from '../config/config.ssr'
import { matchPath } from 'react-router-dom'

const clientRender = async () => {
  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
      <Switch>
        {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
          Routes.map(({ path, exact, Component }) => {
            const ActiveComponent = Component()
            const Layout = ActiveComponent.Layout || defaultLayout
            const WrappedComponent = getWrappedComponent(ActiveComponent)
            return <Route exact={exact} key={path} path={path} render={() => <Layout key={window.location.pathname}><WrappedComponent /></Layout>} />
          })
        }
      </Switch>
    </BrowserRouter>
    , document.getElementById('app'))

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

const serverRender = async (ctx) => {
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(Routes, ctx.path)()
  // console.log(Routes)
  // console.log(ctx.path)

  const Layout = ActiveComponent.Layout || defaultLayout
  const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  ctx.serverData = serverData
  return <StaticRouter location={ctx.req.url} context={serverData}>
    <Layout layoutData={ctx}>
      <ActiveComponent {...serverData} />
    </Layout>
  </StaticRouter>
}

export default __isBrowser__ ? clientRender() : serverRender


// 
const getComponent = (Routes, path) => {
  // 根据请求的path来匹配到对应的component
  const activeRoute = Routes.find(route => matchPath(path, route)) || { Component: () => <div>路由查询404</div> } // 找不到对应的组件时返回NotFound组件
  const activeComponent = activeRoute.Component
  return activeComponent
}

let _this = null
let routerChanged = false
const popStateFn = (e) => { // PopStateEvent
  // historyPop的时候需要调用getInitialProps
  routerChanged = true
  // 使用popStateFn保存函数防止addEventListener重复注册,排除hashchange的情况
  if (!location.hash && _this && _this.getInitialProps) {
    _this.getInitialProps()
  }
}
// 
function getWrappedComponent  (WrappedComponent){ // GetInitialProps
  class GetInitialPropsClass extends React.Component { // <RouteComponentProps<{}>, IState>
    constructor (props) { // RouteComponentProps
      super(props)
      this.state = {
        extraProps: {}
      }
      if (!routerChanged) {
        routerChanged = !window.__USE_SSR__ || (props.history && props.history.action === 'PUSH')
      }
      if (window.__USE_SSR__) {
        _this = this // 修正_this指向，保证_this指向当前渲染的页面组件
        window.addEventListener('popstate', popStateFn)
      }
    }

    async componentDidMount () {
      // csr 或者 history push的时候需要调用getInitialProps
      if ((this.props.history && this.props.history.action !== 'POP' || !window.__USE_SSR__)) {
        await this.getInitialProps()
      }
    }

    async getInitialProps () {
      // csr首次进入页面以及csr/ssr切换路由时才调用getInitialProps
      const props = this.props
      if (WrappedComponent.preload) {
        // react-loadable 情况
        WrappedComponent = (await WrappedComponent.preload()).default
      }
      const extraProps = WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(props) : {}
      this.setState({
        extraProps
      })
    }

    render () {
      // 只有在首次进入页面需要将window.__INITIAL_DATA__作为props，路由切换时不需要
      return <WrappedComponent {...Object.assign({}, this.props, routerChanged ? {} : window.__INITIAL_DATA__, this.state.extraProps)} />
    }
  }
  return withRouter(GetInitialPropsClass)
}