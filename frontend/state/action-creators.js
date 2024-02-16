// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'
import * as actionTypes from './action-types';

export function moveClockwise() {
  return { type: actionTypes.MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  return { type: actionTypes.MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(selectedAnswer) {
  return { type: actionTypes.SET_SELECTED_ANSWER, payload: selectedAnswer }
}

export function setMessage(infoMessage) {
  return { type: actionTypes.SET_INFO_MESSAGE, payload: infoMessage }
}

export function setQuiz(quiz) {
  return { type: actionTypes.SET_QUIZ_INTO_STATE, payload: quiz }
}

export function inputChange(formObj) {
  return { type: actionTypes.INPUT_CHANGE, payload: formObj }
}

export function resetForm() {
  return { type: actionTypes.RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {

    console.log("Running through fetchQuiz")
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(null));

    // console.log("null dispatch successfully sent")

    // On successful GET:
    axios.get('http://localhost:9000/api/quiz/next')
      .then((res) => {
        // - Dispatch an action to send the obtained quiz to its state
        dispatch(setQuiz(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export function postAnswer(answerObj) {
  return function (dispatch) {

    // On successful POST:
    axios.post('http://localhost:9000/api/quiz/answer', answerObj)
      .then((res) => {
        console.log(res)
        // - Dispatch an action to reset the selected answer state
        dispatch(selectAnswer(false))
        // - Dispatch an action to set the server message to state
        dispatch(setMessage(res.data.message))
        // - Dispatch the fetching of the next quiz
        dispatch(fetchQuiz())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export function postQuiz(formState) {
  return function (dispatch) {
    const postObj = {
      question_text: formState.newQuestion, 
      true_answer_text: formState.newTrueAnswer, 
      false_answer_text: formState.newFalseAnswer
    }
    axios.post('http://localhost:9000/api/quiz/new', postObj)
    // On successful POST:
    .then((res) => {
      // - Dispatch the correct message to the the appropriate state
      // - Dispatch the resetting of the form
      console.log(res)
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))

      dispatch(resetForm())
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
