import { createStore , applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

//Middleware is called inbetween action and the reducer
const store = createStore(rootReducer , applyMiddleware(...middlewares));

export default store;