import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getQuiz } from '../Actions/quizActions.js';
import { withRouter } from 'react-router';
import Results from './Results.js'
import ErrorBoundary from './ErrorBoundary.js'
import {shuffleArray} from '../utils.js'

class QuizApp extends React.Component {
    constructor(props){
      super(props)
      this.state ={
        quizData : [],
        answers :  [],
        index: 0,
        complete: false,
        answer: null,
        selectedAnswers:[],
        correctAnswers: 0,
        totalQ: this.props.questions,
        currentTime:'',
        closingTime:'',
        showLoader: false,
      }

    }

componentDidMount(){
  let Data ={
    params:{
      amount: this.props.questions,
      category:this.props.type,
      difficulty: this.props.difficulty,
      type:"multiple"
  }
}
  let currentTime = new Date()
  this.setState({currentTime: currentTime, showLoader: true})// Capturing Quiz Starting Time
  this.props.getQuiz(Data)
}


static getDerivedStateFromProps(nextProps, prevState) {
  let returnState ={};
  if(nextProps.QuizData !== undefined && nextProps.QuizData !== prevState.QuizData){
      returnState.quizData = nextProps.QuizData ? nextProps.QuizData.results : [];
      let correct = []
      let answers =  []
      nextProps.QuizData.results && nextProps.QuizData.results.map((obj, id)=>{
        correct.push(obj.correct_answer)
        answers.push(obj.incorrect_answers) // Creating Single Array for Answers
      })
        answers.map((objx, index)=>{
             if(objx.length < 4)
                objx.push(correct[index])
              })
          returnState.answers = answers
          returnState.showLoader = false
        return returnState;
      }
  return null;
}


nextQuestion =()=>{

let index = this.state.index

if(this.state.selectedAnswers.length == index){
  return;
}
  if(index == this.props.questions -1){
  this.setState({complete: true, showLoader: true, userChanged: false})
  }else{
  this.setState({index: index + 1})
  }
}

onAnswer = (selected, id)=> {
let correctAnswers = this.state.correctAnswers
let selectedAnswers = [...this.state.selectedAnswers]; // collecting the answers value in single array
let quiz = JSON.parse(JSON.stringify(this.state.quizData));

    selectedAnswers.push(selected)
    quiz.map((obj, idx)=>{
      if(obj.correct_answer == selected){
          correctAnswers= correctAnswers + 1 // counter for correct answers
      }
    })

this.setState({selectedAnswers: selectedAnswers, correctAnswers: correctAnswers})
}

restart = ()=>{
  let Data ={
    params:{
      amount: this.props.questions,
      category: this.props.type,
      difficulty: this.props.difficulty,
      type:"multiple"
    }
  }
  this.setState({
    complete: false,
    showLoader: true,
    answers:[],
    quizData:[],
    index: 0,
    correctAnswers:0,
    selectedAnswers:[],
    currentTime:'',
    closingTime:'',
  })
  this.props.getQuiz(Data)
}

homeScreen=()=>{
    this.setState({showLoader: true, currentTime:'',
    closingTime:'',})
    return <div>{this.props.history.push(`/`)}</div>;
  }

render(){
console.log(this.state.showLoader)
  let index = this.state.index
  let quizData = this.state.quizData ? this.state.quizData : [] ;
  let label = (index < this.props.questions -1) ?  "Next" : "Finish";
  let answers = this.state.answers
  let length = this.state.selectedAnswers.length ? this.state.selectedAnswers.length :  0

  return(
    <ErrorBoundary hasError={this.state.quizData ? false : true}>
      <div className="wrapper">
        <div>
        { !this.state.complete && !this.state.showLoader && this.state.quizData && this.state.quizData.length &&
          <div>
            <h3 className ='title m-t-20'>Question {this.state.index + 1} of {quizData.length}</h3>
            <h1 className = 'title'><p>{quizData[index].question}</p></h1>
          </div>}
            {!this.state.complete && this.state.answers && answers.map((obj, id)=>{
            if(index === id){
              if(length == index){
                shuffleArray(obj)// shuffling answers
              }
              return obj.map((options, idx)=>{
                return(
                  <div key={idx}>
                    <input id={idx} className="radio-inline m-b-10" checked={options.selected} name='answer' type="radio" onChange={() => this.onAnswer(options, idx)} />
                    <label htmlFor={idx}>{options} </label>
                  </div>
                )
              })
            }
            })
          }
        </div>
        <div className='m-t-35'>
            {!this.state.complete && !this.state.showLoader && this.state.quizData && <button className="blue-btn m-r-35" onClick={()=>this.nextQuestion()}>{label}</button>}
            {!this.state.complete && !this.state.showLoader && this.state.quizData && <button className="blue-btn m-r-35" onClick={()=>this.homeScreen()}>{"Quit"}</button>}
        </div>
          {this.state.complete &&
          <Results correctAnswers={this.state.correctAnswers}
            totalQ={this.state.totalQ}
            reset={()=>this.restart()}
            startTime = {this.state.currentTime}
            homeScreen ={this.homeScreen}
            />}

      </div>
        {this.state.showLoader && <h3>Loading...</h3>}
      </ErrorBoundary>
    )
  }
}

function mapStateToProps(state) {
  const returnState  = {};
  if (state.QuizReducer.action === "GET_QUIZ" ) {
    if (state.QuizReducer.data.response_code !== 0 ) {
      console.log("Oops Error Loading Data")
      //returnState.showLoader = false
      returnState.QuizData = state.QuizReducer.data;
    } else {
      returnState.QuizData = state.QuizReducer.data;
    }
  }
  return returnState
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getQuiz: getQuiz}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuizApp));
