const QuizInitialState={
  action:''
}

const QuizReducer =(state = QuizInitialState, action) =>{
  switch (action.type) {
      case "GET_QUIZ":
   {
    return { ...state, data: action.payload, action: 'GET_QUIZ' }
  }
      default:
          return state
  }
}
export default QuizReducer;
