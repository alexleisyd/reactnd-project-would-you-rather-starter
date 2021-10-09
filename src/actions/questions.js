import { saveQuestion, saveAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveQuestions (questions) {
  return {
      type: RECEIVE_QUESTIONS,
      questions
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function addAnswer (answer) {
  return {
    type: ADD_ANSWER,
    answer
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading)
    return saveQuestion({
      author: authedUser.id,
      optionOneText,
      optionTwoText
    })
    .then((question) => {
      dispatch(addQuestion(question))
    })
    .then(() => {
      dispatch(hideLoading)
    })
    .catch((e) => {
        console.warn('Error in saving question', e)
        alert('Error saving the question. Try again.')
        dispatch(hideLoading)
    })
  }
}

export function handleAddAnswer(questionId, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const payload = {
      authedUser,
      qid: questionId,
      answer
    }
    dispatch(showLoading)
    return saveAnswer(payload)
    .then(() => {
      dispatch(addAnswer(payload))
    })
    .then(() => {
      dispatch(hideLoading)
    })
    .catch((e) => {
        console.warn('Error in saving answer', e)
        alert('Error saving the answer. Try again.')
        dispatch(hideLoading)
    })
  }
}