import axios from 'axios'
import { ACTIONS } from './command';

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