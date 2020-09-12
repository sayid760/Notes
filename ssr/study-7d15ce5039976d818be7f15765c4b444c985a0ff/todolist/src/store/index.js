import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

import createSagaMiddleware from 'redux-saga'

import mySaga from "../saga"

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk,sagaMiddleware),
  // other store enhancers if any
);

const store = createStore( reducer, enhancer );

sagaMiddleware.run(mySaga)

export default store;



