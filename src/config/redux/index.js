import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import auth from './auth';

const middlewares = composeWithDevTools(applyMiddleware(thunkMiddleware));

const reducer = combineReducers({
  auth,
});

export default state => createStore(reducer, state, middlewares);
