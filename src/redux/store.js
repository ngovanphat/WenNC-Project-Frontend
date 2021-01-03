/*
    Don't add anything to this file, this file use for create a store from the root reducer
    Root reducer file is Index.js file of Reducers folder
*/

import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default createStore(rootReducer,applyMiddleware(thunk, logger));
