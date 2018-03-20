import { createStore, applyMiddleware } from 'redux';
import rootReducer from "../reducers/rootreducer.js";
import logger from "../middleware/logger.js";
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
const { getState, dispatch } = store;

export default store;