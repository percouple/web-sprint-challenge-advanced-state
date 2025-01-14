// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case actionTypes.MOVE_CLOCKWISE: {
      if (state !== 5) {
        return state + 1;
      } else {
        return 0;
      }
    }
    case actionTypes.MOVE_COUNTERCLOCKWISE: {
      if (state !== 0) {
        return state - 1;
      } else {
        return 5
      }
    }
  }
  return state
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case actionTypes.SET_QUIZ_INTO_STATE:
      console.log(action.payload) 
      return action.payload;
    default:
      return state
  }
}

const initialSelectedAnswerState = false
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_ANSWER: {
      console.log(action.payload)
      return action.payload
    }
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case actionTypes.SET_INFO_MESSAGE: {
      return action.payload
    }
    default: {
      return state
    }
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case actionTypes.RESET_FORM: {
      return initialFormState;
    }
    case actionTypes.INPUT_CHANGE: {
      const { name, value } = action.payload;
      switch (name) {
        case "newQuestion":
          return {
            ...state,
            newQuestion: value
          };
        case "newTrueAnswer":
          return {
            ...state,
            newTrueAnswer: value
          };
        case "newFalseAnswer":
          return {
            ...state,
            newFalseAnswer: value
          };
        default:
          return state;
      }
    }
    default:
      return state;
  }
}


export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
