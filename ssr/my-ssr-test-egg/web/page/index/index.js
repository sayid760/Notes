import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './index.less'

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
        Text: null
    }
  }
  static getInitialProps = async (ctx) => {
    // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
    // return __isBrowser__ ? (await window.fetch('/api/getIndexData')).json() : ctx.service.api.index()
    return 
  }
  handleDynamicImport () {
    console.log('rrrrrrr')
    import('./aa.js').then((Text) => {
      console.log(Text.default.msg)
        this.setState({
            Text: Text.default.msg
        })
    })
  }
  render () {
    const { Text } = this.state;
    return (
      <div className='normal'>
         { Text ?  this.state.Text : null}
        <button onClick={this.handleDynamicImport.bind(this)}>点击</button>
            <ul className='list'>
              {
                this.props.news && this.props.news.map(item => (
                  <li key={item.id}>
                    <div>文章标题: {item.title}</div>
                    <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
                  </li>
                ))
              }
            </ul>
      </div>
    )
  }
}

export default Home