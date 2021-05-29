import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

//userReducer is a object i.e the state
export default combineReducers({
    user : userReducer
})