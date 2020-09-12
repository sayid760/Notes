# 项目练习知识点


### styled-components 
css in js 使用js 的方式定义css组件
```
export const HomeWapper = styled.div`
  width:960px;
  margin:0px;
  height:300px;
  background:red;
`

```

### react-transition-group

### redux && react-redux 的使用 

```

redux 结构
  - action (消息传递作用，数据行为穿透)
  - reducer（业务逻辑数据处理）
  - store （redux 入口）
  - 开发插件 & 工具
    - redux-devtool (数据调试检查工具)
    - react-redux (react版本的 redux)
    - redux-thunk (dispatch 异步拆分业务逻辑)


store 数据域的使用捆绑

reducer.js 定义数据域&业务拆分

import { combineReducers } from 'redux-immutable';

import {reducer as headerReducer} from '../common/header/store';
import homeReducer from '../pages/home/store/reducer';

/**整合拆分的reducer */
const reducer = combineReducers({
    header: headerReducer,
    home:homeReducer
})

export default reducer;

store.js 数据捆绑

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

//是否启用调试工具
const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//使用中间件
const store = createStore(reducer, composeEnhancers(
	applyMiddleware(thunk)
));

export default store;
import store from './store';

=====================================
import {connect} from 'react-redux';

connect 的使用&作用
  - 绑定组件
  - 组件的state 绑定 props
  - 组件的业务方法 绑定 props

//页面装在完成，触发
componentDidMount() {
    this.props.changeHomeData();
  }

//将组件的 state 绑定到 props
const mapStateToProps = (state) => {
  return {
    state
  }
}

//绑定组件的业务逻辑方法 在组件的props 中调用
const mapDispatchToProps = (dispatch)=> ({
  changeHomeData() {
    let action = getHomeInfo();
    dispatch(action);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
```

### combineReducers 整合拆分的reducer 
```

import { combineReducers } from 'redux-immutable';

import {reducer as headerReducer} from '../common/header/store';
import homeReducer from '../pages/home/store/reducer';

/**整合拆分的reducer */
const reducer = combineReducers({
    header: headerReducer,
    home:homeReducer
})

export default reducer;
```

### immutable 的使用

immutable 的作用和目的是在消息数据穿透的过程中数据被意外修改，起码起码数据不能通过运算符进行串改，数据一致性，安全性得到一定的保证。

```
const defaultState = fromJS({
    inpFocues: false,
})

export default (state = defaultState, action) => {
    console.log(JSON.stringify(action));
    if (action.type === ACTION.CHANGE_FOCUS) {
        return state.set('inpFocues',action.value);
    }
    return state;
}; 

export default (state = defaultState, action) => {
  console.log(JSON.stringify(action));
  if (action.type === ACTION.GET_HOME_DATA) {
      return state.merge({
        recommendList:fromJS(action.recommendList),
        articleList:fromJS(action.articleList),
        authorList:fromJS(action.authorList),
      })
      // state.set('articleList',action.articleList);
      // state.set('recommendList',action.recommendList);
  }
  return state;
}; 
```

### react-router-dom 的使用
```
- BrowserRouter Router

- Router
    - path:'/'
    - render = {()=><div>home</div>}
    - exact 完全匹配

import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Detail } from './pages/detail';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Heander></Heander>
          <Route path='/' exact component={Home}></Route>
          <Route path='/detail' exact component={Detail}></Route>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;


```

### 活用css3
```

- 父子选择器
    - 父子间接选择器
    - 父子直接选择器
- 伪元素选择器
    - first-child
    - last-child
    - 属性选择器
  
### flex 布局
- content 包裹元素
  - flex-direction
    - flex-direction: row | row-reverse | column | column-reverse;
  - flex-wrap
    -   flex-wrap: nowrap | wrap | wrap-reverse;
  - flex-flow flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
    -   flex-flow: <flex-direction> <flex-wrap>;
  - justify-content justify-content属性定义了项目在主轴上的对齐方式。
    -   justify-content: flex-start | flex-end | center | space-between | space-around;
  - align-items align-items属性定义项目在交叉轴上如何对齐。(垂直对齐))
    - align-items: flex-start | flex-end | center | baseline | stretch;
  - align-content
    - align-content: flex-start | flex-end | center | space-between | space-around | stretch;

- item 子级元素
    - order
      -   order: <integer>; order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
    - flex-grow
      -   flex-grow: <number>; /* default 0 */ flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
    - flex-shrink
      -   flex-shrink: <number>; /* default 1 */ flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
    - flex-basis
      -   flex-basis: <length> | auto; /* default auto */ 它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
    - flex 以上三个元素的合并
      -   flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
    - align-self 自身覆盖 conent 元素的item-align 的属性可以以其他元素达到不一样的对齐方式
      -   align-self: auto | flex-start | flex-end | center | baseline | stretch;


  ```
  ### webpack 开发模式 自己模拟接口  express.Router()
  ```
  const apiRouters = express.Router();
  apiRouters.get('/home',(req,res,next)=>{
  console.log('api/home.....');
  let data = require('../src/api/home.js');
  res.send(data.data);
})

module.exports = function(proxy, allowedHost) {
  +
   app.use('/api',apiRouters);
  +
})
  ```

  ### withRouter 的使用
  withRouter 是一个高阶组件，把 match，location，history 三个对象注入到组件的 props 中。这是一个非常实用的函数

```
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

class Heander extends Component {
  reunder(){...}
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
      //这里可以通过 props.history.push('')控制路由的跳转
      status ? dispatch(loginOut()) : props.history.push('/login');
    }
  }
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Heander));
```

### react-loadable 组件的使用
现在使用 react-loadable 来实现组件的异步加载，一切变得容易多了。在之前的 React Router 文档中是按照下面这种方式实现组件的异步加载的。

把相关的界面拆分出去，没必要都打包进主'miain.js' 文件

比如把 login 模块分离出去，进入主页的时候不需要加载 login 模块的代码

loadable.js 文件
```
import React from 'react'
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
    //指定加载的模块
    loader: () => import('./index') //login 组件,
    //加载时候显示的dom原生
    loading() {
        return <span>loading....</span>;
    }
})

//异步加载 login 界面
export default () => <LoadableComponent />
```

App.js
```
import Login from './pages/login/loadable';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route path='/login' exact component={Login}></Route>
        </div>
      </BrowserRouter>
    </Provider>
  );
}


```