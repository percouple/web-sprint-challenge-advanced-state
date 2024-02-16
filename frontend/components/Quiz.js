import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { setQuiz, selectAnswer, fetchQuiz, postAnswer } from '../state/action-creators'

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  }
}

export function Quiz(props) {

  const dispatch = useDispatch();
  const [quizFetched, setQuizFetched] = useState(false);

  useEffect(() => {
    if (!props.quiz && !quizFetched) {
      dispatch(fetchQuiz());
      setQuizFetched(true);
    }
  }, [dispatch, props.quiz, quizFetched]);

  const onSubmit = () => {
    console.log("Boop! Submit pressed.")
    dispatch(postAnswer({ quiz_id: props.quiz.quiz_id, answer_id: props.selectedAnswer.answer_id }))
  }


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>
            <div id="quizAnswers">
              <div className={`answer ${props.quiz.answers[0].text === props.selectedAnswer.text ? 'selected' : ''}`}>
                {props.quiz.answers[0].text}
                <button onClick={() => dispatch(selectAnswer(props.quiz.answers[0]))}>
                  {props.quiz.answers[0].text === props.selectedAnswer.text ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={`answer ${props.quiz.answers[1].text === props.selectedAnswer.text ? 'selected' : ''}`}>
                {props.quiz.answers[1].text}
                <button onClick={() => dispatch(selectAnswer(props.quiz.answers[1]))}>
                  {props.quiz.answers[1].text === props.selectedAnswer.text ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={onSubmit} disabled={!props.selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(mapStateToProps)(Quiz);
