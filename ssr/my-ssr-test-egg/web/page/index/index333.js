import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

// function Page (props) {
//   return (
//     <div className='normal'>
//       <button onClick={this.handleDynamicImport.bind(this)}>点击</button>
//       <div className='welcome' />
//       <ul className='list'>
//         {
//           props.news && props.news.map(item => (
//             <li key={item.id}>
//               <div>文章标题: {item.title}</div>
//               <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
//             </li>
//           ))
//         }
//       </ul>
//     </div>
//   )
// }

class Page extends React.Component {
  constructor () {
      super(...arguments);
      this.state = {
          Text: null
      }
  }
  handleDynamicImport () {
      import('./aa.js').then((Text) => {
          this.setState({
              Text: Text.default.msg
          })
      })
  }
  render () {
      return (
          <div className='normal'>
            <button onClick={this.handleDynamicImport.bind(this)}>点击</button>
            <div className='welcome' />
            <ul className='list'>
              {
                props.news && props.news.map(item => (
                  <li key={item.id}>
                    <div>文章标题: {item.title}</div>
                    <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
                  </li>
                ))
              }
            </ul>
              { this.state.Text ?  this.state.Text : null}
              <button onClick={this.handleDynamicImport.bind(this)}>点击</button>
          </div>
      )
  }
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__ ? (await window.fetch('/api/getIndexData')).json() : ctx.service.api.index()
}

export default Page

