import React, {Component} from 'react'
import QuizApp from './QuizApp.js';

class Quiz extends React.Component {
  constructor(props){
    super(props)
    this.state={
      questions:0,
      type:'',
      difficulty:'easy',
      start: false,
      questionClass:"simpleSelect m-r-35",
      typeClass:'simpleSelect m-r-35',
      difficultyClass: 'simpleSelect m-r-35'
    }

  }

  handleInputChange=(e)=>{
    this.setState({[e.target.name] :  e.target.value})
  }

  startQuiz =()=>{
    if(this.state.questions == undefined || this.state.questions == null || this.state.questions == ''){
      this.setState({error: true, questionClass: "simpleSelect m-r-35 field-error"})
      return;
    }else if (this.state.question) {
      this.setState({error: false, questionClass: "simpleSelect m-r-35" })
    }
    else if(this.state.type == undefined || this.state.type == null || this.state.type ==''){
      this.setState({error: true, typeClass: "simpleSelect m-r-35 field-error"})
      return;
    }else if (this.state.type) {
      this.setState({error: false, typeClass:"simpleSelect m-r-35" })
    }else if(this.state.difficulty == undefined || this.state.difficulty == null || this.state.difficulty ==''){
      this.setState({error: true, difficultyClass: "simpleSelect m-r-35 field-error" })
      return;
    }else if (this.state.difficulty) {
      this.setState({error: false, difficultyClass: "simpleSelect m-r-35" })
    }

    this.setState({start: true})
  }

  render(){
    return(
    <div className="guest">
      {!this.state.start &&
      <div  className="wrapper">
        <div className="title m-t-20">
          <h2>Welcome To the Quiz</h2>
        </div>
        <div className="m-b-20">
          <h4>Choose the Quiz</h4>
        </div>
      <div className="info-block">
        <div className="row">
            <div>
              <select name="questions" className={this.state.questionClass} onChange={(e)=>this.handleInputChange(e)} value={this.state.questions}>
                <option value="">Select</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>
            <div>
              <select name="type" className={this.state.typeClass}  onChange={(e)=>this.handleInputChange(e)} value={this.state.type}>
                <option value="">Select</option>
                <option value="9">General Knowledge</option>
                <option value="21">Sports</option>
                <option value="18">Computers</option>
              </select>
            </div>
            <div>
              <select name='difficulty' className={this.state.difficultyClass}  onChange={(e)=>this.handleInputChange(e)} value={this.state.difficulty}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
          </div>
          </div>
        </div>
          <button className="blue-btn m-r-35" onClick={()=>this.startQuiz()}>Start Quiz</button>
      </div>}
        {this.state.start && <QuizApp questions={this.state.questions} type={this.state.type} difficulty={this.state.difficulty} />}
    </div>
    )
  }
}
export default Quiz
