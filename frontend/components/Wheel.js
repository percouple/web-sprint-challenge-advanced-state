import React from 'react'
import {connect, useDispatch } from 'react-redux'
import { moveCounterClockwise, moveClockwise } from '../state/action-creators';

const mapStateToProps = (state) => {
  return {
    wheel: state.wheel,
  }
}

export function Wheel(props) {

  const dispatch = useDispatch();

  const dotArray = [0, 1, 2, 3, 4, 5];

  return (
    <div id="wrapper">
      <div id="wheel">
        {dotArray.map(index => {
          return <div className={`cog ${index === props.wheel ? "active" : ''}`} style={{ "--i": index }} key={index}>
            {index === props.wheel ? "B" : ''}
            {/* --i is a custom CSS property, no need to touch that nor the style object */}</div>
        })}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => dispatch(moveCounterClockwise())} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => dispatch(moveClockwise())}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect (mapStateToProps) (Wheel);
