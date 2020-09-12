import { ACTIONS } from "./command";

const defaultState = {
    inputValue:'12306',
    list:['learn english' , 'learn react']
};

export default (state = defaultState,action) => {
    console.log(state,action);
    if(action.type === ACTIONS.INPUT_CHANGE) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    else if(action.type === ACTIONS.ADD_TO_LiST) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.list.push(action.value);
        return newState;
    }
    else if(action.type === ACTIONS.DEL_TO_LiST) {
        let newState = JSON.parse(JSON.stringify(state));
        let del_idx = newState.list.indexOf(action.value);
        if(del_idx > -1) newState.list.splice(del_idx,1);
        return newState;
    }
    return state;
}