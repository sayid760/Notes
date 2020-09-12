import React, { PureComponent, Component } from 'react'
import PropTypes from 'prop-types'
import { HomeWapper, HomeLeft, HomeRight, TopicWrapper, CodePicture, ToTop } from './style'
import { Topic } from './components/Topic'
import Recomment from './components/Recomment'
import Write from './components/Writer'
import List from './components/List'

import { connect } from 'react-redux';
import { ACTION } from './store/actionConst'
import { getHomeInfo } from './store/actionCreate'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <HomeWapper>
          <HomeLeft>
            <img className="banner-image" src='//upload.jianshu.io/admin_banners/web_images/4748/26da92b5de81ba0ed22e351ba9097003e8b87136.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'></img>
            <TopicWrapper />
            <List></List>
          </HomeLeft>
          <HomeRight>
            <Recomment></Recomment>
            <CodePicture>
              <img width="50" height="50" src="//cdn2.jianshu.io/assets/web/download-index-side-qrcode-cb13fc9106a478795f8d10f9f632fccf.png" />
              <div>
                <div>
                  <h4>下载简书手机App</h4>
                  <p>随时随地发现和创作内容</p>
                </div>
              </div>
            </CodePicture>
            <Write></Write>
          </HomeRight>
        </HomeWapper>
        <ToTop onClick={(e) => { window.scrollTo(0, 0) }}>^</ToTop>
      </div>
    )
  }

  componentDidMount() {
    this.props.changeHomeData();
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeHomeData() {
    let action = getHomeInfo();
    dispatch(action);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)