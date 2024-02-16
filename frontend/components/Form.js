import React from 'react'
import { connect, useDispatch } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { inputChange, postQuiz } from '../state/action-creators';

export function Form(props) {

  const dispatch = useDispatch();

  const onChange = evt => {
    dispatch(inputChange({name: evt.target.id, 
                          value: evt.target.value}))
    
  }

  const onSubmit = evt => {
    evt.preventDefault();
    console.log(props.form)
    dispatch(postQuiz(props.form))
  }

  const isTruthy = (value) => {
    return value.trim().length > 1
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} value={props.form.newQuestion} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} value={props.form.newTrueAnswer} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} value={props.form.newFalseAnswer} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" onSubmit={onSubmit} disabled={!Object.values(props.form).every(isTruthy)} >Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
