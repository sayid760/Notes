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