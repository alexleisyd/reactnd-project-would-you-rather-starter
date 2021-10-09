import { ADD_ANSWER } from '../actions/question'
import { RECEIVE_USERS } from '../actions/users'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ADD_ANSWER:
      const { answer } = action
      state[answer.authedUser].answers[answer.qid] = answer.answer
      let updatedUser = {
        [answer.authedUser]: state[answer.authedUser].answers[answer.qid]
      }
      return {
        ...state,
        updatedUser
      }
    default :
      return state
  }
}