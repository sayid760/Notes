
PWA serverWorker  本地缓存app 

### react 初级使用
- 事件使用
- jsx 的基本使用
dangerouslySetInnerHTML = {{__html:item}}
label 是一个点击扩大的作用 聚焦的输入框
```
<label htmlFor="insertArea">输入内容</label>
```
### 组件拆分 & 组件传值

父子组件通信，父组件把函数传进子组件，子组件调用父组件的函数

```

```
### react 单项数据流，子组件不能修改父组件传过来的数据

### 结构复制

```
const {deleteItem,content,index} = this.props;
```

### react
- react 视图层框架
- 声明式开发
- 可以与其他框架并存
- 组件化
- 单项数据流
- 函数是编程

### 属性接受强校验
```
import PropTypes from 'prop-types';

/** 属性做校验 */
TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  ind: PropTypes.number
}

.isRequired 毕传参数

默认值
TodoItem.defaultProps = {
  test: 'hello world'
}
```

### Props,State 与 render 函数的关系

```
// 当 state 或者 props 的值发生改变 render 的函数就会从新执行
```

### 虚拟DOM 
```
1. state 数据
2. jsx 模板
3. 数据 + 模板 结合，生成真实的dom 来显示
4. state 发生改变
5. 数据 + 模板结合，生成真实的DOM，替换换是的DOM

缺陷：
第一次生成了一个完整的DOM片段
第二次生成了一个完整的DOM片段
第二次替换第一次的DOM，非常消耗新能

改良
1. state 数据
2. jsx 模板
3. 数据 + 模板 结合，生成真实的dom 来显示
4. state 发生改变
5. 数据 + 模板结合，生成真实的DOM，不替换原始的DOM
6. 新的DOM 和原始的DOM做比对,找差异
7. 找出input框的发生了变化
8. 只用型的DOM中的input元素，替换掉老的DOM中的input元素

缺陷
新能提示不是很明显

1. state 数据
2. JSX 模板
3. 数据 + 模板 结合，生成虚拟的dom 用来描述真实的 DOM） （小点的性能损耗）
4. 生成虚拟dom
5. state 发生了变化
6. 生成型的虚拟dom
7. 比对虚拟dom  （极大的性能提升)
8. 直接操作dom 改变space 中的内容

```

### 深入了解虚拟DOM
```
优点
1. 性能提升
2. 它使得跨端应用得以实现。 react native
```

### 虚拟DOM中的Diff算法
```
7. 比对虚拟dom  （极大的性能提升)
setState -> diff -> Rerendered
setState 是一个异步函数 合并多次调用比对算法

1. 同层比对
    1.第一层比对
        1.假设 一致 
            比对第下层
        2.假设 不一致 
            会把页面节点下所有的dom全部删除掉，重新生成该节点下所有的dom，然后替换掉原始的dom

2. without keys 根据key 做关联
    1- key 值不要用 index 
        会导致 diff 比对不稳定
    2- key 就用item 左右key 
    3- 使用稳定值作为key有效避免diff浪费

```

### react 中 ref 的使用
```
 ref = {(input)=>{this.input = input}
 ！不建议直接操作dom

 
 建议用数据驱动的方式操作dom
handlerButtonClick = (e) => {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    },()=>{
      console.log(this.ul.querySelectorAll("li").length);
    })
  }

  setState 是一个异步函数 


```

### react 的生命周期函数
```
constructor 不归类到react 的生命周期行数 他是es 的构造函数

阶段流程
    1- initialization
        - constructor 
    2- Mounting (挂载阶段)
        - getDerivedStateFromProps (接收到参数 &初始化数据))
        - render （渲染）
        - react 更新 dom
        - componentDidMount （挂载结束）
    3- Updation 更新阶段
        - props(参数改变) 流
        - states(数据改变) 流
        - forceUpdate()
            - getDerivedStateFromProps (接收到参数 &初始化数据))
            - shouldComponentUpdate(true|false)
                - true
                    - render（渲染）
                    - react 更新 dom
                    - getSnapshotBeforeUpdate()
                    - componentDidUpdate（结束更新）
    4-Unmounting 卸载阶段
        - componentWillUnmount

```

### Redux 的工作流程
```
ActionCreators
Store
Reducers
ReactComponets
```

### 6-1 UI组件和容器组件
```
将业务逻辑和试图组件进行包裹拆分

ToduList (业务逻辑)
ToduListUI 只有一个render 渲染
```

### 6-2 无状态组件
```
ToduListUI 只有渲染，只有一个返回函数描述渲染层
```

### redux 发送异步请求或者数据
```
```

# redux和action 之间的操作

### redux-thunk 的使用
redux-thunk 将action 封装成一个 function 可以达到异步调用的目的

环境配置
```
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore( reducer, enhancer );
export default store;
```

```
componentDidMount() {
  /**redux 从异步接口操作数据 */
  store.dispatch(getTodolist);
}


export const getTodolist = (dispatch) => {
axios.get('./list.json')
  .then((res)=> {
      const data = res.data;
      const action = {type:ACTIONS.INIT_DATA,data};
      dispatch(action);
  })
  .catch((e)=>{
      console.log(e.message || e.stack || './list.json 获取失败');
  })
}

```

### redux-saga 中间件的使用
```

```

### react-redux 的使用
Provider 
```
const App = ()=> {
  <Provider>
    <TodoList/>
  </Provider>
}
```
connect 连接将 store 的数据映射到组件的 props
```
connect('接收到store 的props','dispatch 派发个store 的props,可以把行数写到这个props里')
```

