import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import thunk from 'redux-thunk';
import reducer from './Reducers/IndexReducer.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserHistory} from 'react-router';
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(
	reducer, applyMiddleware(thunk)
);

const history = createBrowserHistory();
// Get the current location.
const location = history.location;

ReactDOM.render((
  <Provider store={store}>
  	<Router history={history} >
    	<App />
    </Router>
  </Provider>),
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
