import { HeaderWrapper, Logo, Nav, NavItem, Addtion, Button, SearchWapper, NavSearch } from "./style"

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAction } from "../../store/action";
import { ACTION } from "./store/actionConst";
import { loginOut } from '../../pages/login/store/actionCreators';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'


// const Heander = (props) => {
//     console.log('....' + JSON.stringify(props));
//     return (
//         <HeaderWrapper>
//             <Logo></Logo>
//             <Nav>
//                 <NavItem className='left active'>首页</NavItem>
//                 <NavItem className='left'>下载App</NavItem>
//                 <SearchWapper className={props.inpFocues ? "focused" : ""}>
//                     <NavSearch
//                         className="inputSerach"
//                         onBlur={props.onInputOutFoucsHandler}
//                         onFocus={props.onInputFocusHandler}>
//                     </NavSearch>
//                     <a className="icon" href="/"><i className="iconfont iconsousuo"></i></a>
//                 </SearchWapper>
//                 <NavItem className="right"> 登录 </NavItem>
//                 <NavItem className="right"> <i className="iconfont ddd iconAa"></i> </NavItem>
//             </Nav>
//             <Addtion>
//                 <Button className="reg">注册</Button>
//                 <Button className="writting"><i style={{ fontSize: "15px" }} className="iconfont iconweibiaoti1"></i>写作</Button>
//             </Addtion>
//         </HeaderWrapper>
//     )
// }



class Heander extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { inpFocues, isLogin, router } = this.props;
    return (
      <HeaderWrapper>
        <Logo></Logo>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          <SearchWapper className={this.props.inpFocues ? "focused" : ""}>
            <NavSearch
              className="inputSerach"
              onBlur={this.props.onInputOutFoucsHandler}
              onFocus={this.props.onInputFocusHandler}>
            </NavSearch>
            <a className="icon" href="/"><i className="iconfont iconsousuo"></i></a>
          </SearchWapper>
          <NavItem className="right" onClick={(e) => { this.props.onLoginBtnClick(isLogin, this.props) }}> {isLogin ? '退出' : '登录'} </NavItem>
          <NavItem className="right"> <i className="iconfont ddd iconAa"></i> </NavItem>
        </Nav>
        <Addtion>
          <Button className="reg">注册</Button>
          <Button className="writting"><i style={{ fontSize: "15px" }} className="iconfont iconweibiaoti1"></i>写作</Button>
        </Addtion>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inpFocues: state.getIn(['header', 'inpFocues']),
    isLogin: state.getIn(['login', 'login'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputFocusHandler: function () {
      dispatch(getAction(ACTION.CHANGE_FOCUS, true));
    },
    onInputOutFoucsHandler: function () {
      dispatch(getAction(ACTION.CHANGE_FOCUS, false));
    },
    onLoginBtnClick(status, props) {
      console.log(props);
      status ? dispatch(loginOut()) : props.history.push('/login');
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Heander));