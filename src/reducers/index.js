import { combineReducers } from 'redux'
import users from './users'
import questions from './questions'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading'


export default combineReducers ({
  questions,
  users,
  authedUser,
  loadingBar: loadingBarReducer
})