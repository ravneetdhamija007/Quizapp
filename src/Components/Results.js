import React from 'react'
import {msToTime} from '../utils.js'
import { withRouter } from 'react-router';

class Results extends React.Component {
constructor(props){
  super(props)
}


render(){

  let correctAnswers =this.props.correctAnswers
  let incorrectAnswers = this.props.totalQ - correctAnswers
  let score = (correctAnswers/10)*100
  let startTime = this.props.startTime
  let closingTime = new Date()
  let diff = startTime - closingTime

    return(
      <div>
        <div className="m-b-10">Score in Percentage: {score}%</div>
        <div className="m-b-10">Correct Answers: {correctAnswers}</div>
        <div className="m-b-10">Incorrect Answers: {incorrectAnswers}</div>
        <div className="m-b-10">Time Spent: {msToTime(diff)}</div>
        <div className="m-t-20">
          <button className="blue-btn m-r-35" onClick={this.props.reset}>Restart Again</button>
          <button className="blue-btn m-r-35" onClick={this.props.homeScreen}>Quit</button>
        </div>
      </div>
    )
  }
}
export default withRouter(Results)
