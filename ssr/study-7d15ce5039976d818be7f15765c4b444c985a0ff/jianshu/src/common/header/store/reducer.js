import { fromJS } from 'immutable';
import { ACTION } from "./actionConst";


const defaultState = fromJS({ inpFocues: false })

export default (state = defaultState, action) => {
    console.log(JSON.stringify(action));
    if (action.type === ACTION.CHANGE_FOCUS) {
        return state.set('inpFocues',action.value);
    }
    return state;
}; 