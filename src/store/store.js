/**
 * Created by intelligrape on 24/5/17.
 */

import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers/user.reducer';
import thunk from 'redux-thunk';
const middlewares = applyMiddleware(thunk);
const initialState = window.__REDUX_STATE__


console.log(">>>>", initialState);

const store = createStore(reducer,initialState, middlewares);

export default store;