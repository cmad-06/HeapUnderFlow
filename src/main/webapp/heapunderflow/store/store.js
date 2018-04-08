import { createStore, applyMiddleware } from 'redux';
import rootReducer from "../reducers/rootreducer.js";
import logger from "../middleware/logger.js";
import thunk from 'redux-thunk';
import promise from 'redux-promise'

const store = createStore(rootReducer, applyMiddleware(logger, thunk, promise));
const { getState, dispatch } = store;

export default store;