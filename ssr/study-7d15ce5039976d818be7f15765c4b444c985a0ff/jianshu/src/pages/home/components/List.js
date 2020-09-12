
import React, { Component, PureComponent } from 'react';
import { ListItem, ListWrapper, AddMore } from '../style';
import { connect } from 'react-redux';
import { getAddHome } from '../store/actionCreate';
class List extends PureComponent {
  constructor(props) { super(props); } ß
  render() {
    let { list ,page} = this.props;
    console.log(`this render page ${page}`);
    return (
      <div>
        <ListWrapper>
          {
            list && list.map(item => {
              return (
                <ListItem key={item.get('id')}>
                  <div className="list-info">
                    <h3>{item.get('title')}</h3>
                    <p>{item.get('desc')}</p>
                    <div className="meta">
                      <span className="jsd-meta">
                        <i className="iconfont icon31"></i>
                        <span>{item.get('jsd')}</span>
                      </span>
                      <span>
                        <span>{item.get('author')}</span>
                      </span>
                      <span>
                        <i className="iconfont iconpinglun1"></i>
                        <span>{item.get('msgcount')}</span>
                      </span>
                      <span>
                        <i className="iconfont iconshoucang3"></i>
                        <span>{item.get('favorites')}</span>
                      </span>
                    </div>
                  </div>
                  <div className="img-content">
                    <img src="https://upload-images.jianshu.io/upload_images/11308958-ad32a3be98fabc62.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240" width="100%" />
                  </div>
                </ListItem>
              )
            })
          }
        </ListWrapper>
        <AddMore onClick={(e)=>{this.props.clickMore(e,page)}}> 阅读更多 </AddMore>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let props = {
    list: state.getIn(['home', 'articleList']),
    page:state.getIn(["home",'articlePage'])
    // inpFocues: state.getIn(['header', 'inpFocues']),
  }
  console.log(props);
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickMore:function(e,page) {
      console.log(`this page = ${page}`);
      let action = getAddHome(page + 1);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
