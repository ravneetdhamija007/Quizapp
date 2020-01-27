import axios from 'axios'

export function getQuiz(Data){

  return dispatch => {
    axios.get('https://opentdb.com/api.php', ((Data) ? Data : '')).then(response => {
      dispatch({"type":"GET_QUIZ","payload":response.data});
    }).catch(error =>{
      console.log(error);
      dispatch({"type":"GET_QUIZ","payload": "Server Error"});
    });
  }
}
