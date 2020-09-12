import { fromJS } from 'immutable';
import { ACTION } from './actionConst';

const defaultState = fromJS({
  login: false,
  code:0,
  error:"",
})

export default (state = defaultState, action) => {
  if (action.type === ACTION.LOGIN) {
    return state.set('login', action.value);
  }
  else if(action.type === ACTION.LOGIN_ERROR) {
    return state.merge({
      login:false,
      code:action.value,
      error:action.msg
    })
  }
  else if(action.type === ACTION.LOGOUT) {
    return state.set('login',false);
  }
  return state;
}; 