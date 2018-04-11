import { combineReducers } from 'redux'
import {userReducer} from './userReducer'
import {blogReducer} from './blogReducer'
import {commentReducer} from './commentReducer'
import { reducer as formReducer} from 'redux-form'

export default combineReducers({
  user : userReducer,
  blogs : blogReducer,
  comments: commentReducer,
  form:formReducer
})