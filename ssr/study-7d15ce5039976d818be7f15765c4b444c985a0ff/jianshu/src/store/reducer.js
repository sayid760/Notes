
import { combineReducers } from 'redux-immutable';

import {reducer as headerReducer} from '../common/header/store';
import homeReducer from '../pages/home/store/reducer';
import loginReducer from '../pages/login/store/reducer';

/**整合拆分的reducer */
const reducer = combineReducers({
    header: headerReducer,
    home:homeReducer,
    login:loginReducer,
})

export default reducer;