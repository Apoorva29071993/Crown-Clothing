import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

//userReducer is a object i.e the state
export default combineReducers({
    user : userReducer ,
    cart : cartReducer
})