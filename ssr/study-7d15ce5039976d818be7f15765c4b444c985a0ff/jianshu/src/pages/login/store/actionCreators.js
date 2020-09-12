import { ACTION } from "./actionConst";
import axios from 'axios';

export function login(user, pwd) {
  return (dispatch) => {
    axios.post('/api/login', { params: { user: user, pwd: pwd } })
      .then((res) => {
        console.log(res);
        let action = res.data.success
          ? { type: ACTION.LOGIN, value:res.data.data }
          : { type: ACTION.LOGIN_ERROR, value:-1,msg:'登录失败' };
        dispatch(action);
      })
      .catch(e => {
        console.log(e.stack || e.message);
      })
  }
}

export function loginOut() {
  return (dispatch)=>{
    let action = {type:ACTION.LOGOUT};
    dispatch(action);
  }
}