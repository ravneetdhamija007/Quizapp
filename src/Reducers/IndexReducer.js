import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import QuizReducer from './QuizReducer.js'

export default combineReducers({
QuizReducer,
    routing: routerReducer
});
